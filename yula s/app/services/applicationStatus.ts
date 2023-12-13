import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getApplicationStatuses = async () => {
    return await prisma.applicationStatus.findMany({
        include: {
            applications: true
        }
    })
}

export const getApplicationStatus = async (id: number) => {
    return await prisma.applicationStatus.findUnique({
        where: {
            id
        },
        include: {
            applications: true
        }
    })
}