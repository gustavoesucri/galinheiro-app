import React, { useEffect } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { Card, Text } from 'react-native-paper'
import ButtonPaper from '../../components/ButtonPaper'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { carregarOvos, removerOvoThunk } from '../../redux/thunks/ovosThunk'
import { carregarGalinhas } from '../../redux/thunks/galinhasThunk'
import { carregarNinhos } from '../../redux/thunks/ninhosThunk'
import { useTema } from '../../hooks/useTema'

export default function OvosList() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const tema = useTema()
  const { layout, typography, colors } = tema
  const ovos = useSelector(state => state.ovos.lista)
  const galinhas = useSelector(state => state.galinhas.lista)
  const ninhos = useSelector(state => state.ninhos.lista)
  const botoesClaros = useSelector(state => state.botaoModo.botoesClaros)
  
  // Cor para botão Remover - laranja fixo ou cor do tema
  const removeColor = botoesClaros ? tema.colors.primaryOrange : tema.colors.primary
  const removeTextColor = botoesClaros ? tema.colors.black : tema.colors.textOnPrimary

  useEffect(() => { 
    dispatch(carregarOvos())
    dispatch(carregarGalinhas())
    dispatch(carregarNinhos())
  }, [dispatch])

  const obterNomeGalinha = (galinhaId) => {
    if (galinhaId === 'desconhecida') return 'Desconhecida'
    const galinha = galinhas.find(g => String(g.id) === String(galinhaId))
    return galinha ? galinha.nome : 'Galinha desconhecida'
  }

  const obterNomeNinho = (ninhoId) => {
    if (!ninhoId) return '(não registrado)'
    const ninho = ninhos.find(n => String(n.id) === String(ninhoId))
    return ninho ? ninho.identificacao : '(não registrado)'
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      <Text style={[typography.title, styles.title]}>Ovos</Text>

      <FlatList
        data={ovos}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20, color: colors.textSecondary }}>
            Nenhum ovo registrado ainda 🥚
          </Text>
        }
        renderItem={({ item }) => (
          <Card style={layout.card}>
            <Card.Title title={`Ovo - ${obterNomeGalinha(item.galinhaId)}`} />
            <Card.Content style={{ gap: 4 }}>
              <Text style={typography.body}>Data: {new Date(item.data).toLocaleDateString()}</Text>
              <Text style={typography.body}>Ninho: {obterNomeNinho(item.ninhoId)}</Text>
              <Text style={typography.body}>Tamanho: {item.tamanho}</Text>
              <Text style={typography.body}>Cor: {item.cor}</Text>
              <Text style={typography.body}>Qualidade: {item.qualidade}</Text>
              <Text style={typography.body}>Observações: {item.observacoes || '(sem observações)'}</Text>
            </Card.Content>
            <Card.Actions>
              <ButtonPaper
                mode="outlined"
                textColor={colors.accent}
                style={{ borderColor: colors.accent }}
                onPress={() => navigation.navigate('OvosForm', { ovo: item })}
              >
                Editar
              </ButtonPaper>
              <ButtonPaper
                mode="contained"
                buttonColor={removeColor}
                textColor={removeTextColor}
                onPress={() => dispatch(removerOvoThunk(item.id))}
              >
                Remover
              </ButtonPaper>
            </Card.Actions>
          </Card>
        )}
      />

      <ButtonPaper
        mode="contained"
        icon="plus"
        onPress={() => navigation.navigate('OvosForm')}
        style={[layout.button, styles.addButton]}
      >
        <Text>Adicionar Ovo</Text>
      </ButtonPaper>
    </View>
  )
}

const styles = StyleSheet.create({
  addButton: { marginTop: 16 },
  title: { marginBottom: 12 },
})
