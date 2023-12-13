import { Image, Pressable, StyleSheet, View } from 'react-native'

import { Body, Button, GroupedList, GroupedRow, Notify, Separator, Text } from '../../components/Themed'
import { useUser } from '../../context/UserContext'
import { Stack, router } from 'expo-router'

export default function AccountScreen() {
    const { user, setUser } = useUser()

    const handleLogout = async () => {
        try {
            setUser(null)
            router.replace('/')
            Notify({ title: 'Sesión cerrada', desc: 'Hasta pronto' })
        } catch (error) {
            Notify({ title: 'Error al cerrar sesión', desc: 'Intente nuevamente' })
        }
    }

    const handleEdit = async () => {
        try {
            router.push('/user/edit')
        } catch (error) {
            Notify({ title: 'Error al editar usuario', desc: 'Intente nuevamente' })
        }
    }

    return (
        <>
            <Stack.Screen options={{ title: 'Cuenta', headerTitleAlign: 'center', headerRight: () => (
                <View style={styles.groupedLink}>
                    <Pressable onPress={handleEdit}>
                        {({ pressed }) => (
                            <Text lightColor='#007AFF' darkColor='#0A84FF' style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} >Editar</Text>
                        )} 
                    </Pressable>
                    <Pressable onPress={handleLogout}>
                        {({ pressed }) => (
                            <Text lightColor='#007AFF' darkColor='#0A84FF' style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} >Salir</Text>
                        )} 
                    </Pressable>
                </View>
                
            ) }}  />

            <Body>
                <Text style={styles.title}>Hola, {user?.firstName} {user?.lastName}</Text>
                <Image source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/${user?.photo.replace(/\\/g, '/')}` }} style={styles.image} />
                <GroupedList>
                    <GroupedRow name='Usuario' value={user?.username || ''} />
                    <Separator />
                    <GroupedRow name='Biografía' value={user?.bio || ''} />
                    <Separator />
                    <GroupedRow name='Nombre' value={user?.firstName || ''} />
                    <Separator />
                    <GroupedRow name='Apellido' value={user?.lastName || ''} />
                    <Separator />
                    <GroupedRow name='Teléfono' value={user?.telephone || ''} />
                    <Separator />
                    <GroupedRow name='Correo' value={user?.email || ''} />
                    <Separator />
                    <GroupedRow name='Visto última vez' value={'Hoy'} />
                </GroupedList>

                {user?.intern && (
                    <>
                        <GroupedList header='Detalles académicos'>
                            <GroupedRow name='Carrera' value={user.intern.career.name} />
                            <Separator />
                            <GroupedRow name='Universidad' value={user.intern.career.university.name} />
                        </GroupedList>

                        <GroupedList header='Hoja de vida'>
                            <GroupedRow name='Educación' value={user.intern.resume.education} />
                            <Separator />
                            <GroupedRow name='Experiencia' value={user.intern.resume.experience} />
                            <Separator />
                            <GroupedRow name='Otros' value={user.intern.resume.otherInfo} />
                        </GroupedList>
                    </>
                    
                )}

                {user?.mentor && (
                    <GroupedList header='Detalles laborales'>
                        <GroupedRow name='Empresa' value={user.mentor.organization.name} />
                        <Separator />
                        <GroupedRow name='Ubicación' value={user.mentor.organization.location.name} />
                    </GroupedList>
                )}
            </Body>
        </>
        
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 20
    },
    image: {
        height: 128,
        width: 128,
        borderRadius: 64,
        alignSelf: 'center'
    },
    groupedLink: {
        flexDirection: 'row'
    }
})