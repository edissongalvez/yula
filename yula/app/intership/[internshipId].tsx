import { Stack, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'
import InternshipController, { Internship } from '../../controllers/internship'
import { Body, GroupedList, GroupedRow, Text } from '../../components/Themed'

export default function GetInternshipScreen() {
    const { internshipId } = useLocalSearchParams<{ internshipId: string }>()
    const [internship, setInternship] = useState<Internship>()

    useEffect(() => {
        InternshipController.getInternship(Number(internshipId)).then(internship => setInternship(internship))
    }, [internship])

    return internship ?
        <>
            <Stack.Screen options={{ title: 'Crear pasantía', headerTitleAlign: 'center', presentation: 'formSheet', headerRight: () => (
                <Pressable>
                    {({ pressed }) => (
                        // <Ionicons name='person-add-outline' size={25} color={Colors[colorScheme ?? 'light'].tint} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />
                        <Text lightColor='#007AFF' darkColor='#0A84FF' style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} >Editar</Text>
                    )} 
                </Pressable>
            )  }} />
            <Body>
                <Image source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/${internship.image.replace(/\\/g, '/')}` }} style={styles.image}/>
                <GroupedList>
                    <GroupedRow name='Publicación' value={internship.datePublished.toLocaleDateString()}/>
                    <GroupedRow name='Inicio' value={internship.internshipStartDate.toLocaleDateString()}/>
                    <GroupedRow name='Vacantes' value={internship.noVacancies.toString()}/>
                </GroupedList>
                <GroupedList header='Categoría'>
                    <GroupedRow name='Nombre' value={internship.intershipCategory.name}/>
                    <GroupedRow name='Detalles' value={internship.intershipCategory.desc}/>
                </GroupedList>
                <GroupedList header='Organización'>
                    <GroupedRow name='Nombre' value={internship.organization.name}/>
                    <GroupedRow name='Detalles' value={internship.organization.desc}/>
                    <GroupedRow name='Detalles' value={internship.organization.address}/>
                    <GroupedRow name='Detalles' value={internship.organization.location.name}/>
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
      padding: 16
    },
    image: {
      height: 256,
      width: '100%',
      borderRadius: 10
    },
    title: {
      fontWeight: 'bold',
      fontSize: 15
    },
    desc: {
      fontSize: 13
    }
  })