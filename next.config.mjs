import { createMDX } from 'fumadocs-mdx/next'
import process from 'node:process'

const withMDX = createMDX()

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: { removeConsole: process.env.NODE_ENV === 'production' },
}

export default withMDX(nextConfig)
