import axios from 'axios'
import { Application } from './application'

export interface Progress {
    id: number,
    title: string,
    desc: string,
    file: string,
    applicationId: number,
    createdt: Date,
    modifiedAt: Date,
    application: Application
}

export default class ProgressController {
    static async createProgress(formData: FormData): Promise<Progress> {
        const response = await axios.post<Progress>(`${process.env.EXPO_PUBLIC_API_URL}/progress`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        return response.data
    }

    static async getProgresses(): Promise<Progress[]> {
        const response = await axios.get<Progress[]>(`${process.env.EXPO_PUBLIC_API_URL}/progress`)
        return response.data
    }

    static async getProgress(id: number): Promise<Progress> {
        const response = await axios.get<Progress>(`${process.env.EXPO_PUBLIC_API_URL}/progress/${id}`)
        return response.data
    }

    static async updateProgress(id: number, formData: FormData): Promise<Progress> {
        const response = await axios.put<Progress>(`${process.env.EXPO_PUBLIC_API_URL}/progress/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        return response.data
    }

    static async deleteIntership(id: number): Promise<void> {
        await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/progress/${id}`)
    }
}