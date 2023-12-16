import { useEffect, useState } from 'react'
import { useUser } from '../../context/UserContext'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import ApplicationController, { Application } from '../../controllers/application'
import { Image, Pressable, StyleSheet, View, useColorScheme } from 'react-native'
import { Body, GroupedList, GroupedRow, Notify, Separator, Text } from '../../components/Themed'
import { Ionicons } from '@expo/vector-icons'

export default function GetApplicationScreen() {
    const colorScheme = useColorScheme()
    const { user } = useUser()
    const { applicationId } = useLocalSearchParams<{ applicationId: string }>()
    const [application, setApplication] = useState<Application>()

    useEffect(() => {
        ApplicationController.getApplication(Number(applicationId)).then(application => setApplication(application))
    }, [application])

    const handleAccept = async () => {
        try {
            ApplicationController.updateApplication(Number(applicationId), Number(application?.internshipId), Number(application?.internId), Number(user?.id), 4)
            Notify({ title: 'Solicitud aceptada', desc: 'Se ha enviado confirmación' })
        } catch (error) {
            Notify({ title: 'Error al aplicar', desc: 'No tiene permisos' })
        }
    }

    const handleDeny = async () => {
        try {
            ApplicationController.updateApplication(Number(applicationId), Number(application?.internshipId), Number(application?.internId), Number(user?.id), 3)
            Notify({ title: 'Solicitud denegada', desc: 'Se ha enviado confirmación' })
        } catch (error) {
            Notify({ title: 'Error al aplicar', desc: 'No tiene permisos' })
        }
    }

    const handleSubmit = async () => {
        try {
            router.push('/internship/edit')
        } catch (error) {
            Notify({ title: 'Error al editar usuario', desc: 'Intente nuevamente' })
        }
    }

    return application ?
        <>
            <Stack.Screen options={{ title: 'Pasantía', headerTitleAlign: 'center', presentation: 'modal', headerRight: () => (
                <>
                    { user?.mentor && application.statusId === 1 ?
                        <View style={styles.groupedLink}>
                            <Pressable onPress={handleDeny}>
                                {({ pressed }) => (
                                    <Text lightColor='#007AFF' darkColor='#0A84FF' style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}>Denegar</Text>
                                )} 
                            </Pressable> 
                            <Pressable onPress={handleAccept}>
                                {({ pressed }) => (
                                    <Text lightColor='#007AFF' darkColor='#0A84FF' style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}>Aceptar</Text>
                                )} 
                            </Pressable> 
                        </View> 
                        
                    : null }
                    { user?.intern && application.statusId === 4 ? <Pressable onPress={handleSubmit}>
                    {({ pressed }) => (
                        <Text lightColor='#007AFF' darkColor='#0A84FF' style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} >Subir</Text>
                    )} 
                    </Pressable> : null }
                </>
            ) }} />
            <Body>
                <View style={styles.groupedImages}>
                    <Image source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/${application.intern.user.photo.replace(/\\/g, '/')}` }} style={styles.image}/>
                    <Ionicons name={
                        application.statusId === 1
                        ? 'arrow-forward'
                        : application.statusId === 3
                        ? 'close'
                        : application.statusId === 4
                        ? 'checkmark'
                        : 'alert'
                        }
                     size={72}
                        color={ colorScheme ? 'black' : 'white' }
                    />
                    <Image source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/${application.internship.image.replace(/\\/g, '/')}` }} style={styles.image}/>
                </View>
                <GroupedList header='Acerca del usuario'>
                    <GroupedRow name='Nombres' value={application.intern.user.firstName}/>
                    <Separator />
                    <GroupedRow name='Apellidos' value={application.intern.user.lastName}/>
                    <Separator />
                    <GroupedRow name='Biografía' value={application.intern.user.bio}/>
                    <Separator /> 
                    <GroupedRow name='Carrera' value={application.intern.career.name}/>
                    <Separator />
                    <GroupedRow name='Universidad' value={application.intern.career.university.name}/>
                    <Separator />
                    <GroupedRow name='Educación' value={application.intern.resume.education}/> 
                    <Separator />
                    <GroupedRow name='Experiencia' value={application.intern.resume.experience}/> 
                    <Separator />
                    <GroupedRow name='Otros' value={application.intern.resume.otherInfo}/> 
                </GroupedList>
                <GroupedList header='Acerca de la oferta de pasantía'>
                    <GroupedRow name='Título' value={application.internship.name}/>
                    <Separator />
                    <GroupedRow name='Descripción' value={application.internship.desc}/>
                    <Separator />
                    <GroupedRow name='Categoría' value={application.internship.internshipCategory.name}/>
                    <Separator />
                    <GroupedRow name='Descripción de categoría' value={application.internship.internshipCategory.desc}/>
                </GroupedList>
            </Body>
        </>
    :
        <Body center>
            <Text lightColor='rgba(60,60,67,.3)' darkColor='rgba(235,235,245,.3)'>Vacío</Text>
        </Body>        
}

const styles = StyleSheet.create({
    groupedLink: {
        flexDirection: 'row',
    },
    groupedImages: {
        width: '100%',
        padding: 16,
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 128,
        width: 128,
        borderRadius: 10
    }
})