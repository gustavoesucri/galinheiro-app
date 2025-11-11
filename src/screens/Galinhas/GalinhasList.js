import React, { useEffect } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { Card, Text, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { layout, typography, colors } from '../../styles/theme'
import { carregarGalinhas, removerGalinhaThunk } from '../../redux/thunks/galinhasThunk'

export default function GalinhasList() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const galinhas = useSelector(state => state.galinhas.lista)

  useEffect(() => {
    dispatch(carregarGalinhas())
  }, [dispatch])

  const deletarGalinha = (id) => {
    dispatch(removerGalinhaThunk(id))
  }

  return (
    <View style={layout.container}>
      <Text style={[typography.title, styles.title]}>Galinhas</Text>

      <FlatList
        data={galinhas}
        keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20, color: colors.textSecondary }}>
            Nenhuma galinha cadastrada ainda 🐔
          </Text>
        }
        renderItem={({ item }) => (
          <Card style={layout.card}>
            <Card.Title title={item.nome || 'Sem nome'} />
            <Card.Content style={{ gap: 4 }}>
              <Text style={typography.body}>Saúde: {item.saude || 'Não informada'}</Text>
              <Text style={typography.body}>Ovos hoje: {item.ovosHoje ?? 0}</Text>
              <Text style={typography.body}>
                Quarentena: {item.emQuarentena ? 'Sim' : 'Não'}
              </Text>
              <Text style={typography.body}>Local: {item.local || '(não definido)'}</Text>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="outlined"
                textColor={colors.accent}
                style={{ borderColor: colors.accent }}
                onPress={() => navigation.navigate('GalinhasForm', { galinha: item })}
              >
                Editar
              </Button>
              <Button onPress={() => deletarGalinha(item.id)}>Deletar</Button>
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
