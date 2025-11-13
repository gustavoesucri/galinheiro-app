import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import GalinhasList from '../screens/Galinhas/GalinhasList'
import GalinhasForm from '../screens/Galinhas/GalinhasForm'
import OvosForm from '../screens/Ovos/OvosForm'
import { useTema } from '../hooks/useTema'
import { getStackScreenOptions } from './navigationOptions'

const Stack = createStackNavigator()

export default function GalinhasStack() {
  const tema = useTema()

  return (
    <Stack.Navigator screenOptions={getStackScreenOptions(tema)}>
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
      <Stack.Screen
        name="OvosForm"
        component={OvosForm}
        options={{ title: 'Adicionar Ovo' }}
      />
    </Stack.Navigator>
  )
}
