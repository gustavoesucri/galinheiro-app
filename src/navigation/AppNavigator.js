import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
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
import AlertaIconButton from '../components/AlertaIconButton'

// Telas especiais
import AlertasScreen from '../screens/Alertas/AlertasScreen'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function MainTabs() {
  const tema = useTema()

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { 
          backgroundColor: tema.colors.primary,
          borderBottomWidth: 1,
          borderBottomColor: tema.colors.border,
        },
        headerTintColor: tema.colors.textPrimary,
        headerRight: () => (
          <View style={{ flexDirection: 'row' }}>
            <AlertaIconButton />
            <BotaoModoToggleButton />
            <TemaToggleButton />
          </View>
        ),
        tabBarActiveTintColor: tema.colors.primary,
        tabBarInactiveTintColor: tema.colors.tabBarInactive,
        tabBarStyle: { 
          backgroundColor: tema.colors.surface, 
          borderTopWidth: 1,
          borderTopColor: tema.colors.border,
        },
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
        component={OvosStack}
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
        component={GalpoesStack}
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

export default function AppNavigator() {
  const tema = useTema()
  const temaSelecionado = useSelector(state => state.tema.ativo)

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { 
          backgroundColor: tema.colors.primary,
          borderBottomWidth: 1,
          borderBottomColor: tema.colors.border,
        },
        headerTintColor: tema.colors.textPrimary,
        headerRight: () => (
          <View style={{ flexDirection: 'row' }}>
            <AlertaIconButton />
            <BotaoModoToggleButton />
            <TemaToggleButton />
          </View>
        ),
        contentStyle: {
          backgroundColor: tema.colors.background,
        },
      }}
    >
      <Stack.Screen 
        name="MainTabs" 
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Alertas" 
        component={AlertasScreen}
        options={{ title: '⚙️ Configurações de Alertas' }}
      />
    </Stack.Navigator>
  )
}
