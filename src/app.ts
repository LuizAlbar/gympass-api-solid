import fastify from "fastify";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

prisma.user.create({
    data: {
        name: "teste",
        email: "teste"
    }
})

export const app = fastify()