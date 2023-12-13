import express, { Request, Response } from 'express'

import * as applicationStatusService from '../services/applicationStatus'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    try {
        const applicationsStatuses = await applicationStatusService.getApplicationStatuses()
        applicationsStatuses ? res.status(200).json(applicationsStatuses) : res.status(400).json({ error: 'Sin estados de solicitud' })
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener estados de solicitudes' })
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const applicationStatus = await applicationStatusService.getApplicationStatus(Number(req.params.id))
        applicationStatus ? res.status(200).json(applicationStatus) : res.status(400).json({ error: 'Sin estado de solicitud' })
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener estado de solicitud' })
    }
})

export default router