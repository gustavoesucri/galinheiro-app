// src/screens/Dashboard/DashboardScreen.js
import React, { useEffect, useRef } from 'react'
import {
  View,
  Text,
  ScrollView,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { colors, typography } from '../../styles/theme'

const DashboardScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(20)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Animated.View
        style={[
          styles.container,
          { opacity: fadeAnim, transform: [{ translateY }] },
        ]}
      >
        <Text style={styles.title}>📊 Dashboard do Sistema</Text>

        {/* 🐔 Galinhas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🐔 Galinhas</Text>
          <View style={styles.cardRow}>
            <Card label="Total" value="842" />
            <Card label="Saúde Boa" value="720" />
            <Card label="Fragilizadas" value="92" />
          </View>
          <View style={styles.cardRow}>
            <Card label="Adoecidas" value="30" />
            <Card label="Em Quarentena" value="12" />
            <Card label="Média Ovos/dia" value="3.8" />
          </View>
        </View>

        {/* 🥚 Ovos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🥚 Ovos</Text>
          <View style={styles.cardRow}>
            <Card label="Hoje" value="2.540" />
            <Card label="7 dias" value="17.380" />
            <Card label="30 dias" value="72.900" />
          </View>
          <View style={styles.cardRow}>
            <Card label="Bons" value="96%" />
            <Card label="Quebrados" value="3%" />
            <Card label="Defeituosos" value="1%" />
          </View>
        </View>

        {/* 🪶 Ninhos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🪶 Ninhos</Text>
          <View style={styles.cardRow}>
            <Card label="Total" value="320" />
            <Card label="Ocupados" value="250" />
            <Card label="Livres" value="70" />
          </View>
        </View>

        {/* 🏠 Galpões */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏠 Galpões</Text>
          <View style={styles.cardRow}>
            <Card label="Ativos" value="8" />
            <Card label="Cap. Galinhas" value="1200" />
            <Card label="Ocupação" value="85%" />
          </View>
        </View>

        {/* 🌡️ Ambiente */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌡️ Ambiente</Text>
          <View style={styles.cardRow}>
            <Card label="Temperatura" value="27.4°C" />
            <Card label="Umidade" value="62%" />
            <Card label="Luminosidade" value="850 lx" />
          </View>
        </View>

        {/* 📈 Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📈 Insights</Text>
          <View style={styles.cardRow}>
            <Card label="Produtividade" value="Alta ⬆️" />
            <Card label="Tendência" value="+4% semana" />
            <Card label="Alertas" value="1 galpão > 30°C" highlight />
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  )
}

const Card = ({ label, value, highlight }) => (
  <View
    style={[
      styles.card,
      highlight && { backgroundColor: colors.warning, borderColor: colors.warningDark },
    ]}
  >
    <Text style={styles.cardLabel}>{label}</Text>
    <Text style={styles.cardValue}>{value}</Text>
  </View>
)

const styles = StyleSheet.create({
  scroll: { padding: 16, backgroundColor: colors.background },
  container: { flex: 1 },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
  },
  section: { marginBottom: 24 },
  sectionTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  card: {
    flexBasis: '30%',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    marginVertical: 6,
    elevation: 2,
  },
  cardLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  cardValue: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
})

export default DashboardScreen
