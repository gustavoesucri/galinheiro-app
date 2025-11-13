import TemaToggleButton from '../components/TemaToggleButton'

export const getStackScreenOptions = (tema) => {
  return {
    headerStyle: { backgroundColor: tema.colors.primary },
    headerTintColor: tema.colors.surface,
    headerTitleStyle: {
      color: tema.colors.surface,
    },
    headerRight: () => <TemaToggleButton />,
  }
}
