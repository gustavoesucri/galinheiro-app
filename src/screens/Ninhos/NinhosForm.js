import { ScrollView, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form'
import { layout, typography } from '../../styles/theme'
import Button from '../../components/Button'
import Input from '../../components/Input'
import SwitchField from '../../components/SwitchField'
import SelectField from '../../components/SelectField'
import DatePickerField from '../../components/DatePickerField'
import TextArea from '../../components/TextArea'
import { yupResolver } from '@hookform/resolvers/yup'
import { ninhosSchema } from '../../schemas/ninhosSchema'
import { useDispatch, useSelector } from 'react-redux'
import { adicionarNinhoThunk } from '../../redux/thunks/ninhosThunk'

export default function NinhosForm({ navigation }) {
  const dispatch = useDispatch()
  const galinhas = useSelector(state => state.galinhas.lista)

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(ninhosSchema),
    defaultValues: {
      identificacao: '',
      tipo_material: 'Palha',
      localizacao: '',
      ocupado: false,
      ultima_limpeza: new Date(),
      observacoes: '',
      galinha: '',
    }
  })

  const onSubmit = (data) => {
    const ninho = { id: Date.now(), ...data }
    dispatch(adicionarNinhoThunk(ninho))
    navigation.goBack()
  }

  return (
    <ScrollView contentContainerStyle={[layout.container, styles.container]}>
      <Text style={[typography.title, styles.title]}>Cadastrar / Atualizar Ninho</Text>

      <Controller
        control={control}
        name="identificacao"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Input label="Identificação" value={value} onChangeText={onChange} error={error?.message} />
        )}
      />

      <Controller
        control={control}
        name="tipo_material"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <SelectField
            label="Tipo de Material"
            value={value}
            onValueChange={onChange}
            options={[
              { label: 'Palha', value: 'Palha' },
              { label: 'Serragem', value: 'Serragem' },
              { label: 'Plástico', value: 'Plástico' },
            ]}
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="localizacao"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Input label="Localização" value={value} onChangeText={onChange} error={error?.message} />
        )}
      />

      <Controller
        control={control}
        name="ocupado"
        render={({ field: { onChange, value } }) => (
          <SwitchField label="Ocupado?" value={value} onValueChange={onChange} />
        )}
      />

      <Controller
        control={control}
        name="ultima_limpeza"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <DatePickerField label="Última Limpeza" date={value} onChange={onChange} error={error?.message} />
        )}
      />

      <Controller
        control={control}
        name="observacoes"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextArea label="Observações" value={value} onChangeText={onChange} error={error?.message} />
        )}
      />

      <Controller
        control={control}
        name="galinha"
        render={({ field: { onChange, value } }) => (
          <SelectField
            label="Galinha (opcional)"
            value={value}
            onValueChange={onChange}
            options={[{ label: 'Nenhuma', value: '' }, ...galinhas.map(g => ({ label: g.nome, value: g.nome }))]}
          />
        )}
      />

      <Button onPress={handleSubmit(onSubmit)}>Salvar</Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { paddingBottom: 32 },
  title: { marginBottom: 16 },
})
