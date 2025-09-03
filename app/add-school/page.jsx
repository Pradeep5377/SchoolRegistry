'use client'; // This is a client component

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

export default function AddSchoolPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('address', data.address);
    formData.append('city', data.city);
    formData.append('state', data.state);
    formData.append('contact', data.contact);
    formData.append('email_id', data.email_id);
    formData.append('image', data.image[0]); // Append the file

    try {
      const response = await axios.post('/api/schools', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('School added successfully!');
      reset(); // Reset form fields
    } catch (error) {
      setMessage('Failed to add school. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Add a New School</h1>
      {message && <p className="text-center mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
        
        {/* Form Fields */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">School Name</label>
          <input id="name" {...register('name', { required: 'Name is required' })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address</label>
          <input id="address" {...register('address', { required: 'Address is required' })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
          {errors.address && <p className="text-red-500 text-xs italic">{errors.address.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700 font-bold mb-2">City</label>
          <input id="city" {...register('city', { required: 'City is required' })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
          {errors.city && <p className="text-red-500 text-xs italic">{errors.city.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="state" className="block text-gray-700 font-bold mb-2">State</label>
          <input id="state" {...register('state', { required: 'State is required' })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
          {errors.state && <p className="text-red-500 text-xs italic">{errors.state.message}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="contact" className="block text-gray-700 font-bold mb-2">Contact Number</label>
          <input id="contact" type="number" {...register('contact', { required: 'Contact is required' })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
          {errors.contact && <p className="text-red-500 text-xs italic">{errors.contact.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email_id" className="block text-gray-700 font-bold mb-2">Email</label>
          <input id="email_id" type="email" {...register('email_id', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
          {errors.email_id && <p className="text-red-500 text-xs italic">{errors.email_id.message}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">School Image</label>
          <input id="image" type="file" {...register('image', { required: 'Image is required' })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
          {errors.image && <p className="text-red-500 text-xs italic">{errors.image.message}</p>}
        </div>

        <div className="flex items-center justify-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Add School
          </button>
        </div>
      </form>
    </div>
  );
}