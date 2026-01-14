import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { importMap } from '@/app/(payload)/admin/importMap'
import Link from 'next/link'
import type { Post } from '@/payload-types'

// Helper to extract text from Lexical content
function extractTextFromContent(content: any): string {
  if (!content?.root?.children) return ''
  
  const extractText = (node: any): string => {
    if (!node) return ''
    if (typeof node === 'string') return node
    if (node.text) return node.text
    if (node.children && Array.isArray(node.children)) {
      return node.children.map(extractText).join(' ')
    }
    return ''
  }

  return extractText(content.root)
}

// BlogCard component copied from BlogGridSection to match design exactly
function BlogCard({ post, index }: { post: Post; index: number }) {
  const imageUrl = typeof post.heroImage === 'object' && post.heroImage?.url 
    ? post.heroImage.url 
    : (typeof post.meta?.image === 'object' && post.meta?.image?.url ? post.meta.image.url : null)

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="block overflow-hidden"
    >
      {/* Image/Video Placeholder */}
      <div 
        className="aspect-video bg-[#4A4A4A] rounded-t-2xl flex items-center justify-center"
        style={{
          boxShadow: '1.66px 2.22px 1.53px 0px #FFFFFF, inset 2.5px 3.88px 1.66px 0px rgba(0, 0, 0, 0.4)',
          clipPath: 'inset(0 0 -10px 0)'
        }}
      >
        {imageUrl ? (
          <img src={imageUrl} alt={post.title} className="w-full h-full object-cover rounded-t-2xl" />
        ) : (
          <span className="text-white/60 text-lg">img / video</span>
        )}
      </div>

      {/* Card Content with SVG background */}
      <div 
        className="relative aspect-[406/203]"
        style={{
          filter: 'drop-shadow(1.66px 2.22px 1.53px #FFFFFF)',
          marginTop: '-1px'
        }}
      >
        <svg 
          id="b" 
          data-name="Layer 2" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 406 203"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <g id="c" data-name="Layer">
            <path d="M405,0v93.38c0,13.05-10.57,23.62-23.61,23.62h-23.62c-29.45.43-53.18,24.43-53.18,53.97,0,17.69-14.34,32.03-32.03,32.03H35c-19.33,0-35-15.67-35-35V0h405Z" style={{ fill: '#d9d9d8' }}/>
          </g>
        </svg>
        <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between h-full">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 line-clamp-2 pr-[20%]">
              {post.meta?.description || extractTextFromContent(post.content)}
            </p>
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>
              {post.publishedAt 
                ? new Date(post.publishedAt).toLocaleDateString('ro-RO', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : ''}
            </span>
          </div>
        </div>

        {/* Fish icon with arrow - responsive */}
        <div
          className="absolute z-20 cursor-pointer right-[0%] bottom-[0%] group/fish"
          aria-hidden
          style={{ width: '20%', height: 'auto', aspectRatio: '1/1' }}
        >
          <div 
            className="relative w-full h-full -scale-x-100"
            style={{
              filter: 'drop-shadow(2px 3px 3px rgba(0, 0, 0, 0.25)) drop-shadow(-1px -1px 2px rgba(255, 255, 255, 0.3))'
            }}
          >
            {/* Default fish - dark */}
            <img
              src="/assets/acasa/pestisor.svg"
              alt=""
              className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ease-out group-hover/fish:opacity-0"
            />
            {/* Hover fish - orange */}
            <img
              src="/assets/acasa/pestisor.svg"
              alt=""
              className="absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-300 ease-out group-hover/fish:opacity-100"
              style={{
                filter:
                  'brightness(0) saturate(100%) invert(45%) sepia(98%) saturate(1500%) hue-rotate(345deg) brightness(95%) contrast(95%)',
              }}
            />
            {/* Default arrow - white */}
            <svg
              className="absolute inset-0 m-auto w-[30%] h-[30%] transition-all duration-300 ease-out group-hover/fish:opacity-0 -scale-x-100"
              style={{ color: '#D9D9D9' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
            {/* Hover state arrow - white & bigger */}
            <svg
              className="absolute inset-0 m-auto w-[38%] h-[38%] text-white opacity-0 group-hover/fish:opacity-100 transition-all duration-300 ease-out -scale-x-100"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default async function BlogSection() {
  const payload = await getPayload({ config: configPromise, importMap, cron: undefined, disableOnInit: false })
  
  const { docs: posts } = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 3,
    sort: '-publishedAt',
  })

  return (
    <section
      className="relative w-full py-20 overflow-hidden"
      style={{ backgroundColor: '#E1E1E1' }}
    >
      {/* Badge */}
      <div className="w-full px-8 lg:px-16 mb-10">
        <div
          className="inline-flex px-6 py-2 rounded-full text-sm font-medium"
          style={{
            backgroundColor: '#E1E1E1',
            color: '#3C3C3C',
            boxShadow: '1.66px 2.22px 1.53px 0px #FFFFFF, inset 2.5px 3.88px 1.66px 0px rgba(0, 0, 0, 0.4)'
          }}
        >
          Latest News
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="w-full px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <BlogCard key={index} post={post} index={index} />
          ))}
        </div>
      </div>

      {/* Mai multe articole Button */}
      <div className="w-full px-8 lg:px-16 mt-12 flex justify-center">
        <Link
          href="/posts"
          className="px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:opacity-80"
          style={{
            backgroundColor: '#545454',
            color: '#FFFFFF',
            boxShadow:
              '2px 3px 2.75px rgba(255,255,255,1), inset 2px 4px 2px rgba(0,0,0,0.4)',
          }}
        >
          Mai multe articole
        </Link>
      </div>
    </section>
  )
}
