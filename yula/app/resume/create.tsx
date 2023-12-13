import { useState } from 'react'
import { Body, Notify, Text, TextField } from '../../components/Themed'
import ResumeController from '../../controllers/resume'
import { useUser } from '../../context/UserContext'
import { Stack, router } from 'expo-router'
import { Pressable } from 'react-native'

export default function CreateResumeScreen() {
    const { user } = useUser()

    const [data, setData] = useState({
        education: '',
        experience: '',
        otherInfo: '',
        internId: 1
    })

    const handleChange = (field: keyof typeof data, isNumber?: boolean) => (value: any) => {
        setData(prevData => ({ ...prevData, [field]: isNumber ? Number(value) : value }))
    }

    const handleSubmit = async () => {
        try {
            if (user?.intern) {
                ResumeController.createResume(data.education, data.experience, data.otherInfo, user.id)
                Notify({ title: 'Hoja de vida guardado', desc: 'Puede postular a pasantías' })
                router.replace('/')
            } else {
                Notify({ title: 'Sin permisos', desc: 'No puede crear hoja de vida' })
            }
        } catch (error) {
            Notify({ title: 'Hoja de vida no guardado', desc: 'Revise los datos e intente nuevamente' })
        }
    }

    return (
        <>
            <Stack.Screen options={{ title: 'Crear hoja de vida', headerTitleAlign: 'center', presentation: 'formSheet', headerRight: () => (
                <Pressable onPress={handleSubmit}>
                    {({ pressed }) => (
                        // <Ionicons name='person-add-outline' size={25} color={Colors[colorScheme ?? 'light'].tint} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />
                        <Text lightColor='#007AFF' darkColor='#0A84FF' style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} >Guardar</Text>
                    )} 
                </Pressable>
            )  }} />
            <Body>
                <TextField title='Educación' placeholder='Ingrese detalles sobre su formación académica' value={data.education} onChangeText={handleChange('education')} />
                <TextField title='Experiencia' placeholder='Ingrese detalles sobre su experiencia laboral' value={data.experience} onChangeText={handleChange('experience')} />
                <TextField title='Otros' placeholder='Ingrese información adicional sobre usted' value={data.otherInfo} onChangeText={handleChange('otherInfo')} />
            </Body>
        </>
        
    )
}