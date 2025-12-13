import { BackToTop } from './index'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

export async function BackToTopWrapper() {
  let settings
  
  try {
    const payload = await getPayload({ config: configPromise } as any)
    settings = await payload.findGlobal({
      slug: 'settings',
    })
  } catch {
    // If settings don't exist yet, use defaults
    return <BackToTop showAfterScroll={300} position="bottom-right" />
  }

  const backToTopConfig = settings?.backToTop || {}
  const enabled = backToTopConfig.enabled !== false // default to true
  const showAfterScroll = backToTopConfig.showAfterScroll || 300
  const position = (backToTopConfig.position as 'bottom-right' | 'bottom-left') || 'bottom-right'

  if (!enabled) {
    return null
  }

  return <BackToTop showAfterScroll={showAfterScroll} position={position} />
}
