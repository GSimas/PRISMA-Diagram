import type { Locale } from '../domain/types';

export const localeNames: Record<Locale, string> = {
  'pt-BR': 'Português (Brasil)', en: 'English', it: 'Italiano',
  fr: 'Français', de: 'Deutsch', 'zh-CN': '简体中文',
};

const en = {
  learn: 'Learn', create: 'Create diagram', projects: 'My projects', guidelines: 'Guidelines & extensions',
  about: 'About', newDiagram: 'New diagram', theme: 'Theme', accessibility: 'Accessibility',
  language: 'Language', system: 'System', light: 'Light', dark: 'Dark', fontSize: 'Text size',
  highContrast: 'High contrast', reduceMotion: 'Reduce motion', restore: 'Restore preferences',
  coffee: 'Buy me a coffee', developedBy: 'Developed by', methodology: 'Methodology', privacy: 'Privacy',
  sources: 'Sources & references', license: 'License', builder: 'Diagram builder', dashboard: 'Local projects',
  validation: 'Validation', checklist: 'Checklist', export: 'Export', backup: 'Save backup', undo: 'Undo',
  redo: 'Redo', fit: 'Fit to screen', fullscreen: 'Full screen', printPreview: 'Print preview',
  saved: 'Saved locally', saving: 'Saving locally…', localOnly: 'Your scientific data stays in this browser.',
  prismaMode: 'PRISMA mode', presentationMode: 'Presentation mode', data: 'Data', details: 'Details',
  informed: 'Informed', derived: 'Derived', override: 'Manual override', count: 'Count',
  title: 'Review title', authors: 'Authors', institution: 'Institution', protocol: 'Protocol DOI or URL',
  newReview: 'New review', updatedReview: 'Updated review', otherSources: 'Uses other sources',
  addReason: 'Add exclusion reason', report: 'Complete report', import: 'Import', search: 'Search projects',
  emptyProjects: 'No local projects yet.', createFirst: 'Create the first project',
};

export type TranslationKey = keyof typeof en;

const pt: Record<TranslationKey, string> = {
  learn: 'Aprender', create: 'Criar diagrama', projects: 'Meus projetos', guidelines: 'Diretrizes e extensões',
  about: 'Sobre', newDiagram: 'Novo diagrama', theme: 'Tema', accessibility: 'Acessibilidade',
  language: 'Idioma', system: 'Sistema', light: 'Claro', dark: 'Escuro', fontSize: 'Tamanho do texto',
  highContrast: 'Alto contraste', reduceMotion: 'Reduzir movimentos', restore: 'Restaurar preferências',
  coffee: 'Pague-me um café', developedBy: 'Desenvolvido por', methodology: 'Metodologia', privacy: 'Privacidade',
  sources: 'Fontes e referências', license: 'Licença', builder: 'Construtor de diagrama', dashboard: 'Projetos locais',
  validation: 'Validação', checklist: 'Checklist', export: 'Exportar', backup: 'Salvar backup', undo: 'Desfazer',
  redo: 'Refazer', fit: 'Ajustar à tela', fullscreen: 'Tela cheia', printPreview: 'Prévia de impressão',
  saved: 'Salvo localmente', saving: 'Salvando localmente…', localOnly: 'Seus dados científicos permanecem neste navegador.',
  prismaMode: 'Modo PRISMA', presentationMode: 'Modo apresentação', data: 'Dados', details: 'Detalhes',
  informed: 'Informado', derived: 'Derivado', override: 'Sobrescrição manual', count: 'Contagem',
  title: 'Título da revisão', authors: 'Autores', institution: 'Instituição', protocol: 'DOI ou URL do protocolo',
  newReview: 'Revisão nova', updatedReview: 'Revisão atualizada', otherSources: 'Utiliza outras fontes',
  addReason: 'Adicionar razão de exclusão', report: 'Relatório completo', import: 'Importar', search: 'Pesquisar projetos',
  emptyProjects: 'Nenhum projeto local ainda.', createFirst: 'Criar o primeiro projeto',
};

