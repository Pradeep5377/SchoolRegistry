import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { writeFile } from 'fs/promises';
import path from 'path';
import { tmpdir } from 'os'; // Use the operating system's temporary directory

// Database connection configuration with SSL
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: { "rejectUnauthorized": true } // Ensures a secure connection
};

// API Handler for POST requests
export async function POST(req) {
  try {
    const formData = await req.formData();
    
    // Extract text fields
    const name = formData.get('name');
    const address = formData.get('address');
    const city = formData.get('city');
    const state = formData.get('state');
    const contact = formData.get('contact');
    const email_id = formData.get('email_id');
    const imageFile = formData.get('image');

    if (!imageFile) {
      return NextResponse.json({ message: 'No image file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const filename = `${Date.now()}-${imageFile.name.replaceAll(' ', '_')}`;
    
    // **THE FIX:** Write to the temporary directory, which is always writable
    const imagePath = path.join(tmpdir(), filename);
    await writeFile(imagePath, buffer);

    // This path is what we will store in the database
    const imageUrl = `/schoolImages/${filename}`; 

    // --- Database Insertion ---
    const connection = await mysql.createConnection(dbConfig);
    const query = 'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [name, address, city, state, contact, imageUrl, email_id];
    
    await connection.execute(query, values);
    await connection.end();

    return NextResponse.json({ message: 'School added successfully' }, { status: 201 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Error adding school', error: error.message }, { status: 500 });
  }
}