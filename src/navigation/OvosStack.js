// src/navigation/OvosStack.js
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import OvosList from '../screens/Ovos/OvosList'
import OvosForm from '../screens/Ovos/OvosForm'
import { useTema } from '../hooks/useTema'
import { getStackScreenOptions } from './navigationOptions'

const Stack = createStackNavigator()

export default function OvosStack() {
  const tema = useTema()

  return (
    <Stack.Navigator screenOptions={getStackScreenOptions(tema)}>
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
