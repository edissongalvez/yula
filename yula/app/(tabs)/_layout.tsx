import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { useColorScheme } from 'react-native'

import Colors from '../../constants/Colors'

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

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint }}>
      <Tabs.Screen name="index" options={{ title: 'Ofertas de pasantías', tabBarIcon: ({ color }) => <TabBarIcon name="briefcase" color={color} />}}
      />
      <Tabs.Screen name="two" options={{ title: 'Pasantías', tabBarIcon: ({ color }) => <TabBarIcon name="md-checkmark-done-circle" color={color} /> }} />
    </Tabs>
  );
}