const it: Record<TranslationKey, string> = {
  ...en, learn: 'Imparare', create: 'Crea diagramma', projects: 'I miei progetti', guidelines: 'Linee guida ed estensioni',
  about: 'Informazioni', newDiagram: 'Nuovo diagramma', theme: 'Tema', accessibility: 'Accessibilità', language: 'Lingua',
  system: 'Sistema', light: 'Chiaro', dark: 'Scuro', fontSize: 'Dimensione testo', highContrast: 'Alto contrasto',
  reduceMotion: 'Riduci movimento', restore: 'Ripristina preferenze', coffee: 'Offrimi un caffè',
  developedBy: 'Sviluppato da', methodology: 'Metodologia', privacy: 'Privacy', sources: 'Fonti e riferimenti',
  license: 'Licenza', builder: 'Costruttore del diagramma', dashboard: 'Progetti locali', validation: 'Validazione',
  checklist: 'Lista di controllo', export: 'Esporta', backup: 'Salva backup', undo: 'Annulla', redo: 'Ripeti',
  fit: 'Adatta allo schermo', fullscreen: 'Schermo intero', printPreview: 'Anteprima di stampa',
  saved: 'Salvato localmente', saving: 'Salvataggio locale…', localOnly: 'I dati scientifici restano in questo browser.',
  prismaMode: 'Modalità PRISMA', presentationMode: 'Modalità presentazione', data: 'Dati', details: 'Dettagli',
  informed: 'Inserito', derived: 'Derivato', override: 'Sostituzione manuale', count: 'Conteggio',
  title: 'Titolo della revisione', authors: 'Autori', institution: 'Istituzione', protocol: 'DOI o URL del protocollo',
  newReview: 'Nuova revisione', updatedReview: 'Revisione aggiornata', otherSources: 'Usa altre fonti',
  addReason: 'Aggiungi motivo di esclusione', report: 'Rapporto completo', import: 'Importa',
  search: 'Cerca progetti', emptyProjects: 'Nessun progetto locale.', createFirst: 'Crea il primo progetto',
};

const fr: Record<TranslationKey, string> = {
  ...en, learn: 'Apprendre', create: 'Créer un diagramme', projects: 'Mes projets', guidelines: 'Directives et extensions',
  about: 'À propos', newDiagram: 'Nouveau diagramme', theme: 'Thème', accessibility: 'Accessibilité', language: 'Langue',
  system: 'Système', light: 'Clair', dark: 'Sombre', fontSize: 'Taille du texte', highContrast: 'Contraste élevé',
  reduceMotion: 'Réduire les animations', restore: 'Réinitialiser les préférences', coffee: 'Offrez-moi un café',
  developedBy: 'Développé par', methodology: 'Méthodologie', privacy: 'Confidentialité', sources: 'Sources et références',
  license: 'Licence', builder: 'Constructeur de diagramme', dashboard: 'Projets locaux', validation: 'Validation',
  checklist: 'Liste de contrôle', export: 'Exporter', backup: 'Enregistrer la sauvegarde', undo: 'Annuler', redo: 'Rétablir',
  fit: 'Ajuster à l’écran', fullscreen: 'Plein écran', printPreview: 'Aperçu avant impression',
  saved: 'Enregistré localement', saving: 'Enregistrement local…', localOnly: 'Vos données scientifiques restent dans ce navigateur.',
  prismaMode: 'Mode PRISMA', presentationMode: 'Mode présentation', data: 'Données', details: 'Détails',
  informed: 'Saisi', derived: 'Dérivé', override: 'Remplacement manuel', count: 'Nombre',
  title: 'Titre de la revue', authors: 'Auteurs', institution: 'Institution', protocol: 'DOI ou URL du protocole',
  newReview: 'Nouvelle revue', updatedReview: 'Revue mise à jour', otherSources: 'Utilise d’autres sources',
  addReason: 'Ajouter un motif d’exclusion', report: 'Rapport complet', import: 'Importer',
  search: 'Rechercher des projets', emptyProjects: 'Aucun projet local.', createFirst: 'Créer le premier projet',
};

