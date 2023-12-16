import { Stack, router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import InternshipController, { Internship } from '../../controllers/internship'
import { Body, GroupedList, GroupedRow, Notify, Separator, Text } from '../../components/Themed'
import { useUser } from '../../context/UserContext'
import ApplicationController from '../../controllers/application'

export default function GetInternshipScreen() {
    const { user } = useUser()
    const { internshipId } = useLocalSearchParams<{ internshipId: string }>()
    const [internship, setInternship] = useState<Internship>()

    useEffect(() => {
        InternshipController.getInternship(Number(internshipId)).then(internship => setInternship(internship))
    }, [internship])

    const handleApplication = async () => {
        try {
            ApplicationController.createApplication(Number(internshipId), Number(user?.id))
            Notify({ title: 'Postulación exitosa', desc: 'Revise las pastaña Pasantías para más detalles' })
        } catch (error) {
            Notify({ title: 'Error al aplicar', desc: 'No tiene permisos' })
        }
    }

    const handleEdit = async () => {
        try {
            router.push(`/internship/edit/${Number(internshipId)}`)
        } catch (error) {
            Notify({ title: 'Error al editar usuario', desc: 'Intente nuevamente' })
        }
    }

    return internship ?
        <>
            <Stack.Screen options={{ title: 'Oferta de pasantía', headerTitleAlign: 'center', presentation: 'formSheet', headerRight: () => (
                <>
                    { user?.mentor ? <Pressable onPress={handleEdit}>
                        {({ pressed }) => (
                            <Text lightColor='#007AFF' darkColor='#0A84FF' style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}>Editar</Text>
                        )} 
                    </Pressable> : null }
                    { user?.intern && !internship.applications.find(application => application.internId === user.id) ? <Pressable onPress={handleApplication}>
                    {({ pressed }) => (
                        <Text lightColor='#007AFF' darkColor='#0A84FF' style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} >Postular</Text>
                    )} 
                    </Pressable> : null }
                </>
            )  }} />
            <Body>
                <Image source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/${internship.image.replace(/\\/g, '/')}` }} style={styles.image}/>
                <View style={styles.content}>
                    <Text style={styles.title}>{internship.name}</Text>
                    <Text lightColor='rgba(60,60,67,.6)' darkColor='rgba(235,235,245,.6)' style={styles.desc}>{internship.desc}</Text>
                </View>
                <GroupedList>
                    <GroupedRow name='Publicación' value={new Date(internship.datePublished).toLocaleDateString()}/>
                    <Separator />
                    <GroupedRow name='Inicio' value={new Date(internship.internshipStartDate).toLocaleDateString()}/>
                    <Separator />
                    <GroupedRow name='Vacantes' value={internship.noVacancies.toString()}/>
                </GroupedList>
                <GroupedList header='Categoría'>
                    <GroupedRow name='Nombre' value={internship.internshipCategory.name}/>
                    <Separator />
                    <GroupedRow name='Descripción' value={internship.internshipCategory.desc}/>
                </GroupedList>
                <GroupedList header='Organización'>
                    <GroupedRow name='Nombre' value={internship.organization.name}/>
                    <Separator />
                    <GroupedRow name='Eslogan' value={internship.organization.desc}/>
                    <Separator />
                    <GroupedRow name='Dirección' value={internship.organization.address}/>
                    <Separator />
                    <GroupedRow name='Ubicación' value={internship.organization.location.name}/>
                </GroupedList>
            </Body>
        </>
    :
        <Body center>
            <Text lightColor='rgba(60,60,67,.3)' darkColor='rgba(235,235,245,.3)'>Vacío</Text>
        </Body>

}

const styles = StyleSheet.create({
    content: {
      paddingHorizontal: 16
    },
    image: {
      height: 256,
      width: '100%',
      borderRadius: 10
    },
    title: {
      fontWeight: 'bold',
      fontSize: 17
    },
    desc: {
      fontSize: 15
    }
  })