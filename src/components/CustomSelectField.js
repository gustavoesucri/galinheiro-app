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
import { useTema } from '../hooks/useTema'

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
  const tema = useTema()
  const { colors, typography } = tema
  const [open, setOpen] = useState(false)
  const selectedLabel =
  options.find(o => String(o.value) === String(value))?.label || placeholder


  // LOG PARA DEBUG
  // useEffect(() => {
  //   console.log('CustomSelect: options →', options.map(o => o.label))
  // }, [options])

  return (
    <>
      {/* MODAL DE OPÇÕES */}
      <Modal visible={open} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View style={[styles.modalContent, { zIndex: zIndex + 1000, backgroundColor: colors.surface }]}>
            <FlatList
              data={options}
              keyExtractor={item => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.option, { borderBottomColor: colors.border }]}
                  onPress={() => {
                    onValueChange(item.value)
                    setOpen(false)
                  }}
                >
                  <Text style={[styles.optionText, typography.body, { color: colors.textPrimary }]}>{item.label}</Text>
                </TouchableOpacity>
              )}
              style={styles.list}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* CAMPO VISÍVEL */}
      <View style={{ zIndex, marginBottom: 16 }}>
        {label && <Text style={[styles.label, typography.body, { color: colors.textPrimary }]}>{label}</Text>}
        <TouchableOpacity
          style={[
            styles.field, 
            { 
              borderColor: error ? colors.error : colors.border,
              backgroundColor: colors.surface
            }
          ]}
          onPress={() => setOpen(true)}
        >
          <Text style={[
            styles.fieldText, 
            typography.body,
            { color: value ? colors.textPrimary : colors.textSecondary }
          ]}>
            {selectedLabel}
          </Text>
        </TouchableOpacity>
        {error && <Text style={[styles.error, { color: colors.error }]}>{error}</Text>}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  field: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  fieldText: {},
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  error: {
    fontSize: 12,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
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
  },
  optionText: {},
})