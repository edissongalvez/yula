import axios from 'axios'
import { Intern } from './user'

export interface Resume {
    id: number,
    education: string,
    experience: string,
    otherInfo: string,
    internId: number,
    createdAt: Date,
    modifiedAt: Date,
    intern: Intern
}

export default class ResumeController {
    static async createResume(education: string, experience: string, otherInfo: string, internId: number): Promise<Resume> {
        const response = await axios.post<Resume>(`${process.env.EXPO_PUBLIC_API_URL}/resume`, { education, experience, otherInfo, internId })
        return response.data
    }

    static async getResumes(): Promise<Resume[]> {
        const response = await axios.get<Resume[]>(`${process.env.EXPO_PUBLIC_API_URL}/resume`)
        return response.data
    }

    static async getResume(id: number): Promise<Resume> {
        const response = await axios.get<Resume>(`${process.env.EXPO_PUBLIC_API_URL}/resume/${id}`)
        return response.data
    }

    static async updateResume(id: number, education: string, experience: string, otherInfo: string, internId: number): Promise<Resume> {
        const response = await axios.put<Resume>(`${process.env.EXPO_PUBLIC_API_URL}/resume/${id}`, { education, experience, otherInfo, internId })
        return response.data
    }

    static async deleteResume(id: number): Promise<void> {
        await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/resume/${id}`)
    }
}