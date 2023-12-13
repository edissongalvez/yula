import axios from 'axios'
import { Internship } from './internship'

export interface InternshipCategory {
    id: number,
    name: string,
    desc: string,
    createdAt: Date,
    modifiedAt: Date,
    internships: Internship[]
}

export default class InternshipCategoryController {
    static async getInternshipCategories(): Promise<InternshipCategory[]> {
        const response = await axios.get<InternshipCategory[]>(`${process.env.EXPO_PUBLIC_API_URL}/internshipCategory`)
        return response.data
    }

    static async getResume(id: number): Promise<InternshipCategory> {
        const response = await axios.get<InternshipCategory>(`${process.env.EXPO_PUBLIC_API_URL}/internshipCategory/${id}`)
        return response.data
    }
}