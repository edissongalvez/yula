import express, { Request, Response } from 'express'

import * as locationService from '../services/location'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    try {
        const locations = await locationService.getLocations()
        locations ? res.status(200).json(locations) : res.status(400).json({ error: 'Sin ubicaciones' })
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener ubicaciones' })
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const location= await locationService.getLocation(Number(req.params.id))
        location ? res.status(200).json(location) : res.status(400).json({ error: 'Sin ubicación' })
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener ubicación' })
    }
})

export default router