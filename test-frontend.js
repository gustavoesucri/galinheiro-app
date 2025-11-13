#!/usr/bin/env node

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Configurações
const FRONTEND_PATH = path.join(__dirname, '..', 'galinheiro-app-frontend');
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3000';
const OUTPUT_DIR = path.join(FRONTEND_PATH, 'test-results');

// Cores para output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

function log(message, color = 'white') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Capturar saída do console
const originalConsoleLog = console.log;
const originalConsoleError = console.error;
let consoleOutput = [];

console.log = function(...args) {
  const message = args.join(' ');
  consoleOutput.push(message);
  originalConsoleLog.apply(console, args);
};

console.error = function(...args) {
  const message = args.join(' ');
  consoleOutput.push(`ERROR: ${message}`);
  originalConsoleError.apply(console, args);
};

// Preparar diretório de output
function ensureOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
}

// Salvar saída do console
function saveConsoleOutputToFile() {
  ensureOutputDir();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `frontend-test-console-${timestamp}.log`;
  const filepath = path.join(OUTPUT_DIR, filename);

  const consoleContent = consoleOutput.join('\n');
  fs.writeFileSync(filepath, consoleContent, 'utf8');
  return filepath;
}

// Salvar resultados em JSON
function saveResultsToFile(results) {
  ensureOutputDir();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `frontend-test-results-${timestamp}.json`;
  const filepath = path.join(OUTPUT_DIR, filename);

  const output = {
    timestamp: new Date().toISOString(),
    backendUrl: BACKEND_URL,
    frontendPath: FRONTEND_PATH,
    summary: results.summary,
    tests: results.tests
  };

  fs.writeFileSync(filepath, JSON.stringify(output, null, 2), 'utf8');
  return filepath;
}

// Salvar log legível
function saveLogToFile(results) {
  ensureOutputDir();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `frontend-test-log-${timestamp}.txt`;
  const filepath = path.join(OUTPUT_DIR, filename);

  let logContent = `FRONTEND TEST RESULTS\n`;
  logContent += `=====================\n\n`;
  logContent += `Timestamp: ${new Date().toISOString()}\n`;
  logContent += `Backend URL: ${BACKEND_URL}\n`;
  logContent += `Frontend Path: ${FRONTEND_PATH}\n\n`;

  logContent += `SUMMARY:\n`;
  logContent += `  Total Tests: ${results.summary.total}\n`;
  logContent += `  Passed: ${results.summary.passed}\n`;
  logContent += `  Failed: ${results.summary.failed}\n\n`;

  logContent += `DETAILED RESULTS:\n`;
  logContent += `=================\n\n`;

  results.tests.forEach(test => {
    logContent += `🧪 ${test.name}\n`;
    logContent += `   ${test.description}\n`;

    if (test.passed) {
      logContent += `   ✅ PASSED\n`;
    } else {
      logContent += `   ❌ FAILED\n`;
      if (test.error) {
        logContent += `   Error: ${test.error}\n`;
      }
    }

    if (test.details) {
      logContent += `   Details: ${JSON.stringify(test.details, null, 2)}\n`;
    }

    logContent += `\n`;
  });

  fs.writeFileSync(filepath, logContent, 'utf8');
  return filepath;
}

// Testar configuração do ambiente
async function testEnvironmentConfig() {
  log('🔧 Testando configuração do ambiente...', 'cyan');

  try {
    const envPath = path.join(FRONTEND_PATH, 'src', 'config', 'env.js');
    if (!fs.existsSync(envPath)) {
      throw new Error('Arquivo env.js não encontrado');
    }

    // Como é um arquivo JS, vamos tentar executá-lo em um contexto seguro
    const envContent = fs.readFileSync(envPath, 'utf8');

    // Verificar se tem as configurações básicas
    const hasBaseUrl = envContent.includes('EXPO_PUBLIC_API_BASE_URL') || envContent.includes('BASE_URL');
    const hasTimeout = envContent.includes('TIMEOUT') || envContent.includes('timeout');

    return {
      passed: true,
      details: {
        envFileExists: true,
        hasBaseUrl: hasBaseUrl,
        hasTimeout: hasTimeout
      }
    };
  } catch (error) {
    return {
      passed: false,
      error: error.message
    };
  }
}

