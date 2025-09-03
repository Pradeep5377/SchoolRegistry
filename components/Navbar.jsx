import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left Side: Logo and Title */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="h-9 w-9 text-blue-600 group-hover:text-blue-700 transition-colors" 
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" 
                />
              </svg>

              <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors"> 
                School Registry
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/add-school" className="text-blue-500 font-bold py-2 px-3 rounded ">
              + Add School
            </Link>
            <Link href="/show-schools" className="text-gray-500 font-medium transition-colors duration-200 transform hover:scale-105 transition-transform duration-300 ">
              Show Schools
            </Link>
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;