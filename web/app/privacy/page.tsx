'use client';

import { useApp } from '@/src/app/AppProviders';
import { InfoPage } from '@/src/components/InfoPage';
import type { Locale } from '@/src/domain/types';

const content: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    lead: string;
    storageTitle: string;
    storageBody: string;
    exportsTitle: string;
    exportsBody: string;
    respTitle: string;
    respBody: string;
  }
> = {
  'pt-BR': {
    eyebrow: 'LOCAL-FIRST',
    title: 'Privacidade por arquitetura',
    lead: 'O funcionamento central não exige cadastro, cookies de rastreamento, analytics invasivo ou envio de dados.',
    storageTitle: 'Armazenamento',
    storageBody: 'Projetos são persistidos em IndexedDB no próprio navegador. Preferências de idioma, tema e acessibilidade usam armazenamento local. Limpar os dados do site pode apagar projetos sem backup.',
    exportsTitle: 'Exportações e links',
    exportsBody: 'Arquivos são gerados no dispositivo. Links externos só são abertos por ação do usuário. O aplicativo não coloca dados do projeto em URLs.',
    respTitle: 'Responsabilidade',
    respBody: 'Evite inserir ou publicar resultados licenciados de bases, resumos protegidos, dados pessoais ou arquivos que contrariem direitos autorais e termos de uso. Gere backups JSON regularmente.',
  },
  en: {
    eyebrow: 'LOCAL-FIRST',
    title: 'Privacy by Design',
    lead: 'Core functionality requires no account registration, tracking cookies, invasive analytics, or remote data transmission.',
    storageTitle: 'Local Storage',
    storageBody: 'Projects are persisted in IndexedDB within your browser. Language, theme, and accessibility preferences use localStorage. Clearing browser site data may delete projects without backup.',
    exportsTitle: 'Exports and Links',
    exportsBody: 'All files are generated on your local device. External links only open upon user action. The application never embeds project counts or sensitive data into URLs.',
    respTitle: 'User Responsibility',
    respBody: 'Avoid publishing proprietary database abstracts or copyrighted materials. Regularly generate JSON backups to safeguard your research data.',
  },
  it: {
    eyebrow: 'LOCAL-FIRST',
    title: 'Privacy per progettazione',
    lead: 'Il funzionamento centrale non richiede registrazione, cookie di tracciamento o invio di dati a server.',
    storageTitle: 'Archiviazione',
    storageBody: 'I progetti vengono memorizzati in IndexedDB nel browser.',
    exportsTitle: 'Esportazioni e link',
    exportsBody: 'I file vengono generati sul dispositivo.',
    respTitle: 'Responsabilità',
    respBody: 'Genera regolarmente backup JSON per proteggere le tue ricerche.',
  },
  fr: {
    eyebrow: 'LOCAL-FIRST',
    title: 'Confidentialité par conception',
    lead: 'Le fonctionnement principal ne requiert aucune inscription ni transmission de données.',
    storageTitle: 'Stockage',
    storageBody: 'Les projets sont enregistrés dans IndexedDB sur votre navigateur.',
    exportsTitle: 'Exports et liens',
    exportsBody: 'Tous les fichiers sont créés sur votre appareil.',
    respTitle: 'Responsabilité',
    respBody: 'Effectuez régulièrement des sauvegardes JSON.',
  },
  de: {
    eyebrow: 'LOCAL-FIRST',
    title: 'Datenschutz durch Design',
    lead: 'Keine Registrierung, keine Tracking-Cookies und keine Datenübertragung an Server.',
    storageTitle: 'Speicherung',
    storageBody: 'Projekte werden lokal in IndexedDB gespeichert.',
    exportsTitle: 'Exporte und Links',
    exportsBody: 'Dateien werden direkt auf Ihrem Gerät generiert.',
    respTitle: 'Verantwortung',
    respBody: 'Erstellen Sie regelmäßig JSON-Sicherungen.',
  },
  'zh-CN': {
    eyebrow: '本地优先架构',
    title: '隐私保护设计',
    lead: '核心功能无需注册登录，不使用追踪 Cookies 或侵入性分析工具，默认不向远程服务器传输任何数据。',
    storageTitle: '数据存储',
    storageBody: '所有项目数据均保存在浏览器的 IndexedDB 本地数据库中。语言、主题及无障碍设置保存在 localStorage 中。清理浏览器网站数据可能会清除未备份的项目。',
    exportsTitle: '文件导出与外链',
    exportsBody: '所有格式的文件均在您的本地设备上生成。仅在用户主动点击时才打开外部链接，应用绝不会将项目数据拼接到 URL 参数中。',
    respTitle: '用户须知与责任',
    respBody: '请避免在项目中录入受版权保护的摘要或专有数据。建议定期导出 JSON 备份以确保文献综述数据安全。',
  },
};

export default function PrivacyPage() {
  const { locale } = useApp();
  const text = content[locale] || content['pt-BR'];

  return (
    <InfoPage eyebrow={text.eyebrow} title={text.title} lead={text.lead}>
      <h2>{text.storageTitle}</h2>
      <p>{text.storageBody}</p>

      <h2>{text.exportsTitle}</h2>
      <p>{text.exportsBody}</p>

      <h2>{text.respTitle}</h2>
      <p>{text.respBody}</p>
    </InfoPage>
  );
}
