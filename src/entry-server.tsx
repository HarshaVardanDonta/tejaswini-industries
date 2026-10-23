import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'

import { AppRoutes } from './App'
import { getPrerenderPaths } from './cms/routes'
import { beginHeadCapture, endHeadCapture, renderHeadHtml } from './seo/headSink'

export function render(url: string) {
  const sink = beginHeadCapture()
  const basename = import.meta.env.BASE_URL
  try {
    const html = renderToString(
      <StaticRouter location={url} basename={basename && basename !== '/' ? basename : undefined}>
        <AppRoutes />
      </StaticRouter>,
    )
    return { html, head: renderHeadHtml(sink) }
  } finally {
    endHeadCapture()
  }
}

export const prerenderPaths = getPrerenderPaths()
