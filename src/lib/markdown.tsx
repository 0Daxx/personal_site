/**
 * Minimal, dependency-free markdown renderer for article bodies.
 * Supports: ## / ### headings, paragraphs, lists, blockquotes, links,
 * inline code, and fenced code blocks with lightweight syntax highlighting.
 * All input is escaped before formatting — no dangerouslySetInnerHTML.
 */
import type { ReactNode } from "react";

/* ------------------------------ inline parsing ----------------------------- */

const INLINE_RE =
  /(\*\*[^*]+\*\*)|(`[^`]+`)|(\[[^\]]+\]\([^)\s]+\))|(\*[^*]+\*)|(~~[^~]+~~)/g;

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  INLINE_RE.lastIndex = 0;
  while ((m = INLINE_RE.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const token = m[0];
    const key = `${keyPrefix}-i${i++}`;
    if (token.startsWith("**")) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("`")) {
      nodes.push(<code key={key}>{token.slice(1, -1)}</code>);
    } else if (token.startsWith("[")) {
      const match = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(token);
      if (match) {
        nodes.push(
          <a key={key} href={match[2]} target={match[2].startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
            {match[1]}
          </a>
        );
      }
    } else if (token.startsWith("*")) {
      nodes.push(<em key={key}>{token.slice(1, -1)}</em>);
    } else if (token.startsWith("~~")) {
      nodes.push(<del key={key}>{token.slice(2, -2)}</del>);
    }
    last = m.index + token.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/* ------------------------- naive code highlighting ------------------------- */

function highlightCode(code: string): ReactNode[] {
  // comments | strings | keywords | numbers
  const re =
    /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(?:(const|let|function|return|import|from|export|default|async|await|new|class|interface|type|if|else|for|while|try|catch|throw|null|undefined|true|false))|(\b\d+(?:\.\d+)?\b)/g;
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(code)) !== null) {
    if (m.index > last) out.push(code.slice(last, m.index));
    const cls = m[1]
      ? "text-zinc-500 italic"
      : m[2]
        ? "text-emerald-300"
        : m[3]
          ? "text-fuchsia-400"
          : "text-cyan-300";
    out.push(
      <span key={`c${i++}`} className={cls}>
        {m[0]}
      </span>
    );
    last = m.index + m[0].length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}

/* --------------------------------- blocks ---------------------------------- */

export function renderMarkdown(markdown: string): ReactNode[] {
  const lines = markdown.split("\n");
  const blocks: ReactNode[] = [];
  let idx = 0;
  let key = 0;

  const push = (node: ReactNode) => blocks.push(<span key={`b${key++}`}>{node}</span>);

  while (idx < lines.length) {
    const line = lines[idx];

    // fenced code block
    const fence = /^```(\w+)?\s*$/.exec(line);
    if (fence) {
      const lang = fence[1] ?? "text";
      const buf: string[] = [];
      idx++;
      while (idx < lines.length && !/^```\s*$/.test(lines[idx])) buf.push(lines[idx++]);
      idx++; // closing fence
      push(
        <figure className="my-6 overflow-hidden rounded-xl border border-cyan-400/10 bg-void-900 shadow-inner-glow">
          <figcaption className="flex items-center justify-between border-b border-purple-400/10 px-4 py-2">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-fuchsia-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-neon-cyan/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-purple-400/50" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{lang}</span>
          </figcaption>
          <pre className="overflow-x-auto p-5 font-mono text-[0.85rem] leading-relaxed text-zinc-200">
            <code>{highlightCode(buf.join("\n"))}</code>
          </pre>
        </figure>
      );
      continue;
    }

    if (/^### /.test(line)) {
      push(<h3>{renderInline(line.slice(4), `h${key}`)}</h3>);
      idx++;
      continue;
    }
    if (/^## /.test(line)) {
      push(<h2 id={line.slice(3).toLowerCase().replace(/[^a-z0-9]+/g, "-")}>{renderInline(line.slice(3), `h${key}`)}</h2>);
      idx++;
      continue;
    }
    if (/^> /.test(line)) {
      const buf: string[] = [];
      while (idx < lines.length && /^> /.test(lines[idx])) buf.push(lines[idx++].slice(2));
      push(<blockquote>{renderInline(buf.join(" "), `q${key}`)}</blockquote>);
      continue;
    }
    if (/^[-*] /.test(line)) {
      const items: ReactNode[] = [];
      while (idx < lines.length && /^[-*] /.test(lines[idx])) {
        items.push(<li key={`l${idx}`}>{renderInline(lines[idx].slice(2), `li${idx}`)}</li>);
        idx++;
      }
      push(<ul>{items}</ul>);
      continue;
    }
    if (line.trim() === "") {
      idx++;
      continue;
    }

    // paragraph (gather consecutive plain lines)
    const buf: string[] = [line];
    idx++;
    while (idx < lines.length && lines[idx].trim() !== "" && !/^(#|>|[-*] |```)/.test(lines[idx])) {
      buf.push(lines[idx++]);
    }
    push(<p>{renderInline(buf.join(" "), `p${key}`)}</p>);
  }

  return blocks;
}
