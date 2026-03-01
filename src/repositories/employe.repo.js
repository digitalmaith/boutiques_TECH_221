import prisma from "../config/prisma.js";

class EmployeRepository {
    // creer employe
      async create(data){
        return prisma.employe.create({data})
      }

      

}

export default new EmployeRepository()


