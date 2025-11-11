// src/components/SegmentedControl.js
import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { colors, typography } from '../styles/theme'

export default function SegmentedControl({ label, options = [], value, onChange, style }) {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.segmentContainer}>
        {options.map((option, index) => {
          const selected = value === option.value
          const isFirst = index === 0
          const isLast = index === options.length - 1
          return (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.segment,
                selected && styles.segmentSelected,
                isFirst && styles.firstSegment,
                isLast && styles.lastSegment,
              ]}
              onPress={() => onChange(option.value)}
            >
              <Text style={[styles.segmentText, selected && styles.segmentTextSelected]}>
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
    color: colors.textSecondary,
    marginBottom: 4,
    ...typography.body,
  },
  segmentContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentSelected: {
    backgroundColor: colors.primary,
  },
  segmentText: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  segmentTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
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
