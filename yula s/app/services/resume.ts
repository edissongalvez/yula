import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createResume = async (education: string, experience: string, otherInfo: string, internId: number) => {
    return await prisma.resume.create({
        data: {
            education,
            experience,
            otherInfo,
            intern: {
                connect: {
                    userId: internId
                }
            }
        }
    })
}

export const getResumes = async () => {
    return await prisma.resume.findMany({
        include: {
            intern: true
        }
    })
}

export const getResume = async (id: number) => {
    return await prisma.resume.findUnique({
        where: {
            id
        },
        include: {
            intern: true
        }
    })
}

export const updateResume = async (id: number, education: string, experience: string, otherInfo: string, internId: number) => {
    return await prisma.resume.update({
        where: {
            id
        },
        data: {
            education,
            experience,
            otherInfo,
            intern: {
                connect: {
                    userId: internId
                }
            }
        }
    })
}

export const deleteResume = async (id: number) => {
    return await prisma.resume.delete({
        where: {
            id
        }
    })
}