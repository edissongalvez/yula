import express, { Request, Response } from 'express'
import multer from 'multer'
import fs from 'fs'

import * as userService from '../services/user'

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'files/users/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} - ${file.originalname}`)
    }
})

const upload = multer({ storage })

router.post('/login', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body
        const user = await userService.login(username, password)
        user ? res.status(200).json(user) : res.status(401).json({ error: 'Credenciales incorrectos' })
    } catch (error) {
        res.status(500).json({ error: 'Error al acceder' })
    }
})

router.post('/intern', upload.single('photo'), async (req: Request, res: Response) => {
    try {
        if (req.file) {
            const { username, password, photo, firstName, lastName, telephone, email, careerId } = req.body
            const photoPath = req.file.path
            const user = await userService.createInternUser(username, password, photoPath, firstName, lastName, telephone, email, Number(careerId))
            user ? res.status(201).json(user) : res.status(400).json({ error: 'Datos inválidos' })
        } else {
            res.status(400).json({ error: 'Sin foto' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar usuario pasante' })
    }
})

router.post('/mentor', upload.single('photo'), async (req: Request, res: Response) => {
    try {
        if (req.file) {
            const { username, password, photo, firstName, lastName, telephone, email, organizationId } = req.body
            const photoPath = req.file.path
            const user = await userService.createMentorUser(username, password, photoPath, firstName, lastName, telephone, email, Number(organizationId))
            user ? res.status(201).json(user) : res.status(400).json({ error: 'Datos inválidos' })
        } else {
            res.status(400).json({ error: 'Sin foto' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar usuario mentor' })
    }
})



router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await userService.getUsers()
        users ? res.status(200).json(users) : res.status(204).json({ error: 'Sin usuarios' })
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' })
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const user = await userService.getUser(Number(req.params.id))
        user ? res.status(200).json(user) : res.status(204).json({ error: 'Sin usuario' })
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuario' })
    }
})

router.put('/intern/:id', upload.single('photo'), async (req: Request, res: Response) => {
    try {
        const { username, password, photo, bio, firstName, lastName, telephone, email, careerId } = req.body
        const prevUser = await userService.getUser(Number(req.params.id))
        let photoPath = prevUser?.photo ?? ''

        if (req.file) {
            if (photoPath && fs.existsSync(photoPath)) {
                fs.unlinkSync(photoPath)
            }
            photoPath = req.file.path
        }

        const user = await userService.updateInternUser(Number(req.params.id), username, password, photoPath, bio, firstName, lastName, telephone, email, Number(careerId))
        user ? res.status(200).json(user) : res.status(400).json({ error: 'Datos inválidos' })
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar usuario pasante' })
    }
    
})

router.put('/mentor/:id', upload.single('photo'), async (req: Request, res: Response) => {
    try {
        const { username, password, photo, bio, firstName, lastName, telephone, email, organizationId } = req.body
        const prevUser = await userService.getUser(Number(req.params.id))
        let photoPath = prevUser?.photo ?? ''

        if (req.file) {
            if (photoPath && fs.existsSync(photoPath)) {
                fs.unlinkSync(photoPath)
            }
            photoPath = req.file.path
        }

        const user = await userService.updateMentorUser(Number(req.params.id), username, password, photoPath, bio, firstName, lastName, telephone, email, Number(organizationId))
        user ? res.status(200).json(user) : res.status(400).json({ error: 'Datos inválidos' })
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar usuario mentor' })
    }
    
})

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        await userService.deleteUser(Number(req.params.id))
        res.status(204).end()
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar usuario' })
    }
})

export default router