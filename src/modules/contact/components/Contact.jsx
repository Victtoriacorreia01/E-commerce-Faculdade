import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../assets/logo.png';
import { sendContactMessage } from '../services/ContactService';

const contactFormSchema = z.object({
    name: z.string().min(1, 'Name is required.'),
    email: z.string().min(1, 'Email is required.').email('Enter a valid email address.'),
    whatsapp: z.string().min(1, 'WhatsApp number is required.'),
    message: z.string().min(1, 'Message cannot be empty.')
});

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: '',
            email: '',
            whatsapp: '',
            message: ''
        },
        mode: 'onBlur'
    });

    const onSubmit = async (data) => {
        setLoading(true);
        setError(null);
    
        try {
            const response = await sendContactMessage(data);
            console.log('Resposta da API:', response); 
    
            if (response && response.success) {
                setSuccess(true);
                reset();
                setTimeout(() => navigate('/'), 2000);
            } else {
                throw new Error(response?.message || 'Erro ao enviar mensagem.');
            }
        } catch (error) {
            console.error('Erro ao enviar contato:', error);
            setError(error.message || 'Falha ao enviar a mensagem.');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="mt-10 relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="loader"></div>
                </div>
            )}

            {success && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                        <h2 className="mb-4 text-2xl text-green-600">Message sent successfully!</h2>
                        <button onClick={() => setSuccess(false)} className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg">Ok</button>
                    </div>
                </div>
            )}

            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-red-200 p-8 rounded-lg shadow-lg text-center">
                        <h2 className="mb-4 text-xl text-red-600">{error}</h2>
                        <button onClick={() => setError(null)} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg">Close</button>
                    </div>
                </div>
            )}

            <div className={`max-w-xl w-1/3 space-y-8 border border-gray-200 rounded-lg p-8 shadow-md ${loading || success || error ? 'filter blur-sm' : ''}`}>
                <div className="mt-[-20px] mb-8 flex items-center justify-center">
                    <img className="text-center" src={Logo} style={{ width: '150px', height: 'auto' }} alt="Company Logo" />
                </div>
                <h2 className="mt-6 text-center text-2xl font-bold text-gray-600">Contact</h2>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {['name', 'email', 'whatsapp', 'message'].map((field) => (
                        <div key={field} className="mb-6">
                            <label htmlFor={field} className="sr-only">{field}</label>
                            {field !== 'message' ? (
                                <input
                                    id={field}
                                    type={field === 'email' ? 'email' : 'text'}
                                    required
                                    className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                    {...register(field)}
                                />
                            ) : (
                                <textarea
                                    id={field}
                                    required
                                    rows={4}
                                    className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                                    placeholder="Your message"
                                    {...register(field)}
                                />
                            )}
                            {errors[field] && <span className='text-red-500 text-sm'>{errors[field]?.message}</span>}
                        </div>
                    ))}
                    <div className="flex justify-center">
                        <button type="submit" className="w-2/3 py-2 text-lg font-medium rounded-full text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" disabled={isSubmitting || loading}>
                            {isSubmitting || loading ? 'Sending...' : 'Send'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
