import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { useTema } from '../hooks/useTema'

// Temas
import * as theme1 from '../styles/theme'
import * as theme2 from '../styles/theme2'
import * as theme3 from '../styles/theme3'

// Telas principais
import DashboardScreen from '../screens/Dashboard/DashboardScreen'

// Pilhas de CRUD
import GalinhasStack from './GalinhasStack'
import NinhosStack from './NinhosStack'
import GalpoesStack from './GalpoesStack'
import OvosStack from './OvosStack'
import MedicaoAmbienteStack from './MedicaoAmbienteStack'

// Componentes
import TemaToggleButton from '../components/TemaToggleButton'
import BotaoModoToggleButton from '../components/BotaoModoToggleButton'

const Tab = createBottomTabNavigator()

export default function AppNavigator() {
  const tema = useTema()
  const temaSelecionado = useSelector(state => state.tema.ativo)

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: tema.colors.primary },
        headerTintColor: tema.colors.surface,
        headerRight: () => (
          <View style={{ flexDirection: 'row' }}>
            <BotaoModoToggleButton />
            <TemaToggleButton />
          </View>
        ),
        tabBarActiveTintColor: tema.colors.primary,
        tabBarInactiveTintColor: tema.colors.tabBarInactive,
        tabBarStyle: { backgroundColor: tema.colors.surface, borderTopWidth: 0.5 },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="view-dashboard" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Galinhas"
        component={GalinhasStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chicken" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Ovos"
        component={OvosStack} // agora é stack
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="egg" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Ninhos"
        component={NinhosStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="nest-protect" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Galpões"
        component={GalpoesStack} // <— agora é a Stack
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home-variant" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Medições"
        component={MedicaoAmbienteStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="thermometer" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
