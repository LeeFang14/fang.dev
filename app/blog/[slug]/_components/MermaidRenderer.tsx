'use client';

import { useEffect, useRef } from 'react';

export default function MermaidRenderer({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('mermaid').then((m) => {
      m.default.initialize({ startOnLoad: false, theme: 'neutral' });
      if (ref.current) {
        m.default.run({ nodes: ref.current.querySelectorAll('.mermaid') });
      }
    });
  }, [html]);

  return (
    <div
      ref={ref}
      className="prose prose-zinc dark:prose-invert max-w-none prose-code:before:content-none prose-code:after:content-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
