import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import * as theme1 from '../styles/theme'
import * as theme2 from '../styles/theme2'
import * as theme3 from '../styles/theme3'
import * as themeDark from '../styles/themeDark'

export const useTema = () => {
  const temaSelecionado = useSelector(state => state.tema.ativo)

  const temas = {
    tema1: { colors: theme1.colors, typography: theme1.typography, layout: theme1.layout },
    tema2: { colors: theme2.colors, typography: theme2.typography, layout: theme2.layout },
    tema3: { colors: theme3.colors, typography: theme3.typography, layout: theme3.layout },
    dark: { colors: themeDark.colors, typography: themeDark.typography, layout: themeDark.layout },
  }

  return useMemo(() => temas[temaSelecionado], [temaSelecionado])
}
