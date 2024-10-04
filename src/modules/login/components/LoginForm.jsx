import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/loginService'; 
import Logo from "../../../assets/logo.png";

const loginFormSchema = z.object({
    email: z.string().min(1, 'O e-mail é obrigatório.').email('Informe um endereço de e-mail válido.'),
    password: z.string().min(8, 'Verifique se a sua senha tem pelo menos 8 caracteres.')
});

export default function LoginForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onBlur',
        criteriaMode: 'all'
    });

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);
        setError(null); // Reseta o erro a cada nova tentativa

        try {
            const response = await loginUser(data);
            console.log('Resposta do login:', response);
            setLoading(false);
            setSuccess(true);
            reset();
        } catch (error) {
            console.error('Erro ao logar:', error);
            setLoading(false);
            setError('Falha ao realizar login. Verifique suas credenciais.'); // Mensagem de erro
        }
    };

    const onError = (errors) => console.log(errors);

    const navigateToSignup = () => {
        navigate('/signup');
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="loader"></div>
                </div>
            )}

            {success && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                        <h2 className="mb-4 text-2xl">Login realizado com sucesso!</h2>
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
                        Fazer Login
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit, onError)}>
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
                            <label htmlFor="password" className="sr-only">Senha</label>
                            <input
                                id="password"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg"
                                placeholder="Senha"
                                {...register('password')}
                                aria-invalid={errors.password ? 'true' : 'false'}
                                aria-describedby="password-error"
                            />
                            {errors.password && <span className='text-red-500 text-sm' id="password-error">{errors.password.message}</span>}
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-2/3 flex justify-center py-1 px-2 border border-transparent text-lg font-medium rounded-full text-white bg-green-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-16"
                            disabled={isSubmitting || loading} // Desabilitar enquanto submetendo
                        >
                            {isSubmitting || loading ? 'Enviando...' : 'Entrar'}
                        </button>
                    </div>
                    <button type='button' className="ml-20 text-center hover:text-pink-600" onClick={navigateToSignup}>
                        Não tem uma conta? Cadastre-se
                    </button>
                </form>
            </div>
        </div>
    );
}
