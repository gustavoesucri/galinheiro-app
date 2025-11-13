import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import GalpoesList from '../screens/Galpoes/GalpoesList'
import GalpoesForm from '../screens/Galpoes/GalpoesForm'
import { useTema } from '../hooks/useTema'
import { getStackScreenOptions } from './navigationOptions'

const Stack = createStackNavigator()

export default function GalpoesStack() {
  const tema = useTema()

  return (
    <Stack.Navigator screenOptions={getStackScreenOptions(tema)}>
      <Stack.Screen name="GalpoesList" component={GalpoesList} options={{ title: 'Galpões' }} />
      <Stack.Screen
        name="GalpoesForm"
        component={GalpoesForm}
        options={{ title: 'Cadastro / Atualização' }}
      />
    </Stack.Navigator>
  )
}
