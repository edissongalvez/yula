import axios from 'axios'
import { InternshipCategory } from './internshipCategory'
import { Organization } from './organization'
import { Application } from './application'

export interface Internship {
    id: number,
    image: string,
    name: string,
    desc: string,
    datePublished: Date,
    internshipStartDate: Date,
    noVacancies: number,
    internshipCategoryId: number,
    organizationId: number,
    createdAt: Date,
    modifiedAt: Date,
    intershipCategory: InternshipCategory,
    organization: Organization,
    applications: Application[]
}

export default class InternshipController {
    static async createInternship(formData: FormData): Promise<Internship> {
        const response = await axios.post<Internship>(`${process.env.EXPO_PUBLIC_API_URL}/internship`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        return response.data
    }

    static async getInternships(): Promise<Internship[]> {
        const response = await axios.get<Internship[]>(`${process.env.EXPO_PUBLIC_API_URL}/internship`)
        return response.data
    }

    static async getInternship(id: number): Promise<Internship> {
        const response = await axios.get<Internship>(`${process.env.EXPO_PUBLIC_API_URL}/internship/${id}`)
        return response.data
    }

    static async updateInternship(id: number, formData: FormData): Promise<Internship> {
        const response = await axios.put<Internship>(`${process.env.EXPO_PUBLIC_API_URL}/internship/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        return response.data
    }

    static async deleteIntership(id: number): Promise<void> {
        await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/internship/${id}`)
    }
}