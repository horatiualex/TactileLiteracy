import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Welcome to Tactile CMS!</h4>
      </Banner>
      Here&apos;s what to do next:
      <ul className={`${baseClass}__instructions`}>
        <li>
          <SeedButton />
          {' with a few pages, posts, and projects to jump-start your new site, then '}
          <a href="/" target="_blank">
            visit your website
          </a>
          {' to see the results.'}
        </li>
        <li>
          Start creating and managing your content using the collections in the sidebar.
        </li>
        <li>
          Customize your website by modifying the pages, posts, and media in the admin panel.
        </li>
        <li>
          Visit your website to see your changes in action.
        </li>
      </ul>
      {'Need help? Check out the documentation or contact the Tactile CMS team.'}
    </div>
  )
}

export default BeforeDashboard
