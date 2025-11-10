import { View, StyleSheet, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form'
import { layout, typography, colors } from '../../styles/theme'

// Componentes reutilizáveis
import Button from '../../components/Button'
import Input from '../../components/Input'
import SwitchField from '../../components/SwitchField'
import ChoiceButtonGroup from '../../components/ChoiceButtonGroup'
import NumberInput from '../../components/NumberInput'
import SelectField from '../../components/SelectField'

// Validação Yup
import { yupResolver } from '@hookform/resolvers/yup'
import { galinhaSchema } from '../../schemas/galinhaSchema'

export default function GalinhasForm({ navigation }) {
  // Configuração do react-hook-form com Yup
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }, // contém os erros do formulário
  } = useForm({
    resolver: yupResolver(galinhaSchema),
    defaultValues: {
      nome: '',
      saude: '',
      ovosHoje: 0,
      emQuarentena: false,
      local: 'galpao', // pré-selecionado como Galpão
    },
  })

  const emQuarentena = watch('emQuarentena')

  // Função chamada ao enviar o formulário
  const onSubmit = (data) => {
    console.log('📦 Dados enviados:', data)
    navigation.goBack()
  }

  const onError = (errors) => {
    console.log('❌ Erros de validação:', errors)
    console.log('🧩 Valores atuais:', watch())
  }

  return (
    <ScrollView contentContainerStyle={[layout.container, styles.container]}>
      <Text style={[typography.title, styles.title]}>
        Cadastrar / Atualizar Galinha
      </Text>

      {/* Nome da galinha */}
      <Controller
        control={control}
        name="nome"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Input
            label="Nome da Galinha"
            value={value}
            onChangeText={onChange}
            error={error?.message} // mostra erro se houver
          />
        )}
      />

      {/* Estado de saúde */}
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
            error={error?.message} // mensagem de validação
          />
        )}
      />

      {/* Ovos postos hoje */}
      <Controller
        control={control}
        name="ovosHoje"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <NumberInput
            label="Ovos postos hoje"
            value={value || 0}
            onChange={onChange}
            min={0}
            max={2}
            error={error?.message} // mensagem de validação
          />
        )}
      />

      {/* Quarentena */}
      <Controller
        control={control}
        name="emQuarentena"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <SwitchField
            label="Está em quarentena?"
            value={value}
            onValueChange={onChange}
            error={error?.message} // mensagem de validação
          />
        )}
      />

      {/* Localização */}
      <Controller
        control={control}
        name="local"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <SelectField
            label="Local"
            value={value}
            onValueChange={onChange}
            options={[
              { label: 'Galpão', value: 'galpao' },
              { label: 'Campo', value: 'campo' },
              { label: 'Quarentena', value: 'quarentena' },
            ]}
            error={error?.message} // mensagem de validação
          />
        )}
      />

      {/* Botão de salvar */}
      <Button onPress={handleSubmit(onSubmit, onError)}>Salvar</Button>
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
})
