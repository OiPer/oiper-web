import type { components } from '@/lib/api/schema'

export type NotificationTopic = components['schemas']['NotificationTopic']

export const TOPIC_COPY: Record<
  NotificationTopic,
  { label: string; description: string }
> = {
  'product-releases': {
    label: 'Product updates',
    description: 'Emails about new features, improvements, and fixes.',
  },
}
