import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createInternship = async (image: string, name: string, desc: string, internshipStartDate: Date, noVacancies: number, internshipCategoryId: number, organizationId: number) => {
    return await prisma.internship.create({
        data: {
            image,
            name,
            desc,
            internshipStartDate,
            noVacancies,
            internshipCategory: {
                connect: {
                    id: internshipCategoryId
                }
            },
            organization: {
                connect: {
                    id: organizationId
                }
            }
        }
    })
}

export const getInternships = async () => {
    return await prisma.internship.findMany({
        include: {
            organization: true,
            internshipCategory: true,
            applications: true
        }
    })
}

export const getInternship = async (id: number) => {
    return await prisma.internship.findUnique({
        where: {
            id
        },
        include: {
            organization: true,
            internshipCategory: true,
            applications: true
        }
    })
}

export const updateInternship = async (id: number, image: string, name: string, desc: string, internshipStartDate: Date, noVacancies: number, internshipCategoryId: number, organizationId: number) => {
    return await prisma.internship.update({
        where: {
            id
        },
        data: {
            image,
            name,
            desc,
            internshipStartDate,
            noVacancies,
            internshipCategory: {
                connect: {
                    id: internshipCategoryId
                }
            },
            organization: {
                connect: {
                    id: organizationId
                }
            }
        }
    })
}

export const deleteInternship = async (id: number) => {
    return await prisma.internship.delete({
        where: {
            id
        }
    })
}