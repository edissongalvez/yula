import { useEffect, useState } from 'react'
import { Pressable, useColorScheme } from 'react-native'
import ApplicationController, { Application } from '../../controllers/application'
import { useUser } from '../../context/UserContext'
import * as DocumentPicker from 'expo-document-picker'
import { Body, GroupedList, Notify, Picker, PickerItem, Text, TextField, View } from '../../components/Themed'
import ProgressController from '../../controllers/progress'
import { Stack, router } from 'expo-router'

export default function CreateProgressScreen() {
    const { user } = useUser()

    const colorScheme = useColorScheme()

    const [applications, setApplications] = useState<Application[]>()

    const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset>()

    const [data, setData] = useState({
        title: '',
        desc: '',
        file: '',
        applicationId: 1
    })

    useEffect(() => {
        ApplicationController.getApplications().then(applications => setApplications(applications.filter(application => application.internId === user?.id)))
    })

    const handleChange = (field: keyof typeof data, isNumber?: boolean) => (value: any) => {
        setData(prevData => ({ ...prevData, [field]: isNumber ? Number(value) : value }))
    }

    const pickFile = async () => {
        try {
            let response = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf'
            })

            if (!response.canceled) {
                setFile(response.assets[0])
            }
        } catch (error) {
            Notify({ title: 'Error al subir el documento', desc: 'Intente nuevamente' })
        }
    }

    const handleSubmit = async () => {
        try {
            if (user?.intern) {
                const formData = new FormData()
                
                formData.append('title', data.title)
                formData.append('desc', data.desc)

                const fileName = file?.name || 'default.pdf'
                if (file?.uri && fileName) {
                    const response = await fetch(file.uri)
                    const blob = await response.blob()
                    formData.append('file', blob, fileName)
                }

                formData.append('applicationId', data.applicationId.toString())

                ProgressController.createProgress(formData)
                Notify({ title: 'Progreso guardado', desc: 'Progresos actualizados' })
                router.replace('/')
            } else {
                Notify({ title: 'Sin permisos', desc: 'No puede crear un progresso' })
            }
        } catch (error) {
            Notify({ title: 'Progreso no guardado', desc: 'Revise los datos e intente de nuevo' })
        }
    }

    return (
        <>
            <Stack.Screen options={{ title: 'Crear progreso', headerTitleAlign: 'center', presentation: 'formSheet', headerRight: () => (
                <Pressable onPress={handleSubmit}>
                    {({ pressed }) => (
                        // <Ionicons name='person-add-outline' size={25} color={Colors[colorScheme ?? 'light'].tint} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />
                        <Text lightColor='#007AFF' darkColor='#0A84FF' style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} >Guardar</Text>
                    )} 
                </Pressable>
            )  }} />
            <Body>
                <Pressable onPress={pickFile}>
                    <View lightColor='rgba(0,122,255,.15)' darkColor='rgba(10,132,255,.15)' style={{ borderRadius: 10, height: 132 }}>
                        <Text lightColor='#007AFF' darkColor='#0A84FF'>{ file ? 'Cambiar documento' : 'Seleccionar documento'}</Text>
                    </View>
                </Pressable>
            <GroupedList>
                <TextField title='Título' placeholder='Ingrese título o asunto' value={data.title} onChangeText={handleChange('title')} />
                <TextField title='Descripción' placeholder='Ingrese descripción' value={data.desc} onChangeText={handleChange('desc')} />
                <Picker title='Pasantía' selectedValue={data.applicationId} onValueChange={(selectedValue: unknown) => handleChange('applicationId', true)(selectedValue as string)}>
                    {applications?.map(application => (
                        application.statusId === 3 ?? <PickerItem key={application.id} label={application.intership.name} value={application.id} />
                    ))}
                </Picker>
            </GroupedList>
            </Body>
        </>
        
    )
}