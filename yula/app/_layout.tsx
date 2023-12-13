import FontAwesome from '@expo/vector-icons/FontAwesome'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Link, SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react'
import { Pressable, useColorScheme } from 'react-native'
import Colors from '../constants/Colors'

import { UserProvider } from '../context/UserContext'
import { Ionicons } from '@expo/vector-icons'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)'
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <RootLayoutNav />
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()

  return (
    <UserProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: true, headerTitle: '', headerRight: () => (
            <Link href='/user/signIn' asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons name='person-circle-outline' size={25} color={Colors[colorScheme ?? 'light'].tint} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />
                )}
              </Pressable>
            </Link>
          )  }} />
          <Stack.Screen name="user/signIn" options={{ headerTitle: 'Iniciar sesión', headerTitleAlign: 'center', headerRight: () => (
            // <Link href={'/user/create'} style={{ color: Colors[colorScheme ?? 'light'].tint , marginRight: 15, opacity: 0.5 }} asChild>Crear cuenta</Link>
            <Link href='/user/create' asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons name='person-add-outline' size={25} color={Colors[colorScheme ?? 'light'].tint} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />
                )} 
              </Pressable>
            </Link>
          ), presentation: 'modal' }} />
          <Stack.Screen name='user/create' options={{ headerTitle: 'Crear cuenta', headerTitleAlign: 'center', presentation: 'formSheet' }} />
        </Stack>
      </ThemeProvider>
    </UserProvider>
  )
}
