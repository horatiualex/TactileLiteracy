'use client'
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/utilities/ui'
import { useRouter } from 'next/navigation'
import React from 'react'

export const Pagination: React.FC<{
  className?: string
  page: number
  totalPages: number
  onClick?: (page: number) => void
}> = (props) => {
  const router = useRouter()

  const { className, page, totalPages, onClick } = props
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  const handlePageChange = (newPage: number) => {
    if (onClick) {
      onClick(newPage)
    } else {
      router.push(`/posts/page/${newPage}`)
    }
  }

  // Logic to show: First ... Prev Current Next ... Last
  const showFirst = page > 2
  const showLast = page < totalPages - 1
  const showPrev = page > 1
  const showNext = page < totalPages

  return (
    <div className={cn('my-12', className)}>
      <PaginationComponent>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={!hasPrevPage}
              onClick={() => handlePageChange(page - 1)}
            />
          </PaginationItem>

          {/* Always show first page if we are far from it */}
          {showFirst && (
            <>
              <PaginationItem>
                <PaginationLink onClick={() => handlePageChange(1)}>
                  1
                </PaginationLink>
              </PaginationItem>
              {page > 3 && (
                 <PaginationItem>
                   <PaginationEllipsis />
                 </PaginationItem>
              )}
            </>
          )}

          {/* Previous neighbor */}
          {showPrev && (page !== 1) && ( // Ensure we don't duplicate 1 if page is 2
            <PaginationItem>
              <PaginationLink
                onClick={() => handlePageChange(page - 1)}
              >
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {/* Current Page */}
          <PaginationItem>
            <PaginationLink
              isActive
              onClick={() => handlePageChange(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>

          {/* Next neighbor */}
          {showNext && (page !== totalPages) && ( // Ensure we don't duplicate last if page is last-1
            <PaginationItem>
              <PaginationLink
                onClick={() => handlePageChange(page + 1)}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {/* Always show last page if we are far from it */}
          {showLast && (
             <>
               {page < totalPages - 2 && (
                   <PaginationItem>
                     <PaginationEllipsis />
                   </PaginationItem>
               )}
               <PaginationItem>
                <PaginationLink onClick={() => handlePageChange(totalPages)}>
                  {totalPages}
                </PaginationLink>
               </PaginationItem>
             </>
          )}

          <PaginationItem>
            <PaginationNext
              disabled={!hasNextPage}
              onClick={() => handlePageChange(page + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationComponent>
    </div>
  )
}
