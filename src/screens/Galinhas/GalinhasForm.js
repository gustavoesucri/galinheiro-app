import { View, StyleSheet, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { layout, typography } from '../../styles/theme'

import Button from '../../components/Button'
import Input from '../../components/Input'
import SwitchField from '../../components/SwitchField'
import ChoiceButtonGroup from '../../components/ChoiceButtonGroup'
import NumberInput from '../../components/NumberInput'

import { galinhaSchema } from '../../schemas/galinhaSchema'
import { useDispatch } from 'react-redux'
import { adicionarGalinhaThunk, atualizarGalinhaThunk } from '../../redux/thunks/galinhasThunk'
import RadioButtonGroup from '../../components/RadioButtonGroup'

export default function GalinhasForm({ route, navigation }) {
  const galinha = route?.params?.galinha
  const dispatch = useDispatch()

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(galinhaSchema),
    defaultValues: galinha || {
      nome: '',
      saude: '',
      ovosHoje: 0,
      emQuarentena: false,
      local: 'galpao',
    },
  })

  const onSubmit = (data) => {
    if (galinha?.id) {
      dispatch(atualizarGalinhaThunk({ ...data, id: galinha.id }))
    } else {
      dispatch(adicionarGalinhaThunk(data))
    }
    navigation.goBack()
  }

  return (
    <ScrollView contentContainerStyle={[layout.container, styles.container]}>
      <Text style={[typography.title, styles.title]}>
        {galinha ? 'Editar Galinha' : 'Cadastrar Galinha'}
      </Text>

      <Controller
        control={control}
        name="nome"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Input label="Nome da Galinha" value={value} onChangeText={onChange} error={error?.message} />
        )}
      />

      <Controller
        control={control}
        name="saude"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <ChoiceButtonGroup
            label="Estado de Saúde"
            options={[
              { label: 'Boa', value: 'Boa' },
              { label: 'Fragilizada', value: 'Fragilizada' },
              { label: 'Adoecida', value: 'Adoecida' },
            ]}
            value={value}
            onChange={onChange}
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="ovosHoje"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <NumberInput label="Ovos postos hoje" value={value || 0} onChange={onChange} min={0} max={2} error={error?.message} />
        )}
      />

      <Controller
        control={control}
        name="emQuarentena"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <SwitchField label="Está em quarentena?" value={value} onValueChange={onChange} error={error?.message} />
        )}
      />

      <Controller
  control={control}
  name="local"
  render={({ field: { value, onChange }, fieldState: { error } }) => (
    <RadioButtonGroup
      label="Tipo de ambiente"
      value={value}
      onChange={onChange}
      options={[
        { label: 'Galpão', value: 'galpao' },
        { label: 'Campo', value: 'campo' },
        { label: 'Quarentena', value: 'quarentena' },
      ]}
    />
  )}
/>

      <Button onPress={handleSubmit(onSubmit)}>
        {galinha ? 'Salvar Alterações' : 'Salvar'}
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { paddingBottom: 32 },
  title: { marginBottom: 16 },
})
