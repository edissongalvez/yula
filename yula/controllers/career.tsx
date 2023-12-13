import axios from 'axios'
import { University } from './university'
import { Intern } from './user'

export interface Career {
    id: number,
    name: string,
    desc: string,
    universityId: number,
    createdAt: Date,
    modifiedAt: Date,
    university: University,
    interns: Intern[]
}

export default class CareerController {
    static async getCareers(): Promise<Career[]> {
        const response = await axios.get<Career[]>(`${process.env.EXPO_PUBLIC_API_URL}/career`)
        return response.data
    }

    static async getCareer(id: number): Promise<Career> {
        const response = await axios.get<Career>(`${process.env.EXPO_PUBLIC_API_URL}/career/${id}`)
        return response.data
    }
}