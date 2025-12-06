'use client'
import React, { useState } from 'react'
import type { Post, Category } from '@/payload-types'

interface BlogGridSectionProps {
  posts: Post[]
  categories: Category[]
}

export default function BlogGridSection({ posts, categories }: BlogGridSectionProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  // Filter posts based on selected categories
  const filteredPosts = selectedCategories.length === 0
    ? posts
    : posts.filter((post) => {
        if (!post.categories) return false
        return post.categories.some((cat) => {
          const categoryId = typeof cat === 'object' ? cat.id : cat
          return selectedCategories.includes(String(categoryId))
        })
      })

  // Limit to 9 posts (3 rows x 3 columns)
  const displayedPosts = filteredPosts.slice(0, 9)

  // Count posts per category
  const getCategoryPostCount = (categoryId: string) => {
    return posts.filter((post) => {
      if (!post.categories) return false
      return post.categories.some((cat) => {
        const catId = typeof cat === 'object' ? cat.id : cat
        return String(catId) === categoryId
      })
    }).length
  }

  return (
    <section className="w-full py-16 px-8 lg:px-16" style={{ backgroundColor: '#D2D2D2' }}>
      <div className="w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div 
              className="sticky top-24 p-6 rounded-3xl bg-[#D9D9D9]"
              style={{
                boxShadow: 'inset 6px 6px 12px rgba(0, 0, 0, 0.25), inset -6px -6px 12px rgba(255, 255, 255, 0.9), 3px 3px 6px rgba(0, 0, 0, 0.15)'
              }}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtrează după:</h3>
              
              {/* Categories Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Categorie:</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-gray-900"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(String(category.id))}
                        onChange={() => toggleCategory(String(category.id))}
                        className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                      />
                      <span>{category.title}</span>
                      <span className="text-gray-400">({getCategoryPostCount(String(category.id))})</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Blog Posts Grid */}
          <div className="flex-1">
            {displayedPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Nu au fost găsite articole.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// Temporary simple card component - will be replaced later
function BlogCard({ post }: { post: Post }) {
  const imageUrl = typeof post.heroImage === 'object' && post.heroImage?.url 
    ? post.heroImage.url 
    : null

  return (
    <a
      href={`/posts/${post.slug}`}
      className="block overflow-hidden"
    >
      {/* Image/Video Placeholder */}
      <div 
        className="aspect-video bg-[#4A4A4A] rounded-t-2xl flex items-center justify-center"
        style={{
          boxShadow: 'inset 2.38px 7.13px 3.17px rgba(0, 0, 0, 0.4), -1.58px -2.38px 2.18px rgba(255, 255, 255, 1)',
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
        className="relative"
        style={{
          filter: 'drop-shadow(1.58px 2.38px 2.18px rgba(255, 255, 255, 1))',
          marginTop: '-1px'
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 406 203"
          className="w-full h-auto"
          preserveAspectRatio="none"
          style={{
            filter: 'drop-shadow(1.58px 2.38px 2.18px rgba(255, 255, 255, 1))'
          }}
        >
          <defs>
            <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feOffset dx="2.38" dy="7.13" />
              <feGaussianBlur stdDeviation="1.585" result="offset-blur" />
              <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
              <feFlood floodColor="#000000" floodOpacity="0.4" result="color" />
              <feComposite operator="in" in="color" in2="inverse" result="shadow" />
              <feComposite operator="over" in="shadow" in2="SourceGraphic" />
            </filter>
          </defs>
          <path 
            d="M405,0v93.38c0,13.05-10.57,23.62-23.61,23.62h-23.62c-29.45.43-53.18,24.43-53.18,53.97,0,17.69-14.34,32.03-32.03,32.03H35c-19.33,0-35-15.67-35-35V0h405Z" 
            style={{ fill: '#d9d9d8' }}
            filter="url(#innerShadow)"
          />
        </svg>
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-base text-gray-600 line-clamp-2">
              {post.meta?.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...'}
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
    </a>
  )
}
