import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default class UserController {

    // Listar todos los usuarios
    public static async getUsers (): Promise<any[]> {
        const users: any[] = await prisma.user.findMany()
        return users
    }

    // Login
    public static async login (email: string, password: string): Promise<any> {
        const user = await prisma.user.findFirst({where: {email: email}})
        if (!user) throw new Error('User not found')
        if (user.password !== password) throw new Error('Incorrect password')
        return user
    }

}