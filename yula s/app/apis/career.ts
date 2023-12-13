import express, { Request, Response } from 'express'

import * as careerService from '../services/career'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    try {
        const careers = await careerService.getCareers()
        careers ? res.status(200).json(careers) : res.status(400).json({ error: 'Sin carreras' })
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener carreras' })
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const career = await careerService.getCareer(Number(req.params.id))
        career ? res.status(200).json(career) : res.status(400).json({ error: 'Sin carrera' })
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener carrera' })
    }
})

export default router