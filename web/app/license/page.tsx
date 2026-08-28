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
    codeTitle: string;
    codeBody: string;
    prismaTitle: string;
    prismaBody: string;
    libsTitle: string;
    libsBody: string;
  }
> = {
  'pt-BR': {
    eyebrow: 'PROVENIÊNCIA',
    title: 'Licenças e atribuições',
    lead: 'O código do PRISMA Lab é MIT; documentos e templates PRISMA 2020 usados como base são CC BY 4.0.',
    codeTitle: 'Código',
    codeBody: 'Copyright © 2026 Gustavo Simas. Licenciado sob MIT, conforme o arquivo LICENSE do repositório.',
    prismaTitle: 'PRISMA 2020',
    prismaBody: 'Os templates de diagrama, checklist, statement e explanation & elaboration são distribuídos sob CC BY 4.0. Atribuição: Page MJ et al. The PRISMA 2020 statement. BMJ 2021;372:n71.',
    libsTitle: 'Bibliotecas',
    libsBody: 'React, Next, Vite, Dexie, Zod, Zustand, JSZip, SheetJS, jsPDF, Lucide, Vitest, Testing Library e Playwright mantêm suas respectivas licenças de código aberto.',
  },
  en: {
    eyebrow: 'PROVENANCE',
    title: 'Licenses & Attributions',
    lead: 'PRISMA Lab source code is released under the MIT License; foundational PRISMA 2020 templates and documents are licensed under CC BY 4.0.',
    codeTitle: 'Source Code',
    codeBody: 'Copyright © 2026 Gustavo Simas. Licensed under the MIT License, as detailed in the LICENSE repository file.',
    prismaTitle: 'PRISMA 2020 Foundation',
    prismaBody: 'Flow diagram templates, checklists, statement, and explanation & elaboration documents are distributed under CC BY 4.0. Attribution: Page MJ et al. The PRISMA 2020 statement. BMJ 2021;372:n71.',
    libsTitle: 'Open Source Libraries',
    libsBody: 'React, Next, Vite, Dexie, Zod, Zustand, JSZip, SheetJS, jsPDF, Lucide, Vitest, Testing Library, and Playwright retain their respective open source licenses.',
  },
  it: {
    eyebrow: 'PROVENIENZA',
    title: 'Licenze e attribuzioni',
    lead: 'Il codice sorgente di PRISMA Lab è MIT; i template PRISMA 2020 sono CC BY 4.0.',
    codeTitle: 'Codice',
    codeBody: 'Copyright © 2026 Gustavo Simas. Licenza MIT.',
    prismaTitle: 'PRISMA 2020',
    prismaBody: 'I template di diagramma e checklist sono distribuiti sotto licenza CC BY 4.0.',
    libsTitle: 'Librerie',
    libsBody: 'React, Next, Vite, Dexie, Zod e le altre librerie mantengono le rispettive licenze.',
  },
  fr: {
    eyebrow: 'PROVENANCE',
    title: 'Licences et attributions',
    lead: 'Le code source de PRISMA Lab est sous licence MIT ; les modèles PRISMA 2020 sont sous CC BY 4.0.',
    codeTitle: 'Code source',
    codeBody: 'Copyright © 2026 Gustavo Simas. Sous licence MIT.',
    prismaTitle: 'PRISMA 2020',
    prismaBody: 'Les modèles de diagramme et listes de contrôle sont distribués sous licence CC BY 4.0.',
    libsTitle: 'Bibliothèques',
    libsBody: 'React, Next, Vite, Dexie, Zod et les autres dépendances conservent leurs licences respectives.',
  },
  de: {
    eyebrow: 'HERKUNFT',
    title: 'Lizenzen und Namensnennung',
    lead: 'Der Quellcode von PRISMA Lab steht unter der MIT-Lizenz; PRISMA-2020-Vorlagen unter CC BY 4.0.',
    codeTitle: 'Quellcode',
    codeBody: 'Copyright © 2026 Gustavo Simas. Lizenziert unter MIT.',
    prismaTitle: 'PRISMA 2020',
    prismaBody: 'Diagrammvorlagen und Checklisten werden unter CC BY 4.0 bereitgestellt.',
    libsTitle: 'Bibliotheken',
    libsBody: 'React, Next, Vite, Dexie, Zod und weitere Bibliotheken behalten ihre jeweiligen Open-Source-Lizenzen.',
  },
  'zh-CN': {
    eyebrow: '来源与许可溯源',
    title: '开源许可与署名',
    lead: 'PRISMA Lab 源代码采用 MIT 开源许可证发布；PRISMA 2020 官方规范与流程图模板遵循 CC BY 4.0 许可。',
    codeTitle: '源代码许可',
    codeBody: '版权所有 © 2026 Gustavo Simas。基于 MIT 许可证分发，详见仓库 LICENSE 文件。',
    prismaTitle: 'PRISMA 2020 官方模板',
    prismaBody: '流程图模板、核对清单、声明文件及解释阐述文档均在 CC BY 4.0 协议下分发。署名引文：Page MJ et al. The PRISMA 2020 statement. BMJ 2021;372:n71。',
    libsTitle: '开源第三方库',
    libsBody: 'React、Next、Vite、Dexie、Zod、Zustand、JSZip、SheetJS、jsPDF、Lucide、Vitest、Testing Library 与 Playwright 均保留各自的开源软件许可证。',
  },
};

export default function LicensePage() {
  const { locale } = useApp();
  const text = content[locale] || content['pt-BR'];

  return (
    <InfoPage eyebrow={text.eyebrow} title={text.title} lead={text.lead}>
      <h2>{text.codeTitle}</h2>
      <p>{text.codeBody}</p>

      <h2>{text.prismaTitle}</h2>
      <p>{text.prismaBody}</p>

      <h2>{text.libsTitle}</h2>
      <p>{text.libsBody}</p>
    </InfoPage>
  );
}
