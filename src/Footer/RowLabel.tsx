'use client'
import { Footer } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Footer['columns']>[number]>()

  const getColumnLabel = () => {
    const type = data?.data?.type
    const rowNumber = data.rowNumber !== undefined ? data.rowNumber + 1 : ''

    const typeLabels = {
      logoAndText: 'Logo și descriere',
      linkList: 'Lista de linkuri',
      socialMedia: 'Social Media',
      contactInfo: 'Contact Info',
      customText: 'Text personalizat',
    }

    const typeLabel = type ? typeLabels[type as keyof typeof typeLabels] : 'Neconfigurat'
    
    // Get additional context based on type
    let contextInfo = ''
    if (type === 'linkList' && data?.data?.linkList?.title) {
      contextInfo = ` - ${data.data.linkList.title}`
    } else if (type === 'socialMedia' && data?.data?.socialMedia?.title) {
      contextInfo = ` - ${data.data.socialMedia.title}`
    } else if (type === 'contactInfo' && data?.data?.contactInfo?.title) {
      contextInfo = ` - ${data.data.contactInfo.title}`
    } else if (type === 'customText' && data?.data?.customText?.title) {
      contextInfo = ` - ${data.data.customText.title}`
    } else if (type === 'logoAndText' && data?.data?.logoText?.title) {
      contextInfo = ` - ${data.data.logoText.title}`
    }

    return `Coloană ${rowNumber}: ${typeLabel}${contextInfo}`
  }

  return <div>{getColumnLabel()}</div>
}
