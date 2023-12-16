import { Image, Pressable, StyleSheet, View } from 'react-native'

import { Body, Button, Text } from '../../components/Themed'
import { useUser } from '../../context/UserContext'
import { useEffect, useState } from 'react'
import ApplicationController, { Application } from '../../controllers/application'
import { Link } from 'expo-router'

export default function TabTwoScreen() {
  const { user } = useUser()
  const [applications, setApplications] = useState<Application[]>()

  useEffect(() => {
    ApplicationController.getApplications().then(applications => {
      setApplications(applications)
      if (user?.mentor) {
        setApplications(applications?.filter(application => application.internship.organizationId === user.mentor.organizationId))
      } else if (user?.intern) {
        setApplications(applications?.filter(application => application.internId === user.id))
      } else {
        setApplications([])
      }
    })
  }, [applications, user])

  return user ? (
    
    applications && applications.length > 0 ? (
      <Body>
        {applications.map(application => (
            <Link href={`/application/${application.id}`} key={application.id}>
              <View style={styles.content}>
                <Image source={{ uri: user.intern ? `${process.env.EXPO_PUBLIC_API_URL}/${application.internship.image.replace(/\\/g, '/')}` : `${process.env.EXPO_PUBLIC_API_URL}/${application.intern.user.photo.replace(/\\/g, '/')}` }} style={styles.image} />
                <View style={styles.desc}>
                  <View>
                    <Text style={styles.title}>{ user.intern ? application.internship.name : `${application.intern.user.firstName} ${application.intern.user.lastName}`}</Text>
                    <Text lightColor='rgba(60,60,67,.6)' darkColor='rgba(235,235,245,.6)' style={styles.description}>{user.intern ? application.internship.desc : application.intern.user.bio}</Text>
                  </View>
                  <View>
                    <Button action={application.status.name} />
                  </View>
                </View>
                
                {/* <Text>{ JSON.stringify(application) }</Text> */}
              </View>
            </Link>
        )) }
      </Body>
    ) : (
        <Body center>
          <Text style={styles.textNull} lightColor='rgba(60,60,67,.6)' darkColor='rgba(235,235,245,.6)'>Sin pasantías pendientes.</Text>
        </Body>
    )
    
  ) : (
    <Body center>
      <Text style={styles.textNull} lightColor='rgba(60,60,67,.6)' darkColor='rgba(235,235,245,.6)'>Para usar Yula, inicie sesión.</Text>
    </Body>
  )
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    gap: 16
  },
  desc: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-around'
  },
  image: {
    height: 128,
    width: 128,
    borderRadius: 10
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15
  },
  description: {
    fontSize: 13
  },
  textNull: {
    fontSize: 13,
    textAlign: 'center'
  }
})
