// src/navigation/OvosStack.js
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import OvosList from '../screens/Ovos/OvosList'
import OvosForm from '../screens/Ovos/OvosForm'

const Stack = createStackNavigator()

export default function OvosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OvosList"
        component={OvosList}
        options={{ title: 'Ovos' }}
      />
      <Stack.Screen
        name="OvosForm"
        component={OvosForm}
        options={{ title: 'Cadastro / Atualização' }}
      />
    </Stack.Navigator>
  )
}
