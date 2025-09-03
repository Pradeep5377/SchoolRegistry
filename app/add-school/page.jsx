'use client';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

export default function AddSchoolPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
        if (key === 'image') {
            formData.append(key, data.image[0]);
        } else {
            formData.append(key, data[key]);
        }
    });

    try {
      setMessage('Submitting...');
      setIsError(false);
      await axios.post('/api/schools', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('School added successfully!');
      reset();
    } catch (error) {
      setMessage('Failed to add school. Please try again.');
      setIsError(true);
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Add a New School</h1>
      
      {message && (
        <p className={`text-center mb-4 p-3 rounded-md ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          <div className="">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">School Name</label>
            <input id="name" {...register('name', { required: 'Name is required' })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div className="">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input id="address" {...register('address', { required: 'Address is required' })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <input id="city" {...register('city', { required: 'City is required' })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
            <input id="state" {...register('state', { required: 'State is required' })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
          </div>

          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input id="contact" type="number" {...register('contact', { required: 'Contact is required' })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact.message}</p>}
          </div>
          
          <div>
            <label htmlFor="email_id" className="block text-sm font-medium text-gray-700">Email Id</label>
            <input id="email_id" type="email" {...register('email_id', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            {errors.email_id && <p className="text-red-500 text-xs mt-1">{errors.email_id.message}</p>}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">School Image</label>
            <input id="image" type="file" accept="image/*" {...register('image', { required: 'Image is required' })} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />

            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button type="submit" className="w-full sm:w-auto px-8 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105">
            Add School
          </button>
        </div>
      </form>
    </div>
  );
}