import { prisma } from "@/lib/prisma.ts"
import { Prisma } from "@prisma/client"



export class PrismaUserRepository {

    async create(data: Prisma.UserCreateInput){
        
   const user = await prisma.user.create({
        data,
    })

    return user
    }
}