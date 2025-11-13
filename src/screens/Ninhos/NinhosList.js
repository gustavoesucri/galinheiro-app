import React, { useEffect } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { Card, Text } from 'react-native-paper'
import ButtonPaper from '../../components/ButtonPaper'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { carregarNinhos, removerNinhoThunk } from '../../redux/thunks/ninhosThunk'
import { carregarGalpoes } from '../../redux/thunks/galpoesThunk'
import { carregarGalinhas } from '../../redux/thunks/galinhasThunk'
import { useTema } from '../../hooks/useTema'

export default function NinhosList() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const tema = useTema()
  const { layout, typography, colors } = tema
  const ninhos = useSelector(state => state.ninhos.lista)
  const galpoes = useSelector(state => state.galpoes.lista)
  const galinhas = useSelector(state => state.galinhas.lista)
  const botoesClaros = useSelector(state => state.botaoModo.botoesClaros)
  
  // Cor para botão Deletar - laranja fixo ou cor do tema
  const deleteColor = botoesClaros ? tema.colors.primaryOrange : tema.colors.primary
  const deleteTextColor = botoesClaros ? tema.colors.black : tema.colors.textOnPrimary

  useEffect(() => {
    dispatch(carregarNinhos())
    dispatch(carregarGalpoes())
    dispatch(carregarGalinhas())
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
    const g = galpoes.find((g) => String(g.id) === String(galpaoId))
    return g ? g.nome : '(sem galpão)'
  }

  const getNomeGalinha = (galinhaId) => {
    if (!galinhaId) return '(não adicionada)'
    const galinha = galinhas.find((g) => String(g.id) === String(galinhaId))
    return galinha ? galinha.nome : '(não adicionada)'
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
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
              <Text style={typography.body}>Galpão: {getNomeGalpao(item.galpaoId)}</Text>
              <Text style={typography.body}>Ocupado: {item.ocupado ? 'Sim' : 'Não'}</Text>
              <Text style={typography.body}>
                Última limpeza: {formatDate(item.ultima_limpeza)} ({diasDesdeLimpeza(item.ultima_limpeza)} dias atrás)
              </Text>
              <Text style={typography.body}>
                Galinha: {getNomeGalinha(item.galinhaId)}
              </Text>
              <Text style={typography.body}>
                Observações: {item.observacoes ? item.observacoes : '(sem observações)'}
              </Text>
            </Card.Content>
            <Card.Actions>
              <ButtonPaper
                mode="outlined"
                textColor={colors.accent}
                style={{ borderColor: colors.accent }}
                onPress={() => navigation.navigate('NinhosForm', { ninho: item })}
              >
                Editar
              </ButtonPaper>
              <ButtonPaper
                mode="contained"
                buttonColor={deleteColor}
                textColor={deleteTextColor}
                onPress={() => deletarNinho(item.id)}
              >
                Deletar
              </ButtonPaper>
            </Card.Actions>
          </Card>
        )}
      />

      <ButtonPaper
        mode="contained"
        icon="plus"
        onPress={() => navigation.navigate('NinhosForm')}
        style={[layout.button, styles.addButton]}
      >
        <Text>Adicionar Ninho</Text>
      </ButtonPaper>
    </View>
  )
}

const styles = StyleSheet.create({
  addButton: { marginTop: 16 },
  title: { marginBottom: 12 },
})
