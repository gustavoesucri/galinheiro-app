import React, { useEffect } from 'react'
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Card, Text, Button } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
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
  const botoesClaros = useSelector(state => state.botaoModo.botoesClaros)
  const tema = useTema()
  const { layout, typography, colors } = tema
  
  // Cor para botão Deletar - laranja fixo ou cor do tema
  const deleteColor = botoesClaros ? tema.colors.primaryOrange : tema.colors.primary
  const deleteTextColor = botoesClaros ? tema.colors.textOnPrimary : tema.colors.textOnPrimary

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

    const handleAddEgg = () => {
      // Navega para OvosForm com galinha pré-preenchida para adicionar novo ovo
      navigation.navigate('OvosForm', {
        galinha: item, // Passa a galinha completa
        origin: 'GalinhasListAdd'
      })
    }

    // Verifica se há ovos hoje para esta galinha (com validação de data)
    const today = new Date()
    const eggsToday = ovos.filter(ovo => {
      if (ovo.galinhaId !== item.id) return false
      
      try {
        const ovoDate = new Date(ovo.data)
        // Verifica se a data é válida
        if (isNaN(ovoDate.getTime())) return false
        
        return (
          ovoDate.getFullYear() === today.getFullYear() &&
          ovoDate.getMonth() === today.getMonth() &&
          ovoDate.getDate() === today.getDate()
        )
      } catch (error) {
        return false
      }
    })

    const hasEggsToday = eggsToday.length > 0

    return (
      <Card style={layout.card}>
        <Card.Title title={item.nome || 'Sem nome'} />
        <Card.Content style={{ gap: 4 }}>
          <Text style={typography.body}>Saúde: {item.saude || 'Não informada'}</Text>
          <Text style={typography.body}>Raça: {item.raca || 'Não informada'}</Text>
          <Text style={typography.body}>Quarentena: {item.emQuarentena ? 'Sim' : 'Não'}</Text>
          <Text style={typography.body}>Local: {localLabel}</Text>

          {/* Exibe ovos de hoje como ícones clicáveis */}
          {hasEggsToday ? (
            <EggsList
              galinhaId={item.id}
              data={new Date()}
              ovos={ovos}
              onEggPress={handleEggPress}
            />
          ) : (
            <View style={styles.noEggsContainer}>
              <TouchableOpacity 
                onPress={handleAddEgg}
                activeOpacity={0.6}
                style={styles.noEggsTextContainer}
              >
                <Text style={[typography.small, styles.noEggsText]}>
                  Nenhum ovo hoje
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={handleAddEgg}
                style={styles.addEggButton}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons 
                  name="plus-circle" 
                  size={24} 
                  color={botoesClaros ? colors.primaryOrange : colors.primary} 
                />
              </TouchableOpacity>
            </View>
          )}
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
          <Button
            mode="contained"
            buttonColor={deleteColor}
            textColor={deleteTextColor}
            onPress={() => deletarGalinha(item.id)}
          >
            Deletar
          </Button>
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
  noEggsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    marginVertical: 8,
  },
  noEggsTextContainer: {
    flex: 1,
  },
  noEggsText: {
    color: '#8a8a8a',
    fontStyle: 'italic',
  },
  addEggButton: {
    marginLeft: 8,
    padding: 4,
  },
})
