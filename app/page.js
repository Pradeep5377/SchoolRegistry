import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] -mt-16">
      <div className="text-center p-8 max-w-4xl mx-auto">
        
    
        <div className="mb-6">
          <Image
            src="https://img.icons8.com/plasticine/200/school.png"
            alt="School Icon"
            width={120}
            height={120}
            className="mx-auto"
            priority
          />
        </div>
        
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-black-100 mb-4 tracking-tight">
          Welcome to the School Registry
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-900 mb-8 max-w-2xl mx-auto">
          Your central hub for managing and viewing school information. Effortlessly add new schools to the database or browse the complete, updated list.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/add-school" className="w-full sm:w-auto px-8 py-3 text-base font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105">
              Add a New School
          </Link>
          <Link href="/show-schools" className="w-full sm:w-auto px-8 py-3 text-base font-medium text-blue-700 bg-blue-100 rounded-lg shadow-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105">
              View All Schools
          </Link>
        </div>
        
      </div>
    </div>
  );
}