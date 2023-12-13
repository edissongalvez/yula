import express, { Request, Response } from 'express'

import * as universityService from '../services/university'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    try {
        const universities = await universityService.getUniversities()
        universities ? res.status(200).json(universities) : res.status(400).json({ error: 'Sin universidades' })
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener universidades' })
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const university = await universityService.getUniversity(Number(req.params.id))
        university ? res.status(200).json(university) : res.status(400).json({ error: 'Sin universidad' })
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener universidad' })
    }
})

export default router