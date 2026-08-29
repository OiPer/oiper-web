import { resourcesSource } from '@/features/docs/resources-source'
import { createFromSource } from 'fumadocs-core/search/server'

export const { GET } = createFromSource(resourcesSource)
