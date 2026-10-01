import type { LabBlock, RichSpan } from "@/lib/notion"

// Only allow safe link/image schemes. Blocks javascript:/data:/vbscript: etc.
// that could slip in through Notion rich-text hrefs or image blocks.
function safeHref(href: string | null | undefined): string | undefined {
  if (!href) return undefined
  try {
    const u = new URL(href, "https://example.invalid")
    return ["http:", "https:", "mailto:"].includes(u.protocol) ? href : undefined
  } catch {
    return undefined
  }
}

function safeImgSrc(src: string | null | undefined): string | undefined {
  if (!src) return undefined
  try {
    const u = new URL(src, "https://example.invalid")
    return ["http:", "https:"].includes(u.protocol) ? src : undefined
  } catch {
    return undefined
  }
}

function Spans({ spans }: { spans: RichSpan[] }) {
  return (
    <>
      {spans.map((s, i) => {
        let node: React.ReactNode = s.text
        if (s.code) node = <code key={i}>{s.text}</code>
        if (s.bold) node = <strong key={i}>{node}</strong>
        if (s.italic) node = <em key={i}>{node}</em>
        {
          const href = safeHref(s.href)
          if (href)
            node = (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer">
                {node}
              </a>
            )
        }
        return <span key={i}>{node}</span>
      })}
    </>
  )
}

// Groups consecutive list items into <ul>/<ol> for correct semantics.
export function NotionBlocks({ blocks }: { blocks: LabBlock[] }) {
  const out: React.ReactNode[] = []
  let list: { type: "ul" | "ol"; items: LabBlock[] } | null = null

  const flush = () => {
    if (!list) return
    const Tag = list.type
    out.push(
      <Tag key={`list-${out.length}`}>
        {list.items.map((it, i) => (
          <li key={i}>
            <Spans spans={"spans" in it ? it.spans : []} />
          </li>
        ))}
      </Tag>,
    )
    list = null
  }

  blocks.forEach((b, i) => {
    if (b.type === "bulleted_list_item" || b.type === "numbered_list_item") {
      const t = b.type === "bulleted_list_item" ? "ul" : "ol"
      if (!list || list.type !== t) {
        flush()
        list = { type: t, items: [] }
      }
      list.items.push(b)
      return
    }
    flush()

    switch (b.type) {
      case "heading_1":
        out.push(<h1 key={i}><Spans spans={b.spans} /></h1>)
        break
      case "heading_2":
        out.push(<h2 key={i}><Spans spans={b.spans} /></h2>)
        break
      case "heading_3":
        out.push(<h3 key={i}><Spans spans={b.spans} /></h3>)
        break
      case "paragraph":
        if (b.spans.length === 0) break
        out.push(<p key={i}><Spans spans={b.spans} /></p>)
        break
      case "quote":
        out.push(<blockquote key={i}><Spans spans={b.spans} /></blockquote>)
        break
      case "toggle":
        out.push(<p key={i}><Spans spans={b.spans} /></p>)
        break
      case "callout":
        out.push(
          <div key={i} className="callout">
            {b.icon && <span aria-hidden>{b.icon}</span>}
            <div><Spans spans={b.spans} /></div>
          </div>,
        )
        break
      case "code":
        out.push(
          <pre key={i}>
            <code>{b.text}</code>
          </pre>,
        )
        break
      case "image": {
        const imgSrc = safeImgSrc(b.url)
        if (!imgSrc) break
        out.push(
          <figure key={i}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imgSrc} alt={b.caption ?? "writeup image"} />
            {b.caption && (
              <figcaption className="text-sm text-[var(--slate)] mono">{b.caption}</figcaption>
            )}
          </figure>,
        )
        break
      }
      case "divider":
        out.push(<hr key={i} className="my-6 border-[var(--lightest-navy)]" />)
        break
    }
  })
  flush()

  return <div className="prose-writeup">{out}</div>
}
