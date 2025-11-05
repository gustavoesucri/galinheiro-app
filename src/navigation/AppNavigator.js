import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '../styles/theme'

// Telas principais
import DashboardScreen from '../screens/Dashboard/DashboardScreen'
import OvosList from '../screens/Ovos/OvosList'
import NinhosList from '../screens/Ninhos/NinhosList'
import GalpoesList from '../screens/Galpoes/GalpoesList'

// Pilha para CRUD de galinhas
import GalinhasStack from './GalinhasStack'

const Tab = createBottomTabNavigator()

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#fff',
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#8a8a8a',
        tabBarStyle: { backgroundColor: colors.surface, borderTopWidth: 0.5 },
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
        component={OvosList}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="egg" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Ninhos"
        component={NinhosList}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="nest-protect" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Galpões"
        component={GalpoesList}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home-variant" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
