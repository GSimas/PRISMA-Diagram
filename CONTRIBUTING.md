# Como contribuir

Abra uma issue com o problema, a evidência e o resultado esperado. Para código, crie uma branch pequena, mantenha o escopo focado e inclua testes.

## Ambiente

```bash
cd web
pnpm install
pnpm dev
```

Antes de enviar uma mudança:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Mudanças metodológicas devem citar fonte primária, diferenciar registros, relatos e estudos e nunca ajustar dados silenciosamente. Mudanças de conteúdo devem atualizar os seis idiomas ou registrar a pendência. Não use dados reais ou identificáveis em fixtures, screenshots ou issues.

Commits devem ser claros e imperativos. Pull requests devem descrever risco, testes, impacto em acessibilidade, migração de dados e fontes consultadas.
