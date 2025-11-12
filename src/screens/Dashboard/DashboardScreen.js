// src/screens/Dashboard/DashboardScreen.js
import React, { useEffect, useRef, useMemo } from 'react'
import { View, Text, ScrollView, Dimensions, StyleSheet, Animated, Easing } from 'react-native'
import { LineChart, BarChart } from 'react-native-chart-kit'
import { useSelector, useDispatch } from 'react-redux'
import { colors, typography, layout } from '../../styles/theme'
import { carregarGalinhas } from '../../redux/thunks/galinhasThunk'
import { carregarOvos } from '../../redux/thunks/ovosThunk'
import { carregarGalpoes } from '../../redux/thunks/galpoesThunk'
import { carregarNinhos } from '../../redux/thunks/ninhosThunk'
import { carregarMedicoes } from '../../redux/thunks/medicaoAmbienteThunk'

const screenWidth = Dimensions.get('window').width - 32

export default function DashboardScreen() {
  const dispatch = useDispatch()

  // Redux selectors
  const galinhas = useSelector(state => state.galinhas.lista)
  const ovos = useSelector(state => state.ovos.lista)
  const galpoes = useSelector(state => state.galpoes.lista)
  const ninhos = useSelector(state => state.ninhos.lista)
  const medicoes = useSelector(state => state.medicoesAmbiente.lista)

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

  // Dados derivados para gráficos
  const dataOvosSemana = useMemo(() => {
    // Soma ovos por dia (simulado com 7 dias)
    const dias = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
    const data = dias.map((_, idx) => ovos.filter(o => o.diaSemana === idx).length)
    return { labels: dias, datasets: [{ data }] }
  }, [ovos])

  const dataGalinhaSaude = useMemo(() => {
    const saudeCount = { boa: 0, fragil: 0, adoecida: 0, quarentena: 0 }
    galinhas.forEach(g => {
      if (g.quarentena) saudeCount.quarentena += 1
      else if (g.saude === 'boa') saudeCount.boa += 1
      else if (g.saude === 'fragil') saudeCount.fragil += 1
      else if (g.saude === 'adoecida') saudeCount.adoecida += 1
    })
    return {
      labels: ['Boa', 'Frágil', 'Adoecida', 'Quarentena'],
      datasets: [{ data: [saudeCount.boa, saudeCount.fragil, saudeCount.adoecida, saudeCount.quarentena] }],
    }
  }, [galinhas])

  // Render
  return (
    <ScrollView style={layout.container}>
      <Animated.View
        style={[
          styles.animatedContainer,
          { opacity: fadeAnim, transform: [{ translateY }] },
        ]}
      >
        <Text style={[typography.title, styles.title]}>📊 Painel de Produção</Text>

        {/* Cards */}
        <View style={styles.cardRow}>
          <View style={styles.card}>
            <Text style={typography.subtitle}>🐔 Galinhas</Text>
            <Text style={styles.value}>{galinhas.length}</Text>
            <Text style={typography.small}>Total</Text>
          </View>

          <View style={styles.card}>
            <Text style={typography.subtitle}>🥚 Ovos Hoje</Text>
            <Text style={styles.value}>{ovos.filter(o => o.dia === new Date().getDate()).length}</Text>
            <Text style={typography.small}>Produzidos</Text>
          </View>
        </View>

        {/* Gráficos */}
        <View style={styles.chartCard}>
          <Text style={typography.subtitle}>📈 Produção Semanal de Ovos</Text>
          <LineChart
            data={dataOvosSemana}
            width={screenWidth}
            height={200}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.chartCard}>
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

        {/* Alertas */}
        <View style={styles.alertCard}>
          <Text style={typography.subtitle}>⚠️ Alertas</Text>
          {medicoes
            .filter(m => m.temperatura > 30 || m.umidade > 80)
            .map((m, idx) => (
              <Text key={idx} style={typography.body}>
                {m.galpao ? `🌡️ ${m.galpao}: ` : ''}
                {m.temperatura > 30 ? `${m.temperatura}°C` : ''}
                {m.umidade > 80 ? ` — Umidade ${m.umidade}%` : ''}
              </Text>
            ))}
        </View>
      </Animated.View>
    </ScrollView>
  )
}

const chartConfig = {
  backgroundGradientFrom: colors.surface,
  backgroundGradientTo: colors.surface,
  color: (opacity = 1) => `rgba(226, 143, 19, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(45, 43, 38, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.6,
  useShadowColorFromDataset: false,
}

const styles = StyleSheet.create({
  animatedContainer: { flex: 1 },
  title: { marginBottom: 16 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between' },
  card: { ...layout.card, flex: 1, marginHorizontal: 4, alignItems: 'center' },
  value: { fontSize: 24, fontWeight: '700', color: colors.primary },
  chartCard: { ...layout.card, alignItems: 'center', marginTop: 12 },
  chart: { marginTop: 8, borderRadius: 12 },
  alertCard: { ...layout.card, backgroundColor: '#FFF8E1', borderColor: colors.warning, borderWidth: 1, marginTop: 12 },
})
