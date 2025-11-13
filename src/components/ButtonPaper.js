import React from 'react'
import { Button as PaperButton } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { useTema } from '../hooks/useTema'

/**
 * Wrapper para react-native-paper Button com suporte a temas dinâmicos
 * Usa cores do tema atual e respeita o modo de botões (claro/escuro)
 */
export default function ButtonPaper({ children, mode = 'contained', buttonColor, textColor, ...props }) {
  const botoesClaros = useSelector(state => state.botaoModo.botoesClaros)
  const temaSelecionado = useSelector(state => state.tema.ativo)
  const tema = useTema()
  
  // Se buttonColor foi passado como prop, usa ele; senão calcula dinamicamente
  // Sempre usa a cor primary do tema ativo atual
  let finalButtonColor = buttonColor
  if (!finalButtonColor) {
    finalButtonColor = tema.colors.primary // usa cor do tema ativo (laranja, verde, roxo, ou dark)
  }
  
  // Se textColor foi passado como prop, usa ele; senão calcula dinamicamente
  // No tema dark, usa textPrimary (branco acinzentado)
  // Nos outros temas, usa textOnPrimary (branco) para contraste com o botão colorido
  let finalTextColor = textColor
  if (!finalTextColor) {
    if (temaSelecionado === 'dark') {
      finalTextColor = tema.colors.textPrimary // #E1E1E1 no dark
    } else {
      finalTextColor = tema.colors.textOnPrimary // branco nos botões coloridos
    }
  }

  // Extrai texto do children se vier dentro de <Text>
  let buttonText = children
  if (children?.props?.children) {
    buttonText = children.props.children
  }

  return (
    <PaperButton
      mode={mode}
      buttonColor={mode === 'contained' ? finalButtonColor : undefined}
      textColor={finalTextColor}
      {...props}
    >
      {buttonText}
    </PaperButton>
  )
}
