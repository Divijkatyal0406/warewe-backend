const { PrismaClient } = require('@prisma/client');
const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const prisma=new PrismaClient();
const historicalRequestMiddleware = require('../middleware/historicalRequestMiddleware');

router.use(historicalRequestMiddleware);

const createContentValidation = [
  body('title').notEmpty(),
  body('description').optional().isLength({ min: 11 }).withMessage('Description must be greater than 10 characters'),
];

router.get('/', async (req, res, next) => {
  try{
    const contents = await prisma.content.findMany({
      include:{User:true}
    })
    res.json(contents);
  }catch(err){
    next(err);
  }
});

router.post('/', createContentValidation, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[1].msg});
  }
  try{
    const content = await prisma.content.create({
      data:req.body  
    })
    res.json(content);
  }catch(err){
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try{
    const {id} = req.query;
    const content=await prisma.content.findUnique({where:{id:Number(id)},include:{User:true}});
    res.json(content);
  }catch(err){
    next(err);
  }
});


router.delete('/', async (req, res, next) => {
  try{
    const {id} = req.query;
    const del_content=await prisma.content.delete({where:{id:Number(id)}});
    res.json(del_content);
  }catch(err){
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try{
    const {id} = req.query;
    const content=await prisma.content.update({where:{id:Number(id)},data:req.body,include:{User:true}});
    res.json(content);
  }catch(err){
    next(err);
  }
});

module.exports = router;
