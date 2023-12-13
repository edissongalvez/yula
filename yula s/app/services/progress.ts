import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createProgress = async (title: string, desc: string, file: string, applicationId: number) => {
    return await prisma.progress.create({
        data: {
            title,
            desc,
            file,
            application: {
                connect: {
                    id: applicationId
                }
            }
        }
    })
}

export const getProgresses = async () => {
    return await prisma.progress.findMany({
        include: {
            application: true
        }
    })
}

export const getProgress = async (id: number) => {
    return await prisma.progress.findUnique({
        where: {
            id
        },
        include: {
            application: true
        }
    })
}

export const updateProgress = async (id: number, title: string, desc: string, file: string, applicationId: number) => {
    return await prisma.progress.update({
        where: {
            id
        },
        data: {
            title,
            desc,
            file,
            application: {
                connect: {
                    id: applicationId
                }
            }
        }
    })
}

export const deleteProgress = async (id: number) => {
    return await prisma.progress.delete({
        where: {
            id
        }
    })
}