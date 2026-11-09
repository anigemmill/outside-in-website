/**
 * Renders the Findable legal drafts (src/content/findable-legal/*.md) for the
 * draft review pages under /findable/privacy/ and /findable/terms/.
 *
 * The Markdown files are copies of docs/legal/ in the Findable app repo
 * (anigemmill/Tourism-AI-Growth-Platform). Edit them there first, then copy.
 *
 * Because the pages are public (though unlisted and noindex), the drafting
 * notes are never shown: each [[TYPE: note]] marker becomes a neutral
 * "open item" chip (LAWYER markers are dropped), and the internal notice at
 * the top of each file is dropped.
 */
import { createMarkdownProcessor } from '@astrojs/markdown-remark';

/** Documents with their own page; links to any other draft become plain text. */
const pages: Record<string, string> = {
  '03-privacy-policy.md': '/findable/privacy/',
  '01-business-terms-of-service.md': '/findable/terms/business/',
  '01b-consumer-terms-of-service.md': '/findable/terms/consumer/',
};

const chip: Record<string, string> = {
  PLACEHOLDER: 'To be confirmed',
  DECISION: 'Decision pending',
  REQ: 'Not in place yet',
};

function markers(md: string): { md: string; count: number } {
  let count = 0;
  let out = '';
  let i = 0;
  while (i < md.length) {
    const start = md.indexOf('[[', i);
    if (start < 0) { out += md.slice(i); break; }
    const end = md.indexOf(']]', start);
    if (end < 0) throw new Error('Unclosed [[ marker in legal draft');
    const type = (md.slice(start + 2, end).match(/^[A-Z]+/) ?? ['PLACEHOLDER'])[0];
    if (type === 'LAWYER') {
      // Questions for the lawyer stay in the source drafts but aren't shown
      // on the website (Ani, 9 Nov 2026). The draft banner already says the
      // documents haven't been reviewed by a lawyer.
      out += md.slice(i, start).replace(/[ \t]+$/, '');
    } else {
      out += md.slice(i, start) + `<span class="lg-open">${chip[type] ?? chip.PLACEHOLDER}</span>`;
      count++;
    }
    i = end + 2;
  }
  return { md: out, count };
}

function links(md: string): string {
  return md.replace(/\[([^\]]+)\]\(([0-9][0-9a-z-]*\.md)(#[^)]*)?\)/g, (_m, text: string, file: string, hash = '') =>
    pages[file] ? `[${text}](${pages[file]}${hash})` : `${text} (not yet published)`,
  );
}

/** Drops the leading `> ...` notice block, which is for reviewers only. */
function dropNotice(md: string): string {
  return md.replace(/^(# .+\n)\n(?:>.*\n)+/, '$1');
}

let processor: Awaited<ReturnType<typeof createMarkdownProcessor>> | undefined;

export async function renderLegal(raw: string) {
  processor ??= await createMarkdownProcessor({ gfm: true, smartypants: true });
  const { md, count } = markers(links(dropNotice(raw)));
  const title = (md.match(/^# (.+)$/m) ?? ['', 'Findable'])[1];
  const version = (md.match(/\*\*Version:\*\* ([^\s·]+)/) ?? ['', 'draft'])[1];
  const body = md.replace(/^# .+\n/, '').replace(/^\*\*Version:\*\*.*\n/m, '');
  const { code } = await processor.render(body);
  // Wide tables scroll sideways on phones; the scroll region must be focusable.
  const html = code.replace(/<table>/g, '<div class="lg-table" tabindex="0" role="region" aria-label="Table">' + '<table>').replace(/<\/table>/g, '</table></div>');
  return { title, version, html, open: count };
}
