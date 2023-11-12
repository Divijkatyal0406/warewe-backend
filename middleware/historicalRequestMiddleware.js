const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const historicalRequestMiddleware = async (req, res, next) => {
  try {
    const { method, originalUrl} = req;
    await prisma.historicalRequest.create({
      data: {
        method,
        originalUrl,
      },
    });
    next();
  } catch (error) {
    console.error('Error adding historical request:', error);
    next(error);
  }
};
module.exports = historicalRequestMiddleware;
