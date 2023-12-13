import axios from 'axios'
import { Application } from './application'
import { Career } from './career'
import { Resume } from './resume'
import { Organization } from './organization'

export interface User {
    id: number,
    username: string,
    password: string,
    photo: string,
    bio: string
    firstName: string,
    lastName: string,
    telephone: string,
    email: string,
    lastLogin: Date,
    createdAt: Date,
    modifiedAt: Date,
    intern: Intern,
    mentor: Mentor
}

export interface Intern {
    userId: number,
    careerId: number,
    createdAt: Date,
    modifiedAt: Date,
    career: Career,
    user: User,
    resume: Resume,
    applications: Application[]
}

export interface Mentor {
    userId: number,
    organizationId: number,
    createdAt: Date,
    modifiedAt: Date,
    organization: Organization,
    user: User,
    applications: Application[]
}

export default class UserController {
    static async login(username: string, password: string): Promise<User> {
        const response = await axios.post<User>(`${process.env.EXPO_PUBLIC_API_URL}/user/login`, { username, password })
        return response.data
    }

    static async createInternUser(formData: FormData): Promise<User> {
        const response = await axios.post<User>(`${process.env.EXPO_PUBLIC_API_URL}/user/intern`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        return response.data
    }

    static async createMentorUser(formData: FormData): Promise<User> {
        const response = await axios.post<User>(`${process.env.EXPO_PUBLIC_API_URL}/user/mentor`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        return response.data
    }

    static async getUsers(): Promise<User[]> {
        const response = await axios.get<User[]>(`${process.env.EXPO_PUBLIC_API_URL}/user`)
        return response.data
    }

    static async getUser(id: number): Promise<User> {
        const response = await axios.get<User>(`${process.env.EXPO_PUBLIC_API_URL}/user/${id}`)
        return response.data
    }

    static async updateInternUser(id: number, formData: FormData): Promise<User> {
        const response = await axios.put<User>(`${process.env.EXPO_PUBLIC_API_URL}/user/intern/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        return response.data
    }

    static async updateMentorUser(id: number, formData: FormData): Promise<User> {
        const response = await axios.put<User>(`${process.env.EXPO_PUBLIC_API_URL}/user/mentor/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        return response.data
    }

    static async deleteUser(id: number): Promise<void> {
        await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/user/${id}`)
    }
}