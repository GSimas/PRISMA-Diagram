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
    positioningTitle: string;
    positioningBody: string;
    calculationsTitle: string;
    calculationsBody: string;
    rulesTitle: string;
    rules: string[];
    limitsTitle: string;
    limitsBody: string;
  }
> = {
  'pt-BR': {
    eyebrow: 'REGRAS EXPLÍCITAS',
    title: 'Metodologia da aplicação',
    lead: 'O sistema modela registros, relatos e estudos como unidades diferentes e deriva valores apenas quando a relação é metodologicamente defensável.',
    positioningTitle: 'Posicionamento',
    positioningBody: 'PRISMA é uma diretriz para melhorar a transparência e a completude do relato de revisões; não é uma metodologia para executar a revisão. O aplicativo oferece assistência ao relato e validação de consistência do diagrama.',
    calculationsTitle: 'Cálculos',
    calculationsBody: 'Valores derivados exibem a memória da operação. Sobrescrições manuais exigem justificativa e permanecem marcadas. Nenhum total é modificado apenas para “fechar” o fluxo.',
    rulesTitle: 'Classificação das regras',
    rules: [
      'Válida: relação verificada e consistente.',
      'Atenção: situação possível que merece revisão.',
      'Inconsistência: relação numérica incompatível.',
      'Informação ausente: campo necessário sem valor.',
      'Não aplicável: etapa fora do modelo selecionado.',
    ],
    limitsTitle: 'Limite',
    limitsBody: 'As verificações não avaliam integralmente a estratégia de busca, critérios, risco de viés, síntese ou qualidade científica do manuscrito.',
  },
  en: {
    eyebrow: 'EXPLICIT RULES',
    title: 'Application Methodology',
    lead: 'The system models records, reports and studies as distinct units and only derives values when mathematically and methodologically sound.',
    positioningTitle: 'Positioning',
    positioningBody: 'PRISMA is a reporting guideline to improve transparency and completeness; it is not a methodology for conducting reviews. The application provides reporting assistance and diagram consistency checks.',
    calculationsTitle: 'Calculations',
    calculationsBody: 'Derived values display calculation memory. Manual overrides require justification and remain tracked. No total is artificially altered just to force the flow to close.',
    rulesTitle: 'Rule Classification',
    rules: [
      'Valid: verified consistent relationship.',
      'Attention: possible situation worth reviewing.',
      'Inconsistency: incompatible numerical relationship.',
      'Missing information: required field without value.',
      'Not applicable: stage outside the selected model.',
    ],
    limitsTitle: 'Limitations',
    limitsBody: 'Validations do not evaluate search strategies, inclusion criteria validity, risk of bias assessments, synthesis models, or scientific quality.',
  },
  it: {
    eyebrow: 'REGOLE ESPLICITE',
    title: 'Metodologia dell’applicazione',
    lead: 'Il sistema modella record, report e studi come unità distinte e deriva i valori solo quando metodologicamente fondato.',
    positioningTitle: 'Posizionamento',
    positioningBody: 'PRISMA è una linea guida per migliorare la trasparenza del reporting; non è una metodologia per condurre la revisione.',
    calculationsTitle: 'Calcoli',
    calculationsBody: 'I valori derivati mostrano la memoria di calcolo. Le modifiche manuali richiedono una motivazione.',
    rulesTitle: 'Classificazione delle regole',
    rules: [
      'Valida: relazione verificata e coerente.',
      'Attenzione: situazione possibile che merita revisione.',
      'Incoerenza: relazione numerica incompatibile.',
      'Informazione mancante: campo necessario privo di valore.',
      'Non applicabile: fase non inclusa nel modello.',
    ],
    limitsTitle: 'Limiti',
    limitsBody: 'I controlli non valutano la strategia di ricerca o la qualità scientifica del manoscritto.',
  },
  fr: {
    eyebrow: 'RÈGLES EXPLICITES',
    title: 'Méthodologie de l’application',
    lead: 'Le système modélise les enregistrements, rapports et études comme des unités distinctes et ne déduit les valeurs que lorsqu’elles sont méthodologiquement défendables.',
    positioningTitle: 'Positionnement',
    positioningBody: 'PRISMA est une directive de rédaction visant à améliorer la transparence ; ce n’est pas une méthode pour exécuter la revue.',
    calculationsTitle: 'Calculs',
    calculationsBody: 'Les valeurs dérivées affichent la mémoire de calcul. Les remplacements manuels exigent une justification.',
    rulesTitle: 'Classification des règles',
    rules: [
      'Valide : relation vérifiée et cohérente.',
      'Attention : situation possible nécessitant vérification.',
      'Incohérence : relation numérique incompatible.',
      'Information manquante : champ nécessaire sans valeur.',
      'Non applicable : étape hors du modèle sélectionné.',
    ],
    limitsTitle: 'Limites',
    limitsBody: 'Les vérifications n’évaluent pas la stratégie de recherche ni la qualité scientifique du manuscrit.',
  },
  de: {
    eyebrow: 'EXPLIZITE REGELN',
    title: 'Methodik der Anwendung',
    lead: 'Das System modelliert Datensätze, Berichte und Studien als separate Einheiten und leitet Werte nur bei methodischer Konsistenz ab.',
    positioningTitle: 'Positionierung',
    positioningBody: 'PRISMA ist eine Berichtsleitlinie zur Verbesserung der Transparenz, keine Methodik zur Durchführung der Review.',
    calculationsTitle: 'Berechnungen',
    calculationsBody: 'Abgeleitete Werte zeigen den Berechnungsweg. Manuelle Überschreibungen erfordern eine Begründung.',
    rulesTitle: 'Regelklassifikation',
    rules: [
      'Gültig: geprüfte, konsistente Beziehung.',
      'Hinweis: mögliche Situation, die Prüfung verdient.',
      'Inkonsistenz: inkompatibles Zahlenverhältnis.',
      'Fehlende Angabe: erforderliches Feld ohne Wert.',
      'Nicht zutreffend: Stufe außerhalb des Modells.',
    ],
    limitsTitle: 'Grenzen',
    limitsBody: 'Die Prüfungen bewerten nicht die Suchstrategie oder die wissenschaftliche Qualität der Publikation.',
  },
  'zh-CN': {
    eyebrow: '明确的方法学规则',
    title: '应用方法学说明',
    lead: '系统将记录、报告和研究建模为不同的独立单位，仅在方法学逻辑成立的前提下自动派生数值。',
    positioningTitle: '工具定位',
    positioningBody: 'PRISMA 是旨在提高系统综述报告透明度与完整性的撰写指南，而非执行系统综述的方法学本身。本应用提供报告辅助与流程图一致性验证。',
    calculationsTitle: '数值计算机制',
    calculationsBody: '所有派生数值均展示其推导与计算过程。手动覆盖必须填写理由并全程追踪，系统绝不会为了“拼凑闭合”而人为修改任何总数。',
    rulesTitle: '规则判定分类',
    rules: [
      '有效（Valid）：经检验各项数值逻辑完全一致。',
      '注意（Attention）：可能存在的合理情况，建议复核。',
      '不一致（Inconsistency）：数值逻辑存在冲突或负数。',
      '信息缺失（Missing）：必填步骤未填写数值。',
      '不适用（Not applicable）：所选模型中未启用的阶段。',
    ],
    limitsTitle: '验证局限性',
    limitsBody: '本系统的验证仅限于流程图的结构与数值逻辑，不负责评估检索策略、纳入排除标准、偏倚风险评价、综合分析模型或文稿的整体科学质量。',
  },
};

export default function MethodologyPage() {
  const { locale } = useApp();
  const text = content[locale] || content['pt-BR'];

  return (
    <InfoPage eyebrow={text.eyebrow} title={text.title} lead={text.lead}>
      <h2>{text.positioningTitle}</h2>
      <p>{text.positioningBody}</p>

      <h2>{text.calculationsTitle}</h2>
      <p>{text.calculationsBody}</p>

      <h2>{text.rulesTitle}</h2>
      <ul>
        {text.rules.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ul>

      <h2>{text.limitsTitle}</h2>
      <p>{text.limitsBody}</p>
    </InfoPage>
  );
}
