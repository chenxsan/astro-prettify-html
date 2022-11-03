import { writeFile, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import prettier from 'prettier'

export default function () {
  return {
    name: 'astro-prettify-html',
    hooks: {
      'astro:build:setup': (options) => {
        options.vite.build.manifest = true
      },
      'astro:build:done': async ({ dir, routes }) => {
        for (const route of routes) {
          const filePath = fileURLToPath(route.distURL.href, dir)
          try {
            const html = await readFile(filePath, { encoding: 'utf8' })
            await writeFile(
              filePath,
              prettier.format(html, {
                parser: 'html',
              })
            )
          } catch (err) {
            console.error(err)
          }
        }
      },
    },
  }
}
