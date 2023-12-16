import { useEffect, useState } from 'react'
import { Image, Pressable, StyleSheet, useColorScheme } from 'react-native'
import { Stack, router } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'

import { Body, Button, GroupedList, Notify, Picker, PickerItem, Separator, Text, TextField } from '../../components/Themed'
import Colors from '../../constants/Colors'
import UserController from '../../controllers/user'
import CareerController, { Career } from '../../controllers/career'
import OrganizationController, { Organization } from '../../controllers/organization'
import ResumeController from '../../controllers/resume'

export default function SignUpScreen() {
    const colorScheme = useColorScheme()

    const [careers, setCareers] = useState<Career[]>()

    const [organizations, setOrganizations] = useState<Organization[]>()

    const [type, setType] = useState<Number>(1)
    
    const [photo, setPhoto] = useState<ImagePicker.ImagePickerAsset>()

    const [data, setData] = useState({
        username: '',
        password: '',
        bio: '',
        photo: '',
        firstName: '',
        lastName: '',
        telephone: '',
        email: ''
    })

    const [internData, setInternData] = useState({
        careerId: 1,
        education: '',
        experience: '',
        otherInfo: '',
    })

    const [mentorData, setMentorData] = useState({
        organizationId: 1
    })

    useEffect(() => {
        CareerController.getCareers().then(careers => setCareers(careers))
        OrganizationController.getOrganizations().then(organizations => setOrganizations(organizations))
    }, [])

    const handleChange = (field: keyof typeof data, isNumber?: boolean) => (value: any) => {
        setData(prevData => ({ ...prevData, [field]: isNumber ? Number(value) : value }))
    }

    const handleChangeIntern = (field: keyof typeof internData, isNumber?: boolean) => (value: any) => {
        setInternData(prevInternData => ({ ...prevInternData, [field]: isNumber ? Number(value) : value }))
    }

    const handleChangeMentor = (field: keyof typeof mentorData, isNumber?: boolean) => (value: any) => {
        setMentorData(prevMentorData => ({ ...prevMentorData, [field]: isNumber ? Number(value) : value }))
    }

    const handleChangeType = (type: number) => {
        setType(type)
    }

    const pickPhoto = async () => {
        try {
            let response = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
            })

            if (!response.canceled) {
                setPhoto(response.assets[0])
            }
        } catch (error) {
            Notify({ title: 'Error al subir la imagen', desc: 'Intente nuevamente' })
        }
    }

    const handleSubmit = async () => {
        try {
            const formData = new FormData()

                formData.append('username', data.username)
                formData.append('password', data.password)
                formData.append('bio', data.bio)

                const fileName = photo?.fileName || 'default.webp'
                if (photo?.uri && fileName) {
                    const response = await fetch(photo?.uri)
                    const blob = await response.blob()
                    formData.append('photo', blob, fileName)
                }

                formData.append('firstName', data.firstName)
                formData.append('lastName', data.lastName)
                formData.append('telephone', data.telephone)
                formData.append('email', data.email)

                if (type === 1) {
                    formData.append('careerId', internData.careerId.toString())
                    const user = await UserController.createInternUser(formData)
                    ResumeController.createResume(internData.education, internData.experience, internData.otherInfo, user.id)
                }

                if (type === 2) {
                    formData.append('organizationId', mentorData.organizationId.toString())
                    UserController.createMentorUser(formData)
                }

                Notify({ title: 'Usuario actualizado', desc: 'Se han guardado nuevos datos' })
                router.replace('/')
        } catch {
            Notify({ title: 'Usuario no guardado', desc: 'Revise los datos e intente nuevamente' })
        }
    }

    return (
        <>
            <Stack.Screen options={{ headerTitle: 'Crear usuario', headerTitleAlign: 'center', headerRight: () => (
                <Pressable onPress={handleSubmit}>
                {({ pressed }) => (
                    <Text lightColor='#007AFF' darkColor='#0A84FF' style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} >Guardar</Text>
                )} 
                </Pressable>
            ) }} />
            <Body>
                <Pressable onPress={pickPhoto} style={styles.photoContent}>
                    <Image source={photo ? { uri: photo.uri } : require('../../assets/images/photo.webp')} style={[{ borderColor: Colors[colorScheme ?? 'light'].tint }, styles.photo]} />
                </Pressable>
                <GroupedList header='Datos personales' footer='Mantenga sus datos actualizados para aprovechar las oferta de pasantías.' >
                    <TextField title='Usuario' placeholder='Ingrese usuario' value={data.username} onChangeText={handleChange('username')} maxLength={16} />
                    <Separator />
                    <TextField title='Contraseña' placeholder='Ingrese contraseña' value={data.password} onChangeText={handleChange('password')} maxLength={16} secureTextEntry />
                    <Separator />
                    <TextField title='Biografía' placeholder='Ingrese biografía' value={data.bio} onChangeText={handleChange('bio')} maxLength={64}  />
                    <Separator />
                    <TextField title='Nombre' placeholder='Ingrese nombre' value={data.firstName} onChangeText={handleChange('firstName')} maxLength={32}  />
                    <Separator />
                    <TextField title='Apellido' placeholder='Ingrese apellido' value={data.lastName} onChangeText={handleChange('lastName')} maxLength={32}  />
                    <Separator />
                    <TextField title='Teléfono' placeholder='Ingrese teléfono celular' value={data.telephone} onChangeText={handleChange('telephone')}  maxLength={9} inputMode='numeric' keyboardType='numeric' />
                    <Separator />
                    <TextField title='Correo' placeholder='Ingrese correo electronico' value={data.email} onChangeText={handleChange('email')} maxLength={32} />
                </GroupedList>
                <GroupedList header='Tipo'>
                    <Picker title='Cuenta' selectedValue={type} onValueChange={selectedValue => handleChangeType(Number(selectedValue))}>
                        <PickerItem label='Pasante' value={1} />
                        <PickerItem label='Mentor' value={2} />
                    </Picker>
                </GroupedList>

                { type === 1 &&
                    <>
                        <GroupedList header='Datos académicos' footer='En caso no halle su carrera, contacte con soporte.'>
                            <Picker title='Carrera' selectedValue={internData.careerId} onValueChange={(selectedValue: unknown) => handleChangeIntern('careerId', true)(selectedValue as string)}>
                                {careers?.map(career => (
                                    <PickerItem key={career.id} label={`${career.name}\n${career.university.name}`} value={career.id} />
                                ))}
                            </Picker>
                        </GroupedList>

                        <GroupedList header='Datos académicos' footer='Se recomienda que la información sea verídica.'>
                            <TextField title='Educación' placeholder='Acerca de su formación académica' value={internData.education} onChangeText={handleChangeIntern('education')}  maxLength={256} />
                            <Separator />
                            <TextField title='Experiencia' placeholder='Acerca de su experiencia laboral' value={internData.experience} onChangeText={handleChangeIntern('experience')}  maxLength={256} />
                            <Separator />
                            <TextField title='Otros' placeholder='Acerca de otros datos sobre usted' value={internData.otherInfo} onChangeText={handleChangeIntern('otherInfo')}  maxLength={256} />
                        </GroupedList>
                    </>
                }

                { type === 2 &&
                    <GroupedList header='Datos laborales' footer='En caso no halle su organización, contacte con soporte.'>
                        <Picker title='Organización' selectedValue={mentorData.organizationId} onValueChange={(selectedValue: unknown) => handleChangeMentor('organizationId', true)(selectedValue as string)}>
                            {organizations?.map(organization => (
                                <PickerItem key={organization.id} label={`${organization.name}\n${organization.location.name}`} value={organization.id} />
                            ))}
                        </Picker>
                    </GroupedList>
                }
            </Body>
        </>
        
    )
}

const styles = StyleSheet.create({
    photoContent: {
        alignSelf: 'center'
    },
    photo: {
        height: 128,
        width: 128,
        borderRadius: 64,
        borderWidth: 2
    }
})