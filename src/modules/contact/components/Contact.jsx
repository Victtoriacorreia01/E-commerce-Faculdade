import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import Logo from "../../../assets/logo.png";

const contactFormSchema = z.object({
    name: z.string().min(1, 'O nome é obrigatório.'),
    email: z.string().min(1, 'O e-mail é obrigatório.').email('Informe um endereço de e-mail válido.'),
    whatsapp: z.string().min(1, 'O número de WhatsApp é obrigatório.'),
    message: z.string().min(1, 'A mensagem não pode estar vazia.')
});

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: '',
            email: '',
            whatsapp: '',
            message: ''
        },
        mode: 'onBlur',
        criteriaMode: 'all'
    });

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);
        setError(null);

        try {
            
            console.log('Dados do contato:', data);
            setLoading(false);
            setSuccess(true);
            reset();

            setTimeout(() => {
                navigate('/'); 
            }, 2000); 

        } catch (error) {
            console.error('Erro ao enviar o contato:', error);
            setLoading(false);
            setError('Falha ao enviar a mensagem. Tente novamente.');
        }
    };

    const onError = (errors) => console.log(errors);

    return (
        <div className=" mt-5 relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="loader"></div>
                </div>
            )}

            {success && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                        <h2 className="mb-4 text-2xl">Mensagem enviada com sucesso!</h2>
                        <button
                            onClick={() => setSuccess(false)}
                            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
                        >
                            Ok
                        </button>
                    </div>
                </div>
            )}

            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-red-200 p-8 rounded-lg shadow-lg text-center">
                        <h2 className="mb-4 text-xl text-red-600">{error}</h2>
                        <button
                            onClick={() => setError(null)}
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}

            <div className={`max-w-xl w-1/3 space-y-8 border border-gray-200 rounded-lg p-8 shadow-md ${loading || success || error ? 'filter blur-sm' : ''}`}>
                <div className="mt-[-20px] mb-8 flex items-center justify-center">
                    <img
                        className="text-center"
                        src={Logo}
                        style={{ width: "150px", height: "auto" }}
                        alt="Logo da Empresa"
                    />
                </div>
                <div>
                    <h2 className="mt-6 text-center text-2xl font-bold text-gray-600">
                        Contato
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit, onError)}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-6">
                            <label htmlFor="name" className="sr-only">Nome</label>
                            <input
                                id="name"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg"
                                placeholder="Nome"
                                {...register('name')}
                                aria-invalid={errors.name ? 'true' : 'false'}
                                aria-describedby="name-error"
                            />
                            {errors.name && <span className='text-red-500 text-sm' id="name-error">{errors.name.message}</span>}
                        </div>
                    </div>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-6">
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                id="email"
                                type="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg"
                                placeholder="Email"
                                {...register('email')}
                                aria-invalid={errors.email ? 'true' : 'false'}
                                aria-describedby="email-error"
                            />
                            {errors.email && <span className='text-red-500 text-sm' id="email-error">{errors.email.message}</span>}
                        </div>
                    </div>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-6">
                            <label htmlFor="whatsapp" className="sr-only">WhatsApp</label>
                            <input
                                id="whatsapp"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg"
                                placeholder="WhatsApp"
                                {...register('whatsapp')}
                                aria-invalid={errors.whatsapp ? 'true' : 'false'}
                                aria-describedby="whatsapp-error"
                            />
                            {errors.whatsapp && <span className='text-red-500 text-sm' id="whatsapp-error">{errors.whatsapp.message}</span>}
                        </div>
                    </div>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-6">
                            <label htmlFor="message" className="sr-only">Mensagem</label>
                            <textarea
                                id="message"
                                required
                                rows={4}
                                className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg"
                                placeholder="Sua mensagem"
                                {...register('message')}
                                aria-invalid={errors.message ? 'true' : 'false'}
                                aria-describedby="message-error"
                            />
                            {errors.message && <span className='text-red-500 text-sm' id="message-error">{errors.message.message}</span>}
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-2/3 flex justify-center py-1 px-2 border border-transparent text-lg font-medium rounded-full text-white bg-green-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-16"
                            disabled={isSubmitting || loading}
                        >
                            {isSubmitting || loading ? 'Enviando...' : 'Enviar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
