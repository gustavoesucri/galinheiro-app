// src/components/SelectField.js
import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Dimensions,
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { useTema } from '../hooks/useTema'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

export default function SelectField({
  label,
  value,
  onValueChange,
  options = [],
  style,
  zIndex: propZIndex = 1,
}) {
  const tema = useTema()
  const { colors, typography } = tema
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState(options)

  // Fecha ao clicar fora
  const closeDropdown = () => setOpen(false)

  return (
    <>
      {/* Overlay que cobre a tela inteira quando aberto */}
      <Modal
        visible={open}
        transparent
        animationType="none"
        onRequestClose={closeDropdown} // Android back button
      >
        <TouchableWithoutFeedback onPress={closeDropdown}>
          <View style={[styles.overlay, { zIndex: propZIndex + 999 }]} />
        </TouchableWithoutFeedback>
      </Modal>

      {/* O campo em si */}
      <View style={[styles.container, style, { zIndex: propZIndex }]}>
        {label && <Text style={[styles.label, { color: colors.textSecondary }, typography.body]}>{label}</Text>}

        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={(callback) => {
            const val = callback(value)
            onValueChange(val)
          }}
          setItems={setItems}
          style={[styles.dropdown, { backgroundColor: colors.surface, borderColor: colors.border }]}
          dropDownContainerStyle={[
            styles.dropdownContainer,
            { 
              zIndex: propZIndex + 1000,
              backgroundColor: colors.surface,
              borderColor: colors.border
            },
          ]}
          textStyle={[styles.text, { color: colors.accent }]}
          labelStyle={{ color: colors.textPrimary }}
          zIndex={propZIndex + 1000}
          zIndexInverse={propZIndex + 900}
          // Evita que cliques no dropdown fechem o overlay
          containerProps={{ pointerEvents: 'box-none' }}
        />
      </View>
    </>
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
  dropdown: {
    borderRadius: 8,
    height: 50,
  },
  dropdownContainer: {
    borderRadius: 8,
    maxHeight: 200,
  },
  text: {},
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    height: SCREEN_HEIGHT * 2, // garante cobertura total mesmo com scroll
  },
})


/* 
SE HOUVER CONFLITOS DE SOBREPOSIÇÃO, LEMBRE-SE DE USAR Z-INDEX NOS CONTROLLER, ASSIM:

<SelectField label="País" options={countries} zIndex={3000} />
<SelectField label="Estado" options={states} zIndex={2000} />
<SelectField label="Cidade" options={cities} zIndex={1000} />
*/