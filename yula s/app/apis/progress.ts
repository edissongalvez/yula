import express, { Request, Response } from 'express'
import multer from 'multer'
import fs from 'fs'

import * as progressService from '../services/progress'

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'files/progresses/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} - ${file.originalname}`)
    }
})

const upload = multer({ storage })

router.post('/', upload.single('file'), async (req: Request, res: Response) => {
    try {
        if (req.file) {
            const { title, desc, applicationId } = req.body
            const filePath = req.file.path
            const progress = await progressService.createProgress(title, desc, filePath, applicationId)
            progress ? res.status(201).json(progress) : res.status(400).json({ error: 'Datos inválidos' })
        } else {
            res.status(400).json({ error: 'Sin archivo' })
        } 
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar progreso' })
    }
})

router.get('/', async (req: Request, res: Response) => {
    try {
        const progresses = await progressService.getProgresses()
        progresses ? res.status(200).json(progresses) : res.status(204).json({ error: 'Sin progresos' })
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener progresos' })
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const progress = await progressService.getProgress(Number(req.params.id))
        progress ? res.status(200).json(progress) : res.status(204).json({ error: 'Sin progreso'})
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener progreso' })
    }
})

router.put('/:id', upload.single('file'), async (req: Request, res: Response) => {
    try {
        const {title, desc, file, applicationId} = req.body
        const prevProgress = await progressService.getProgress(Number(req.params.id))
        let filePath = prevProgress?.file ?? ''

        if (req.file) {
            if (filePath && fs.existsSync(filePath)) {
                fs.unlinkSync(filePath)
            }
            filePath = req.file.path
        }

        const progress = await progressService.updateProgress(Number(req.params.id), title, file, filePath, Number(applicationId))
        progress ? res.status(200).json(progress) : res.status(400).json({ error: 'Datos inválidos' })
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar progreso' })
    }
})

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        await progressService.deleteProgress(Number(req.params.id))
        res.status(204).end()
    } catch (error) {
        res.status(500).json({ error: 'Erro al eliminar progreso' })
    }
})

export default router