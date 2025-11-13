import React, { useEffect } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { Card, Text, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { carregarGalpoes, removerGalpaoThunk } from '../../redux/thunks/galpoesThunk'
import { useTema } from '../../hooks/useTema'

export default function GalpoesList() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const tema = useTema()
  const { layout, typography, colors } = tema
  const galpoes = useSelector(state => state.galpoes.lista)
  const botoesClaros = useSelector(state => state.botaoModo.botoesClaros)
  
  // Cor para botão Deletar - laranja fixo ou cor do tema
  const deleteColor = botoesClaros ? tema.colors.primaryOrange : tema.colors.primary
  const deleteTextColor = botoesClaros ? tema.colors.black : tema.colors.textOnPrimary

  useEffect(() => {
    dispatch(carregarGalpoes())
  }, [])

  const deletarGalpao = (id) => {
    dispatch(removerGalpaoThunk(id))
  }

  return (
    <View style={layout.container}>
      <Text style={[typography.title, styles.title]}>Galpões</Text>

      <FlatList
        data={galpoes}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20, color: colors.textSecondary }}>
            Nenhum galpão cadastrado ainda 🏠
          </Text>
        }
        renderItem={({ item }) => (
          <Card style={layout.card}>
            <Card.Title title={item.nome} />
            <Card.Content style={{ gap: 4 }}>
              <Text style={typography.body}>Galinhas: {item.capacidade_maxima_galinhas}</Text>
              <Text style={typography.body}>Ninhos: {item.capacidade_maxima_ninhos}</Text>
              <Text style={typography.body}>Ninhos ocupados: {item.numero_ninhos_ocupados}</Text>
              <Text style={typography.body}>Área (m²): {item.area_m2}</Text>
              <Text style={typography.body}>Piso: {item.tipo_piso}</Text>
              <Text style={typography.body}>Ventilação: {item.ventilacao}</Text>
              <Text style={typography.body}>Ativo: {item.ativo ? 'Sim' : 'Não'}</Text>
              <Text style={typography.body}>
                Última manutenção: {new Date(item.data_ultima_manutencao).toLocaleDateString()}
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
                onPress={() => navigation.navigate('GalpoesForm', { galpao: item })}
              >
                Editar
              </Button>
              <Button
                mode="contained"
                buttonColor={deleteColor}
                textColor={deleteTextColor}
                onPress={() => deletarGalpao(item.id)}
              >
                Deletar
              </Button>
            </Card.Actions>
          </Card>
        )}
      />

      <Button
        mode="contained"
        icon="plus"
        onPress={() => navigation.navigate('GalpoesForm')}
        style={[layout.button, styles.addButton]}
      >
        <Text>Adicionar Galpão</Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  addButton: { marginTop: 16 },
  title: { marginBottom: 12 },
})
