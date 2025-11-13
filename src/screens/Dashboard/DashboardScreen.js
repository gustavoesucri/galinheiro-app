// src/screens/Dashboard/DashboardScreen.js
import React, { useEffect, useRef, useMemo } from 'react'
import { View, Text, ScrollView, Dimensions, StyleSheet, Animated, Easing } from 'react-native'
import { LineChart, BarChart } from 'react-native-chart-kit'
import { useSelector, useDispatch } from 'react-redux'
import { useTema } from '../../hooks/useTema'
import { carregarGalinhas } from '../../redux/thunks/galinhasThunk'
import { carregarOvos } from '../../redux/thunks/ovosThunk'
import { carregarGalpoes } from '../../redux/thunks/galpoesThunk'
import { carregarNinhos } from '../../redux/thunks/ninhosThunk'
import { carregarMedicoes } from '../../redux/thunks/medicaoAmbienteThunk'

const screenWidth = Dimensions.get('window').width - 32

export default function DashboardScreen() {
  const dispatch = useDispatch()
  const tema = useTema()
  const { colors, typography, layout } = tema

  // Redux selectors
  const galinhas = useSelector(state => state.galinhas.lista)
  const ovos = useSelector(state => state.ovos.lista)
  const galpoes = useSelector(state => state.galpoes.lista)
  const ninhos = useSelector(state => state.ninhos.lista)
  const medicoes = useSelector(state => state.medicoesAmbiente.lista)
  const botoesClaros = useSelector(state => state.botaoModo.botoesClaros)
  
  // Cor dos gráficos - laranja fixo ou cor do tema
  const chartColor = botoesClaros ? tema.colors.primaryOrange : tema.colors.primary

  // Carregar dados ao montar
  useEffect(() => {
    dispatch(carregarGalinhas())
    dispatch(carregarOvos())
    dispatch(carregarGalpoes())
    dispatch(carregarNinhos())
    dispatch(carregarMedicoes())
  }, [dispatch])

  // Animações
  const fadeAnim = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(30)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start()

    Animated.timing(translateY, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
      easing: Easing.out(Easing.exp),
    }).start()
  }, [])

  // Funções auxiliares para datas
  const getToday = () => new Date().toISOString().split('T')[0]
  const getThisWeek = () => {
    const today = new Date()
    const firstDay = new Date(today.setDate(today.getDate() - today.getDay()))
    return firstDay.toISOString().split('T')[0]
  }
  const getThisMonth = () => {
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0]
  }

  // Converter data para string YYYY-MM-DD
  const formatDataToString = (data) => {
    if (!data) return null
    if (typeof data === 'string') return data.split('T')[0] // Se já for string, apenas pega a parte da data
    if (data instanceof Date) return data.toISOString().split('T')[0]
    return null
  }

  // Dados derivados para métricas
  const metricas = useMemo(() => {
    const hoje = getToday()
    const semanaInicio = getThisWeek()
    const mesInicio = getThisMonth()

    const ovosHoje = ovos.filter(o => {
      const dataStr = formatDataToString(o.data)
      return dataStr === hoje
    }).length

    const ovosSemana = ovos.filter(o => {
      const dataStr = formatDataToString(o.data)
      return dataStr && dataStr >= semanaInicio
    }).length

    const ovosMes = ovos.filter(o => {
      const dataStr = formatDataToString(o.data)
      return dataStr && dataStr >= mesInicio
    }).length

    const mediaOvosGalinha = galinhas.length > 0 ? (ovosMes / galinhas.length).toFixed(2) : 0

    return {
      totalGalinhas: galinhas.length,
      ovosHoje,
      ovosSemana,
      ovosMes,
      mediaOvosGalinha,
    }
  }, [ovos, galinhas])

  // Dados para gráfico de ovos por dia da semana
  const dataOvosSemana = useMemo(() => {
    const diasNomes = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
    const contagem = [0, 0, 0, 0, 0, 0, 0]

    ovos.forEach(o => {
      const dataStr = formatDataToString(o.data)
      if (dataStr) {
        const dataOvo = new Date(dataStr)
        const diaSemanaNativo = dataOvo.getDay() === 0 ? 6 : dataOvo.getDay() - 1 // Converte para seg=0, dom=6
        if (diaSemanaNativo >= 0 && diaSemanaNativo < 7) {
          contagem[diaSemanaNativo] += 1
        }
      }
    })

    return {
      labels: diasNomes,
      datasets: [{ data: contagem.length > 0 ? contagem : [0] }],
    }
  }, [ovos])

  // Dados para gráfico de saúde das galinhas
  const dataGalinhaSaude = useMemo(() => {
    const saudeCount = { boa: 0, fragilizada: 0, adoecida: 0 }
    const quarentena = galinhas.filter(g => g.emQuarentena).length

    galinhas.forEach(g => {
      if (!g.emQuarentena) {
        if (g.saude === 'Boa' || g.saude === 'boa') saudeCount.boa += 1
        else if (g.saude === 'Fragilizada' || g.saude === 'fragilizada') saudeCount.fragilizada += 1
        else if (g.saude === 'Adoecida' || g.saude === 'adoecida') saudeCount.adoecida += 1
        else saudeCount.boa += 1 // Padrão: boa
      }
    })

    return {
      labels: ['Boa', 'Fragilizada', 'Adoecida', 'Quarentena'],
      datasets: [{ data: [saudeCount.boa, saudeCount.fragilizada, saudeCount.adoecida, quarentena] }],
    }
  }, [galinhas])

  // Gráfico de temperatura ao longo do tempo (últimas 7 medicoes)
  const dataTemperatura = useMemo(() => {
    const medicoesSorted = medicoes.slice(-7)
    const labels = medicoesSorted.map((_, i) => `${i + 1}º`)
    const temps = medicoesSorted.map(m => m.temperatura || 0)

    return {
      labels: labels.length > 0 ? labels : ['—'],
      datasets: [{ data: temps.length > 0 ? temps : [0] }],
    }
  }, [medicoes])

  const chartConfig = {
    backgroundGradientFrom: colors.surface,
    backgroundGradientTo: colors.surface,
    color: (opacity = 1) => {
      // Extrai RGB da cor do gráfico (hex)
      const hex = chartColor.replace('#', '')
      const r = parseInt(hex.substring(0, 2), 16)
      const g = parseInt(hex.substring(2, 4), 16)
      const b = parseInt(hex.substring(4, 6), 16)
      return `rgba(${r}, ${g}, ${b}, ${opacity})`
    },
    labelColor: (opacity = 1) => {
      // Usa cor do texto primário do tema (claro no dark, escuro nos outros)
      const hex = colors.textPrimary.replace('#', '')
      const r = parseInt(hex.substring(0, 2), 16)
      const g = parseInt(hex.substring(2, 4), 16)
      const b = parseInt(hex.substring(4, 6), 16)
      return `rgba(${r}, ${g}, ${b}, ${opacity})`
    },
    strokeWidth: 2,
    barPercentage: 0.6,
    useShadowColorFromDataset: false,
  }

  // Render
  return (
    <ScrollView style={[layout.container, { backgroundColor: colors.background }]}>
      <Animated.View
        style={[
          styles.animatedContainer,
          { opacity: fadeAnim, transform: [{ translateY }] },
        ]}
      >
        <Text style={[typography.title, styles.title]}>📊 Painel de Produção</Text>

        {/* Cards de Métricas Principais */}
        <View style={styles.cardRow}>
          <View style={[layout.card, styles.card]}>
            <Text style={typography.subtitle}>🐔 Galinhas</Text>
            <Text style={[styles.value, { color: chartColor }]}>{metricas.totalGalinhas}</Text>
            <Text style={typography.small}>Total</Text>
          </View>

          <View style={[layout.card, styles.card]}>
            <Text style={typography.subtitle}>🥚 Ovos Hoje</Text>
            <Text style={[styles.value, { color: chartColor }]}>{metricas.ovosHoje}</Text>
            <Text style={typography.small}>Produzidos</Text>
          </View>
        </View>

        {/* Cards de Resumo Semanal/Mensal */}
        <View style={styles.cardRow}>
          <View style={[layout.card, styles.card]}>
            <Text style={typography.subtitle}>📅 Esta Semana</Text>
            <Text style={[styles.value, { color: chartColor }]}>{metricas.ovosSemana}</Text>
            <Text style={typography.small}>Ovos</Text>
          </View>

          <View style={[layout.card, styles.card]}>
            <Text style={typography.subtitle}>📆 Este Mês</Text>
            <Text style={[styles.value, { color: chartColor }]}>{metricas.ovosMes}</Text>
            <Text style={typography.small}>Ovos</Text>
          </View>
        </View>

        {/* Métrica de Média */}
        <View style={[layout.card, { marginTop: 12, alignItems: 'center' }]}>
          <Text style={typography.subtitle}>📊 Média por Galinha</Text>
          <Text style={[styles.value, { color: chartColor }]}>{metricas.mediaOvosGalinha}</Text>
          <Text style={typography.small}>ovos/galinha este mês</Text>
        </View>

        {/* Gráfico de Produção Semanal */}
        {ovos.length > 0 && (
          <View style={[layout.card, styles.chartCard]}>
            <Text style={typography.subtitle}>📈 Produção por Dia da Semana</Text>
            <LineChart
              data={dataOvosSemana}
              width={screenWidth}
              height={200}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </View>
        )}

        {/* Gráfico de Saúde das Galinhas */}
        {galinhas.length > 0 && (
          <View style={[layout.card, styles.chartCard]}>
            <Text style={typography.subtitle}>❤️ Saúde das Galinhas</Text>
            <BarChart
              data={dataGalinhaSaude}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              showValuesOnTopOfBars
              style={styles.chart}
            />
          </View>
        )}

        {/* Gráfico de Temperatura */}
        {medicoes.length > 0 && (
          <View style={[layout.card, styles.chartCard]}>
            <Text style={typography.subtitle}>🌡️ Temperatura (Últimas 7)</Text>
            <LineChart
              data={dataTemperatura}
              width={screenWidth}
              height={200}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </View>
        )}

        {/* Alertas */}
        {medicoes.some(m => m.temperatura > 30 || m.umidade > 80) && (
          <View style={[layout.card, styles.alertCard]}>
            <Text style={[typography.subtitle, { color: colors.error }]}>⚠️ Alertas</Text>
            {medicoes
              .filter(m => m.temperatura > 30 || m.umidade > 80)
              .slice(0, 3)
              .map((m, idx) => (
                <Text key={idx} style={[typography.body, { color: colors.error, marginTop: 4 }]}>
                  {m.temperatura > 30 && `🌡️ Temperatura alta: ${m.temperatura}°C`}
                  {m.umidade > 80 && `💧 Umidade alta: ${m.umidade}%`}
                </Text>
              ))}
          </View>
        )}
      </Animated.View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  animatedContainer: { flex: 1 },
  title: { marginBottom: 16 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  card: { flex: 1, marginHorizontal: 4, alignItems: 'center', paddingVertical: 12 },
  value: { fontSize: 28, fontWeight: '700', marginVertical: 4 },
  chartCard: { alignItems: 'center', marginTop: 12 },
  chart: { marginTop: 8, borderRadius: 12 },
  alertCard: { borderLeftWidth: 4, marginTop: 12, paddingLeft: 12 },
})