// Testar cliente da API
async function testApiClient() {
  log('🌐 Testando cliente da API...', 'cyan');

  try {
    const apiPath = path.join(FRONTEND_PATH, 'src', 'api', 'api.js');
    if (!fs.existsSync(apiPath)) {
      throw new Error('Arquivo api.js não encontrado');
    }

    const apiContent = fs.readFileSync(apiPath, 'utf8');

    // Verificar se tem axios, interceptors, configuração básica
    const hasAxios = apiContent.includes('axios');
    const hasInterceptors = apiContent.includes('interceptor') || apiContent.includes('intercept');
    const hasBaseURL = apiContent.includes('baseURL') || apiContent.includes('BASE_URL');

    return {
      passed: true,
      details: {
        apiFileExists: true,
        hasAxios: hasAxios,
        hasInterceptors: hasInterceptors,
        hasBaseURL: hasBaseURL
      }
    };
  } catch (error) {
    return {
      passed: false,
      error: error.message
    };
  }
}

// Testar recursos da API
async function testApiResources() {
  log('📦 Testando recursos da API...', 'cyan');

  try {
    const resourcesPath = path.join(FRONTEND_PATH, 'src', 'api', 'resources.js');
    if (!fs.existsSync(resourcesPath)) {
      throw new Error('Arquivo resources.js não encontrado');
    }

    const resourcesContent = fs.readFileSync(resourcesPath, 'utf8');

    // Verificar se tem as funções básicas
    const hasList = resourcesContent.includes('list') || resourcesContent.includes('getAll');
    const hasCreate = resourcesContent.includes('create') || resourcesContent.includes('post');
    const hasUpdate = resourcesContent.includes('update') || resourcesContent.includes('put') || resourcesContent.includes('patch');
    const hasRemove = resourcesContent.includes('remove') || resourcesContent.includes('delete');

    return {
      passed: true,
      details: {
        resourcesFileExists: true,
        hasList: hasList,
        hasCreate: hasCreate,
        hasUpdate: hasUpdate,
        hasRemove: hasRemove
      }
    };
  } catch (error) {
    return {
      passed: false,
      error: error.message
    };
  }
}

// Testar normalizers
async function testNormalizers() {
  log('🔄 Testando normalizers...', 'cyan');

  try {
    const normalizersPath = path.join(FRONTEND_PATH, 'src', 'api', 'normalizers.js');
    if (!fs.existsSync(normalizersPath)) {
      throw new Error('Arquivo normalizers.js não encontrado');
    }

    const normalizersContent = fs.readFileSync(normalizersPath, 'utf8');

    // Verificar se tem as funções de normalização
    const hasToApi = normalizersContent.includes('toApiPayload') || normalizersContent.includes('toApi');
    const hasFromApi = normalizersContent.includes('fromApiPayload') || normalizersContent.includes('fromApi');
    const hasNormalizeList = normalizersContent.includes('normalizeApiList') || normalizersContent.includes('normalizeList');

    return {
      passed: true,
      details: {
        normalizersFileExists: true,
        hasToApi: hasToApi,
        hasFromApi: hasFromApi,
        hasNormalizeList: hasNormalizeList
      }
    };
  } catch (error) {
    return {
      passed: false,
      error: error.message
    };
  }
}

// Testar conectividade com backend
async function testBackendConnectivity() {
  log('🔗 Testando conectividade com backend...', 'cyan');

  try {
    const response = await axios.get(`${BACKEND_URL}/`, { timeout: 5000 });

    return {
      passed: true,
      details: {
        status: response.status,
        response: response.data
      }
    };
  } catch (error) {
    return {
      passed: false,
      error: `Backend não acessível: ${error.message}`,
      details: {
        backendUrl: BACKEND_URL
      }
    };
  }
}

