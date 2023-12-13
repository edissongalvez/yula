import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getOrganizations = async () => {
    return await prisma.organization.findMany({
        include: {
            location: true,
            mentors: true
        }
    })
}

export const getOrganization = async (id: number) => {
    return await prisma.organization.findUnique({
        where: {
            id
        },
        include: {
            location: true,
            mentors: true
        }
    })
}