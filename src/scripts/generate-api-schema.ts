import { env } from '@/lib/env'
import { joinUrl } from '@/lib/url'
import fs from 'node:fs/promises'
import path from 'node:path'
import openapiTS, { astToString } from 'openapi-typescript'

const SERVER_BASE_URL = joinUrl(env.OIPER_SERVER_URL, '/openapi.json')
const outputPath = path.resolve('src/lib/api/schema.d.ts')

async function main() {
  const ast = await openapiTS(new URL(SERVER_BASE_URL))
  const contents = [
    '/* eslint-disable @typescript-eslint/naming-convention, prettier/prettier */',
    astToString(ast),
  ].join('\n')

  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await fs.writeFile(outputPath, contents, 'utf8')

  console.log(`Generated ${outputPath} from ${SERVER_BASE_URL}`)
}

void main()
