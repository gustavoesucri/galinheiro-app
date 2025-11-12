// src/components/CustomSelectField.js
import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { colors, typography } from '../styles/theme'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

export default function CustomSelectField({
  label,
  value,
  onValueChange,
  options = [],
  placeholder = 'Selecione...',
  zIndex = 1,
  error,
}) {
  const [open, setOpen] = useState(false)
  const selectedLabel =
  options.find(o => String(o.value) === String(value))?.label || placeholder


  // LOG PARA DEBUG
  useEffect(() => {
    console.log('CustomSelect: options →', options.map(o => o.label))
  }, [options])

  return (
    <>
      {/* MODAL DE OPÇÕES */}
      <Modal visible={open} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View style={[styles.modalContent, { zIndex: zIndex + 1000 }]}>
            <FlatList
              data={options}
              keyExtractor={item => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onValueChange(item.value)
                    setOpen(false)
                  }}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
              style={styles.list}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* CAMPO VISÍVEL */}
      <View style={{ zIndex, marginBottom: 16 }}>
        {label && <Text style={styles.label}>{label}</Text>}
        <TouchableOpacity
          style={[styles.field, error && styles.fieldError]}
          onPress={() => setOpen(true)}
        >
          <Text style={[styles.fieldText, !value && styles.placeholder]}>
            {selectedLabel}
          </Text>
        </TouchableOpacity>
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  field: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 12,
    backgroundColor: colors.surface,
  },
  fieldText: {
    ...typography.body,
    color: colors.textPrimary,
  },
  placeholder: {
    color: colors.textSecondary,
  },
  fieldError: {
    borderColor: 'red',
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
    ...typography.body,
  },
  error: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    maxHeight: SCREEN_HEIGHT * 0.6,
    width: '90%',
    padding: 16,
  },
  list: {
    maxHeight: SCREEN_HEIGHT * 0.5,
  },
  option: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  optionText: {
    ...typography.body,
    color: colors.textPrimary,
  },
})