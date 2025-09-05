import React from 'react'

type FileItem = {
  title?: string
  file?: {
    url?: string
    mimeType?: string
    filesize?: number
  }
  description?: string
}

type Props = {
  className?: string
  title?: string
  files?: FileItem[]
  style?: 'list' | 'cards' | 'compact'
  columns?: '1' | '2'
}

export const FileListBlockComponent: React.FC<Props> = ({ 
  className, 
  title, 
  files, 
  style = 'list',
  columns = '1'
}) => {
  if (!files || files.length === 0) {
    return null
  }

  const getFileIcon = (mimeType?: string) => {
    if (!mimeType) return '📄'
    
    if (mimeType.includes('pdf')) return '📄'
    if (mimeType.includes('word') || mimeType.includes('document')) return '📝'
    if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return '📊'
    if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) return '📊'
    if (mimeType.includes('image')) return '🖼️'
    if (mimeType.includes('video')) return '🎥'
    if (mimeType.includes('audio')) return '🎵'
    return '📄'
  }

  const getFileSize = (filesize?: number) => {
    if (!filesize) return ''
    
    const units = ['B', 'KB', 'MB', 'GB']
    let size = filesize
    let unitIndex = 0
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024
      unitIndex++
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`
  }

  return (
    <div className={`container ${className || ''}`}>
      {title && (
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          {title}
        </h2>
      )}

      {style === 'list' && (
        <div className={`grid gap-4 ${columns === '2' ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
          {files.map((fileItem: FileItem, index: number) => {
            if (!fileItem || typeof fileItem.file !== 'object' || !fileItem.file) return null
            
            const { file, title: fileTitle, description } = fileItem
            const media = file
            
            return (
              <div 
                key={index} 
                className="border-l-4 border-gray-900 dark:border-gray-100 pl-6 py-3 bg-gray-50 dark:bg-gray-800/50 rounded-r-lg"
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-0.5 flex-shrink-0">
                    {getFileIcon(media.mimeType)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <a
                      href={media.url || ''}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-primary font-medium transition-colors block mb-1"
                    >
                      {fileTitle}
                    </a>
                    {description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                        {description}
                      </p>
                    )}
                    {media.filesize && (
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        {getFileSize(media.filesize)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {style === 'cards' && (
        <div className={`grid gap-4 ${columns === '2' ? 'md:grid-cols-2' : 'grid-cols-1'} lg:grid-cols-${columns === '2' ? '2' : '1'}`}>
          {files.map((fileItem: FileItem, index: number) => {
            if (!fileItem || typeof fileItem.file !== 'object' || !fileItem.file) return null
            
            const { file, title: fileTitle, description } = fileItem
            const media = file
            
            return (
              <a
                key={index}
                href={media.url || ''}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">
                    {getFileIcon(media.mimeType)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                      {fileTitle}
                    </h3>
                    {description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        {description}
                      </p>
                    )}
                    {media.filesize && (
                      <span className="text-xs text-gray-500 dark:text-gray-500 mt-2 block">
                        {getFileSize(media.filesize)}
                      </span>
                    )}
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      )}

      {style === 'compact' && (
        <div className={`grid gap-2 ${columns === '2' ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
          {files.map((fileItem: FileItem, index: number) => {
            if (!fileItem || typeof fileItem.file !== 'object' || !fileItem.file) return null
            
            const { file, title: fileTitle } = fileItem
            const media = file
            
            return (
              <a
                key={index}
                href={media.url || ''}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
              >
                <span className="text-sm">
                  {getFileIcon(media.mimeType)}
                </span>
                <span className="text-primary group-hover:text-primary/80 transition-colors flex-1">
                  {fileTitle}
                </span>
                {media.filesize && (
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    {getFileSize(media.filesize)}
                  </span>
                )}
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}
