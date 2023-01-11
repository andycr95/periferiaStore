import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { Product } from "../types";


export default class ProductController {

    // Listar todos los productos
    public static async getProducts (): Promise<Product[]> {
        const products: Product[] = await prisma.product.findMany({orderBy: { id: 'desc' }})
        return products
    }

    // buscar productos
    public static async searchProducts (search: string): Promise<Product[]> {
        const products: Product[] = await prisma.product.findMany({where: {title: {contains: search}}})
        return products
    }

}