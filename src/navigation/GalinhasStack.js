import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import GalinhasList from '../screens/Galinhas/GalinhasList'
import GalinhasForm from '../screens/Galinhas/GalinhasForm'

const Stack = createStackNavigator()

export default function GalinhasStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GalinhasList"
        component={GalinhasList}
        options={{ title: 'Galinhas' }}
      />
      <Stack.Screen
        name="GalinhasForm"
        component={GalinhasForm}
        options={{ title: 'Cadastro / Atualização' }}
      />
    </Stack.Navigator>
  )
}
