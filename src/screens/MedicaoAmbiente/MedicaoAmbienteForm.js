import React, { useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { layout, typography } from '../../styles/theme'
import Button from '../../components/Button'
import NumberInput from '../../components/NumberInput'
import SwitchField from '../../components/SwitchField'
import { adicionarMedicaoThunk, atualizarMedicaoThunk } from '../../redux/thunks/medicaoAmbienteThunk'
import { medicaoAmbienteSchema } from '../../schemas/medicaoAmbienteSchema'
import CustomSelectField from '../../components/CustomSelectField'
import DateTimePickerField from '../../components/DateTimePickerField'

export default function MedicaoAmbienteForm({ navigation, route }) {
  const dispatch = useDispatch()
  const { medicao } = route.params || {}
  const galpoes = useSelector((state) => state.galpoes.lista)

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(medicaoAmbienteSchema),
    defaultValues: {
      data_medicao: new Date(),
      temperatura: 25.0,
      umidade: 50.0,
      luminosidade: 300,
      ventilacao_ativa: false,
      galpao: '',
    },
  })

  useEffect(() => {
    if (medicao) reset({ ...medicao, data_medicao: new Date(medicao.data_medicao) })
  }, [medicao])

  const onSubmit = (data) => {
    const novaMedicao = medicao ? { ...medicao, ...data } : data
    if (medicao) dispatch(atualizarMedicaoThunk(novaMedicao))
    else dispatch(adicionarMedicaoThunk(novaMedicao))
    navigation.goBack()
  }

  return (
    <ScrollView contentContainerStyle={[layout.container, styles.container]}>
      <Text style={[typography.title, styles.title]}>
        {medicao ? 'Editar Medição' : 'Nova Medição'}
      </Text>

      <Controller
  control={control}
  name="data_medicao"
  render={({ field: { onChange, value }, fieldState: { error } }) => (
    <DateTimePickerField
      label="Data e Hora da Medição"
      date={value}
      onChange={onChange}
      error={error?.message}
    />
  )}
/>

      <Controller
        control={control}
        name="temperatura"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <NumberInput
            label="Temperatura (°C)"
            value={value}
            onChange={onChange}
            min={-10}
            max={50}
            step={0.1}
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="umidade"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <NumberInput
            label="Umidade (%)"
            value={value}
            onChange={onChange}
            min={0}
            max={100}
            step={0.1}
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="luminosidade"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <NumberInput
            label="Luminosidade (Lux)"
            value={value}
            onChange={onChange}
            min={0}
            max={2000}
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="ventilacao_ativa"
        render={({ field: { onChange, value } }) => (
          <SwitchField
            label="Ventilação Ativa?"
            value={value}
            onValueChange={onChange}
          />
        )}
      />

      <Controller
  control={control}
  name="galpao"
  render={({ field: { onChange, value }, fieldState: { error } }) => (
    <CustomSelectField
      label="Galpão"
      value={value}
      onValueChange={onChange}
      options={galpoes.map((g) => ({
        label: g.nome,
        value: g.id
      }))}
      error={error?.message}
    />
  )}
/>

      <Button onPress={handleSubmit(onSubmit)}>
        {medicao ? 'Salvar Alterações' : 'Salvar'}
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { paddingBottom: 32 },
  title: { marginBottom: 16 },
})
