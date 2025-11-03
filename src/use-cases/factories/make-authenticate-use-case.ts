import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository.ts"
import { AuthenticateUseCase } from "../authenticate.ts"

export function makeAuthenticateUseCase() {
    const prismaUserRepository = new PrismaUserRepository()
    const authenticateUseCase = new AuthenticateUseCase(prismaUserRepository)

    return authenticateUseCase
}