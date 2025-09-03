import mysql from 'mysql2/promise';
import Image from 'next/image';

// --- Database Connection ---
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: { "rejectUnauthorized": true }
};

async function getSchools() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        // FIX 1: Added 'id' to the SELECT statement
        const [rows] = await connection.execute('SELECT id, name, address, city, image FROM schools ORDER BY id DESC');
        await connection.end();
        return rows;
    } catch (error) {
        console.error("Failed to fetch schools:", error);
        return [];
    }
}


export default async function ShowSchoolsPage() {
    const schools = await getSchools();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8 text-center">Registered Schools</h1>
            
            {schools.length === 0 ? (
                <p className="text-center text-gray-500">No schools found. Please add a school first.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {schools.map((school) => (
                        <div key={school.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                            <div className="relative w-full h-48">
                                <Image
                                    src={school.image || '/placeholder.png'} // Added a fallback image
                                    alt={`Image of ${school.name}`}
                                    // FIX 2: Replaced deprecated props with modern ones
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    style={{ objectFit: 'cover' }}
                                    className="bg-gray-200"
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">{school.name}</h2>
                                <p className="text-gray-600 text-sm mb-1 truncate">{school.address}</p>
                                <p className="text-gray-600 text-sm">{school.city}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// Optional: This tells Next.js to refetch the data periodically
export const revalidate = 60;