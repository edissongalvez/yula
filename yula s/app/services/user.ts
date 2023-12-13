import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const login = async (username: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { username }, include: { mentor: { include: { organization: { include: { location: true } } } }, intern: { include: {  resume: true,  career: { include: { university: true } } } } } })
    if (user && bcrypt.compareSync(password, user.password)) {
        return user
    }
}

export const createInternUser = async (username: string, password: string, photo: string, firstName: string, lastName: string, telephone: string, email: string, careerId: number) => {
    const hashedPassword = bcrypt.hashSync(password, 8)

    return await prisma.user.create({
        data: {
            username,
            password: hashedPassword,
            photo,
            firstName,
            lastName,
            telephone,
            email,
            intern: {
                create: {
                    careerId
                }
            }
        }
    })
}

export const createMentorUser = async (username: string, password: string, photo: string, firstName: string, lastName: string, telephone: string, email: string, organizationId: number) => {
    const hashedPassword = bcrypt.hashSync(password, 8)

    return await prisma.user.create({
        data: {
            username,
            password: hashedPassword,
            photo,
            firstName,
            lastName,
            telephone,
            email,
            mentor: {
                create: {
                    organizationId
                }
            }
        }

    })
}

export const getUsers = async () => {
    return await prisma.user.findMany({
        include: { mentor: { include: { organization: { include: { location: true } } } }, intern: { include: {  resume: true,  career: { include: { university: true } } } } }
    })
}

export const getUser = async (id: number) => {
    return await prisma.user.findUnique({
        where: {
            id
        },
        include: { mentor: { include: { organization: { include: { location: true } } } }, intern: { include: {  resume: true,  career: { include: { university: true } } } } }
    })
}

export const updateInternUser = async (id: number, username: string, password: string, photo: string, bio: string, firstName: string, lastName: string, telephone: string, email: string, careerId: number) => {
    const hashedPassword = bcrypt.hashSync(password, 8)

    return await prisma.user.update({
        where: {
            id
        },
        data: {
            username,
            password: hashedPassword,
            photo,
            bio,
            firstName,
            lastName,
            telephone,
            email,
            intern: {
                update: {
                    careerId
                }
            }
        }
    })
}

export const updateMentorUser = async (id: number, username: string, password: string, photo: string, bio: string, firstName: string, lastName: string, telephone: string, email: string, organizationId: number) => {
    const hashedPassword = bcrypt.hashSync(password, 8)

    return await prisma.user.update({
        where: {
            id
        },
        data: {
            username,
            password: hashedPassword,
            photo,
            bio,
            firstName,
            lastName,
            telephone,
            email,
            mentor: {
                update: {
                    organizationId
                }
            }
        }
    })
}

export const deleteUser = async (id: number) => {
    return await prisma.user.delete({
        where: {
            id
        }
    })
}