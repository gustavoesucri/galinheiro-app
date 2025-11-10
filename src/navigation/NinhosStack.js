import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import NinhosList from '../screens/Ninhos/NinhosList'
import NinhosForm from '../screens/Ninhos/NinhosForm'

const Stack = createStackNavigator()

export default function NinhosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NinhosList"
        component={NinhosList}
        options={{ title: 'Ninhos' }}
      />
      <Stack.Screen
        name="NinhosForm"
        component={NinhosForm}
        options={{ title: 'Cadastro / Atualização' }}
      />
    </Stack.Navigator>
  )
}
