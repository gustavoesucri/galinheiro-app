import React from 'react'
import { TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { alternarModoBotoes } from '../redux/slices/botaoModoSlice'
import { useTema } from '../hooks/useTema'

export default function BotaoModoToggleButton() {
  const dispatch = useDispatch()
  const botoesClaros = useSelector(state => state.botaoModo.botoesClaros)
  const tema = useTema()

  const handleToggle = () => {
    dispatch(alternarModoBotoes())
  }

  return (
    <TouchableOpacity
      onPress={handleToggle}
      style={{ paddingRight: 8, paddingLeft: 8 }}
    >
      <MaterialCommunityIcons
        name={botoesClaros ? 'unfold-less-horizontal' : 'unfold-less-vertical'}
        size={24}
        color={tema.colors.textPrimary}
      />
    </TouchableOpacity>
  )
}
