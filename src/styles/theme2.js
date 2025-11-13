// src/styles/theme2.js - Tema Verde

export const colors = {
  primary: '#4CAF50',        // Verde principal
  secondary: '#388E3C',      // Verde médio
  accent: '#1B5E20',         // Verde escuro
  background: '#E8F5E9',     // Fundo verde claro
  surface: '#FFFFFF',        // Branco (cards, inputs)
  textPrimary: '#1B5E20',    // Texto verde escuro
  textSecondary: '#558B2F',  // Texto verde médio
  success: '#7CB342',        // Verde natural
  warning: '#FFA000',        // Amarelo alerta
  error: '#D32F2F',          // Vermelho erro
  info: '#0288D1',           // Azul informativo
  border: '#FFFFFF',         // Bordas brancas
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
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
