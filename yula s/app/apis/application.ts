import express, { Request, Response } from 'express'

import * as applicationService from '../services/application'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
    try {
        const { internshipId, internId } = req.body
        const application = await applicationService.createApplication(internshipId, internId)
        application ? res.status(201).json(application) : res.status(400).json({ error: 'Datos inválidos' })
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar solicitud' })
    }
})

router.get('/', async (req: Request, res: Response) => {
    try {
        const applications = await applicationService.getApplications()
        applications ? res.status(200).json(applications) : res.status(400).json({ error: 'Sin solicitudes' })
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener solicitudes' })
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const application = await applicationService.getApplication(Number(req.params.id))
        application ? res.status(200).json(application) : res.status(400).json({ error: 'Sin solicitud' })
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener solicitud' })
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { internshipId, internId, mentorId, statusId } = req.body
        const application = await applicationService.updateApplication(Number(req.params.id), Number(internshipId), Number(internId), Number(mentorId), Number(statusId))
        application ? res.status(200).json(application) : res.status(400).json({ error: 'Datos inválidos' })
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar solicitud' })
    }
})

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        await applicationService.deleteApplication(Number(req.params.id))
        res.status(204).end()
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar solicitud' })
    }
})

export default router