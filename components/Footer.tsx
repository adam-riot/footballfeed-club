import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">⚽</span>
              </div>
              <span className="text-xl font-bold">Football Feed Club</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Your ultimate destination for the latest football news, transfer updates, 
              match analysis, and everything you need to stay connected with the beautiful game.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/category/transfer-news" className="text-gray-400 hover:text-white transition-colors">
                  Transfer News
                </Link>
              </li>
              <li>
                <Link href="/category/match-preview" className="text-gray-400 hover:text-white transition-colors">
                  Match Previews
                </Link>
              </li>
              <li>
                <Link href="/category/analysis" className="text-gray-400 hover:text-white transition-colors">
                  Analysis
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/premier-league" className="text-gray-400 hover:text-white transition-colors">
                  Premier League
                </Link>
              </li>
              <li>
                <Link href="/category/champions-league" className="text-gray-400 hover:text-white transition-colors">
                  Champions League
                </Link>
              </li>
              <li>
                <Link href="/category/international" className="text-gray-400 hover:text-white transition-colors">
                  International
                </Link>
              </li>
              <li>
                <Link href="/category/youth-football" className="text-gray-400 hover:text-white transition-colors">
                  Youth Football
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Football Feed Club. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

