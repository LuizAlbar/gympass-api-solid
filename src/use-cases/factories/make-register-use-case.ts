import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository.ts"
import { RegisterUseCase } from "../register.ts"

export function makeRegisterUseCase() {
    
    const prismaUserRepository = new PrismaUserRepository()
    const registerUserCase = new RegisterUseCase(prismaUserRepository)

    return registerUserCase
}