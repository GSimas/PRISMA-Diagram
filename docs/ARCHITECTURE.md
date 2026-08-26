# Arquitetura

## Visão geral

`web/app` contém rotas e metadata. `web/src/domain` é o núcleo sem dependência de DOM. `web/src/features` agrupa builder, checklist, projetos, diretrizes, aprendizado, importação e exportação. `web/src/storage` concentra persistência e portabilidade. `web/src/i18n` contém locales. `web/src/styles` contém tokens e layouts.

## Fluxo de dados

1. A interface atualiza o projeto no store Zustand.
2. `calculateProject` deriva contagens sem mutar a entrada.
3. `validateProject` produz resultados explicáveis, sem corrigir dados.
4. O builder renderiza o mesmo estado em formulário, SVG, tabela e texto.
5. Um debounce salva o projeto no IndexedDB via Dexie.
6. Exportadores recebem um snapshot e geram arquivos inteiramente no cliente.

## Limites de confiança

- JSON restaurado é migrado e validado com Zod.
- CSV/XLSX passa por prévia, mapeamento e validação de inteiros não negativos.
- HTML/SVG exportado escapa conteúdo do usuário.
- Substituições de valores derivados permanecem identificadas e pedem justificativa.
- A aplicação não chama serviços remotos para processar projetos.

## PWA e produção

O service worker armazena o shell da aplicação e usa estratégia network-first para navegação. O build usa `output: 'export'` e gera o site estático em `dist/client`; o Netlify aplica fallback de rotas e headers definidos na raiz. A aplicação não exige servidor Node em produção.

## Decisões de design

O visual da aplicação combina azul profundo, âmbar e fundos de papel, com tipografia editorial, grade técnica e cartões de baixa elevação. O diagrama oferece dois estilos derivados do mesmo modelo semântico: `classic`, padrão e próximo da linguagem gráfica dos templates PRISMA 2020, e `modern`, com o tratamento editorial autoral. O modo PRISMA protege a topologia; o modo apresentação permite preferências visuais sem alterar a semântica. A alternativa textual/tabular evita dependência exclusiva de SVG.
