import fs from 'node:fs'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/** Fold the entry stylesheet into index.html so it is not a render-blocking request. */
function inlineRenderBlockingCss(): Plugin {
  let outDir = 'dist'
  return {
    name: 'inline-render-blocking-css',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const indexPath = path.join(outDir, 'index.html')
      if (!fs.existsSync(indexPath)) return

      let html = fs.readFileSync(indexPath, 'utf8')
      html = html.replace(/<link\s[^>]*rel=["']stylesheet["'][^>]*>/gi, (tag) => {
        const hrefMatch = /href=["']([^"']+)["']/i.exec(tag)
        if (!hrefMatch) return tag
        const href = hrefMatch[1]
        if (/^https?:\/\//i.test(href)) return tag

        const cssPath = path.join(outDir, href.replace(/^\//, ''))
        if (!fs.existsSync(cssPath)) return tag

        const cssDir = path.posix.dirname(href.startsWith('/') ? href : `/${href}`)
        const css = absolutizeCssUrls(fs.readFileSync(cssPath, 'utf8'), cssDir).replace(
          /<\/style/gi,
          '<\\/style'
        )
        fs.unlinkSync(cssPath)
        return `<style>${css}</style>`
      })
      fs.writeFileSync(indexPath, html)
    },
  }
}

function absolutizeCssUrls(css: string, cssDir: string): string {
  const base = `http://local${cssDir.endsWith('/') ? cssDir : `${cssDir}/`}`
  return css.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g, (match, quote, rawUrl) => {
    const url = String(rawUrl).trim()
    if (
      url.startsWith('data:') ||
      url.startsWith('http:') ||
      url.startsWith('https:') ||
      url.startsWith('/') ||
      url.startsWith('#')
    ) {
      return match
    }
    const resolved = new URL(url, base)
    return `url(${quote}${resolved.pathname}${resolved.search}${quote})`
  })
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), inlineRenderBlockingCss()],
})
