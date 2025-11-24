"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ArrowRight, Search, TrendingUp } from "lucide-react"
import { Nav } from "react-day-picker"
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const categories = ["All", "Tips", "Safety", "Updates", "City Guides", "Driver Stories"]

  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Safety Tips for Night Rides in Mumbai",
      excerpt:
        "Stay safe during your late-night travels with these expert-recommended safety measures and precautions.",
      content:
        "Traveling at night in Mumbai requires extra precautions. Here are our top 10 safety tips to ensure your journey is secure and comfortable...",
      author: "Priya Sharma",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Safety",
      image: "/blog-night-safety-mumbai.jpg",
      tags: ["Safety", "Night Travel", "Mumbai", "Tips"],
      featured: true,
    },
    {
      id: 2,
      title: "Eion Rides Expands to Pune: What You Need to Know",
      excerpt:
        "We're excited to announce our expansion to Pune! Learn about our new service areas and special launch offers.",
      content:
        "After successful operations in Mumbai, Eion Rides is proud to expand to Pune. Here's everything you need to know about our services in the city...",
      author: "Rahul Mehta",
      date: "2024-01-12",
      readTime: "3 min read",
      category: "Updates",
      image: "/blog-pune-expansion.jpg",
      tags: ["Pune", "Expansion", "Launch", "Updates"],
      featured: true,
    },
    {
      id: 3,
      title: "How to Set Fair Prices: A Guide for Passengers",
      excerpt: "Learn the art of setting competitive yet fair prices for your rides to get quick driver acceptance.",
      content:
        "Setting the right fare is crucial for getting your ride accepted quickly. Here's our comprehensive guide to fair pricing...",
      author: "Anjali Patel",
      date: "2024-01-10",
      readTime: "4 min read",
      category: "Tips",
      image: "/blog-fair-pricing-guide.jpg",
      tags: ["Pricing", "Tips", "Passengers", "Guide"],
    },
    {
      id: 4,
      title: "Meet Suresh: From Corporate Job to Successful Eion Driver",
      excerpt:
        "Discover how Suresh transformed his life by becoming a full-time Eion Rides driver and achieving financial independence.",
      content:
        "Suresh left his corporate job to become a full-time driver with Eion Rides. Here's his inspiring journey to financial freedom...",
      author: "Editorial Team",
      date: "2024-01-08",
      readTime: "6 min read",
      category: "Driver Stories",
      image: "/blog-driver-success-story.jpg",
      tags: ["Driver Stories", "Success", "Career Change", "Inspiration"],
    },
    {
      id: 5,
      title: "Best Routes to Avoid Traffic in Mumbai During Peak Hours",
      excerpt: "Navigate Mumbai's traffic like a pro with these insider tips on the best routes during rush hours.",
      content:
        "Mumbai traffic can be challenging, but knowing the right routes can save you time and money. Here are the best alternatives...",
      author: "Mumbai Traffic Expert",
      date: "2024-01-05",
      readTime: "7 min read",
      category: "City Guides",
      image: "/blog-mumbai-traffic-routes.jpg",
      tags: ["Mumbai", "Traffic", "Routes", "Peak Hours"],
    },
    {
      id: 6,
      title: "Bhopal Launch: Bringing Fair Rides to the City of Lakes",
      excerpt:
        "Eion Rides is now available in Bhopal! Explore our services and special introductory offers for new users.",
      content:
        "We're thrilled to bring our fair pricing model to Bhopal. Learn about our service areas and launch promotions...",
      author: "Marketing Team",
      date: "2024-01-03",
      readTime: "4 min read",
      category: "Updates",
      image: "/blog-bhopal-launch.jpg",
      tags: ["Bhopal", "Launch", "City of Lakes", "Updates"],
    },
  ]

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredPosts = blogPosts.filter((post) => post.featured)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Navbar />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center bg-blue-100 rounded-full px-6 py-2 mb-6">
            <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-700 font-semibold">Weekly Updates & Insights</span>
          </div>

          <h1 className="text-5xl font-bold mb-6 text-gray-900">
            Eion Rides{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Stay updated with the latest news, tips, and stories from the world of fair-priced rides. Get insights on
            safe travel, city guides, and inspiring driver stories.
          </p>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200"
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {selectedCategory === "All" && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="relative">
                    <img
                      src={post.image || "/placeholder.svg?height=300&width=600"}
                      alt={post.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-blue-600 text-white">{post.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <a
                        href={`/blog/${post.title
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/(^-|-$)/g, "")}`}
                      >
                        <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0">
                          Read More <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
            </h2>
            <span className="text-gray-600">{filteredPosts.length} articles found</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group bg-white"
              >
                <div className="relative">
                  <img
                    src={post.image || "/placeholder.svg?height=200&width=400"}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge
                      className={`${post.category === "Safety"
                          ? "bg-red-500"
                          : post.category === "Tips"
                            ? "bg-green-500"
                            : post.category === "Updates"
                              ? "bg-blue-500"
                              : post.category === "City Guides"
                                ? "bg-purple-500"
                                : post.category === "Driver Stories"
                                  ? "bg-orange-500"
                                  : "bg-gray-500"
                        } text-white`}
                    >
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm">{post.excerpt}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={`/blog/${post.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)/g, "")}`}
                    >
                      <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0 text-sm">
                        Read More <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search terms or category filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 text-blue-100">
            Get the latest articles, tips, and updates delivered to your inbox every week.
          </p>

          <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 font-semibold">Subscribe</Button>
          </div>

          <p className="text-sm text-blue-200 mt-4">No spam, unsubscribe at any time. We respect your privacy.</p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
