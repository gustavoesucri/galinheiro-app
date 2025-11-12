// src/components/CustomSliderField.js
import React, { useMemo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Slider from '@react-native-community/slider'
import { colors, typography } from '../styles/theme'

export default function CustomSliderField({
  label,
  value = 0,
  onValueChange,
  min = 0,
  max = 100000,
  unit = 'lux',
  error,
}) {
  // posição alvo do "1 lux" no slider (0–1 range)
  const splitPos = 0.2 // <-- 1/5 do slider
  const splitPoint = 1 // valor real (1 lux)
  const logMin = Math.log10(splitPoint)
  const logMax = Math.log10(max)

  // normaliza valor real -> posição no slider (0..1)
  const normalizeValue = useMemo(() => {
    if (value <= splitPoint) {
      // linear 0 → splitPoint  → 0 → splitPos
      return (value / splitPoint) * splitPos
    } else {
      // log de 1→max mapeado de splitPos→1
      const logVal = Math.log10(value)
      const logFrac = (logVal - logMin) / (logMax - logMin)
      return splitPos + logFrac * (1 - splitPos)
    }
  }, [value])

  // converte posição do slider -> valor real
  const handleChange = (sliderVal) => {
    let newVal
    if (sliderVal <= splitPos) {
      // parte linear
      newVal = (sliderVal / splitPos) * splitPoint
    } else {
      // parte logarítmica
      const logFrac = (sliderVal - splitPos) / (1 - splitPos)
      const logVal = logMin + logFrac * (logMax - logMin)
      newVal = Math.pow(10, logVal)
    }
    onValueChange(Math.round(newVal * 10) / 10)
  }

 // Função que retorna cor conforme o valor de lux
const getThumbColor = (lux) => {
  // Normaliza em log, mas "acelera" o claro (coloca 100 ~ 1000 lux)
  const t = Math.min(1, Math.log10(lux + 1) / Math.log10(20000))

  let r, g, b

  if (t < 0.1) {
    // 🌑 Noite profunda — azul escuro quase preto
    const f = t / 0.1
    r = 5 + f * (15 - 5)
    g = 10 + f * (20 - 10)
    b = 75 + f * (50 - 25)
  } else if (t < 0.25) {
    // 🌌 Azul noturno → começo do amanhecer
    const f = (t - 0.1) / 0.15
    r = 15 + f * (120 - 15)
    g = 20 + f * (70 - 20)
    b = 100 + f * (60 - 50)
  } else if (t < 0.5) {
    // 🌅 Amanhecer → dourado quente
    const f = (t - 0.25) / 0.25
    r = 150 + f * (255 - 120)
    g = 90 + f * (210 - 70)
    b = 100 + f * (100 - 40)
  } else if (t < 0.8) {
    // ☀️ Manhã → amarelo claro → branco quente
    const f = (t - 0.5) / 0.3
    r = 255
    g = 210 + f * (240 - 210)
    b = 100 + f * (220 - 100)
  } else {
    // 🌞 Meio-dia — branco puro
    const f = (t - 0.8) / 0.2
    r = 240 + f * (255 - 240)
    g = 240 + f * (255 - 240)
    b = 220 + f * (255 - 220)
  }

  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`
}


  const thumbColor = getThumbColor(value)

  // Gera ticks
  const tickValues = [0, 0.1, 0.5, 1, 10, 100, 1000, 10000, 100000]
  const ticks = tickValues.map((tick) => {
    let pos
    if (tick <= splitPoint) {
      pos = (tick / splitPoint) * splitPos
    } else {
      pos = splitPos + ((Math.log10(tick) - logMin) / (logMax - logMin)) * (1 - splitPos)
    }
    return { label: tick.toLocaleString(), position: pos * 100 }
  })

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>
          {value < 1 ? value.toFixed(1) : Math.round(value).toLocaleString()} {unit}
        </Text>
      </View>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        step={0.001}
        value={normalizeValue}
        onValueChange={handleChange}
        minimumTrackTintColor={colors.border}
        maximumTrackTintColor={colors.border}
        thumbTintColor={thumbColor}
      />

      <View style={styles.ticksContainer}>
        {ticks.map((t) => (
          <View key={t.label} style={[styles.tick, { left: `${t.position}%` }]}>
            <View style={styles.tickMark} />
            <Text style={styles.tickLabel}>{t.label}</Text>
          </View>
        ))}
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 28,
  },
  label: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  valueContainer: {
    alignItems: 'flex-start',
    marginBottom: 4,
    paddingLeft: 10,
  },
  valueText: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  ticksContainer: { // aqui teve que ficar mais ajustado para mobile.
    position: 'relative',
    width: '96%',
    height: 32,
    marginTop: 4,
    left: 6,
  },
  tick: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{ translateX: -8 }],
  },
  tickMark: {
    width: 1.5,
    height: 8,
    backgroundColor: colors.border,
    marginBottom: 2,
  },
  tickLabel: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  error: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
  },
})
