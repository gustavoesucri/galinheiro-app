// src/components/DatePickerField.js
import React from 'react'
import { View, Platform } from 'react-native'
import { Text } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'

export default function DatePickerField({ label, date, onChange, error }) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text>{label}</Text>
      <DateTimePicker
        value={date || new Date()}
        mode="date"
        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        onChange={(event, selectedDate) => {
          const currentDate = selectedDate || date
          onChange(currentDate)
        }}
      />
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </View>
  )
}
