import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Library } from '../../../payload-types'

export const revalidateLibraryItem: CollectionAfterChangeHook<Library> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const paths = [`/biblioteca/${doc.slug}`, `/library/${doc.slug}`]

      paths.forEach((path) => {
        payload.logger.info(`Revalidating library item at path: ${path}`)
        revalidatePath(path)
      })

      revalidateTag('library-sitemap')
    }

    // If the item was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPaths = [`/biblioteca/${previousDoc.slug}`, `/library/${previousDoc.slug}`]

      oldPaths.forEach((path) => {
        payload.logger.info(`Revalidating old library item at path: ${path}`)
        revalidatePath(path)
      })

      revalidateTag('library-sitemap')
    }
  }
  return doc
}

export const revalidateLibraryDelete: CollectionAfterDeleteHook<Library> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const paths = [`/biblioteca/${doc?.slug}`, `/library/${doc?.slug}`]

    paths.forEach((path) => {
      revalidatePath(path)
    })

    revalidateTag('library-sitemap')
  }

  return doc
}
