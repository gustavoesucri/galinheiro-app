// src/components/SelectField.js
import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { colors, typography } from '../styles/theme'

export default function SelectField({ label, value, onValueChange, options = [], style }) {
    const [open, setOpen] = useState(false)
    const [items, setItems] = useState(options)

    return (
        <View style={[styles.container, style]}>
            {label && <Text style={styles.label}>{label}</Text>}

            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={(callback) => {
                    const val = callback(value) // executa a função interna e obtém o novo valor
                    onValueChange(val) // envia o valor limpo pro form
                }}
                setItems={setItems}
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                textStyle={[styles.text, { color: colors.accent }]}
                labelStyle={{ color: colors.textPrimary }}
            />
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        zIndex: 1000, // necessário para dropdown sobre outros componentes
    },
    label: {
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: 4,
        ...typography.body,
    },
    dropdown: {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderRadius: 8,
        height: 50,
    },
    dropdownContainer: {
        backgroundColor: colors.surface,
        borderColor: colors.border,
    },
    text: {
        color: colors.textPrimary,
    },
})
