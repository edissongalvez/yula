import express, { Request, Response } from 'express'
import * as path from 'path'
import cors from 'cors'

import application from './app/apis/application'
import applicationStatus from './app/apis/applicationStatus'
import career from './app/apis/career'
import internship from './app/apis/internship'
import internshipCategory from './app/apis/internshipCategory'
import location from './app/apis/location'
import organization from './app/apis/organization'
import progress from './app/apis/progress'
import resume from './app/apis/resume'
import university from './app/apis/university'
import user from './app/apis/user'

const app = express()

const appConfig = {
    bodyParserLimit: '8mb',
    corsOptions: {
        //Agregar configuraciones de CORS si es necesario
    }
}

app.use(express.json({ limit: appConfig.bodyParserLimit }))
app.use(express.urlencoded({ limit: appConfig.bodyParserLimit, extended: true }))
app.use(cors(appConfig.corsOptions))

app.get('/', (req: Request, res: Response) => {
    res.send('Yula S')
})

app.use('/application', application)
app.use('/applicationStatus', applicationStatus)
app.use('/career', career)
app.use('/internship', internship)
app.use('/internshipCategory', internshipCategory)
app.use('/location', location)
app.use('/organization', organization)
app.use('/progress', progress)
app.use('/resume', resume)
app.use('/university', university)
app.use('/user', user)

const filesPath = path.resolve(__dirname, 'files')
app.use('/files', express.static(path.join(filesPath)))

const PORT = 8082
app.listen(PORT, () => {
    console.log(`🚀 Yula S en puerto ${PORT}`)
})