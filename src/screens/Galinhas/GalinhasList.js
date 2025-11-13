import React, { useEffect } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { Card, Text, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { carregarGalinhas, removerGalinhaThunk } from '../../redux/thunks/galinhasThunk'
import { EggsList } from '../../components/EggIcons'
import { useTema } from '../../hooks/useTema'

const locais = [
  { label: 'Galpão', value: 'galpao' },
  { label: 'Campo', value: 'campo' },
  { label: 'Quarentena', value: 'quarentena' },
]

export default function GalinhasList() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const galinhas = useSelector(state => state.galinhas.lista)
  const ovos = useSelector(state => state.ovos.lista)
  const tema = useTema()
  const { layout, typography, colors } = tema

  useEffect(() => {
    dispatch(carregarGalinhas())
  }, [dispatch])

  const deletarGalinha = (id) => {
    dispatch(removerGalinhaThunk(id))
  }

  const renderItem = ({ item }) => {
    const localLabel = locais.find(l => l.value === item.local)?.label || '(não definido)'

    const handleEggPress = (ovo, galinhaId) => {
      // Navega para OvosForm com o ovo pré-preenchido
      // Origin é 'GalinhasListEdit' para indicar que veio da lista de galinhas
      navigation.navigate('OvosForm', { 
        ovo: ovo,
        origin: 'GalinhasListEdit'
      })
    }

    return (
      <Card style={layout.card}>
        <Card.Title title={item.nome || 'Sem nome'} />
        <Card.Content style={{ gap: 4 }}>
          <Text style={typography.body}>Saúde: {item.saude || 'Não informada'}</Text>
          <Text style={typography.body}>Raça: {item.raca || 'Não informada'}</Text>
          <Text style={typography.body}>Quarentena: {item.emQuarentena ? 'Sim' : 'Não'}</Text>
          <Text style={typography.body}>Local: {localLabel}</Text>

          {/* Exibe ovos de hoje como ícones clicáveis */}
          <EggsList
            galinhaId={item.id}
            data={new Date()}
            ovos={ovos}
            onEggPress={handleEggPress}
          />
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
    )
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
        renderItem={renderItem}
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
