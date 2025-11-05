import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form'
import { layout, typography, colors } from '../../styles/theme'

// Componentes reutilizáveis
import Button from '../../components/Button'
import Input from '../../components/Input'
import Switch from '../../components/Switch'

export default function GalinhasForm({ navigation }) {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      nome: '',
      saude: '',
      ovosHoje: '',
      emQuarentena: false,
      local: '',
    },
  })

  const emQuarentena = watch('emQuarentena')

  const onSubmit = (data) => {
    console.log('📦 Dados enviados:', data)
    navigation.goBack()
  }

  return (
    <ScrollView contentContainerStyle={[layout.container, styles.container]}>
      <Text style={[typography.title, styles.title]}>
        Cadastrar / Atualizar Galinha
      </Text>

      {/* Nome */}
      <Controller
        control={control}
        name="nome"
        rules={{ required: 'Nome é obrigatório' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Input
              label="Nome da Galinha"
              value={value}
              onChangeText={onChange}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />

      {/* Estado de saúde */}
      <Controller
        control={control}
        name="saude"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Estado de Saúde"
            value={value}
            onChangeText={onChange}
            placeholder="Ex: Boa, Fragilizada, Adoecida..."
          />
        )}
      />

      {/* Ovos postos hoje */}
      <Controller
        control={control}
        name="ovosHoje"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Ovos postos hoje"
            keyboardType="numeric"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {/* Quarentena */}
      <View style={styles.switchContainer}>
        <Text style={typography.subtitle}>Está em quarentena?</Text>
        <Controller
          control={control}
          name="emQuarentena"
          render={({ field: { onChange, value } }) => (
            <Switch value={value} onValueChange={onChange} />
          )}
        />
      </View>

      {/* Local */}
      <Controller
        control={control}
        name="local"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Local (Galpão, Campo, Quarentena)"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Button onPress={handleSubmit(onSubmit)}>Salvar</Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 32,
  },
  title: {
    marginBottom: 16,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginBottom: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
})
