const { PrismaClient } = require('@prisma/client');

const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const prisma=new PrismaClient();
const historicalRequestMiddleware = require('../middleware/historicalRequestMiddleware');

router.use(historicalRequestMiddleware);


const createUserValidation = [
  body('username').notEmpty(),
  body('email').isEmail().notEmpty().custom((value) => {
    if(!value.includes('@')){
      throw new Error('Email in wrong format');
    }
    const domain = value.split('@')[1];
    if (domain.length==0) {
      throw new Error('Email in wring format');
    }
    return true;
  }),
];


router.get('/', async (req, res, next) => {
  try{
    const users = await prisma.user.findMany({
      include:{contents:true}
    })
    res.json(users);
  }catch(err){
    next(err);
  }
});

router.post('/', createUserValidation, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[1].msg});
  }
  try{
    const user = await prisma.user.create({
      data:req.body  
    })
    res.json(user);
  }catch(err){
    next(err);
  }
});


router.get('/user', async (req, res, next) => {
  try{
    const {id} = req.query;
    const user=await prisma.user.findUnique({where:{id:Number(id)},include:{contents:true}});
    res.json(user);
  }catch(err){
    next(err);
  }
});

router.delete('/', async (req, res, next) => {
  try{
    const {id} = req.query;
    const del_user=await prisma.user.delete({where:{id:Number(id)}});
    res.json(del_user);
  }catch(err){
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try{
    const {id} = req.query;
    const user=await prisma.user.update({where:{id:Number(id)},data:req.body,include:{contents:true}});
    res.json(user);
  }catch(err){
    next(err);
  }
});

module.exports = router;
