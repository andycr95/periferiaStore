import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default class UserController {

    // Login
    public static async login (email: string, password: string): Promise<any> {
        const user = await prisma.user.findFirst({where: {email: email}})
        if (!user) throw new Error('User not found')
        if (user.password !== password) throw new Error('Incorrect password')
        return user
    }

}