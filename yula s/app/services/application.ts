import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createApplication = async (internshipId: number, internId: number) => {
    return await prisma.application.create({
        data: {
            internship: {
                connect: {
                    id: internshipId
                }
            },
            intern: {
                connect: {
                    userId: internId
                }
            }
        }
    })
}

export const getApplications = async () => {
    return await prisma.application.findMany({
        include: {
            internship: true,
            intern: true,
            progresses: true,
            mentor: true,
            status: true
        }
    })
}

export const getApplication = async (id: number) => {
    return await prisma.application.findUnique({
        where: {
            id
        },
        include: {
            internship: true,
            intern: true,
            progresses: true,
            mentor: true,
            status: true
        }
    })
}

export const updateApplication = async (id: number, internshipId: number, internId: number, mentorId: number, statusId: number ) => {
    return await prisma.application.update({
        where: {
            id
        },
        data: {
            internship: {
                connect: {
                    id: internshipId
                }
            },
            intern: {
                connect: {
                    userId: internId
                }
            },
            mentor: {
                connect: {
                    userId: mentorId
                }
            },
            status: {
                connect: {
                    id: statusId
                }
            }
        }
    })
}

export const deleteApplication = async (id: number) => {
    return await prisma.application.delete({
        where: {
            id
        }
    })
}