import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getLocations = async () => {
    return await prisma.location.findMany({
        include: {
            organizations: true
        }
    })
}

export const getLocation = async (id: number) => {
    return await prisma.location.findUnique({
        where: {
            id
        },
        include: {
            organizations: true
        }
    })
}