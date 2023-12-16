import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(8)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

async function main() {

    const newUsers = await prisma.user.createMany({
        data: [
            { username: 'annelyon', password: await hashPassword('contraseña'), firstName: 'Anne', lastName: 'Lyon', telephone: '444222111', email: 'annelyon@yula.com'},
            { username: 'johnsmith', password: await hashPassword('contraseña'), firstName: 'John', lastName: 'Smith', telephone: '555111222', email: 'johnsmith@yula.com'},
            { username: 'maryjane', password: await hashPassword('contraseña'), firstName: 'Mary', lastName: 'Jane', telephone: '666333444', email: 'maryjane@yula.com'},
            { username: 'robertbrown', password: await hashPassword('contraseña'), firstName: 'Robert', lastName: 'Brown', telephone: '777444555', email: 'robertbrown@yula.com'},
            { username: 'lisajones', password: await hashPassword('contraseña'), firstName: 'Lisa', lastName: 'Jones', telephone: '888555666', email: 'lisajones@yula.com' },
            { username: 'davidmiller', password: await hashPassword('contraseña'), firstName: 'David', lastName: 'Miller', telephone: '999666777', email: 'davidmiller@yula.com' },
            { username: 'emilywhite', password: await hashPassword('contraseña'), firstName: 'Emily', lastName: 'White', telephone: '111777888', email: 'emilywhite@yula.com' },
            { username: 'michaelscott', password: await hashPassword('contraseña'), firstName: 'Michael', lastName: 'Scott', telephone: '222888999', email: 'michaelscott@yula.com' },
            
            { username: 'sarahbrown', password: await hashPassword('contraseña'), firstName: 'Sarah', lastName: 'Brown', telephone: '333999000', email: 'sarahbrown@yula.com' },
            { username: 'ryanwilson', password: await hashPassword('contraseña'), firstName: 'Ryan', lastName: 'Wilson', telephone: '444000111', email: 'ryanwilson@yula.com' },
            { username: 'jessicasmith', password: await hashPassword('contraseña'), firstName: 'Jessica', lastName: 'Smith', telephone: '555111222', email: 'jessicasmith@yula.com' },
            { username: 'alexandermartin', password: await hashPassword('contraseña'), firstName: 'Alexander', lastName: 'Martin', telephone: '666222333', email: 'alexandermartin@yula.com' },
            { username: 'oliviajones', password: await hashPassword('contraseña'), firstName: 'Olivia', lastName: 'Jones', telephone: '777333444', email: 'oliviajones@yula.com' },
            { username: 'williamdavis', password: await hashPassword('contraseña'), firstName: 'William', lastName: 'Davis', telephone: '888444555', email: 'williamdavis@yula.com' },
            { username: 'nataliebaker', password: await hashPassword('contraseña'), firstName: 'Natalie', lastName: 'Baker', telephone: '999555666', email: 'nataliebaker@yula.com' },
            { username: 'edissongalvez', password: await hashPassword('contraseña'), firstName: 'Edisson', lastName: 'Galvez', telephone: '111666777', email: 'edissongalvez@yula.com' }
        ]
    })

    const newUniversities = await prisma.university.createMany({
        data: [
            { name: 'Universidad Nacional de Trujillo', desc: '¡Somos la mejor universidad del norte del país!' },
            { name: 'Universidad Nacional de San Marcos', desc: '¡Somos la mejor universidad país!' }
        ]
    })

    const newCareers = await prisma.career.createMany({
        data: [
            { name: 'Ingeniería de sistemas', desc: 'Diseño y gestión eficiente de sistemas complejos para solucionar problemas interdisciplinarios', universityId: 1 },
            { name: 'Ingeniería informática', desc: 'Desarrollo y aplicación de software para resolver desafíos informáticos y mejorar sistemas', universityId: 1 },
            { name: 'Ingeniería de hardware', desc: 'Diseño y construcción de componentes físicos de sistemas electrónicos y computadoras', universityId: 2 },
            { name: 'Ingeniería de software', desc: 'Desarrollo y mantenimiento de programas y sistemas para satisfacer necesidades tecnológicas específicas', universityId: 2 }
        ]
    })

    const newInterns = await prisma.intern.createMany({
        data: [
            { userId: 1, careerId: 1 },
            { userId: 2, careerId: 1 },
            { userId: 3, careerId: 2 },
            { userId: 4, careerId: 2 },
            { userId: 5, careerId: 3 },
            { userId: 6, careerId: 3 },
            { userId: 7, careerId: 4 },
            { userId: 8, careerId: 4 }
        ]
    })

    const newLocations = await prisma.location.createMany({
        data: [
            { name: 'Trujillo' },
            { name: 'La Esperanza' }
        ]
    })

    const newOrganizations = await prisma.organization.createMany({
        data: [
            { name: 'Coleguitas [TEAM]', desc: 'Software empresarial para eficiencia operativa', address: '123 Main Street', locationId: 1 },
            { name: 'Maxtdes', desc: 'Investigación cuántica para tecnologías avanzadas', address: '456 Oak Avenue', locationId: 1 },
            { name: 'The Rorros Corporation', desc: 'Líder en ciberseguridad empresarial', address: '789 Pine Street', locationId: 2 },
            { name: 'LPDA Translations', desc: 'Innovación con nanotecnología para diversas aplicaciones tecnológicas', address: '101 Cedar Lane', locationId: 2 }
        ]
    })

    const newMentors = await prisma.mentor.createMany({
        data: [
            { userId: 9, organizationId: 1 },
            { userId: 10, organizationId: 1 },
            { userId: 11, organizationId: 2 },
            { userId: 12, organizationId: 2 },
            { userId: 13, organizationId: 3 },
            { userId: 14, organizationId: 3 },
            { userId: 15, organizationId: 4 },
            { userId: 16, organizationId: 4 }
        ]
    })

    const newInternshipCategories = await prisma.internshipCategory.createMany({
        data: [
            { name: 'React Native', desc: 'Desarrollo móvil con React Native y TypeScript' },
            { name: 'Swift', desc: 'Desarrollo de software con Swift y Objective-C' },
            { name: 'Node', desc: 'Desarrollo backend con Node y Prisma' },
        ]
    })

    const newInterships = await prisma.internship.createMany({
        data: [
            { name: 'Sistemas Innovadores', desc: 'Pasantía en ingeniería de sistemas. Desarrolla soluciones innovadoras y optimiza procesos tecnológicos.', internshipStartDate: '2023-11-04T23:59:59.999Z', noVacancies: 1, internshipCategoryId: 1, organizationId: 1 },
            { name: 'Ciberseguridad Avanzada', desc: 'Únete a nuestro equipo. Pasantía en ingeniería de sistemas con enfoque en ciberseguridad avanzada.', internshipStartDate: '2023-12-11T23:59:59.999Z', noVacancies: 2, internshipCategoryId: 1, organizationId: 2 },
            { name: 'Desarrollo Ágil', desc: 'Pasantía para ingenieros de sistemas. Aprende y aplica metodologías ágiles en el desarrollo de software.', internshipStartDate: '2023-12-18T23:59:59.999Z', noVacancies: 4, internshipCategoryId: 2, organizationId: 2 },
            { name: 'Automatización Eficiente', desc: 'Descubre la automatización en sistemas. Pasantía para ingenieros interesados en eficiencia y procesos automatizados.', internshipStartDate: '2024-01-25T23:59:59.999Z', noVacancies: 8, internshipCategoryId: 2, organizationId: 3 },
            { name: 'Redes Inteligentes', desc: 'Pasantía en ingeniería de sistemas. Sumérgete en el diseño y optimización de redes inteligentes.', internshipStartDate: '2024-01-01T23:59:59.999Z', noVacancies: 7, internshipCategoryId: 3, organizationId: 3 },
            { name: 'Integración Tecnológica', desc: 'Explora la integración de sistemas. Pasantía centrada en la implementación y gestión de tecnologías integradas.', internshipStartDate: '2024-02-08T23:59:59.999Z', noVacancies: 5, internshipCategoryId: 3, organizationId: 3 }
        ]
    })

    const newResumes = await prisma.resume.createMany({
        data: [
            { education: 'Detalles acerca de educación académica', experience: 'Detalles acerca de experiencia laboral', otherInfo: 'Otros detalles', internId: 1},
            { education: 'Detalles acerca de educación académica', experience: 'Detalles acerca de experiencia laboral', otherInfo: 'Otros detalles', internId: 2},
            { education: 'Detalles acerca de educación académica', experience: 'Detalles acerca de experiencia laboral', otherInfo: 'Otros detalles', internId: 3},
            { education: 'Detalles acerca de educación académica', experience: 'Detalles acerca de experiencia laboral', otherInfo: 'Otros detalles', internId: 4},
            { education: 'Detalles acerca de educación académica', experience: 'Detalles acerca de experiencia laboral', otherInfo: 'Otros detalles', internId: 5},
            { education: 'Detalles acerca de educación académica', experience: 'Detalles acerca de experiencia laboral', otherInfo: 'Otros detalles', internId: 6},
            { education: 'Detalles acerca de educación académica', experience: 'Detalles acerca de experiencia laboral', otherInfo: 'Otros detalles', internId: 7},
            { education: 'Detalles acerca de educación académica', experience: 'Detalles acerca de experiencia laboral', otherInfo: 'Otros detalles', internId: 8},
            
        ]
    })

    const newApplicationStatuses = await prisma.applicationStatus.createMany({
        data: [
            { name: 'Pendiente', desc: 'La solicitud está en espera' },
            { name: 'Anulado', desc: 'La solicitud no tuvo respuesta' },
            { name: 'Negado', desc: 'La solicitud ha sido negada' },
            { name: 'Aceptado', desc: 'La solicitud ha sido aceptada' }
        ]
    })

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })