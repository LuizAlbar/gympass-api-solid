import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register.ts'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.ts'
import { UserAlreadyExistsError } from './errors/user-already-exists-error.ts'

describe('Register Use Case', () =>{

    it('should hash user password upon registration', async () =>{
        const usersRepository = new InMemoryUsersRepository()
        const register = new RegisterUseCase(usersRepository)

        const { user } = await register.execute({
            name: 'John Doe',
            email: 'john@example.com',
            password: '12345678'
        })

        expect(user.id).toEqual(expect.any(String))
    })


    it('should hash user password upon registration', async () =>{
        const usersRepository = new InMemoryUsersRepository()
        const register = new RegisterUseCase(usersRepository)

        const { user } = await register.execute({
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
        const usersRepository = new InMemoryUsersRepository()
        const register = new RegisterUseCase(usersRepository)

        const email = 'john@example.com';

        await register.execute({
            name: 'John Doe',
            email,
            password: '12345678'
        })

        await expect(() =>
            register.execute({
                name: 'John Doe',
                email,
                password: '12345678'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})