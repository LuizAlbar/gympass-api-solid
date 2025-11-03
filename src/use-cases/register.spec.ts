import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register.ts'
import { compare } from 'bcryptjs'

describe('Register Use Case', () =>{
    it('should hash user password upon registration', async () =>{
        const register = new RegisterUseCase({

            findByEmail(email) {
                return null
            },
            async create(data) {
                return {
                    id: 'user-1',
                    name: data.name,
                    email: data.email,
                    password_hash: data.password_hash,
                    created_at: new Date(),
                }
            }
        })

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
})