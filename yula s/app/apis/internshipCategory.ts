import express, { Request, Response } from 'express'

import * as internshipCategoryService from '../services/internshipCategory'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    try {
        const internshipCategories = await internshipCategoryService.getInternshipCategories()
        internshipCategories ? res.status(200).json(internshipCategories) : res.status(400).json({ error: 'Sin categorías de pasantías' })
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener categrías de pasantías' })
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const internshipCategory = await internshipCategoryService.getInternshipCategory(Number(req.params.id))
        internshipCategory ? res.status(200).json(internshipCategory) : res.status(400).json({ error: 'Sin categoría de pasantía' })
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener categoría de pasantía' })
    }
})

export default router