import { useEffect, useState } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'

import { Body, Button, GroupedList, Notify, Separator, Text, TextField } from '../../components/Themed'
import UserController from '../../controllers/user'
import { useUser } from '../../context/UserContext'

export default function SignInScreen() {
  const { user, setUser } = useUser()

  const [data, setData] = useState({
    username: '',
    password: ''
  })

  useEffect(() => {
    user ? router.replace('/user/account') : null
  }, [])

  const handleChange = (field: any) => (value: any) => {
    setData(prevData => ({
      ...prevData, [field]: value
    }))
  }

  const handleLogin = async () => {
    try {
      const auth = await UserController.login(data.username, data.password)
      setUser(auth)
      Notify({ title: 'Accedido', desc: 'Bienvenido' })
      router.replace('/')
    } catch (error) {
      Notify({ title: 'Sin acceso', desc: 'Revise las credenciales' })
    } 
  }

  const handleLogout = async () => {
    try {
      setUser(null)
      Notify({ title: 'Sesión cerrada', desc: 'Hasta pronto' })
      router.replace('/')
    } catch (error) {
        Notify({ title: 'Sin cerrar sesión', desc: 'Intente nuevamente' })
    }
  }

  return (
    <Body center>
        <GroupedList>
          <TextField title='Usuario' placeholder='Ingrese usuario' value={data.username} onChangeText={handleChange('username')} />
          <Separator />
          <TextField title='Contraseña' placeholder='Ingrese contraseña' value={data.password} onChangeText={handleChange('password')} secureTextEntry />
        </GroupedList>
        <Button action='Acceder' onPress={handleLogin} />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </Body>
  )
}
