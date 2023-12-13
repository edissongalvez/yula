import axios from 'axios'
import { Location } from './location'
import { Mentor } from './user'
import { Internship } from './internship'

export interface Organization {
    id: number,
    name: string,
    desc: string,
    address: string,
    locationId: number,
    createdAt: Date,
    modifiedAt: Date,
    location: Location,
    mentors: Mentor[],
    internships: Internship[]
}

export default class OrganizationController {
    static async getOrganizations(): Promise<Organization[]> {
        const response = await axios.get<Organization[]>(`${process.env.EXPO_PUBLIC_API_URL}/organization`)
        return response.data
    }

    static async getOrganization(id: number): Promise<Organization> {
        const response = await axios.get<Organization>(`${process.env.EXPO_PUBLIC_API_URL}/organization/${id}`)
        return response.data
    }
}