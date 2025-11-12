import React, { useEffect } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { Card, Text, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { layout, typography, colors } from '../../styles/theme'
import { carregarNinhos, removerNinhoThunk } from '../../redux/thunks/ninhosThunk'

export default function NinhosList() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const ninhos = useSelector(state => state.ninhos.lista)
  const galpoes = useSelector(state => state.galpoes.lista)

  useEffect(() => {
    dispatch(carregarNinhos())
  }, [dispatch])

  const deletarNinho = (id) => {
    dispatch(removerNinhoThunk(id))
  }

  const diasDesdeLimpeza = (data) => {
    if (!data) return 0
    const ultima = data instanceof Date ? data : new Date(data)
    const hoje = new Date()
    const diff = hoje - ultima
    return Math.floor(diff / (1000 * 60 * 60 * 24))
  }

  const formatDate = (d) => {
    if (!d) return 'Não registrada'
    const dateObj = d instanceof Date ? d : new Date(d)
    return dateObj.toLocaleDateString()
  }

  const getNomeGalpao = (galpaoId) => {
    if (!galpaoId) return '(sem galpão)'
    const g = galpoes.find((g) => Number(g.id) === Number(galpaoId))
    return g ? g.nome : '(sem galpão)'
  }

  return (
    <View style={layout.container}>
      <Text style={[typography.title, styles.title]}>Ninhos</Text>

      <FlatList
        data={ninhos}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20, color: colors.textSecondary }}>
            Nenhum ninho cadastrado ainda 🪺
          </Text>
        }
        renderItem={({ item }) => (
          <Card style={layout.card}>
            <Card.Title title={item.identificacao} />
            <Card.Content style={{ gap: 4 }}>
              <Text style={typography.body}>Material: {item.tipo_material}</Text>
              <Text style={typography.body}>Localização: {getNomeGalpao(item.localizacao)}</Text>
              <Text style={typography.body}>Ocupado: {item.ocupado ? 'Sim' : 'Não'}</Text>
              <Text style={typography.body}>
                Última limpeza: {formatDate(item.ultima_limpeza)} ({diasDesdeLimpeza(item.ultima_limpeza)} dias atrás)
              </Text>
              <Text style={typography.body}>
                Galinha: {item.galinha ? item.galinha : '(não adicionada)'}
              </Text>
              <Text style={typography.body}>
                Observações: {item.observacoes ? item.observacoes : '(sem observações)'}
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="outlined"
                textColor={colors.accent}
                style={{ borderColor: colors.accent }}
                onPress={() => navigation.navigate('NinhosForm', { ninho: item })}
              >
                Editar
              </Button>
              <Button onPress={() => deletarNinho(item.id)}>Deletar</Button>
            </Card.Actions>
          </Card>
        )}
      />

      <Button
        mode="contained"
        icon="plus"
        onPress={() => navigation.navigate('NinhosForm')}
        style={[layout.button, styles.addButton]}
      >
        <Text>Adicionar Ninho</Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  addButton: { marginTop: 16 },
  title: { marginBottom: 12 },
})
