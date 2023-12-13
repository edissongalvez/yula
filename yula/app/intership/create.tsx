import { useEffect, useState } from 'react'
import { Image, Pressable, StyleSheet, useColorScheme } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import InternshipCategoryController, { InternshipCategory } from '../../controllers/internshipCategory'
import { Body, GroupedList, Notify, Picker, PickerItem, Text, TextField } from '../../components/Themed'
import Colors from '../../constants/Colors'
import { useUser } from '../../context/UserContext'
import InternshipController from '../../controllers/internship'
import { Stack, router } from 'expo-router'

export default function CreateInternshipScreen () {
    const { user } = useUser()

    const colorScheme = useColorScheme()

    const [internshipCategories, setInternshipCategories] = useState<InternshipCategory[]>()

    const [image, setImage] = useState<ImagePicker.ImagePickerAsset>()

    const [data, setData] = useState({
        image: '',
        title: '',
        desc: '',
        internshipStartDate: new Date(),
        noVacancies: 0,
        internshipCategoryId: 1,
        organizationId: 1
    })

    useEffect(() => {
        InternshipCategoryController.getInternshipCategories().then(internshipCategories => setInternshipCategories(internshipCategories))
    }, [])

    const handleChange = (field: keyof typeof data, isNumber?: boolean) => (value: any) => {
        setData(prevData => ({ ...prevData, [field]: isNumber ? Number(value) : value }))
    }

    const pickImage = async () => {
        try {
            let response = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
            })

            if (!response.canceled) {
                setImage(response.assets[0])
            }
        } catch (error) {
            Notify({ title: 'Error al subir la imagen', desc: 'Intente nuevamente' })
        }
    }

    const handleSubmit = async () => {
        try {
            if (user?.mentor) {
                const formData = new FormData()

                const imageName = image?.fileName ||'default.webp'
                if (image?.uri && imageName) {
                    const response = await fetch(image?.uri)
                    const blob = await response.blob()
                    formData.append('image', blob, imageName)
                }

                formData.append('title', data.title)
                formData.append('desc', data.desc)

                formData.append('internshipStartDate', data.internshipStartDate.toString())

                formData.append('noVacancies', data.noVacancies.toString())
                formData.append('internshipCategoryId', data.internshipCategoryId.toString())
                formData.append('organizationId', user.mentor.organizationId.toString())

                InternshipController.createInternship(formData)
                Notify({ title: 'Pasantía guardada', desc: 'Pasantías actualizadas' })
                router.replace('/')
            } else {
                Notify({ title: 'Sin permisos', desc: 'No puede crear pasantía' })
            }
        } catch (error) {
            Notify({ title: 'Pasantía no guardada', desc: 'Revise los datos e intente de nuevo' })
        }
    }

    return (
        <Body>
            <Stack.Screen options={{ title: 'Crear pasantía', headerTitleAlign: 'center', presentation: 'formSheet', headerRight: () => (
                <Pressable onPress={handleSubmit}>
                    {({ pressed }) => (
                        // <Ionicons name='person-add-outline' size={25} color={Colors[colorScheme ?? 'light'].tint} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />
                        <Text lightColor='#007AFF' darkColor='#0A84FF' style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} >Guardar</Text>
                    )} 
                </Pressable>
            )  }} />
            <Pressable onPress={pickImage} style={styles.imageContent}>
                <Image source={image ? { uri: image.uri } : require('../../assets/images/image.webp')} style={[{ borderColor: Colors[colorScheme ?? 'light'].tint }, styles.image]} />
            </Pressable>
            <GroupedList>
                <TextField title='Título' placeholder='Ingese título' value={data.title} onChangeText={handleChange('title')} />
                <TextField title='Descripción' placeholder='Ingese descripción' value={data.desc} onChangeText={handleChange('desc')} />

                <TextField title='Vacantes' placeholder='Ingrese número de vacantes' value={data.noVacancies.toString()} onChangeText={handleChange('noVacancies', true)} keyboardType='numeric' />
                <Picker title='Categoría' selectedValue={data.internshipCategoryId} onValueChange={(selectedValue: unknown) => handleChange('internshipCategoryId', true)(selectedValue as string)}>
                    {internshipCategories?.map(internshipCategory => (
                        <PickerItem key={internshipCategory.id} label={internshipCategory.name} value={internshipCategory.id} />
                    ))}
                </Picker>
            </GroupedList>
        </Body>
    )
}

const styles = StyleSheet.create({
    imageContent: {
        alignSelf: 'center'
    },
    image: {
        height: 128,
        width: 128,
        borderRadius: 10,
        borderWidth: 2
    }
})