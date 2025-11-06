import { View, StyleSheet, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form'
import { layout, typography, colors } from '../../styles/theme'

// Componentes reutilizáveis
import Button from '../../components/Button'
import Input from '../../components/Input'
import SwitchField from '../../components/SwitchField'
import ChoiceButtonGroup from '../../components/ChoiceButtonGroup'
// import SliderInput from '../../components/SliderInput'
import NumberInput from '../../components/NumberInput'
import SelectField from '../../components/SelectField'

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
          <ChoiceButtonGroup
            label="Estado de Saúde"
            options={[
              { label: 'Boa', value: 'Boa' },
              { label: 'Fragilizada', value: 'Fragilizada' },
              { label: 'Adoecida', value: 'Adoecida' },
            ]}
            value={value}
            onChange={onChange}
          />
        )}
      />

      { }

      <Controller
        control={control}
        name="ovosHoje"
        render={({ field: { value, onChange } }) => (
          <NumberInput
            label="Ovos postos hoje"
            value={value || 0}
            onChange={onChange}
            min={0}
            max={2}
          />
        )}
      />

      {/* Quarentena */}
      <Controller
        control={control}
        name="emQuarentena"
        render={({ field: { onChange, value } }) => (
          <SwitchField
            label="Está em quarentena?"
            value={value}
            onValueChange={onChange}
          />
        )}
      />

      {/* Local */}
      <Controller
        control={control}
        name="local"
        defaultValue="galpao" // pré-selecionado como Galpão
        render={({ field: { onChange, value } }) => (
          <SelectField
            label="Local"
            value={value}
            onValueChange={onChange}
            options={[
              { label: 'Galpão', value: 'galpao' },
              { label: 'Campo', value: 'campo' },
              { label: 'Quarentena', value: 'quarentena' },
            ]}
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
