import { PrismaClient } from '@prisma/client'
import { products } from './products'
import { users } from './users'

const prisma = new PrismaClient()

async function main() {
    console.log(`Start seeding ...`)
    for (const p of products) {
        const newProduct = await prisma.product.create({
        data: p,
        })
        console.log(`Created product with id: ${newProduct.id}`)
    }
    for (const u of users) {
        const newUser = await prisma.user.create({
        data: u,
        })
        console.log(`Created user with id: ${newUser.id}`)
    }
    console.log(`Seeding finished.`)
}

main().catch(e => {
    console.error(e)
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect()
    });