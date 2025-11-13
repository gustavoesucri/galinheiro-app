// src/styles/themeDark.js - Tema Dark (Modo Escuro)

export const colors = {
  primary: '#5E35B1',          // Roxo escuro intenso
  primaryOrange: '#e28f13',    // Laranja fixo para modo claro
  secondary: '#00897B',        // Verde-água escuro
  accent: '#8E24AA',           // Roxo/magenta escuro
  background: '#121212',       // Fundo preto suave (Material Dark)
  surface: '#1E1E1E',          // Superfície cinza escuro
  textPrimary: '#E1E1E1',      // Texto claro principal
  textSecondary: '#B3B3B3',    // Texto claro secundário
  textLight: '#E1E1E1',        // Texto em fundos escuros (claro)
  textOnPrimary: '#FFFFFF',    // Texto em botões (branco para contraste)
  success: '#43A047',          // Verde escuro
  warning: '#FB8C00',          // Laranja escuro
  error: '#E53935',            // Vermelho escuro
  info: '#1E88E5',             // Azul escuro
  border: '#2C2C2C',           // Bordas cinza escuro
  white: '#FFFFFF',            // Branco puro
  black: '#000000',            // Preto puro
  tabBarInactive: '#6B6B6B',   // Cor da tab inativa
  // Cores de alertas para aviso info boxes
  alertBackground: '#332B1F',
  alertBorder: '#8B7355',
  alertText: '#D4C5B9',
}

export const typography = {
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  body: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  small: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
  },
}

export const layout = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
    marginTop: 16,
  },
  formContainer: {
    backgroundColor: colors.background,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    marginVertical: 6,
  },
  input: {
    backgroundColor: colors.surface,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.border,
  },
}
