import React from 'react'
import { View } from 'react-native'
import { Text, Card } from 'react-native-paper'
import { layout, typography } from '../../styles/theme'

export default function DashboardScreen() {
  return (
    <View style={layout.container}>
      <Text style={typography.title}>Painel Geral</Text>

      <Card style={layout.card}>
        <Card.Content>
          <Text style={typography.subtitle}>Resumo de Hoje</Text>
          <Text style={typography.body}>🐔 Galinhas: 12</Text>
          <Text style={typography.body}>🥚 Ovos coletados: 28</Text>
          <Text style={typography.body}>🌡️ Temperatura média: 25°C</Text>
        </Card.Content>
      </Card>
    </View>
  )
}
