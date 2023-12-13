import express, { Request, Response } from 'express'

import * as resumeService from '../services/resume'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
    try {
        const { education, experience, otherInfo, internId } = req.body
        const resume = await  resumeService.createResume(education, experience, otherInfo, Number(internId))
        resume ? res.status(201).json(resume) : res.status(400).json({ error: 'Datos inválidos' }) 
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar hoja de vida' })
    }
})

router.get('/', async (req: Request, res: Response) => {
    try {
        const resumes = await resumeService.getResumes()
        resumes ? res.status(200).json(resumes) : res.status(400).json({ error: 'Sin hojas de vida' })
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener hojas de vida' })
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const resume = await resumeService.getResume(Number(req.params.id))
        resume ? res.status(200).json(resume) : res.status(400).json({ error: 'Sin hoja de vida' })
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener hoja de vida' })
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    try { 
        const { education, experience, otherInfo, internId } = req.body
        const resume = await resumeService.updateResume(Number(req.params.id), education, experience, otherInfo, Number(internId))
        resume ? res.status(200).json(resume) : res.status(400).json({ error: 'Datos inválidos' })
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar hoja de vida' })
    }
})

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        await resumeService.deleteResume(Number(req.params.id))
        res.status(204).end()
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar hoja de vida' })
    }
})

export default router