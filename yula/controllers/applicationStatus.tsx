import axios from 'axios'
import { Application } from './application'

export interface ApplicationStatus {
    id: number,
    desc: string,
    createdAt: Date,
    modifiedAt: Date,
    applications: Application[]
}

export default class ApplicationStatusController {
    static async getApplicationStatuses(): Promise<ApplicationStatus[]> {
        const response = await axios.get<ApplicationStatus[]>(`${process.env.EXPO_PUBLIC_API_URL}/applicationStatus`)
        return response.data
    }

    static async getResume(id: number): Promise<ApplicationStatus> {
        const response = await axios.get<ApplicationStatus>(`${process.env.EXPO_PUBLIC_API_URL}/applicationStatus/${id}`)
        return response.data
    }
}