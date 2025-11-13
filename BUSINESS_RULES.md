# 📋 REGRAS DE NEGÓCIO - SISTEMA GALINHEIRO

**Versão:** 1.0  
**Data:** 13/11/2025  
**Status:** ✅ Implementadas no Frontend

---

## 📌 ÍNDICE

1. [Regras de Datas](#1-regras-de-datas-rn-001-a-rn-005)
2. [Regras de Capacidade/Ocupação](#2-regras-de-capacidadeocupação-rn-006-a-rn-010)
3. [Regras de Postura de Ovos](#3-regras-de-postura-de-ovos)
4. [Regras de Quarentena e Saúde](#4-regras-de-quarentena-e-saúde-rn-016-rn-017-rn-018)
5. [Regras de Relacionamento](#7-regras-de-relacionamento-rn-029)
6. [Regras de Consistência de Estado](#8-regras-de-consistência-de-estado-rn-030-a-rn-032)
7. [Regras de Nome/Identificação](#9-regras-de-nomeidentificação-rn-033-a-rn-035)
8. [Regras Calculadas/Automáticas](#10-regras-calculadasautomáticas-rn-036-rn-037)
9. [Regras de Ambiente (Futuras)](#5-regras-de-ambiente-futuras-rn-019-rn-020)

---

## 1. REGRAS DE DATAS (RN-001 a RN-005)

### RN-001: Data de nascimento não pode ser futura
**Prioridade:** 🔴 CRÍTICA  
**Status:** ✅ Implementada

**Descrição:** Data de nascimento de galinha deve estar no passado ou no máximo hoje.

**Validação:**
```javascript
data_nascimento <= hoje (23:59:59)
```

**Entidade:** `galinhas`  
**Campo:** `data_nascimento`

**Mensagem de Erro:** "Data de nascimento não pode ser futura"

**Implementação Backend:**
- Validar no controller antes de salvar
- Aplicar em CREATE e UPDATE
- Considerar timezone do servidor

---

### RN-002: Data da última limpeza não pode ser futura
**Prioridade:** 🔴 CRÍTICA  
**Status:** ✅ Implementada

**Descrição:** Data da última limpeza do ninho não pode ser posterior ao momento atual.

**Validação:**
```javascript
ultima_limpeza <= agora()
```

**Entidade:** `ninhos`  
**Campo:** `ultima_limpeza`

**Mensagem de Erro:** "Data da última limpeza não pode ser futura"

**Implementação Backend:**
- Validar timestamp com hora
- Aplicar em CREATE e UPDATE

---

### RN-003: Data de postura de ovo não pode ser futura
**Prioridade:** 🔴 CRÍTICA  
**Status:** ✅ Implementada

**Descrição:** Data de coleta/postura do ovo deve ser até hoje (fim do dia).

**Validação:**
```javascript
data <= hoje (23:59:59)
```

**Entidade:** `ovos`  
**Campo:** `data`

**Mensagem de Erro:** "Data de postura não pode ser futura"

**Implementação Backend:**
- Permitir registrar ovos de hoje
- Bloquear datas futuras
- Considerar mudança de dia no servidor

---

### RN-004: Data de medição ambiente não pode ser futura
**Prioridade:** 🔴 CRÍTICA  
**Status:** ✅ Implementada

**Descrição:** Medições ambientais só podem ser registradas até o momento presente.

**Validação:**
```javascript
data_medicao <= agora()
```

**Entidade:** `medicoes_ambiente`  
**Campo:** `data_medicao`

**Mensagem de Erro:** "Data da medição não pode ser futura"

**Implementação Backend:**
- Validar timestamp completo (data + hora)
- Considerar latência de rede (tolerância de 1-2 minutos?)

---

### RN-005: Data última manutenção do galpão não pode ser futura
**Prioridade:** 🔴 CRÍTICA  
**Status:** ✅ Implementada

**Descrição:** Data da última manutenção do galpão deve estar no passado.

**Validação:**
```javascript
data_ultima_manutencao <= agora()
```

**Entidade:** `galpoes`  
**Campo:** `data_ultima_manutencao`

**Mensagem de Erro:** "Data da manutenção não pode ser futura"

---

## 2. REGRAS DE CAPACIDADE/OCUPAÇÃO (RN-006 a RN-010)

### RN-006: Ninhos ocupados não pode exceder capacidade máxima
**Prioridade:** 🔴 CRÍTICA  
**Status:** ✅ Implementada

**Descrição:** Número de ninhos ocupados em um galpão não pode ser maior que a capacidade máxima de ninhos.

**Validação:**
```javascript
numero_ninhos_ocupados <= capacidade_maxima_ninhos
```

**Entidade:** `galpoes`  
**Campos:** `numero_ninhos_ocupados`, `capacidade_maxima_ninhos`

**Mensagem de Erro:** "Ninhos ocupados (X) não pode exceder a capacidade máxima (Y)"

**Implementação Backend:**
- Validar no UPDATE de galpão
- Recalcular automaticamente baseado em ninhos.ocupado = true (ver RN-036)

---

### RN-007: Número de galinhas no galpão não pode exceder capacidade
**Prioridade:** 🔴 CRÍTICA  
**Status:** ✅ Implementada

**Descrição:** Total de galinhas com `local='galpao'` e `galpaoId=X` não pode exceder `capacidade_maxima_galinhas` do galpão X.

**Validação:**
```sql
SELECT COUNT(*) FROM galinhas 
WHERE local = 'galpao' AND galpaoId = ? 
HAVING COUNT(*) <= (SELECT capacidade_maxima_galinhas FROM galpoes WHERE id = ?)
```

**Entidades:** `galinhas`, `galpoes`

**Mensagem de Erro:** "Galpão tem X galinhas, mas capacidade máxima é Y"

**Implementação Backend:**
- Validar ao adicionar/mover galinha para galpão
- Verificar ao UPDATE de galinha (mudança de local ou galpão)
- Bloquear redução de capacidade se já excedida

---

### RN-008: Densidade mínima por galinha (bem-estar animal)
**Prioridade:** 🟠 IMPORTANTE  
**Status:** ✅ Implementada (com níveis)

**Descrição:** Cada galinha precisa de espaço adequado. Recomendação: 0.5m² a 1m² por galinha.

**Validação:**
```javascript
densidade = area_m2 / capacidade_maxima_galinhas

// CRÍTICO: bloqueia salvamento
if (densidade < 0.5) {
  return erro
}

// AVISO: permite mas alerta
if (densidade < 1.0) {
  return aviso
}
```

**Entidade:** `galpoes`  
**Campos:** `area_m2`, `capacidade_maxima_galinhas`

**Mensagens:**
- **Crítico (< 0.5m²/galinha):** "Densidade muito alta: Xm²/galinha. Mínimo recomendado: 0.5m²/galinha" ❌ BLOQUEIA
- **Aviso (0.5-1m²/galinha):** "Densidade adequada mas justa: Xm²/galinha. Recomendado: 1m²/galinha" ⚠️ PERMITE
- **Ideal (>= 1m²/galinha):** "Densidade ideal: Xm²/galinha" ✅

**Implementação Backend:**
- Calcular e validar em CREATE e UPDATE de galpão
- Impedir salvamento se < 0.5m²/galinha
- Permitir mas logar aviso se 0.5-1m²/galinha

---

### RN-009: Ninho só pode ter 1 galinha se estiver ocupado
**Prioridade:** 🔴 CRÍTICA  
**Status:** ✅ Implementada

**Descrição:** Consistência entre estado de ocupação e associação com galinha.

**Validação:**
```javascript
// Se ocupado, deve ter galinha
if (ninho.ocupado === true && !ninho.galinhaId) {
  return erro: "Ninho ocupado deve ter galinha associada"
}

// Se desocupado, não pode ter galinha
if (ninho.ocupado === false && ninho.galinhaId) {
  // Auto-corrigir: ninho.galinhaId = null (ver RN-029)
  return aviso: "Ninho desocupado: galinha removida"
}
```

**Entidade:** `ninhos`  
**Campos:** `ocupado`, `galinhaId`

**Implementação Backend:**
- Validar em CREATE e UPDATE de ninho
- Trigger para auto-correção quando `ocupado` muda para `false`

---

### RN-010: Galinha no ninho deve estar no mesmo galpão
**Prioridade:** 🔴 CRÍTICA  
**Status:** ✅ Implementada (lógica criada)

**Descrição:** Se uma galinha está em um ninho, ambos devem estar no mesmo galpão.

**Validação:**
```sql
SELECT g.galpaoId, n.galpaoId 
FROM galinhas g
JOIN ninhos n ON g.ninhoId = n.id
WHERE g.ninhoId IS NOT NULL
  AND g.galpaoId != n.galpaoId
```

**Entidades:** `galinhas`, `ninhos`  
**Campos:** `galinha.galpaoId`, `galinha.ninhoId`, `ninho.galpaoId`

**Mensagem de Erro:** "Galinha está em galpão diferente do ninho"

**Implementação Backend:**
- Validar ao associar galinha a ninho
- Validar ao mover ninho de galpão (verificar galinhas associadas)
- Foreign key com constraint ou trigger

---

## 3. REGRAS DE POSTURA DE OVOS

### RN-011: Máximo 2 ovos por galinha por dia
**Prioridade:** 🔴 CRÍTICA  
**Status:** ✅ JÁ IMPLEMENTADA (OvosForm.js)

**Descrição:** Uma galinha pode botar no máximo 2 ovos por dia.

**Validação:**
```sql
SELECT COUNT(*) FROM ovos
WHERE galinhaId = ? 
  AND DATE(data) = DATE(?)
HAVING COUNT(*) < 2
```

**Entidade:** `ovos`  
**Campos:** `galinhaId`, `data`

**Mensagem de Erro:** "Esta galinha já atingiu o limite de 2 ovos por dia"

**Implementação Backend:**
- Unique constraint composto: (galinhaId, data, contador)
- Ou validação no controller antes de INSERT

---

### RN-014: Galinha muito jovem não bota ovos
**Prioridade:** 🔴 CRÍTICA  
**Status:** ✅ Implementada

**Descrição:** Galinhas só começam a botar ovos com aproximadamente 120 dias de vida (4 meses).

**Validação:**
```javascript
const IDADE_MINIMA_POSTURA = 120 // dias

idade_em_dias = (data_ovo - galinha.data_nascimento) / (1000 * 60 * 60 * 24)

if (idade_em_dias < IDADE_MINIMA_POSTURA) {
  return erro
}
```

**Entidades:** `ovos`, `galinhas`  
**Campos:** `ovo.data`, `ovo.galinhaId`, `galinha.data_nascimento`

**Mensagem de Erro:** "Galinha muito jovem para botar ovos. Idade: X dias, mínimo: 120 dias"

**Implementação Backend:**
- JOIN com galinhas ao validar ovo
- Calcular idade em dias
- Bloquear INSERT se idade < 120 dias

---

### RN-038: Data de coleta do ovo é imutável
**Prioridade:** 🔴 CRÍTICA  
**Status:** ✅ Implementada

**Descrição:** Após criar o registro do ovo, a data de coleta não pode ser alterada. Isso garante integridade histórica e auditoria.

**Validação:**
```javascript
// No UPDATE: preservar data original
if (isUpdate && ovoOriginal.data !== novoOvo.data) {
  return erro("Data de coleta não pode ser alterada após criação")
}
```

**Entidade:** `ovos`  
**Campo:** `data`

**Mensagem de Erro:** "Data de coleta não pode ser alterada. Para corrigir, delete e recrie o registro"

**Implementação Frontend:**
- Campo `data` desabilitado no formulário de edição (`OvosForm.js`)
- `atualizarOvoThunk` preserva data original automaticamente

**Implementação Backend:**
```sql
-- Trigger para bloquear mudança de data
CREATE TRIGGER trg_ovos_data_imutavel
BEFORE UPDATE ON ovos
FOR EACH ROW
BEGIN
  IF OLD.data <> NEW.data THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Data de coleta não pode ser alterada';
  END IF;
END;
```

**Justificativa:**
- Rastreabilidade de produção
- Previne manipulação de histórico
- Validações RN-011 e RN-014 dependem da data correta
- Relatórios de produtividade precisam de dados confiáveis

**Solução para Correção:** Se a data foi registrada errada, o usuário deve deletar o ovo e criar um novo registro com a data correta.

---

## 4. REGRAS DE QUARENTENA E SAÚDE (RN-016, RN-017, RN-018)

### RN-016: Galinha em quarentena não pode estar em galpão comum
**Prioridade:** 🔴 CRÍTICA  
**Status:** ✅ Implementada

**Descrição:** Galinhas com `emQuarentena = true` devem estar isoladas, não no galpão.

**Validação:**
```javascript
if (galinha.emQuarentena === true) {
  // Forçar local
  galinha.local = 'quarentena'
  
  // Remover associações
  galinha.galpaoId = null
  galinha.ninhoId = null
  
  // Validação
  if (galinha.local === 'galpao') {
    return erro: "Galinha em quarentena não pode estar no galpão"
  }
}
```

**Entidade:** `galinhas`  
**Campos:** `emQuarentena`, `local`, `galpaoId`, `ninhoId`

**Implementação Backend:**
- Trigger ou validação no controller
- Auto-ajustar `local`, `galpaoId`, `ninhoId` quando `emQuarentena = true`
- Bloquear mudança de local para galpão enquanto em quarentena

---

### RN-017: Galinha adoecida deveria estar em quarentena (SUGESTÃO)
**Prioridade:** 🟡 RECOMENDAÇÃO  
**Status:** ✅ Implementada (frontend sugere)

**Descrição:** Quando `saude = 'Adoecida'` e `emQuarentena = false`, sugerir ao usuário colocar em quarentena.

**Validação:**
```javascript
if (galinha.saude === 'Adoecida' && !galinha.emQuarentena) {
  return sugestao: "Galinha adoecida deveria estar em quarentena"
}
```

**Implementação Backend:**
- Não bloqueia salvamento
- Retornar warning no response
- Dashboard pode exibir alertas de galinhas adoecidas fora de quarentena

---

### RN-018: Alerta se muitas galinhas adoecidas no galpão
**Prioridade:** 🟠 IMPORTANTE  
**Status:** ✅ Implementada (lógica criada)

**Descrição:** Alertar se percentual de galinhas adoecidas em um galpão ultrapassar limites.

**Validação:**
```javascript
const galinhas_no_galpao = galinhas.filter(g => g.local === 'galpao' && g.galpaoId === X)
const adoecidas = galinhas_no_galpao.filter(g => g.saude === 'Adoecida')
const percentual = (adoecidas.length / galinhas_no_galpao.length) * 100

if (percentual > 20) {
  return alerta_critico: "Mais de 20% das galinhas adoecidas"
}

if (percentual > 10) {
  return alerta_atencao: "Mais de 10% das galinhas adoecidas"
}
```

**Implementação Backend:**
- Calcular em dashboard/reports
- Endpoint: GET /galpoes/:id/health-status
- Notificações automáticas quando percentual crítico

---

## 7. REGRAS DE RELACIONAMENTO (RN-029)

### RN-029: Ao marcar ninho como desocupado, remover galinhaId
**Prioridade:** 🔴 CRÍTICA  
**Status:** ✅ Implementada

**Descrição:** Quando `ocupado` muda de `true` para `false`, automaticamente limpar `galinhaId`.

**Validação:**
```javascript
// AUTO-CORREÇÃO
if (ninho.ocupado === false && ninho.galinhaId) {
  ninho.galinhaId = null
}
```

**Entidade:** `ninhos`  
**Campos:** `ocupado`, `galinhaId`

**Implementação Backend:**
- Trigger no UPDATE:
  ```sql
  CREATE TRIGGER ninho_desocupado_remove_galinha
  BEFORE UPDATE ON ninhos
  FOR EACH ROW
  BEGIN
    IF NEW.ocupado = FALSE AND OLD.galinhaId IS NOT NULL THEN
      SET NEW.galinhaId = NULL;
    END IF;
  END;
  ```

---

## 8. REGRAS DE CONSISTÊNCIA DE ESTADO (RN-030 a RN-032)

### RN-030: Galinha só pode ter ninhoId se local='galpao'
**Prioridade:** 🔴 CRÍTICA  
**Status:** ✅ Lógica criada

**Descrição:** Galinhas em campo ou quarentena não podem estar em ninhos.

**Validação:**
```javascript
if (galinha.local !== 'galpao' && galinha.ninhoId) {
  // Auto-corrigir
  galinha.ninhoId = null
}
```

**Entidade:** `galinhas`  
**Campos:** `local`, `ninhoId`

**Implementação Backend:**
- Trigger ou constraint check
- Limpar `ninhoId` quando `local` muda de 'galpao' para outro

---

### RN-031: Galinha com ninhoId deve ter galpaoId
**Prioridade:** 🔴 CRÍTICA  
**Status:** ✅ Lógica criada

**Descrição:** Se galinha está em um ninho, deve estar em um galpão.

**Validação:**
```javascript
if (galinha.ninhoId && !galinha.galpaoId) {
  return erro: "Galinha com ninho deve ter galpão"
}
```

**Entidade:** `galinhas`  
**Campos:** `ninhoId`, `galpaoId`

**Implementação Backend:**
- Constraint check
- Validação no controller

---

### RN-032: Galpão inativo não pode receber novas entidades
**Prioridade:** 🟠 IMPORTANTE  
**Status:** ✅ Lógica criada

**Descrição:** Se `galpao.ativo = false`, não pode adicionar ninhos, galinhas ou medições.

**Validação:**
```javascript
if (galpao.ativo === false) {
  // Ao adicionar ninho
  return erro: "Galpão inativo não pode receber ninhos"
  
  // Ao associar galinha
  return erro: "Galpão inativo não pode receber galinhas"
  
  // Ao registrar medição
  return erro: "Galpão inativo não pode receber medições"
}
```

**Implementação Backend:**
- Validar em:
  - CREATE ninho (campo galpaoId)
  - UPDATE galinha (campo galpaoId)
  - CREATE medicaoAmbiente (campo galpaoId)

---

## 9. REGRAS DE NOME/IDENTIFICAÇÃO (RN-033 a RN-035)

### RN-033: Nome de galpão deve ser único
**Prioridade:** 🟠 IMPORTANTE  
**Status:** ✅ Implementada

**Descrição:** Não pode haver dois galpões com o mesmo nome.

**Validação:**
```sql
SELECT COUNT(*) FROM galpoes 
WHERE LOWER(TRIM(nome)) = LOWER(TRIM(?))
  AND id != ?  -- Excluir o próprio registro em UPDATE
HAVING COUNT(*) = 0
```

**Entidade:** `galpoes`  
**Campo:** `nome`

**Mensagem de Erro:** "Já existe um galpão com o nome 'X'"

**Implementação Backend:**
- UNIQUE constraint na coluna nome
- Normalizar: LOWER(TRIM(nome))

---

### RN-034: Identificação de ninho deve ser única por galpão
**Prioridade:** 🟠 IMPORTANTE  
**Status:** ✅ Implementada

**Descrição:** Dentro do mesmo galpão, não pode haver ninhos com mesma identificação.

**Validação:**
```sql
SELECT COUNT(*) FROM ninhos
WHERE LOWER(TRIM(identificacao)) = LOWER(TRIM(?))
  AND galpaoId = ?
  AND id != ?
HAVING COUNT(*) = 0
```

**Entidade:** `ninhos`  
**Campos:** `identificacao`, `galpaoId`

**Mensagem de Erro:** "Já existe um ninho com identificação 'X' neste galpão"

**Implementação Backend:**
- UNIQUE constraint composto: (galpaoId, identificacao)
- Permite mesma identificação em galpões diferentes

---

### RN-035: Nome de galinha (OPCIONAL)
**Prioridade:** 🟢 BAIXA  
**Status:** ✅ Implementada (desabilitada por padrão)

**Descrição:** Opcionalmente, forçar nomes únicos de galinhas.

**Validação:**
```sql
SELECT COUNT(*) FROM galinhas
WHERE LOWER(TRIM(nome)) = LOWER(TRIM(?))
  AND id != ?
HAVING COUNT(*) = 0
```

**Implementação Backend:**
- Por enquanto: **PERMITIR NOMES DUPLICADOS**
- Se futuro necessitar: adicionar UNIQUE constraint

---

## 10. REGRAS CALCULADAS/AUTOMÁTICAS (RN-036, RN-037)

### RN-036: Calcular automaticamente numero_ninhos_ocupados
**Prioridade:** 🟠 IMPORTANTE  
**Status:** ✅ Lógica criada

**Descrição:** Campo `numero_ninhos_ocupados` deve ser calculado automaticamente, não manual.

**Cálculo:**
```sql
UPDATE galpoes g
SET numero_ninhos_ocupados = (
  SELECT COUNT(*) FROM ninhos n
  WHERE n.galpaoId = g.id AND n.ocupado = TRUE
)
WHERE g.id = ?
```

**Implementação Backend:**
- **Opção 1:** Campo calculado (computed column)
- **Opção 2:** Trigger após INSERT/UPDATE/DELETE em ninhos
- **Opção 3:** View materializada
- **Recomendação:** Trigger + validação em UPDATE de galpão

**Trigger sugerido:**
```sql
CREATE TRIGGER atualizar_ninhos_ocupados
AFTER INSERT OR UPDATE OR DELETE ON ninhos
FOR EACH ROW
BEGIN
  UPDATE galpoes
  SET numero_ninhos_ocupados = (
    SELECT COUNT(*) FROM ninhos
    WHERE galpaoId = NEW.galpaoId AND ocupado = TRUE
  )
  WHERE id = NEW.galpaoId;
END;
```

---

### RN-037: Status de saúde do galpão baseado em galinhas
**Prioridade:** 🟡 RECOMENDAÇÃO  
**Status:** ✅ Lógica criada

**Descrição:** Calcular status de saúde geral do galpão baseado nas galinhas.

**Cálculo:**
```javascript
const galinhas_galpao = galinhas.filter(g => g.galpaoId === X && g.local === 'galpao')
const adoecidas = galinhas_galpao.filter(g => g.saude === 'Adoecida')
const fragilizadas = galinhas_galpao.filter(g => g.saude === 'Fragilizada')

const percentual_adoecidas = (adoecidas.length / galinhas_galpao.length) * 100
const percentual_problemas = ((adoecidas.length + fragilizadas.length) / galinhas_galpao.length) * 100

// Níveis
if (percentual_adoecidas > 30) return 'CRÍTICO'  // 🔴
if (percentual_adoecidas > 10 || percentual_problemas > 40) return 'ATENÇÃO'  // 🟠
if (percentual_problemas > 20) return 'ALERTA'  // 🟡
return 'BOM'  // 🟢
```

**Apresentação:**
- **Dashboard:** Card por galpão com status colorido
- **API:** GET /galpoes/:id/health-status
  ```json
  {
    "galpaoId": "123",
    "status": "CRÍTICO",
    "cor": "#d32f2f",
    "detalhes": {
      "adoecidas": 5,
      "fragilizadas": 2,
      "saudaveis": 8,
      "percentualAdoecidas": 33.3,
      "percentualProblemas": 46.7
    },
    "mensagem": "Crítico: 33.3% das galinhas estão adoecidas"
  }
  ```

**Implementação Backend:**
- Endpoint dedicado para cálculo
- Cache de 5-10 minutos
- Webhook/notificação quando status mudar para CRÍTICO

---

## 5. REGRAS DE AMBIENTE (FUTURAS - RN-019, RN-020)

### ⏳ RN-019: Temperatura confortável para galinhas
**Prioridade:** 🟡 FUTURA  
**Status:** ⏳ Planejada

**Descrição:** Alertar quando temperatura sair da faixa ideal.

**Níveis:**
- **Ideal:** 18-24°C ✅
- **Aviso:** < 10°C ou > 30°C ⚠️
- **Crítico:** < 5°C ou > 35°C 🚨

**Implementação Backend:**
- Validar ao registrar medição
- Dashboard com gráfico de temperatura
- Alertas automáticos quando crítico

**Estrutura JSON:**
```json
{
  "temperatura": 32,
  "nivel": "aviso",
  "mensagem": "Temperatura acima do ideal (32°C). Recomendado: 18-24°C"
}
```

---

### ⏳ RN-020: Umidade adequada
**Prioridade:** 🟡 FUTURA  
**Status:** ⏳ Planejada

**Descrição:** Monitorar umidade relativa do ar.

**Níveis:**
- **Ideal:** 50-70% ✅
- **Aviso:** < 40% ou > 80% ⚠️

**Implementação:**
Similar a RN-019, com alertas e gráficos.

---

## 📊 IMPLEMENTAÇÃO RECOMENDADA PARA BACKEND

### Estrutura de Validação

```javascript
// Exemplo de estrutura para API Response
{
  "success": false,
  "errors": [
    {
      "regra": "RN-001",
      "campo": "data_nascimento",
      "mensagem": "Data de nascimento não pode ser futura",
      "nivel": "critico"
    }
  ],
  "avisos": [
    {
      "regra": "RN-008",
      "campo": "area_m2",
      "mensagem": "Densidade adequada mas justa: 0.8m²/galinha",
      "nivel": "atencao"
    }
  ],
  "sugestoes": [
    {
      "regra": "RN-017",
      "mensagem": "Galinha adoecida deveria estar em quarentena",
      "nivel": "info"
    }
  ]
}
```

### Prioridades de Implementação

**FASE 1 - Críticas (Sprint 1):**
- ✅ RN-001 a RN-005 (Datas)
- ✅ RN-006, RN-007 (Capacidades)
- ✅ RN-014 (Idade postura)
- ✅ RN-016 (Quarentena)
- ✅ RN-033, RN-034 (Unicidade nomes)

**FASE 2 - Importantes (Sprint 2):**
- ✅ RN-008 (Densidade)
- ✅ RN-009, RN-010 (Consistência ninho-galinha)
- ✅ RN-029 (Auto-correção ninho)
- ✅ RN-030, RN-031, RN-032 (Consistência estado)
- ✅ RN-036 (Campo calculado)

**FASE 3 - Recomendações (Sprint 3):**
- ⏳ RN-017, RN-018 (Alertas saúde)
- ⏳ RN-037 (Status galpão)
- ⏳ RN-019, RN-020 (Ambiente)

---

## 🔧 TECNOLOGIAS RECOMENDADAS

**Banco de Dados:**
- PostgreSQL: TRIGGERS, CHECK CONSTRAINTS, COMPUTED COLUMNS
- MongoDB: Schema Validation, Pre-save Hooks

**Backend:**
- Node.js + Express: Middleware de validação
- Python + Django: Model Validators + Signals
- Java + Spring: Bean Validation + JPA Listeners

**Documentação API:**
- OpenAPI/Swagger com descrição de regras
- Exemplos de erros por regra

---

## 📝 NOTAS FINAIS

1. **Todas as regras marcadas com ✅ já estão implementadas no frontend**
2. **O backend deve replicar TODAS as validações por segurança**
3. **Nunca confiar apenas no frontend para validação**
4. **Logar violações de regras para análise**
5. **Documentar todas as exceções ou casos especiais**

---

**Documento gerado automaticamente pelo sistema**  
**Última atualização:** 13/11/2025
