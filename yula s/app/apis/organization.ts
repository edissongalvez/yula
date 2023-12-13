import express, { Request, Response } from 'express'

import * as organizationService from '../services/organization'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    try {
        const organizations = await organizationService.getOrganizations()
        organizations ? res.status(200).json(organizations) : res.status(400).json({ error: 'Sin organizaciones' })
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener organizaciones' })
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const organization = await organizationService.getOrganization(Number(req.params.id))
        organization ? res.status(200).json(organization) : res.status(400).json({ error: 'Sin organización' })
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener organización' })
    }
})

export default router