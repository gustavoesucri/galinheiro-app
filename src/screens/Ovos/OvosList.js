import React, { useEffect } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { Card, Text, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { layout, typography, colors } from '../../styles/theme'
import { carregarOvos, removerOvoThunk } from '../../redux/thunks/ovosThunk'

export default function OvosList() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const ovos = useSelector(state => state.ovos.lista)
  const galinhas = useSelector(state => state.galinhas.lista)

  useEffect(() => { 
    dispatch(carregarOvos()) 
  }, [dispatch])

  const obterNomeGalinha = (galinhaId) => {
    return galinhas.find(g => g.id === galinhaId)?.nome || 'Galinha desconhecida'
  }

  return (
    <View style={layout.container}>
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
              <Text style={typography.body}>Ninho: {item.ninho || '(não registrado)'}</Text>
              <Text style={typography.body}>Tamanho: {item.tamanho}</Text>
              <Text style={typography.body}>Cor: {item.cor}</Text>
              <Text style={typography.body}>Qualidade: {item.qualidade}</Text>
              <Text style={typography.body}>Observações: {item.observacoes || '(sem observações)'}</Text>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="outlined"
                textColor={colors.accent}
                style={{ borderColor: colors.accent }}
                onPress={() => navigation.navigate('OvosForm', { ovo: item })}
              >
                Editar
              </Button>
              <Button onPress={() => dispatch(removerOvoThunk(item.id))}>
                Remover
              </Button>
            </Card.Actions>
          </Card>
        )}
      />

      <Button
        mode="contained"
        icon="plus"
        onPress={() => navigation.navigate('OvosForm')}
        style={[layout.button, styles.addButton]}
      >
        <Text>Adicionar Ovo</Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  addButton: { marginTop: 16 },
  title: { marginBottom: 12 },
})
