import axios from 'axios'
import { Internship } from './internship'
import { Intern, Mentor } from './user'
import { ApplicationStatus } from './applicationStatus'
import { Progress } from './progress'

export interface Application {
    id: number,
    dateApplication: Date,
    internshipId: number,
    internId: number,
    mentorId: number,
    statusId: number,
    createdAt: Date,
    modifiedAt: Date,
    internship: Internship,
    intern: Intern,
    mentor: Mentor,
    status: ApplicationStatus,
    progresses: Progress[]
}

export default class ApplicationController {
    static async createApplication(internshipId: number, internId: number ): Promise<Application> {
        const response = await axios.post<Application>(`${process.env.EXPO_PUBLIC_API_URL}/application`, {internshipId, internId})
        return response.data
    }

    static async getApplications(): Promise<Application[]> {
        const response = await axios.get<Application[]>(`${process.env.EXPO_PUBLIC_API_URL}/application`)
        return response.data
    }

    static async getApplication(id: number): Promise<Application> {
        const response = await axios.get<Application>(`${process.env.EXPO_PUBLIC_API_URL}/application/${id}`)
        return response.data
    }

    static async updateApplication(id: number, internshipId: number, internId: number, mentorId: number, statusId: number): Promise<Application> {
        const response = await axios.put<Application>(`${process.env.EXPO_PUBLIC_API_URL}/application/${id}`, { internshipId, internId, mentorId, statusId })
        return response.data
    }

    static async deleteApplication(id: number): Promise<void> {
        await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/application/${id}`)
    }
}