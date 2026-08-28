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
    featuresTitle: string;
    features: string[];
    limitsTitle: string;
    limitsBody: string;
  }
> = {
  'pt-BR': {
    eyebrow: 'WCAG 2.2 AA',
    title: 'Acessibilidade',
    lead: 'A interface foi projetada para operar com teclado, ampliação, alto contraste, redução de movimento e tecnologias assistivas.',
    featuresTitle: 'Recursos',
    features: [
      'Skip links, foco visível e ordem lógica.',
      'Labels explícitos, erros associados e regiões ao vivo.',
      'Alternativa textual e tabular para o SVG.',
      'Alvos de toque e drawers responsivos.',
      'Tema claro, escuro, alto contraste e escala de fonte.',
      'Preferência de movimento reduzido.',
    ],
    limitsTitle: 'Limitações e contato',
    limitsBody: 'Acessibilidade é um processo contínuo. Exportações complexas podem variar conforme leitor de PDF ou editor gráfico; use o HTML interativo para a alternativa mais rica.',
  },
  en: {
    eyebrow: 'WCAG 2.2 AA',
    title: 'Accessibility',
    lead: 'The interface is engineered to work smoothly with keyboard navigation, screen magnification, high contrast, reduced motion, and assistive technologies.',
    featuresTitle: 'Implemented Features',
    features: [
      'Skip navigation links, visible focus indicators, and logical DOM order.',
      'Explicit form labels, aria-describedby error associations, and live regions.',
      'Complete textual and tabular alternatives for SVG diagrams.',
      'Generous touch targets and responsive mobile drawers.',
      'Light, dark, high contrast modes and dynamic font scaling.',
      'Reduced motion preference support.',
    ],
    limitsTitle: 'Continuous Improvement',
    limitsBody: 'Accessibility is an ongoing priority. Complex vector outputs may render differently depending on PDF reader; interactive HTML provides the richest accessible representation.',
  },
  it: {
    eyebrow: 'WCAG 2.2 AA',
    title: 'Accessibilità',
    lead: 'L’interfaccia è progettata per funzionare con tastiera, alto contrasto, riduzione del movimento e tecnologie assistive.',
    featuresTitle: 'Funzionalità',
    features: [
      'Skip link, focus visibile e ordine logico.',
      'Etichette esplicite e aree live.',
      'Alternativa testuale e tabellare all’SVG.',
      'Modalità chiaro, scuro, alto contrasto e ridimensionamento caratteri.',
    ],
    limitsTitle: 'Miglioramento continuo',
    limitsBody: 'L’accessibilità è una priorità continua.',
  },
  fr: {
    eyebrow: 'WCAG 2.2 AA',
    title: 'Accessibilité',
    lead: 'L’interface est conçue pour fonctionner avec clavier, contraste élevé, réduction des animations et technologies d’assistance.',
    featuresTitle: 'Fonctionnalités',
    features: [
      'Liens d’évitement, focus visible et ordre logique.',
      'Labels explicites et régions en direct.',
      'Alternative textuelle et tabulaire pour le SVG.',
      'Thèmes clair, sombre, contraste élevé et zoom du texte.',
    ],
    limitsTitle: 'Amélioration continue',
    limitsBody: 'L’accessibilité fait l’objet d’un engagement constant.',
  },
  de: {
    eyebrow: 'WCAG 2.2 AA',
    title: 'Barrierefreiheit',
    lead: 'Die Oberfläche wurde für Tastaturbedienung, Vergrößerung, hohen Kontrast und assistive Technologien entwickelt.',
    featuresTitle: 'Funktionen',
    features: [
      'Skip-Links, sichtbarer Fokus und logische Tab-Reihenfolge.',
      'Explizite Labels und Live-Regionen.',
      'Textuelle und tabellarische Alternative zum SVG.',
      'Hell-, Dunkel-, Kontrastmodus und variable Schriftgröße.',
    ],
    limitsTitle: 'Kontinuierliche Verbesserung',
    limitsBody: 'Barrierefreiheit ist ein fortlaufender Prozess.',
  },
  'zh-CN': {
    eyebrow: 'WCAG 2.2 AA 规范',
    title: '无障碍访问承诺',
    lead: '界面专为键盘无障碍导航、屏幕放大、高对比度、动态效果减弱及各类辅助技术而设计。',
    featuresTitle: '已实现的无障碍功能',
    features: [
      '跳至主要内容链接（Skip links）、清晰的高亮焦点及逻辑 DOM 顺序。',
      '明确的表单标签关联、错误信息 ARIA 提示及屏幕阅读器实时播报区。',
      '为 SVG 流程图提供完整的文本与表格替代视图。',
      '友好的触控点击区域与移动端响应式抽屉。',
      '浅色、深色、高对比度主题以及字体自由缩放功能。',
      '支持系统级减少动态效果偏好设置。',
    ],
    limitsTitle: '持续优化',
    limitsBody: '无障碍体验是一项持续优化的工程。复杂的矢量导出文件在不同 PDF 阅读器中的朗读支持可能存在差异，推荐使用交互式 HTML 获取最丰富的无障碍体验。',
  },
};

export default function AccessibilityPage() {
  const { locale } = useApp();
  const text = content[locale] || content['pt-BR'];

  return (
    <InfoPage eyebrow={text.eyebrow} title={text.title} lead={text.lead}>
      <h2>{text.featuresTitle}</h2>
      <ul>
        {text.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>

      <h2>{text.limitsTitle}</h2>
      <p>{text.limitsBody}</p>
    </InfoPage>
  );
}
