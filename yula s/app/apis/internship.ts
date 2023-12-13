import express, { Request, Response } from 'express'
import multer from 'multer'
import fs from 'fs'

import * as internshipService from '../services/internship'

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'files/internships/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} - ${file.originalname}`)
    }
})

const upload = multer({ storage })

router.post('/', upload.single('image'), async (req: Request, res: Response) => {
    try {
        if (req.file) {
            const { name, desc, internshipStartDate, noVacancies, internshipCategoryId, organizationId } = req.body
            const imagePath = req.file.path
            const internship = await internshipService.createInternship(imagePath, name, desc, internshipStartDate, Number(noVacancies), Number(internshipCategoryId), Number(organizationId))
            internship ? res.status(201).json(internship) : res.status(400).json({ error: 'Datos inválidos' })
        } else {
            res.status(400).json({ error: 'Sin archivo' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro al guardar pasantía' })
    }
})

router.get('/', async (req: Request, res: Response) => {
    try {
        const internships = await internshipService.getInternships()
        internships ? res.status(200).json(internships) : res.status(204).json({ error: 'Sin pasantías' })
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener pasantías' })
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const internship = await internshipService.getInternship(Number(req.params.id))
        internship ? res.status(200).json(internship) : res.status(204).json({ error: 'Sin pasantía'})
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener pasantía' })
    }
})

router.put('/:id', upload.single('image'), async (req: Request, res: Response) => {
    try {
        const { name, desc, internshipStartDate, noVacancies, internshipCategoryId, organizationId } = req.body
        const prevInternship = await internshipService.getInternship(Number(req.params.id))
        let imagePath = prevInternship?.image ?? ''

        if (req.file) {
            if (imagePath && fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath)
            }
            imagePath = req.file.path
        }

        const internship = await internshipService.updateInternship(Number(req.params.id), imagePath, name, desc, internshipStartDate, Number(noVacancies), Number(internshipCategoryId), Number(organizationId))
        internship ? res.status(200).json(internship) : res.status(400).json({ error: 'Datos inválidos' })
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar pasantía' })
    }
})

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        await internshipService.deleteInternship(Number(req.params.id))
        res.status(204).end()
    } catch (error) {
        res.status(500).json({ error: 'Erro al eliminar pasantía' })
    }
})

export default router