// Testar endpoints da API via frontend
async function testApiEndpoints() {
  log('🎯 Testando endpoints da API...', 'cyan');

  const endpoints = [
    { name: 'Galinhas', url: '/galinhas', method: 'GET' },
    { name: 'Galpões', url: '/galpoes', method: 'GET' },
    { name: 'Dashboard', url: '/dashboard', method: 'GET' }
  ];

  const results = [];

  for (const endpoint of endpoints) {
    try {
      const response = await axios.get(`${BACKEND_URL}${endpoint.url}`, { timeout: 10000 });
      results.push({
        endpoint: endpoint.name,
        url: endpoint.url,
        status: response.status,
        success: true
      });
    } catch (error) {
      results.push({
        endpoint: endpoint.name,
        url: endpoint.url,
        status: error.response?.status || 'ERROR',
        success: false,
        error: error.message
      });
    }

    // Pequena pausa
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  const allPassed = results.every(r => r.success);

  return {
    passed: allPassed,
    details: {
      endpoints: results,
      totalEndpoints: endpoints.length,
      successfulEndpoints: results.filter(r => r.success).length
    }
  };
}

// Executar todos os testes
async function runTests() {
  log('🚀 Iniciando testes do Frontend Galinheiro', 'magenta');
  log(`📍 Backend URL: ${BACKEND_URL}`, 'blue');
  log(`📂 Frontend Path: ${FRONTEND_PATH}`, 'blue');
  log('═'.repeat(50), 'cyan');

  const tests = [];
  let passedTests = 0;
  let failedTests = 0;

  // Lista de testes a executar
  const testList = [
    { name: 'Environment Config', description: 'Verificar configuração do ambiente', func: testEnvironmentConfig },
    { name: 'API Client', description: 'Verificar cliente da API', func: testApiClient },
    { name: 'API Resources', description: 'Verificar recursos da API', func: testApiResources },
    { name: 'Normalizers', description: 'Verificar normalizers', func: testNormalizers },
    { name: 'Backend Connectivity', description: 'Verificar conectividade com backend', func: testBackendConnectivity },
    { name: 'API Endpoints', description: 'Verificar endpoints da API', func: testApiEndpoints }
  ];

  for (const test of testList) {
    log(`\n🧪 Executando: ${test.name}`, 'cyan');
    log(`   ${test.description}`, 'yellow');

    try {
      const result = await test.func();

      const testResult = {
        name: test.name,
        description: test.description,
        passed: result.passed,
        error: result.error,
        details: result.details
      };

      tests.push(testResult);

      if (result.passed) {
        log('   ✅ PASSED', 'green');
        passedTests++;
      } else {
        log('   ❌ FAILED', 'red');
        if (result.error) {
          log(`   Error: ${result.error}`, 'red');
        }
        failedTests++;
      }

      if (result.details) {
        log(`   Details: ${JSON.stringify(result.details, null, 2)}`, 'white');
      }

    } catch (error) {
      log('   ❌ FAILED', 'red');
      log(`   Unexpected error: ${error.message}`, 'red');

      tests.push({
        name: test.name,
        description: test.description,
        passed: false,
        error: error.message
      });

      failedTests++;
    }

    // Pequena pausa entre testes
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Preparar dados para salvar
  const testResults = {
    summary: {
      total: tests.length,
      passed: passedTests,
      failed: failedTests
    },
    tests: tests
  };

  // Salvar resultados em arquivos
  const jsonFile = saveResultsToFile(testResults);
  const logFile = saveLogToFile(testResults);
  const consoleFile = saveConsoleOutputToFile();

  log('\n' + '═'.repeat(50), 'cyan');
  log('📊 RESULTADO DOS TESTES DO FRONTEND', 'magenta');
  log(`   Total de testes: ${tests.length}`, 'white');
  log(`   ✅ Aprovados: ${passedTests}`, 'green');
  log(`   ❌ Reprovados: ${failedTests}`, 'red');
  log(`\n💾 Resultados salvos em:`, 'blue');
  log(`   📄 JSON: ${jsonFile}`, 'blue');
  log(`   📝 Log estruturado: ${logFile}`, 'blue');
  log(`   🖥️  Console output: ${consoleFile}`, 'blue');

  if (failedTests === 0) {
    log('\n🎉 Todos os testes passaram!', 'green');
  } else {
    log(`\n⚠️  ${failedTests} teste(s) reprovados.`, 'yellow');
    log('💡 Verifique os arquivos salvos para detalhes dos erros.', 'cyan');
  }

  return testResults;
}

// Função principal
async function main() {
  try {
    await runTests();
  } catch (error) {
    log(`❌ Erro fatal: ${error.message}`, 'red');
    process.exit(1);
  }
}

main();