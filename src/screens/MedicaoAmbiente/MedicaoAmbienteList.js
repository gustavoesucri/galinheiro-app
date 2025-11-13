import React, { useEffect } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { Card, Text, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { carregarMedicoes, removerMedicaoThunk } from '../../redux/thunks/medicaoAmbienteThunk'
import { useTema } from '../../hooks/useTema'

export default function MedicaoAmbienteList() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const tema = useTema()
  const { layout, typography, colors } = tema
  const medicoes = useSelector((state) => state.medicoesAmbiente.lista)
  const galpoes = useSelector((state) => state.galpoes.lista)


  useEffect(() => {
    dispatch(carregarMedicoes())
  }, [])

  const deletar = (id) => {
    dispatch(removerMedicaoThunk(id))
  }

const getNomeGalpao = (galpaoId) => {
  if (!galpaoId) return 'Sem galpão'
  const g = galpoes.find((g) => Number(g.id) === Number(galpaoId))
  return g ? g.nome : 'Sem galpão'
}


  const formatarDataHora = (dataStr) => {
    const data = new Date(dataStr)
    return `${data.toLocaleDateString()} ${data.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`
  }

  return (
    <View style={layout.container}>
      <Text style={[typography.title, styles.title]}>Medições Ambientais</Text>

      <FlatList
        data={medicoes}
        keyExtractor={(item) => item.id?.toString()}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20, color: colors.textSecondary }}>
            Nenhuma medição registrada ainda 🌡️
          </Text>
        }
        renderItem={({ item }) => {
          return (
            <Card style={layout.card}>
              <Card.Title
                title={getNomeGalpao(item.galpao)}
                subtitle={formatarDataHora(item.data_medicao)}
              />
              <Card.Content style={{ gap: 4 }}>
                <Text style={typography.body}>Temperatura: {item.temperatura} °C</Text>
                <Text style={typography.body}>Umidade: {item.umidade} %</Text>
                <Text style={typography.body}>Luminosidade: {item.luminosidade} Lux</Text>
                <Text style={typography.body}>
                  Ventilação ativa: {item.ventilacao_ativa ? 'Sim' : 'Não'}
                </Text>
              </Card.Content>
              <Card.Actions>
                <Button
                  mode="outlined"
                  textColor={colors.accent}
                  style={{ borderColor: colors.accent }}
                  onPress={() => navigation.navigate('MedicaoAmbienteForm', { medicao: item })}
                >
                  Editar
                </Button>
                <Button onPress={() => deletar(item.id)}>Deletar</Button>
              </Card.Actions>
            </Card>
          )
        }}
      />

      <Button
        mode="contained"
        icon="plus"
        onPress={() => navigation.navigate('MedicaoAmbienteForm')}
        style={[layout.button, styles.addButton]}
      >
        <Text>Nova Medição</Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  addButton: { marginTop: 16 },
  title: { marginBottom: 12 },
})
