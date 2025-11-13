# Frontend Testing Script

Este script testa a configuração e conectividade do frontend do Galinheiro App.

## Como usar

### Pré-requisitos

- Node.js instalado
- Backend rodando (por padrão em http://localhost:3000)

### Executar os testes

```bash
cd galinheiro-app-frontend
node test-frontend.js
```

### Configurar URL do backend

Por padrão, o script testa contra `http://localhost:3000`. Para usar uma URL diferente:

```bash
BACKEND_URL=http://localhost:8080 node test-frontend.js
```

## O que o script testa

### 1. Environment Config
- Verifica se o arquivo `src/config/env.js` existe
- Confirma se tem configurações básicas (BASE_URL, TIMEOUT)

### 2. API Client
- Verifica se o arquivo `src/api/api.js` existe
- Confirma se usa Axios e tem configuração de baseURL

### 3. API Resources
- Verifica se o arquivo `src/api/resources.js` existe
- Confirma se tem funções básicas (create, etc.)

### 4. Normalizers
- Verifica se o arquivo `src/api/normalizers.js` existe
- Confirma se tem funções de normalização (toApi, fromApi, normalizeList)

### 5. Backend Connectivity
- Testa se consegue conectar com o backend
- Faz uma requisição GET para a raiz do backend

### 6. API Endpoints
- Testa endpoints específicos da API:
  - `/galinhas` (GET)
  - `/galpoes` (GET)
  - `/dashboard` (GET)

## Arquivos de saída

O script salva os resultados em três formatos no diretório `test-results/`:

### 1. JSON estruturado (`frontend-test-results-{timestamp}.json`)
Contém todos os dados dos testes em formato JSON para processamento automatizado.

### 2. Log legível (`frontend-test-log-{timestamp}.txt`)
Relatório detalhado e legível com emojis e formatação clara.

### 3. Console output (`frontend-test-console-{timestamp}.log`)
Captura completa de toda a saída do console durante a execução.

## Exemplo de saída

```
🚀 Iniciando testes do Frontend Galinheiro
📍 Backend URL: http://localhost:3000
📂 Frontend Path: /path/to/frontend

🧪 Executando: Environment Config
   ✅ PASSED

🧪 Executando: API Client
   ✅ PASSED

[... outros testes ...]

📊 RESULTADO DOS TESTES DO FRONTEND
   Total de testes: 6
   ✅ Aprovados: 6
   ❌ Reprovados: 0

💾 Resultados salvos em:
   📄 JSON: test-results/frontend-test-results-2025-11-13T23-37-03-735Z.json
   📝 Log estruturado: test-results/frontend-test-log-2025-11-13T23-37-03-736Z.txt
   🖥️  Console output: test-results/frontend-test-console-2025-11-13T23-37-03-736Z.log

🎉 Todos os testes passaram!
```

## Debugging

Se algum teste falhar:

1. Verifique os arquivos de log salvos para detalhes do erro
2. Confirme se o backend está rodando
3. Verifique se as URLs estão corretas
4. Examine os arquivos de configuração do frontend

## Integração com CI/CD

Para usar em pipelines de CI/CD:

```bash
# Instalar dependências se necessário
npm install

# Executar testes
node test-frontend.js

# Verificar se todos passaram (código de saída)
echo "Exit code: $?"
```

O script retorna código de saída 0 se todos os testes passarem, ou 1 se algum falhar.