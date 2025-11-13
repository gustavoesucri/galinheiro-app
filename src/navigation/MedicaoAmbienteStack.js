import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MedicaoAmbienteList from '../screens/MedicaoAmbiente/MedicaoAmbienteList'
import MedicaoAmbienteForm from '../screens/MedicaoAmbiente/MedicaoAmbienteForm'
import { useTema } from '../hooks/useTema'
import { getStackScreenOptions } from './navigationOptions'

const Stack = createStackNavigator()

export default function MedicaoAmbienteStack() {
  const tema = useTema()

  return (
    <Stack.Navigator screenOptions={getStackScreenOptions(tema)}>
      <Stack.Screen
        name="MedicaoAmbienteList"
        component={MedicaoAmbienteList}
        options={{ title: 'Medições Ambientais' }}
      />
      <Stack.Screen
        name="MedicaoAmbienteForm"
        component={MedicaoAmbienteForm}
        options={{ title: 'Cadastro / Atualização' }}
      />
    </Stack.Navigator>
  )
}
