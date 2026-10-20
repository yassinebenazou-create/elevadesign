import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'
import { I18nProvider } from './i18n/I18nProvider'
export { getRouteSeo, getSitemapRoutes, indexableRoutes, notFoundRouteSeo } from './seo/routeSeo'
export { seoConfig } from './config/seo'

export function render(url: string) {
  return renderToString(
    <I18nProvider>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </I18nProvider>,
  )
}
