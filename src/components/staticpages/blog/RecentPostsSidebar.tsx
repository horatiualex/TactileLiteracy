'use client'
import React from 'react'
import type { Post } from '@/payload-types'
import { ChevronDown } from 'lucide-react'

interface RecentPostsSidebarProps {
  posts: Post[]
}

export default function RecentPostsSidebar({ posts }: RecentPostsSidebarProps) {
  if (!posts || posts.length === 0) return null

  return (
    <div
      className="w-full rounded-3xl bg-[#D2D2D2] p-6 sticky top-28"
      style={{
        boxShadow: '1.66px 2.22px 1.53px 0px #FFFFFF, inset 2.5px 3.88px 1.66px 0px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Badge */}
      <div className="mb-8 flex justify-center">
        <span
          className="inline-flex items-center gap-2 px-6 py-2 bg-[#D2D2D2] text-[#434343] text-base font-bold rounded-full"
          style={{
            boxShadow: '1.66px 2.22px 1.53px 0px #FFFFFF, inset 2.5px 3.88px 1.66px 0px rgba(0, 0, 0, 0.4)',
          }}
        >
          Articole recente
          <ChevronDown className="w-4 h-4" />
        </span>
      </div>

      {/* Recent posts list */}
      <ul className="space-y-6">
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <a
                href={`/posts/${post.slug}`}
                className="block hover:opacity-80 transition group"
              >
                <h3 className="text-sm font-bold text-[#434343] mb-1 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-[#434343] opacity-80">
                  {new Date(post.publishedAt || post.createdAt).toLocaleDateString('ro-RO', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
