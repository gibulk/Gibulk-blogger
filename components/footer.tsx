import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container-custom py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-serif text-xl font-bold text-gray-900">Gibulk</h3>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              Blog pribadi yang berisi tulisan, pemikiran, dan pengalaman 
              seputar teknologi dan kehidupan.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900">Navigasi</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-600 hover:text-blue-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-blue-600">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900">Connect</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <a 
                  href="https://github.com/gibulk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="https://twitter.com/gibulk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Gibulk. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
