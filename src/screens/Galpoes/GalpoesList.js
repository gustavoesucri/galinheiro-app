import React, { useEffect } from 'react'
import { View, FlatList } from 'react-native'
import { Card, Text, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { carregarGalpoes, removerGalpaoThunk } from '../../redux/thunks/galpoesThunk'
import { layout, typography, colors } from '../../styles/theme'

export default function GalpoesList() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const galpoes = useSelector(state => state.galpoes.lista)

  useEffect(() => {
    dispatch(carregarGalpoes())
  }, [])

  const deletarGalpao = (id) => {
    dispatch(removerGalpaoThunk(id))
  }

  return (
    <View style={layout.container}>
      <Text style={[typography.title, { marginBottom: 12 }]}>Galpões</Text>

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
              <Text style={typography.body}>
                Iluminação automática: {item.iluminacao_automatica ? 'Sim' : 'Não'}
              </Text>
              <Text style={typography.body}>
                Aquecimento: {item.possui_aquecimento ? 'Sim' : 'Não'}
              </Text>
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
              <Button onPress={() => deletarGalpao(item.id)}>Deletar</Button>
            </Card.Actions>
          </Card>
        )}
      />

      <Button
        mode="contained"
        icon="plus"
        onPress={() => navigation.navigate('GalpoesForm')}
        style={{ marginTop: 16 }}
      >
        Adicionar Galpão
      </Button>
    </View>
  )
}
