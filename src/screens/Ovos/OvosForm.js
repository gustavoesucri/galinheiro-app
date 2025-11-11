import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, ActivityIndicator, View } from 'react-native'
import { Text } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { ovosSchema } from '../../schemas/ovosSchema'
import { adicionarOvoThunk, atualizarOvoThunk, carregarOvos } from '../../redux/thunks/ovosThunk'
import { carregarGalinhas } from '../../redux/thunks/galinhasThunk'
import { carregarNinhos } from '../../redux/thunks/ninhosThunk'
import { layout, typography } from '../../styles/theme'
import Button from '../../components/Button'
import DatePickerField from '../../components/DatePickerField'
import TextArea from '../../components/TextArea'
import SelectField from '../../components/SelectField'
import ChoiceButtonGroup from '../../components/ChoiceButtonGroup'

export default function OvosForm({ navigation, route }) {
  const dispatch = useDispatch()
  const galinhas = useSelector(state => state.galinhas.lista)
  const ninhos = useSelector(state => state.ninhos.lista)
  const { ovo } = route.params || {}
  const [loading, setLoading] = useState(true)

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(ovosSchema),
    defaultValues: {
      data: new Date(),
      galinha: '',
      ninho: '',
      tamanho: 'Médio',
      cor: 'Branco',
      qualidade: 'Boa',
      observacoes: '',
    }
  })

  // Carrega dados antes de renderizar os selects
  useEffect(() => {
    const carregarDados = async () => {
      await dispatch(carregarGalinhas())
      await dispatch(carregarNinhos())
      setLoading(false)
    }
    carregarDados()
  }, [])

  // Se estivermos editando, preenche os valores do form
  useEffect(() => {
    if (ovo) reset({ ...ovo, data: new Date(ovo.data) })
  }, [ovo])

  const onSubmit = (data) => {
    const novoOvo = ovo ? { ...ovo, ...data } : { id: Date.now(), ...data }
    if (ovo) dispatch(atualizarOvoThunk(novoOvo))
    else dispatch(adicionarOvoThunk(novoOvo))
    navigation.goBack()
  }

  if (loading) {
    return (
      <View style={[layout.container, { justifyContent: 'center', flex: 1 }]}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={[layout.container, styles.container]}>
      <Text style={[typography.title, styles.title]}>
        {ovo ? 'Editar Ovo' : 'Cadastrar Ovo'}
      </Text>

      <Controller
        control={control}
        name="data"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <DatePickerField label="Data da coleta" date={value} onChange={onChange} error={error?.message} />
        )}
      />

          <Controller
              control={control}
              name="galinha"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <SelectField
                      label="Galinha"
                      value={value}
                      onValueChange={onChange}
                      options={galinhas.map(g => ({ label: g.nome, value: g.nome }))}
                      zIndex={3000}
                  />
              )}
          />

          <Controller
              control={control}
              name="ninho"
              render={({ field: { value, onChange } }) => (
                  <SelectField
                      label="Ninho (opcional)"
                      value={value}
                      onValueChange={onChange}
                      options={[{ label: 'Nenhum', value: '' }, ...ninhos.map(n => ({ label: n.identificacao, value: n.identificacao }))]}
                      zIndex={2000}
                  />
              )}
          />

      <Controller
        control={control}
        name="tamanho"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <ChoiceButtonGroup
            label="Tamanho"
            options={[
              { label: 'Pequeno', value: 'Pequeno' },
              { label: 'Médio', value: 'Médio' },
              { label: 'Grande', value: 'Grande' },
              { label: 'Extra', value: 'Extra' },
            ]}
            value={value}
            onChange={onChange}
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="cor"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <ChoiceButtonGroup
            label="Cor"
            options={[
              { label: 'Branco', value: 'Branco' },
              { label: 'Marrom', value: 'Marrom' },
              { label: 'Azul', value: 'Azul' },
              { label: 'Verde', value: 'Verde' },
            ]}
            value={value}
            onChange={onChange}
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="qualidade"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <ChoiceButtonGroup
            label="Qualidade"
            options={[
              { label: 'Boa', value: 'Boa' },
              { label: 'Quebrado', value: 'Quebrado' },
              { label: 'Defeituoso', value: 'Defeituoso' },
            ]}
            value={value}
            onChange={onChange}
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="observacoes"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <TextArea label="Observações" value={value} onChangeText={onChange} error={error?.message} />
        )}
      />

      <Button onPress={handleSubmit(onSubmit)}>
        {ovo ? 'Salvar alterações' : 'Adicionar Ovo'}
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { paddingBottom: 32 },
  title: { marginBottom: 16 },
})
