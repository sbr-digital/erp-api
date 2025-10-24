# Security Migration Guide

Este documento descreve as mudanças de segurança aplicadas no projeto e possíveis impactos.

## 🔒 Vulnerabilidades Corrigidas

### Dependências Removidas
- **aws-lambda@1.0.7** - Removido devido ao pull da aws-sdk v2 legacy
  - ✅ **Solução**: Adicionado `@types/aws-lambda@^8.10.145` para tipagem
  - ⚠️ **Impacto**: Se houver uso de runtime aws-lambda, usar apenas AWS SDK v3

### Dependências Atualizadas
- **@faker-js/faker**: `9.0.0` → `^10.0.0`
  - ✅ **Motivo**: Versão 9.x está deprecated
  - ⚠️ **Breaking Changes**: 
    - `faker.random.*` → `faker.helpers.*`
    - `faker.commerce.department()` → `faker.commerce.department()`
    - Ver [changelog oficial](https://fakerjs.dev/about/changelog.html) para detalhes

### Overrides de Segurança Fortalecidos
```json
{
  "cross-spawn@>=7.0.0 <7.0.5": ">=7.0.5",
  "esbuild@<=0.24.2": ">=0.25.5",
  "fast-jwt@<6.0.1": ">=6.0.1",
  "braces@<3.0.3": ">=3.0.3",
  "glob@<8.1.0": ">=8.1.0",
  "semver@<7.5.2": ">=7.5.2"
}
```

## 🛡️ Configurações de Hardening

### Engine Constraints
- **Node.js**: `>=20.0.0` (anteriormente `20.x`)
- **pnpm**: `>=8.0.0` (novo)

### .npmrc Enhancements
- `shamefully-hoist=false` - Melhor isolamento de dependências
- `audit-level=moderate` - Verificação automática de vulnerabilidades
- `prefer-offline=true` - Performance em CI/CD
- `auto-install-peers=true` - Compatibilidade automática

## 🔧 Validação Pós-Migração

### Comandos de Verificação
```bash
# 1. Limpar cache e reinstalar
pnpm store prune
rm -rf node_modules pnpm-lock.yaml
pnpm install

# 2. Executar auditoria
pnpm audit

# 3. Testar build
pnpm run build

# 4. Executar testes
pnpm test

# 5. Verificar linting
pnpm run lint
```

### Pontos de Atenção
1. **JWT Token Validation**: fast-jwt@6.x pode ter mudanças sutis na validação
2. **Build Process**: esbuild@0.25.x pode gerar sourcemaps diferentes
3. **AWS Integration**: Validar se todas as chamadas usam AWS SDK v3
4. **Faker Usage**: Se usado em seeds/testes, verificar novos métodos

## 🚨 Rollback Plan

Se houver problemas críticos:

```bash
# 1. Reverter para commit anterior
git checkout homolog
git branch -D fix/security-pnpm-vulnerabilities

# 2. Ou aplicar rollback pontual
git revert <commit-sha>

# 3. Reinstalar dependências anteriores
pnpm install
```

## 📋 Checklist de Deploy

- [ ] Build executado com sucesso
- [ ] Testes passando (unit + e2e)
- [ ] Prisma generate/migrate OK
- [ ] JWT auth funcionando
- [ ] AWS SES/SQS operacional
- [ ] Performance metrics normais
- [ ] Logs sem erros críticos

## 🔍 Monitoring

Acompanhar métricas pós-deploy:
- Response times (JWT validation)
- Error rates (AWS integrations)
- Build times (CI/CD)
- Memory usage (Node.js 20+)

---

**Data da migração**: 2025-10-24  
**Responsável**: SBR Digital  
**Ticket**: Security vulnerabilities remediation
