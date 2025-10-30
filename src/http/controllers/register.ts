import { z } from "zod"
import { FastifyRequest, FastifyReply } from "fastify"
import { RegisterUseCase } from "@/use-cases/register.ts"
import { PrismaUserRepository } from "@/repositories/prisma-users-repository.ts"

export async function register (request: FastifyRequest, reply: FastifyReply) {

    const registerBodySchema = z.object({
        name: z.string(),
        email: z.email(),
        password: z.string().min(6),
    })

    const {name, email, password} = registerBodySchema.parse(request.body)

    try {
        const prismaUserRepository = new PrismaUserRepository()
        const registerUserCase = new RegisterUseCase(prismaUserRepository)

        await registerUserCase.execute({name, email, password})

    } catch (err) {
        return reply.status(409).send()
    }
    
    return reply.status(201).send()
}