import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getInternshipCategories = async () => {
    return await prisma.internshipCategory.findMany({
        include: {
            internships: true
        }
    })
}

export const getInternshipCategory = async (id: number) => {
    return await prisma.internshipCategory.findUnique({
        where: {
            id
        },
        include: {
            internships: true
        }
    })
}