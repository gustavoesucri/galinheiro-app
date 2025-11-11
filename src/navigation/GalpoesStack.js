import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import GalpoesList from '../screens/Galpoes/GalpoesList'
import GalpoesForm from '../screens/Galpoes/GalpoesForm'

const Stack = createStackNavigator()

export default function GalpoesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="GalpoesList" component={GalpoesList} options={{ title: 'Galpões' }} />
      <Stack.Screen
        name="GalpoesForm"
        component={GalpoesForm}
        options={{ title: 'Cadastro / Atualização' }}
      />
    </Stack.Navigator>
  )
}
