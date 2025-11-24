"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, User, Clock, Share2, Heart, Facebook, Twitter, Linkedin, LinkIcon } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";


export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(42)

  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Safety Tips for Night Rides in Mumbai",
      slug: "10-essential-safety-tips-for-night-rides-in-mumbai",
      excerpt:
        "Stay safe during your late-night travels with these expert-recommended safety measures and precautions.",
      content: `
        <div class="prose max-w-none">
          <p class="text-lg text-gray-700 leading-relaxed mb-6">
            Traveling at night in Mumbai requires extra precautions. At Eion Rides, your safety is our top priority. 
            Here are essential tips to ensure secure late-night journeys in the city that never sleeps.
          </p>

          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Pre-Ride Safety Checklist</h2>
          <ul class="list-disc pl-6 space-y-2 text-gray-700">
            <li>Always verify your driver's details before getting in</li>
            <li>Share your trip details with family or friends</li>
            <li>Check the vehicle number plate matches the app</li>
            <li>Ensure your phone is fully charged</li>
            <li>Keep emergency contacts readily available</li>
          </ul>

          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">During Your Ride</h2>
          <p class="text-gray-700 mb-4">Stay alert and follow these guidelines while traveling:</p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700">
            <li>Sit in the back seat for better safety</li>
            <li>Keep your location sharing on</li>
            <li>Trust your instincts - if something feels wrong, speak up</li>
            <li>Avoid sharing personal information with the driver</li>
            <li>Stay aware of your surroundings and route</li>
          </ul>

          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Mumbai-Specific Night Safety</h2>
          <p class="text-gray-700 mb-4">
            Mumbai's late-night traffic can be unpredictable. Stick to main roads and well-lit areas. 
            Areas like Bandra, Andheri, and South Mumbai are generally safer for night travel with better 
            police patrolling and street lighting.
          </p>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <h3 class="text-lg font-semibold text-blue-900 mb-2">Emergency Features in Eion Rides App</h3>
            <ul class="list-disc pl-6 space-y-2 text-blue-800">
              <li><strong>SOS Button:</strong> Instantly alert emergency contacts and authorities</li>
              <li><strong>Live Tracking:</strong> Real-time location sharing with trusted contacts</li>
              <li><strong>Driver Rating:</strong> Only verified, highly-rated drivers for night rides</li>
              <li><strong>24/7 Support:</strong> Round-the-clock customer support</li>
            </ul>
          </div>
        </div>
      `,
      author: "Priya Sharma",
      publishedAt: "2024-01-15",
      readTime: "5 min read",
      category: "Safety",
      tags: ["Safety", "Night Travel", "Mumbai", "Tips"],
      image: "/blog-night-safety-mumbai.jpg",
    },
    {
      id: 2,
      title: "Eion Rides Expands to Pune: What You Need to Know",
      slug: "eion-rides-expands-to-pune-what-you-need-to-know",
      excerpt:
        "We're excited to announce our expansion to Pune! Learn about our new service areas and special launch offers.",
      content: `
        <div class="prose max-w-none">
          <p class="text-lg text-gray-700 leading-relaxed mb-6">
            After successful operations in Mumbai, Eion Rides is proud to expand to Pune! 
            Here's everything you need to know about our services in the Oxford of the East.
          </p>

          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Service Areas in Pune</h2>
          <ul class="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Hinjewadi IT Park:</strong> Complete coverage of the IT corridor</li>
            <li><strong>Magarpatta City:</strong> Business district and residential areas</li>
            <li><strong>Koregaon Park:</strong> Premium residential and commercial zones</li>
            <li><strong>Pune Station:</strong> Railway station and surrounding areas</li>
            <li><strong>Airport:</strong> Direct connectivity to Pune International Airport</li>
          </ul>

          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Launch Offers</h2>
          <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <h3 class="text-lg font-semibold text-green-900 mb-2">Special Launch Promotions</h3>
            <ul class="list-disc pl-6 space-y-2 text-green-800">
              <li>50% off on your first 5 rides</li>
              <li>Free rides for drivers during the first week</li>
              <li>Refer a friend and get ₹100 credit</li>
              <li>Zero commission for drivers in the first month</li>
            </ul>
          </div>

          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Pune?</h2>
          <p class="text-gray-700 mb-4">
            Pune's growing IT sector, student population, and traffic challenges make it perfect for 
            Eion Rides' fair pricing model. We're committed to providing reliable, affordable 
            transportation that puts both riders and drivers first.
          </p>

          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Getting Started</h2>
          <p class="text-gray-700 mb-4">
            Download the Eion Rides app and start booking rides in Pune today. Our fleet of 
            verified drivers is ready to serve you with transparent pricing and excellent service.
          </p>
        </div>
      `,
      author: "Rahul Mehta",
      publishedAt: "2024-01-12",
      readTime: "3 min read",
      category: "Updates",
      tags: ["Pune", "Expansion", "Launch", "Updates"],
      image: "/blog-pune-expansion.jpg",
    },
    {
      id: 3,
      title: "How to Set Fair Prices: A Guide for Passengers",
      slug: "how-to-set-fair-prices-a-guide-for-passengers",
      excerpt: "Learn the art of setting competitive yet fair prices for your rides to get quick driver acceptance.",
      content: `
        <div class="prose max-w-none">
          <p class="text-lg text-gray-700 leading-relaxed mb-6">
            Setting the right fare is crucial for getting your ride accepted quickly. Here's our 
            comprehensive guide to fair pricing that benefits both passengers and drivers.
          </p>

          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Understanding Base Pricing</h2>
          <ul class="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Distance:</strong> ₹10-12 per kilometer is standard</li>
            <li><strong>Time:</strong> Consider traffic and peak hours</li>
            <li><strong>Demand:</strong> Higher prices during rush hours</li>
            <li><strong>Weather:</strong> Rain or extreme weather affects pricing</li>
          </ul>

          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Peak Hour Guidelines</h2>
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <h3 class="text-lg font-semibold text-yellow-900 mb-2">High Demand Times</h3>
            <ul class="list-disc pl-6 space-y-2 text-yellow-800">
              <li><strong>Morning Rush:</strong> 8:00 AM - 10:00 AM (+20-30%)</li>
              <li><strong>Evening Rush:</strong> 6:00 PM - 9:00 PM (+20-30%)</li>
              <li><strong>Weekend Nights:</strong> 10:00 PM - 2:00 AM (+30-50%)</li>
              <li><strong>Monsoon Season:</strong> All day (+15-25%)</li>
            </ul>
          </div>

          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Tips for Quick Acceptance</h2>
          <ul class="list-disc pl-6 space-y-2 text-gray-700">
            <li>Start with app's suggested price</li>
            <li>Add 10-15% during peak hours</li>
            <li>Consider driver's return journey</li>
            <li>Be flexible with pickup location</li>
            <li>Add a tip for exceptional service</li>
          </ul>

          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Common Pricing Mistakes</h2>
          <p class="text-gray-700 mb-4">
            Avoid these common errors that lead to ride rejections:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700">
            <li>Setting prices too low during peak hours</li>
            <li>Not considering traffic conditions</li>
            <li>Ignoring distance vs. time factors</li>
            <li>Being inflexible with negotiations</li>
          </ul>
        </div>
      `,
      author: "Anjali Patel",
      publishedAt: "2024-01-10",
      readTime: "4 min read",
      category: "Tips",
      tags: ["Pricing", "Tips", "Passengers", "Guide"],
      image: "/blog-fair-pricing-guide.jpg",
    },
    {
      id: 4,
      title: "Meet Suresh: From Corporate Job to Successful Eion Driver",
      slug: "meet-suresh-from-corporate-job-to-successful-eion-driver",
      excerpt:
        "Discover how Suresh transformed his life by becoming a full-time Eion Rides driver and achieving financial independence.",
      content: `
        <div class="prose max-w-none">
          <p class="text-lg text-gray-700 leading-relaxed mb-6">
            Suresh Patil left his corporate job to become a full-time driver with Eion Rides. 
            Here's his inspiring journey to financial freedom and work-life balance.
          </p>

          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">The Corporate Struggle</h2>
          <p class="text-gray-700 mb-4">
            "I was working 12-hour days in a software company, barely seeing my family," says Suresh. 
            "The stress was affecting my health, and despite a decent salary, I felt trapped in the 
            corporate rat race."
          </p>

          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Making the Switch</h2>
          <p class="text-gray-700 mb-4">
            After researching various ride-sharing platforms, Suresh chose Eion Rides for its 
            fair commission structure and driver-friendly policies. "The transparent pricing 
            and lower commission rates made the decision easy," he explains.
          </p>

          <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <h3 class="text-lg font-semibold text-green-900 mb-2">Suresh's Monthly Earnings</h3>
            <ul class="list-disc pl-6 space-y-2 text-green-800">
              <li><strong>Gross Income:</strong> ₹85,000 - ₹1,20,000</li>
              <li><strong>Working Hours:</strong> 8-10 hours/day, 6 days/week</li>
              <li><strong>Commission:</strong> Only 15% to Eion Rides</li>
              <li><strong>Net Income:</strong> ₹72,000 - ₹1,02,000</li>
            </ul>
          </div>

          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Life After the Switch</h2>
          <p class="text-gray-700 mb-4">
            "Now I'm my own boss," Suresh smiles. "I can take breaks when I want, spend time 
            with my family, and I'm earning more than my corporate job. The best part is the 
            flexibility and meeting new people every day."
          </p>

          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Advice for New Drivers</h2>
          <ul class="list-disc pl-6 space-y-2 text-gray-700">
            <li>Start part-time to understand the business</li>
            <li>Focus on customer service for better ratings</li>
            <li>Learn the city routes thoroughly</li>
            <li>Maintain your vehicle properly</li>
            <li>Be patient and professional always</li>
          </ul>
        </div>
      `,
      author: "Editorial Team",
      publishedAt: "2024-01-08",
      readTime: "6 min read",
      category: "Driver Stories",
      tags: ["Driver Stories", "Success", "Career Change", "Inspiration"],
      image: "/blog-driver-success-story.jpg",
    },
    {
      id: 5,
      title: "Best Routes to Avoid Traffic in Mumbai During Peak Hours",
      slug: "best-routes-to-avoid-traffic-in-mumbai-during-peak-hours",
      excerpt: "Navigate Mumbai's traffic like a pro with these insider tips on the best routes during rush hours.",
      content: `
        <div class="prose max-w-none">
          <p class="text-lg text-gray-700 leading-relaxed mb-6">
            Mumbai traffic can be challenging, but knowing the right routes can save you time and money. 
            Here are the best alternatives during peak hours from local traffic experts.
          </p>

          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Morning Rush (8 AM - 10 AM)</h2>
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 class="text-lg font-semibold text-blue-900 mb-2">South Mumbai to BKC</h3>
            <ul class="list-disc pl-6 space-y-2 text-blue-800">
              <li><strong>Avoid:</strong> Eastern Express Highway</li>
              <li><strong>Use:</strong> Worli Sea Link → BKC Link Road</li>
              <li><strong>Time Saved:</strong> 15-20 minutes</li>
            </ul>
          </div>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 class="text-lg font-semibold text-blue-900 mb-2">Andheri to Lower Parel</h3>
            <ul class="list-disc pl-6 space-y-2 text-blue-800">
              <li><strong>Avoid:</strong> Western Express Highway</li>
              <li><strong>Use:</strong> SV Road → Linking Road → Hill Road</li>
              <li><strong>Time Saved:</strong> 10-15 minutes</li>
            </ul>
          </div>

          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Evening Rush (6 PM - 9 PM)</h2>
          <div class="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
            <h3 class="text-lg font-semibold text-orange-900 mb-2">BKC to Powai</h3>
            <ul class="list-disc pl-6 space-y-2 text-orange-800">
              <li><strong>Avoid:</strong> LBS Marg</li>
              <li><strong>Use:</strong> Kurla-Powai Road via Chandivali</li>
              <li><strong>Time Saved:</strong> 20-25 minutes</li>
            </ul>
          </div>

          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Weekend Traffic Hacks</h2>
          <ul class="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Malls and Markets:</strong> Use back roads near Phoenix Mills</li>
            <li><strong>Airport Routes:</strong> Avoid Andheri-Kurla Road on weekends</li>
            <li><strong>Beach Areas:</strong> Carter Road gets congested after 4 PM</li>
            <li><strong>Religious Places:</strong> Plan alternate routes during festivals</li>
          </ul>

          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Pro Driver Tips</h2>
          <p class="text-gray-700 mb-4">
            Our experienced Eion Rides drivers share these insider secrets:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700">
            <li>Use real-time traffic apps but know manual alternatives</li>
            <li>Local trains affect road traffic - check schedules</li>
            <li>Construction updates change routes frequently</li>
            <li>Weather impacts traffic more than you think</li>
          </ul>
        </div>
      `,
      author: "Mumbai Traffic Expert",
      publishedAt: "2024-01-05",
      readTime: "7 min read",
      category: "City Guides",
      tags: ["Mumbai", "Traffic", "Routes", "Peak Hours"],
      image: "/blog-mumbai-traffic-routes.jpg",
    },
    {
      id: 6,
      title: "Bhopal Launch: Bringing Fair Rides to the City of Lakes",
      slug: "bhopal-launch-bringing-fair-rides-to-the-city-of-lakes",
      excerpt:
        "Eion Rides is now available in Bhopal! Explore our services and special introductory offers for new users.",
      content: `
        <div class="prose max-w-none">
          <p class="text-lg text-gray-700 leading-relaxed mb-6">
            We're thrilled to bring our fair pricing model to Bhopal, the City of Lakes! 
            Learn about our service areas, launch promotions, and how we're revolutionizing 
            transportation in Madhya Pradesh's capital.
          </p>

          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Service Coverage Areas</h2>
          <ul class="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>New Market:</strong> Central business district and shopping areas</li>
            <li><strong>MP Nagar:</strong> Government offices and residential zones</li>
            <li><strong>Arera Colony:</strong> Premium residential area</li>
            <li><strong>Habibganj:</strong> Railway station and surrounding areas</li>
            <li><strong>Airport:</strong> Raja Bhoj Airport connectivity</li>
            <li><strong>BHEL:</strong> Industrial area and employee townships</li>
          </ul>

          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Launch Celebrations</h2>
          <div class="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
            <h3 class="text-lg font-semibold text-purple-900 mb-2">Grand Opening Offers</h3>
            <ul class="list-disc pl-6 space-y-2 text-purple-800">
              <li>First ride absolutely free (up to ₹200)</li>
              <li>40% off on next 10 rides</li>
              <li>Zero registration fee for drivers</li>
              <li>₹500 bonus for first 100 drivers</li>
              <li>Refer 5 friends, get ₹1000 credit</li>
            </ul>
          </div>

          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Bhopal Chose Eion Rides</h2>
          <p class="text-gray-700 mb-4">
            Bhopal's growing economy and increasing urbanization created a need for reliable, 
            affordable transportation. Our transparent pricing model and driver-first approach 
            align perfectly with the city's values of fairness and community support.
          </p>

          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Local Partnerships</h2>
          <ul class="list-disc pl-6 space-y-2 text-gray-700">
            <li>Collaboration with local driver unions</li>
            <li>Partnership with Bhopal Municipal Corporation</li>
            <li>Tie-ups with major hotels and businesses</li>
            <li>Integration with local events and festivals</li>
          </ul>

          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Safety First in Bhopal</h2>
          <p class="text-gray-700 mb-4">
            We're working closely with Bhopal Police to ensure safe rides. All our drivers 
            undergo thorough background checks and vehicle inspections. Our 24/7 support 
            team is ready to assist with any concerns.
          </p>

          <div class="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
            <h3 class="text-lg font-semibold text-green-900 mb-2">Welcome to Eion Rides Family!</h3>
            <p class="text-green-800">
              Download the app today and experience the difference of fair pricing, 
              transparent operations, and community-focused service in beautiful Bhopal.
            </p>
          </div>
        </div>
      `,
      author: "Marketing Team",
      publishedAt: "2024-01-03",
      readTime: "4 min read",
      category: "Updates",
      tags: ["Bhopal", "Launch", "City of Lakes", "Updates"],
      image: "/blog-bhopal-launch.jpg",
    },
  ]

  const blogPost = blogPosts.find((post) => post.slug === slug) || blogPosts[0]

  const relatedPosts = blogPosts
    .filter((post) => post.id !== blogPost.id && post.category === blogPost.category)
    .slice(0, 2)

  const handleLike = () => {
    setLiked(!liked)
    setLikes(liked ? likes - 1 : likes + 1)
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = blogPost.title

    let shareUrl = ""
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case "copy":
        navigator.clipboard.writeText(url)
        alert("Link copied to clipboard!")
        return
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-4 py-3 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/blog" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blog
          </Link>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Eion Rides</span>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLike}
              className={`bg-transparent ${liked ? "border-red-300 text-red-600" : "border-gray-300"}`}
            >
              <Heart className={`w-4 h-4 mr-1 ${liked ? "fill-red-500 text-red-500" : ""}`} />
              {likes}
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4">
        {/* Hero Section */}
        <div className="mb-8">
          <img
            src={blogPost.image || `/placeholder.svg?height=400&width=800&query=${blogPost.title}`}
            alt={blogPost.title}
            className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Badge className="bg-blue-100 text-blue-800">{blogPost.category}</Badge>
            <div className="flex items-center text-sm text-gray-600 space-x-4">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(blogPost.publishedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{blogPost.readTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{blogPost.author}</span>
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">{blogPost.title}</h1>

          <p className="text-xl text-gray-600 leading-relaxed">{blogPost.excerpt}</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="p-8 bg-white/80 backdrop-blur-sm border border-blue-100">
              <CardContent className="p-0">
                <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
              </CardContent>
            </Card>

            {/* Tags */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blogPost.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Share Section */}
            <Card className="p-6 mt-8 bg-white/80 backdrop-blur-sm border border-blue-100">
              <CardContent className="p-0">
                <h3 className="text-lg font-semibold mb-4">Share this article</h3>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare("facebook")}
                    className="bg-transparent border-blue-200 hover:bg-blue-50"
                  >
                    <Facebook className="w-4 h-4 mr-2" />
                    Facebook
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare("twitter")}
                    className="bg-transparent border-blue-200 hover:bg-blue-50"
                  >
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare("linkedin")}
                    className="bg-transparent border-blue-200 hover:bg-blue-50"
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare("copy")}
                    className="bg-transparent border-blue-200 hover:bg-blue-50"
                  >
                    <LinkIcon className="w-4 h-4 mr-2" />
                    Copy Link
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Related Posts */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border border-blue-100">
              <CardContent className="p-0">
                <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {relatedPosts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`}>
                      <div className="group cursor-pointer">
                        <img
                          src={post.image || `/placeholder.svg?height=120&width=200&query=${post.title}`}
                          alt={post.title}
                          className="w-full h-24 object-cover rounded-lg mb-2 group-hover:opacity-80 transition-opacity"
                        />
                        <h4 className="font-medium text-sm group-hover:text-blue-600 transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">{post.readTime}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="p-6 mt-6 bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
              <CardContent className="p-0">
                <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
                <p className="text-sm text-blue-100 mb-4">
                  Get the latest safety tips, city updates, and Eion Rides news delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-2 rounded-lg text-gray-900 text-sm"
                  />
                  <Button className="w-full bg-white text-blue-600 hover:bg-blue-50">Subscribe</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
