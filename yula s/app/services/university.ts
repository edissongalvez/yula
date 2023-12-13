import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getUniversities = async () => {
    return await prisma.university.findMany({
        include: {
            careers: true
        }
    })
}

export const getUniversity = async (id: number) => {
    return await prisma.university.findUnique({
        where: {
            id
        },
        include: {
            careers: true
        }
    })
}