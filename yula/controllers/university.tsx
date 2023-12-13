import axios from 'axios'
import { Career } from './career'

export interface University {
    id: number,
    name: string,
    desc: string,
    createdAt: Date,
    modifiedAt: Date,
    career: Career[]
}

export default class UniversityController {
    static async getUniversities(): Promise<University[]> {
        const response = await axios.get<University[]>(`${process.env.EXPO_PUBLIC_API_URL}/university`)
        return response.data
    }

    static async getUniversity(id: number): Promise<University> {
        const response = await axios.get<University>(`${process.env.EXPO_PUBLIC_API_URL}/university/${id}`)
        return response.data
    }
}