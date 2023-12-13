import { Image, StyleSheet } from 'react-native'

import EditScreenInfo from '../../components/EditScreenInfo'
import { Body, Text, View } from '../../components/Themed'
import { useEffect, useState } from 'react'
import InternshipController, { Internship } from '../../controllers/internship'
import { useUser } from '../../context/UserContext'

export default function TabOneScreen() {

  const [internships, setInternships] = useState<Internship[]>()

  const { user } = useUser()

  useEffect(() => {
    InternshipController.getInternships().then(internships => {
      setInternships(internships)
      if (user?.mentor) {
        setInternships(internships?.filter(internship => internship.organizationId === user.mentor.organizationId));
      }
    })
  }, [user])

  return (
    <Body>
      { internships?.map(internship => (
        <View key={internship.id}>
          <Image source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/${internship.image.replace(/\\/g, '/')}` }} style={styles.image} />
          <View style={styles.content}>
            <Text style={styles.title}>{internship.name}</Text>
            <Text lightColor='rgba(60,60,67,.6)' darkColor='rgba(235,235,245,.6)' style={styles.desc} numberOfLines={3}>{internship.desc}</Text>
          </View>
        </View>
      ))}
    </Body>
  );
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
