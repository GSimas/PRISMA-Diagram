# PRISMA Diagram

Aplicação web local-first para criar, revisar, validar e exportar diagramas de fluxo baseados no PRISMA 2020. O produto é independente, não representa certificação metodológica e não é afiliado ao PRISMA Executive.

## Recursos

- Quatro estruturas de fluxo: revisão nova ou atualizada, somente bases/registros ou também outras fontes.
- Cálculos determinísticos, memória de cálculo, substituições justificadas, alertas explicáveis e histórico local.
- Distinção explícita entre registros, relatos e estudos.
- Checklist PRISMA 2020 com 27 itens, localização no manuscrito e progresso por seção.
- Interface e diagramas em português do Brasil, inglês, italiano, francês, alemão e chinês simplificado.
- Diagrama com visual clássico PRISMA como padrão, inspirado nos templates oficiais, e alternativa editorial moderna selecionável e persistente por projeto.
- Projetos persistidos no IndexedDB, sem conta e sem envio de dados científicos.
- Importação de backup JSON e tabelas CSV/XLSX com prévia e mapeamento.
- Exportação em JSON, CSV, XLSX, SVG, PNG 2×, PDF vetorial, HTML interativo, relatório HTML e pacote ZIP.
- Temas claro, escuro e sistema; alto contraste; escala de texto; movimento reduzido; navegação por teclado; alternativa textual e tabular ao SVG.
- PWA instalável, metadados sociais, dados estruturados, sitemap e service worker.

## Requisitos

- Node.js 22.13 ou superior.
- pnpm 11 recomendado. npm também pode ser usado, mas o lockfile versionado é do pnpm.

## Instalação e desenvolvimento

```bash
cd web
pnpm install
pnpm dev
```

Acesse `http://localhost:3000`. Para usar npm, substitua `pnpm` por `npm` nos comandos.

## Qualidade e build

```bash
cd web
pnpm test
pnpm lint
pnpm typecheck
pnpm build
pnpm preview
pnpm test:e2e
```

Os testes unitários cobrem cálculos, validação, migração, locale, tema, serialização, nomes de arquivo, descrição e exportadores. Os testes de componentes verificam preferências globais, semântica do diagrama e opções de exportação. Os testes Playwright percorrem criação, consistência, persistência, idiomas, temas, downloads, teclado, mobile e axe.

## Arquitetura

O código da aplicação fica em `web/` e usa React 19, TypeScript, vinext/Vite, Zustand, Dexie, Zod, jsPDF, SheetJS e JSZip. O domínio é funcional e independente da interface; a persistência só é instanciada no navegador. Veja [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

### Modelo de dados

Cada projeto possui versão de esquema, metadados bibliográficos, modelo de fluxo, 21 contagens semânticas, substituições manuais justificadas, razões de exclusão, proveniência por nó, checklist, preferências de apresentação, histórico e datas. A importação JSON passa por migração e validação Zod.

### Traduções

O locale é detectado por correspondência exata e depois pelo idioma-base; o fallback é inglês. A escolha manual fica em `localStorage`. Textos globais ficam em `web/src/i18n/translations.ts`; os rótulos científicos do diagrama ficam em `web/src/features/builder/diagramModel.ts`. Traduções oficiais são identificadas nas fontes; as demais são traduções próprias da aplicação e devem passar por revisão técnica antes de uso editorial.

### Armazenamento e privacidade

Projetos ficam no IndexedDB do navegador, e preferências ficam no `localStorage`. Não há login, analytics, cookies publicitários, banco remoto ou API necessária. Limpar os dados do site remove os projetos; por isso o backup JSON é parte do fluxo recomendado.

### Exportação

Os formatos são gerados no cliente. SVG e PDF preservam vetores; PNG usa canvas em escala 2×; HTML é autocontido e interativo; ZIP agrega projeto, dados, diagrama, imagens, relatório, planilha e notas de licença. Dados importados de terceiros continuam sujeitos às licenças de suas fontes.

## Deploy no Netlify

O arquivo `netlify.toml` na raiz define:

- base: `web`
- comando: `pnpm build`
- publicação: `dist/client` (o `output: 'export'` do vinext grava o site estático nesse subdiretório)
- Node: `22`
- fallback de subrotas para `index.html`
- headers de segurança e cache imutável para assets

Deploy manual: conecte o repositório no Netlify e aceite as configurações detectadas, ou execute o build e envie `web/dist/client`. Via GitHub, autorize o repositório; cada push na branch de produção dispara o build. Não há variáveis obrigatórias. `URL`, quando fornecida pelo Netlify, é usada na metadata canônica.

## Referências e licenças

O software deste repositório usa licença MIT. Os materiais e templates PRISMA 2020 são disponibilizados pelos respectivos autores sob CC BY 4.0 e não passam a ser MIT. Consulte [docs/SOURCES.md](docs/SOURCES.md) para versões, datas, DOI e proveniência.

## Limitações conhecidas

- A validação cobre relações internas do diagrama; não certifica o protocolo, a estratégia de busca ou o manuscrito.
- IndexedDB é específico do navegador/perfil/dispositivo e pode ser apagado pelo usuário ou por políticas de armazenamento.
- Importações CSV/XLSX aceitam IDs de campos da aplicação; não inferem automaticamente terminologia arbitrária.
- A renderização tipográfica de PDF usa as fontes internas do jsPDF; chinês simplificado permanece melhor preservado em SVG/PNG/HTML até a incorporação de uma fonte CJK no PDF.
- Traduções próprias precisam de revisão humana especializada antes de publicação científica final.

## Roadmap

- Perfis de importação para plataformas de triagem.
- Fonte CJK incorporada ao PDF.
- Validação editorial colaborativa e assinaturas de revisão.
- Mais extensões PRISMA com regras específicas.
- Testes de regressão visual versionados para todos os navegadores.

## Contribuição

Leia [CONTRIBUTING.md](CONTRIBUTING.md). Mudanças em cálculos ou terminologia científica precisam de fonte primária, teste e nota de proveniência.