const de: Record<TranslationKey, string> = {
  ...en, learn: 'Lernen', create: 'Diagramm erstellen', projects: 'Meine Projekte', guidelines: 'Leitlinien und Erweiterungen',
  about: 'Über uns', newDiagram: 'Neues Diagramm', theme: 'Design', accessibility: 'Barrierefreiheit', language: 'Sprache',
  system: 'System', light: 'Hell', dark: 'Dunkel', fontSize: 'Textgröße', highContrast: 'Hoher Kontrast',
  reduceMotion: 'Bewegungen reduzieren', restore: 'Einstellungen zurücksetzen', coffee: 'Spendiere mir einen Kaffee',
  developedBy: 'Entwickelt von', methodology: 'Methodik', privacy: 'Datenschutz', sources: 'Quellen und Referenzen',
  license: 'Lizenz', builder: 'Diagramm-Editor', dashboard: 'Lokale Projekte', validation: 'Validierung',
  checklist: 'Checkliste', export: 'Exportieren', backup: 'Sicherung speichern', undo: 'Rückgängig', redo: 'Wiederholen',
  fit: 'Ansicht anpassen', fullscreen: 'Vollbild', printPreview: 'Druckvorschau',
  saved: 'Lokal gespeichert', saving: 'Wird lokal gespeichert…', localOnly: 'Ihre wissenschaftlichen Daten bleiben in diesem Browser.',
  prismaMode: 'PRISMA-Modus', presentationMode: 'Präsentationsmodus', data: 'Daten', details: 'Details',
  informed: 'Eingegeben', derived: 'Abgeleitet', override: 'Manuelle Überschreibung', count: 'Anzahl',
  title: 'Titel der Übersichtsarbeit', authors: 'Autor:innen', institution: 'Institution', protocol: 'DOI oder URL des Protokolls',
  newReview: 'Neue Übersichtsarbeit', updatedReview: 'Aktualisierte Übersichtsarbeit', otherSources: 'Verwendet weitere Quellen',
  addReason: 'Ausschlussgrund hinzufügen', report: 'Vollständiger Bericht', import: 'Importieren',
  search: 'Projekte durchsuchen', emptyProjects: 'Noch keine lokalen Projekte.', createFirst: 'Erstes Projekt erstellen',
};

const zh: Record<TranslationKey, string> = {
  ...en, learn: '学习', create: '创建流程图', projects: '我的项目', guidelines: '指南与扩展', about: '关于',
  newDiagram: '新建流程图', theme: '主题', accessibility: '无障碍', language: '语言', system: '跟随系统',
  light: '浅色', dark: '深色', fontSize: '文字大小', highContrast: '高对比度', reduceMotion: '减少动态效果',
  restore: '恢复默认设置', coffee: '请我喝杯咖啡', developedBy: '开发者', methodology: '方法说明', privacy: '隐私',
  sources: '来源与参考文献', license: '许可证', builder: '流程图编辑器', dashboard: '本地项目',
  validation: '验证', checklist: '核对清单', export: '导出', backup: '保存备份', undo: '撤销', redo: '重做',
  fit: '适应屏幕', fullscreen: '全屏', printPreview: '打印预览', saved: '已保存到本地', saving: '正在本地保存…',
  localOnly: '您的科研数据仅保存在此浏览器中。', prismaMode: 'PRISMA 模式', presentationMode: '演示模式',
  data: '数据', details: '详细信息', informed: '已填写', derived: '自动计算', override: '手动覆盖', count: '数量',
  title: '综述标题', authors: '作者', institution: '机构', protocol: '方案 DOI 或网址',
  newReview: '新综述', updatedReview: '更新综述', otherSources: '使用其他来源', addReason: '添加排除理由',
  report: '完整报告', import: '导入', search: '搜索项目', emptyProjects: '暂无本地项目。', createFirst: '创建第一个项目',
};

export const translations: Record<Locale, Record<TranslationKey, string>> = {
  'pt-BR': pt, en, it, fr, de, 'zh-CN': zh,
};
