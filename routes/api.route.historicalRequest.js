const { PrismaClient } = require('@prisma/client');
const router = require('express').Router();
const prisma=new PrismaClient();

router.get('/', async (req, res, next) => {
    try {
        const last5Requests = await prisma.historicalRequest.findMany({
          take: 5,
          orderBy: { timestamp: 'desc' },
        });
        res.json(last5Requests);
      } catch (error) {
        next(error);
      }
    }
);


module.exports = router;