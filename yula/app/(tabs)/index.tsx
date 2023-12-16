import { Image, Pressable, StyleSheet } from 'react-native'

import { Body, Text, View } from '../../components/Themed'
import { useEffect, useState } from 'react'
import InternshipController, { Internship } from '../../controllers/internship'
import { useUser } from '../../context/UserContext'
import { Link } from 'expo-router'

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
  }, [internships, user])

  return internships && internships.length > 0 ? 
    <Body>
      { internships?.map(internship => (
        <Link key={internship.id} href={`/internship/${internship.id}`}>
          <View style={styles.container}>
            <Image source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/${internship.image.replace(/\\/g, '/')}` }} style={styles.image} />
            <View style={styles.content}>
              <Text style={styles.title}>{internship.name}</Text>
              <Text lightColor='rgba(60,60,67,.6)' darkColor='rgba(235,235,245,.6)' style={styles.desc} numberOfLines={2}>{internship.desc}</Text>
            </View>
          </View>
        </Link>
        
      ))}
    </Body>
  :
    <Body center>
      <Text style={styles.textNull} lightColor='rgba(60,60,67,.6)' darkColor='rgba(235,235,245,.6)'>Sin ofertas de pasantías</Text>
    </Body>
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
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
  },
  textNull: {
    fontSize: 13,
    textAlign: 'center'
  }
})
