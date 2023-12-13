import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getCareers = async () => {
    return await prisma.career.findMany({
        include: {
            university: true,
            interns: true
        }
    })
}

export const getCareer = async (id: number) => {
    return await prisma.career.findUnique({
        where: {
            id
        },
        include: {
            university: true,
            interns: true
        }
    })
}