import React, { useEffect, useState } from 'react'
import { View, FlatList, StyleSheet, Alert } from 'react-native'
import { Card, Text, Dialog, Portal } from 'react-native-paper'
import ButtonPaper from '../../components/ButtonPaper'
import DialogButton from '../../components/DialogButton'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { carregarGalpoes, removerGalpaoThunk, atualizarGalpaoThunk } from '../../redux/thunks/galpoesThunk'
import { carregarNinhos } from '../../redux/thunks/ninhosThunk'
import { useTema } from '../../hooks/useTema'

export default function GalpoesList() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const tema = useTema()
  const { layout, typography, colors } = tema
  const galpoes = useSelector(state => state.galpoes.lista)
  const ninhos = useSelector(state => state.ninhos.lista)
  const botoesClaros = useSelector(state => state.botaoModo.botoesClaros)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [galpaoParaDeletar, setGalpaoParaDeletar] = useState(null)
  
  // Cor para botão Deletar - laranja fixo ou cor do tema
  const deleteColor = botoesClaros ? tema.colors.primaryOrange : tema.colors.primary
  const deleteTextColor = botoesClaros ? tema.colors.black : tema.colors.textOnPrimary

  useEffect(() => {
    dispatch(carregarGalpoes())
    dispatch(carregarNinhos())
  }, [dispatch])

  const deletarGalpao = (galpao) => {
    // Contar ninhos vinculados
    const ninhosVinculados = ninhos.filter(n => String(n.galpaoId) === String(galpao.id))
    
    setGalpaoParaDeletar(galpao)
    setShowDeleteDialog(true)
  }

  const confirmarDelecao = () => {
    dispatch(removerGalpaoThunk(galpaoParaDeletar.id))
    setShowDeleteDialog(false)
    setGalpaoParaDeletar(null)
  }

  const tornarInativo = () => {
    dispatch(atualizarGalpaoThunk({ ...galpaoParaDeletar, ativo: false }))
    setShowDeleteDialog(false)
    setGalpaoParaDeletar(null)
  }

  const getNinhosVinculados = (galpaoId) => {
    return ninhos.filter(n => String(n.galpaoId) === String(galpaoId)).length
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      <Text style={[typography.title, styles.title]}>Galpões</Text>

      <FlatList
        data={galpoes}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20, color: colors.textSecondary }}>
            Nenhum galpão cadastrado ainda 🏠
          </Text>
        }
        renderItem={({ item }) => (
          <Card style={layout.card}>
            <Card.Title 
              title={item.nome}
              titleStyle={{ color: colors.textPrimary }}
            />
            <Card.Content style={{ gap: 4 }}>
              <Text style={typography.body}>Galinhas: {item.capacidade_maxima_galinhas}</Text>
              <Text style={typography.body}>Ninhos: {item.capacidade_maxima_ninhos}</Text>
              <Text style={typography.body}>Ninhos ocupados: {item.numero_ninhos_ocupados}</Text>
              <Text style={typography.body}>Área (m²): {item.area_m2}</Text>
              <Text style={typography.body}>Piso: {item.tipo_piso}</Text>
              <Text style={typography.body}>Ventilação: {item.ventilacao}</Text>
              <Text style={typography.body}>Ativo: {item.ativo ? 'Sim' : 'Não'}</Text>
              <Text style={typography.body}>
                Última manutenção: {new Date(item.data_ultima_manutencao).toLocaleDateString()}
              </Text>
              <Text style={typography.body}>
                Observações: {item.observacoes ? item.observacoes : '(sem observações)'}
              </Text>
            </Card.Content>
            <Card.Actions>
              <ButtonPaper
                mode="outlined"
                textColor={colors.accent}
                style={{ borderColor: colors.accent }}
                onPress={() => navigation.navigate('GalpoesForm', { galpao: item })}
              >
                Editar
              </ButtonPaper>
              <ButtonPaper
                mode="contained"
                buttonColor={deleteColor}
                textColor={deleteTextColor}
                onPress={() => deletarGalpao(item)}
              >
                Deletar
              </ButtonPaper>
            </Card.Actions>
          </Card>
        )}
      />

      <ButtonPaper
        mode="contained"
        icon="plus"
        onPress={() => navigation.navigate('GalpoesForm')}
        style={[layout.button, styles.addButton]}
      >
        <Text>Adicionar Galpão</Text>
      </ButtonPaper>

      <Portal>
        <Dialog visible={showDeleteDialog} onDismiss={() => setShowDeleteDialog(false)}>
          <Dialog.Title>⚠️ Deletar Galpão</Dialog.Title>
          <Dialog.Content>
            <Text style={{ marginBottom: 12 }}>
              Tem certeza que deseja deletar o galpão <Text style={{ fontWeight: 'bold' }}>{galpaoParaDeletar?.nome}</Text>?
            </Text>
            {galpaoParaDeletar && getNinhosVinculados(galpaoParaDeletar.id) > 0 && (
              <Text style={{ 
                marginBottom: 12, 
                color: colors.error,
                fontWeight: '600' 
              }}>
                ⚠️ Este galpão possui {getNinhosVinculados(galpaoParaDeletar.id)} ninho(s) cadastrado(s) que serão deletados junto!
              </Text>
            )}
            <Text style={{ 
              marginTop: 8, 
              color: colors.textSecondary,
              fontStyle: 'italic' 
            }}>
              💡 Recomendação: Considere tornar o galpão inativo em vez de deletá-lo.
            </Text>
          </Dialog.Content>
          <Dialog.Actions style={{ flexDirection: 'column', gap: 8 }}>
            <View style={{ flexDirection: 'row', gap: 8, width: '100%' }}>
              <DialogButton 
                variant="cancel" 
                onPress={() => setShowDeleteDialog(false)}
                style={{ flex: 1 }}
              >
                Cancelar
              </DialogButton>
              <DialogButton 
                variant="primary"
                onPress={tornarInativo}
                style={{ flex: 1 }}
              >
                Tornar Inativo
              </DialogButton>
            </View>
            <DialogButton 
              variant="delete" 
              onPress={confirmarDelecao}
              style={{ width: '100%' }}
            >
              Deletar Mesmo Assim
            </DialogButton>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  )
}

const styles = StyleSheet.create({
  addButton: { marginTop: 16 },
  title: { marginBottom: 12 },
})
