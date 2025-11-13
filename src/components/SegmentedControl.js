// src/components/SegmentedControl.js
import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { useTema } from '../hooks/useTema'

export default function SegmentedControl({ label, options = [], value, onChange, style }) {
  const botoesClaros = useSelector(state => state.botaoModo.botoesClaros)
  const tema = useTema()
  const { colors, typography } = tema
  
  // Se botoesClaros=true: usa laranja fixo, senão usa cor do tema
  const selectedColor = botoesClaros ? tema.colors.primaryOrange : tema.colors.primary
  // Texto selecionado: preto no laranja, branco no roxo escuro
  const selectedTextColor = botoesClaros ? tema.colors.black : tema.colors.textOnPrimary

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={[styles.label, { color: colors.textSecondary }, typography.body]}>{label}</Text>}
      <View style={[styles.segmentContainer, { borderColor: colors.border }]}>
        {options.map((option, index) => {
          const selected = value === option.value
          const isFirst = index === 0
          const isLast = index === options.length - 1
          return (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.segment,
                { backgroundColor: selected ? selectedColor : colors.surface },
                isFirst && styles.firstSegment,
                isLast && styles.lastSegment,
              ]}
              onPress={() => onChange(option.value)}
            >
              <Text style={[
                styles.segmentText, 
                { color: selected ? selectedTextColor : colors.textPrimary },
                selected && { fontWeight: 'bold' }
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  segmentContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentText: {
    fontSize: 14,
  },
  firstSegment: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  lastSegment: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
})
