import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import { galpoesSchema } from '../../schemas/galpoesSchema'
import { adicionarGalpaoThunk, atualizarGalpaoThunk } from '../../redux/thunks/galpoesThunk'
import { layout, typography } from '../../styles/theme'
import Button from '../../components/Button'
import Input from '../../components/Input'
import SwitchField from '../../components/SwitchField'
import DatePickerField from '../../components/DatePickerField'
import TextArea from '../../components/TextArea'
import ChoiceButtonGroup from '../../components/ChoiceButtonGroup'
import SegmentedControl from '../../components/SegmentedControl'

export default function GalpoesForm({ navigation, route }) {
  const dispatch = useDispatch()
  const { galpao } = route.params || {}

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(galpoesSchema),
    defaultValues: {
      nome: '',
      capacidade_maxima_galinhas: '',
      capacidade_maxima_ninhos: '',
      numero_ninhos_ocupados: '',
      area_m2: '',
      tipo_piso: 'terra',
      ventilacao: 'natural',
      iluminacao_automatica: false,
      possui_aquecimento: false,
      ativo: true,
      data_ultima_manutencao: new Date(),
      observacoes: '',
    },
  })

  useEffect(() => {
    if (galpao) reset({ ...galpao, data_ultima_manutencao: new Date(galpao.data_ultima_manutencao) })
  }, [galpao])

  const onSubmit = (data) => {
    const novoGalpao = galpao ? { ...galpao, ...data } : { id: Date.now(), ...data }
    if (galpao) dispatch(atualizarGalpaoThunk(novoGalpao))
    else dispatch(adicionarGalpaoThunk(novoGalpao))
    navigation.goBack()
  }

  return (
    <ScrollView contentContainerStyle={[layout.container, styles.container]}>
      <Text style={[typography.title, styles.title]}>
        {galpao ? 'Editar Galpão' : 'Cadastrar Galpão'}
      </Text>

      <Controller
        control={control}
        name="nome"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Input label="Nome" value={value} onChangeText={onChange} error={error?.message} />
        )}
      />

      <Controller
        control={control}
        name="capacidade_maxima_galinhas"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Input
            label="Capacidade máxima de galinhas"
            value={String(value)}
            onChangeText={(text) => onChange(Number(text))}
            keyboardType="numeric"
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="capacidade_maxima_ninhos"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Input
            label="Capacidade máxima de ninhos"
            value={String(value)}
            onChangeText={(text) => onChange(Number(text))}
            keyboardType="numeric"
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="numero_ninhos_ocupados"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Input
            label="Ninhos ocupados"
            value={String(value)}
            onChangeText={(text) => onChange(Number(text))}
            keyboardType="numeric"
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="area_m2"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Input
            label="Área (m²)"
            value={String(value)}
                      onChangeText={(text) => onChange(Number(text))}
                      keyboardType="numeric"
                      error={error?.message}
                  />
              )}
          />

          <Controller
              control={control}
              name="tipo_piso"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <ChoiceButtonGroup
                      label="Tipo de Piso"
                      value={value}
                      onChange={onChange}
                      options={[
                          { label: 'Terra', value: 'terra' },
                          { label: 'Concreto', value: 'concreto' },
                          { label: 'Serragem', value: 'serragem' },
                      ]}
                  />
              )}
          />

          <Controller
              control={control}
              name="ventilacao"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <SegmentedControl
                      label="Ventilação"
                      value={value}
                      onChange={onChange}
                      options={[
                          { label: 'Natural', value: 'natural' },
                          { label: 'Forçada', value: 'forçada' },
                          { label: 'Exaustão', value: 'exaustão' },
                      ]}
                  />
              )}
          />

      <Controller
        control={control}
        name="iluminacao_automatica"
        render={({ field: { onChange, value } }) => (
          <SwitchField label="Iluminação automática" value={value} onValueChange={onChange} />
        )}
      />

      <Controller
        control={control}
        name="possui_aquecimento"
        render={({ field: { onChange, value } }) => (
          <SwitchField label="Possui aquecimento" value={value} onValueChange={onChange} />
        )}
      />

      <Controller
        control={control}
        name="ativo"
        render={({ field: { onChange, value } }) => (
          <SwitchField label="Ativo" value={value} onValueChange={onChange} />
        )}
      />

      <Controller
        control={control}
        name="data_ultima_manutencao"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <DatePickerField
            label="Data da última manutenção"
            date={value}
            onChange={onChange}
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="observacoes"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextArea label="Observações" value={value} onChangeText={onChange} error={error?.message} />
        )}
      />

      <Button onPress={handleSubmit(onSubmit)}>{galpao ? 'Salvar alterações' : 'Adicionar Galpão'}</Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { paddingBottom: 32 },
  title: { marginBottom: 16 },
})
