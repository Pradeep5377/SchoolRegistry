import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Project Name */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-white hover:text-gray-300">
              School Registry
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/add-school" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
              Add School
            </Link>
            <Link href="/show-schools" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
              Show Schools
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;