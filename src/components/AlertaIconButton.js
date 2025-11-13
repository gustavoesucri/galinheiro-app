import React, { useMemo } from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { useTema } from '../hooks/useTema'
import { useNavigation } from '@react-navigation/native'

export default function AlertaIconButton() {
  const tema = useTema()
  const navigation = useNavigation()
  const medicoes = useSelector(state => state.medicoesAmbiente.lista)
  const ninhos = useSelector(state => state.ninhos.lista)
  const galinhas = useSelector(state => state.galinhas.lista)
  const configAlertas = useSelector(state => state.alertas)

  // Verificar se há alertas na última semana
  const temAlertasRecentes = useMemo(() => {
    const hoje = new Date()
    const umaSemanaAtras = new Date(hoje.getTime() - 7 * 24 * 60 * 60 * 1000)

    // Verificar alertas de medições
    const alertasMedicoes = medicoes.some((m) => {
      const dataMedicao = new Date(m.data_medicao)
      if (dataMedicao >= umaSemanaAtras) {
        return (
          (configAlertas.alertaTemperaturaAlta && m.temperatura > configAlertas.temperaturaAlta) ||
          (configAlertas.alertaTemperaturaBaixa && m.temperatura < configAlertas.temperaturaBaixa) ||
          (configAlertas.alertaUmidadeAlta && m.umidade > configAlertas.umidadeAlta) ||
          (configAlertas.alertaUmidadeBaixa && m.umidade < configAlertas.umidadeBaixa) ||
          (configAlertas.alertaVentilacaoDesativada && m.usa_ventilacao && !m.ventilacao_ativa)
        )
      }
      return false
    })

    // Verificar alertas de ninhos
    const alertasNinhos = ninhos.some((n) => {
      if (configAlertas.alertaDiasSemLimpeza) {
        const ultimaLimpeza = new Date(n.ultima_limpeza)
        const diasSemLimpeza = Math.floor((hoje - ultimaLimpeza) / (1000 * 60 * 60 * 24))
        return diasSemLimpeza >= configAlertas.diasSemLimpeza
      }
      return false
    })

    // Verificar alertas de galinhas adoecidas
    let alertasGalinhas = false
    if (configAlertas.alertaGalinhasAdoecidas && galinhas.length > 0) {
      const galinhasAdoecidas = galinhas.filter(g => 
        g.saude === 'Adoecida' || g.saude === 'adoecida'
      ).length
      const percentualAdoecidas = (galinhasAdoecidas / galinhas.length) * 100
      alertasGalinhas = percentualAdoecidas >= configAlertas.percentualGalinhasAdoecidas
    }

    // Verificar alertas de idade máxima das galinhas
    let alertasIdade = false
    if (configAlertas.alertaIdadeMaximaGalinhas && galinhas.length > 0) {
      alertasIdade = galinhas.some((g) => {
        if (g.data_nascimento) {
          const nascimento = new Date(g.data_nascimento)
          const idadeEmDias = Math.floor((hoje - nascimento) / (1000 * 60 * 60 * 24))
          return idadeEmDias >= configAlertas.idadeMaximaGalinhas
        }
        return false
      })
    }

    return alertasMedicoes || alertasNinhos || alertasGalinhas || alertasIdade
  }, [medicoes, ninhos, galinhas, configAlertas])

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('MainTabs', {
        screen: 'Dashboard',
        params: { scrollToAlertas: true }
      })}
      style={styles.container}
    >
      <View>
        <MaterialCommunityIcons
          name="alert"
          size={24}
          color={tema.colors.textPrimary}
        />
        {temAlertasRecentes && <View style={[styles.badge, { backgroundColor: tema.colors.error }]} />}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginRight: 8,
    padding: 4,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: 'white',
  },
})
