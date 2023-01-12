import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { Product } from "../types";


export default class ProductController {

    // Listar todos los productos
    public static async getProducts (): Promise<Product[]> {
        const products: Product[] = await prisma.product.findMany()
        return products
    }

    // buscar productos
    public static async searchProducts (search: string): Promise<Product[]> {
        const products: Product[] = await prisma.product.findMany(
            {
                where: {
                    title: {
                        contains: search,
                        mode: 'insensitive'
                    }
                },
                include: {
                    _count: {
                      select: {
                        sales: true,
                      },
                    }
                },
                orderBy: {
                    sales: {
                        _count: 'desc'
                    }
                }
            }
        )
        return products
    }

    // metodo para realizar venta de producto
    public static async saleProduct (user: any, products: any[], total: number): Promise<any> {
        const _products: any[] = [];
        const _sales: any[] = [];
        for (let i = 0; i < products.length; i++) {
            const p = products[i];
            if (_products.filter(pr => p.id === pr.product.id).length === 0) {
                let _pts: Product[] = products.filter((pr: Product) => p.id === pr.id);
                _products.push({
                    product: p,
                    amount: _pts.length
                });
            }
        }
        for (let i = 0; i < _products.length; i++) {
            const p = _products[i];
            const sale = await prisma.sale.create({
                data: {
                    amount: p.amount,
                    productId: p.product.id,
                    userId: user.id
                }
            });
            _sales.push(sale);
        }
        const _user = await prisma.user.update({
            where: { id: user.id },
            data: {
                limit: user.limit - total
            }
        });
        return {_sales, user: _user};
    }
}