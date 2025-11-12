// src/screens/Dashboard/DashboardScreen.js
import React from 'react'
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native'
import { LineChart, BarChart } from 'react-native-chart-kit'
import { colors, typography, layout } from '../../styles/theme'

// Dados simulados
const dataOvosSemana = {
  labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
  datasets: [
    { data: [30, 45, 28, 80, 99, 43, 50] },
  ],
}

const dataGalinhaSaude = {
  labels: ['Boa', 'Frágil', 'Adoecida', 'Quarentena'],
  datasets: [{ data: [80, 10, 5, 5] }],
}

const screenWidth = Dimensions.get('window').width - 32

export default function DashboardScreen() {
  return (
    <ScrollView style={layout.container}>
      {/* Título */}
      <Text style={[typography.title, styles.title]}>
        📊 Painel de Produção
      </Text>

      {/* Cards Resumo */}
      <View style={styles.cardRow}>
        <View style={styles.card}>
          <Text style={typography.subtitle}>🐔 Galinhas</Text>
          <Text style={styles.value}>120</Text>
          <Text style={typography.small}>Total</Text>
        </View>

        <View style={styles.card}>
          <Text style={typography.subtitle}>🥚 Ovos Hoje</Text>
          <Text style={styles.value}>48</Text>
          <Text style={typography.small}>Produzidos</Text>
        </View>
      </View>

      {/* Gráfico de ovos da semana */}
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

      {/* Gráfico de saúde das galinhas */}
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
        <Text style={typography.body}>🌡️ Galpão 3: 31°C — verifique ventilação</Text>
        <Text style={typography.body}>💧 Galpão 1: Umidade 82% — risco de mofo</Text>
      </View>
    </ScrollView>
  )
}

// Configuração visual dos gráficos
const chartConfig = {
  backgroundGradientFrom: colors.surface,
  backgroundGradientTo: colors.surface,
  color: (opacity = 1) => `rgba(226, 143, 19, ${opacity})`, // usa o dourado
  labelColor: (opacity = 1) => `rgba(45, 43, 38, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.6,
  useShadowColorFromDataset: false,
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    ...layout.card,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  chartCard: {
    ...layout.card,
    alignItems: 'center',
    marginTop: 12,
  },
  chart: {
    marginTop: 8,
    borderRadius: 12,
  },
  alertCard: {
    ...layout.card,
    backgroundColor: '#FFF8E1',
    borderColor: colors.warning,
    borderWidth: 1,
    marginTop: 12,
  },
})
