import { OiPerLogoText } from '@/components/logo-text'
import {
  BLOGS_URL,
  DOCS_URL,
  GITHUB_REPO,
  RESOURCES_URL,
} from '@/features/landing-page/constants/links'
import { HomeLayout } from 'fumadocs-ui/layouts/home'
import { RootProvider } from 'fumadocs-ui/provider/next'
import type { PropsWithChildren } from 'react'

export default function Layout(props: PropsWithChildren) {
  return (
    <RootProvider theme={{ enabled: false }} search={{ enabled: false }}>
      <HomeLayout
        nav={{ title: <OiPerLogoText className="text-xl" />, url: '/' }}
        githubUrl={GITHUB_REPO}
        links={[
          { text: 'Blogs', url: BLOGS_URL, active: 'nested-url' },
          { text: 'Documentation', url: DOCS_URL },
          { text: 'Resources', url: RESOURCES_URL },
        ]}
        themeSwitch={{ enabled: false }}
        searchToggle={{ enabled: false }}
      >
        {props.children}
      </HomeLayout>
    </RootProvider>
  )
}
