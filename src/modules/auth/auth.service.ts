import { prisma } from '../../config/prisma';

// Write your core Auth database operations / business logic here
export const fetchData = async () => {
  // return await prisma.someModel.findMany();
  return { message: 'Data found' };
};
