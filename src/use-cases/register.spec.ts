import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register.ts'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.ts'
import { UserAlreadyExistsError } from './errors/user-already-exists-error.ts'

// const usersRepository = new InMemoryUsersRepository()
// const register = new RegisterUseCase(usersRepository)

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () =>{

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new RegisterUseCase(usersRepository)

    })
    it('should be able to register', async () =>{


        const { user } = await sut.execute({
            name: 'John Doe',
            email: 'john@example.com',
            password: '12345678'
        })

        expect(user.id).toEqual(expect.any(String))
    })


    it('should hash user password upon registration', async () =>{

        const { user } = await sut.execute({
            name: 'John Doe',
            email: 'john@example.com',
            password: '12345678'
        })

        const isPasswordCorrectlyHashed = await compare(
            '12345678',
            user.password_hash
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async () =>{

        const email = 'john@example.com';

        await sut.execute({
            name: 'John Doe',
            email,
            password: '12345678'
        })

        await expect(() =>
            sut.execute({
                name: 'John Doe',
                email,
                password: '12345678'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})