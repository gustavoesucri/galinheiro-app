import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { Card, Text, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { layout, typography, colors } from '../../styles/theme'

const mockData = [
  { id: 1, nome: 'Luzia', saude: 'Boa', ovosHoje: 2 },
  { id: 2, nome: 'Rosa', saude: 'Fragilizada', ovosHoje: 1 },
]

export default function GalinhasList() {
  const navigation = useNavigation()

  return (
    <View style={layout.container}>
      <Text style={[typography.title, styles.title]}>Minhas Galinhas</Text>

      <FlatList
        data={mockData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={layout.card}>
            <Card.Title title={item.nome} subtitle={`Saúde: ${item.saude}`} />
            <Card.Content>
              <Text style={typography.body}>
                Ovos postos hoje: {item.ovosHoje}
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="outlined"
                textColor={colors.accent}
                style={{ borderColor: colors.accent }}
                onPress={() => console.log('Ver detalhes de', item.nome)}
              >
                <Text>Detalhes</Text>
              </Button>
            </Card.Actions>
          </Card>
        )}
      />

      <Button
        mode="contained"
        icon="plus"
        onPress={() => navigation.navigate('GalinhasForm')}
        style={[layout.button, styles.addButton]}
      >
        <Text>Adicionar Galinha</Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  addButton: { marginTop: 16 },
  title: { marginBottom: 12 },
})
