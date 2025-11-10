import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { Card, Text, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { layout, typography, colors } from '../../styles/theme'

export default function GalinhasList() {
  const navigation = useNavigation()

  // 👇 Lê as galinhas salvas no Redux (e portanto, no persist também)
  const galinhas = useSelector((state) => state.galinhas.lista)

  return (
    <View style={layout.container}>
      <Text style={[typography.title, styles.title]}>Minhas Galinhas</Text>

      <FlatList
        data={galinhas}
        keyExtractor={(item, index) => item.nome + index}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20, color: colors.textSecondary }}>
            Nenhuma galinha cadastrada ainda 🐔
          </Text>
        }
        renderItem={({ item }) => (
          <Card style={layout.card}>
            <Card.Title title={item.nome} />
            <Card.Content style={{ gap: 4 }}>
              <Text style={typography.body}>
                Saúde: {item.saude}
              </Text>
              <Text style={typography.body}>
                Ovos postos hoje: {item.ovosHoje}
              </Text>
              <Text style={typography.body}>
                Em quarentena: {item.emQuarentena ? 'Sim' : 'Não'}
              </Text>
              <Text style={typography.body}>
                Local: {item.local}
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
