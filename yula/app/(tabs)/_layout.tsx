import { Ionicons } from '@expo/vector-icons'
import { Link, Tabs } from 'expo-router'
import { Pressable, StyleSheet, useColorScheme } from 'react-native'
import { BlurView } from 'expo-blur'

import Colors from '../../constants/Colors'
import { useUser } from '../../context/UserContext'

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name']
  color: string
}) {
  return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
  const colorScheme = useColorScheme()
  const { user } = useUser()

  return (
    <Tabs screenOptions={{ headerTransparent: true, headerStyle: { height: 49 }, headerBackground: () => <BlurUI />, tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint, tabBarStyle: { position: 'absolute', borderWidth: 0 }, tabBarBackground: () => <BlurUI /> }}>
      <Tabs.Screen name="index" options={{ title: 'Ofertas de pasantías', tabBarIcon: ({ color }) => <TabBarIcon name="briefcase" color={color} />, headerRight: () => user?.mentor ? <TrailingButton href='/internship/create' name='briefcase-outline' /> : null }}
      />
      <Tabs.Screen name="two" options={{ title: 'Pasantías', tabBarIcon: ({ color }) => <TabBarIcon name="md-checkmark-done-circle" color={color} /> }} />
    </Tabs>
  );
}

function BlurUI () {
  const colorScheme = useColorScheme()

  return <BlurView tint={colorScheme === 'light' ? 'light' : 'dark'} intensity={80} style={StyleSheet.absoluteFill} />
}

interface TrailingButtonProps {
  href: string;
  name: string;
}

function TrailingButton ({href, name}: TrailingButtonProps) {
  const colorScheme = useColorScheme()

  return  <Link href={href as any} asChild>
    <Pressable>
      {({ pressed }) => (
        <Ionicons name={name as any} size={25} color={Colors[colorScheme ?? 'light'].tint} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />
      )}
    </Pressable>
  </Link>
}