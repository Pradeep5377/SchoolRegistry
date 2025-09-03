import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import multer from 'multer';
import { promisify } from 'util';
import path from 'path';

// --- Database Connection ---
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

// --- Multer Configuration for File Uploads ---
const storage = multer.diskStorage({
  destination: './public/schoolImages',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
const uploadMiddleware = promisify(upload.single('image'));

// --- API Handler ---
export async function POST(req) {
  try {
    // We need to handle multipart form data
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const file = formData.get('image');

    if (!file) {
      return NextResponse.json({ message: 'No image file uploaded' }, { status: 400 });
    }

    // Save file to disk
    const { createWriteStream } = require('fs');
    const { join } = require('path');
    const filePath = join(process.cwd(), 'public/schoolImages', file.name);
    const writeStream = createWriteStream(filePath);
    const reader = file.stream().getReader();

    while(true) {
        const { done, value } = await reader.read();
        if(done) break;
        writeStream.write(value);
    }
    writeStream.end();

    const { name, address, city, state, contact, email_id } = body;
    const imageUrl = `/schoolImages/${file.name}`; // Path to be stored in DB

    // --- Insert data into MySQL ---
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