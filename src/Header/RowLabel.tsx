'use client'
import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Header['navItems']>[number]>()

  const menuLabel = data?.data?.label
  const menuType = data?.data?.type
  const submenuCount = data?.data?.submenu?.length || 0

  let label = 'Meniu nou'
  
  if (menuLabel) {
    if (menuType === 'dropdown') {
      label = `📁 ${menuLabel} (${submenuCount} submeniu${submenuCount !== 1 ? 'ri' : ''})`
    } else {
      label = `🔗 ${menuLabel}`
    }
  }

  return <div>{label}</div>
}
