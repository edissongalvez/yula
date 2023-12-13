import axios from 'axios'
import { Organization } from './organization'

export interface Location {
    id: number,
    name: string,
    createdAt: Date,
    modifiedAt: Date,
    organizations: Organization[]
}

export default class LocationController {
    static async getLocations(): Promise<Location[]> {
        const response = await axios.get<Location[]>(`${process.env.EXPO_PUBLIC_API_URL}/location`)
        return response.data
    }

    static async getLocation(id: number): Promise<Location> {
        const response = await axios.get<Location>(`${process.env.EXPO_PUBLIC_API_URL}/location/${id}`)
        return response.data
    }
}