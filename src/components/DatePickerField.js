import React, { useState } from 'react'
import { View, Platform, Button as RNButton } from 'react-native'
import { Text } from 'react-native-paper'
import { DatePickerModal } from 'react-native-paper-dates'

export default function DatePickerField({ label, date, onChange, error }) {
  const [open, setOpen] = useState(false)

  // Garante que date seja Date object
  const handleChange = (d) => {
    const newDate = d instanceof Date ? d : new Date(d)
    onChange(newDate)
  }

  if (Platform.OS === 'web') {
    return (
      <View style={{ marginBottom: 16 }}>
        <Text>{label}</Text>
        <input
          type="date"
          value={date ? date.toISOString().substr(0, 10) : ''}
          onChange={e => handleChange(e.target.value)}
          style={{ padding: 8, marginTop: 4 }}
        />
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
      </View>
    )
  }

  return (
    <View style={{ marginBottom: 16 }}>
      <Text>{label}</Text>
      <RNButton
        title={date ? date.toLocaleDateString() : 'Selecionar data'}
        onPress={() => setOpen(true)}
      />
      <DatePickerModal
        locale="pt"
        mode="single"
        visible={open}
        date={date}
        onDismiss={() => setOpen(false)}
        onConfirm={(d) => {
          setOpen(false)
          handleChange(d)
        }}
      />
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </View>
  )
}
