import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/loginService';
import Logo from '../../../assets/logo.png';

const loginFormSchema = z.object({
    email: z.string().min(1, 'O e-mail é obrigatório.').email('Informe um endereço de e-mail válido.'),
    password: z.string().min(8, 'Verifique se a sua senha tem pelo menos 8 caracteres.')
});

export default function LoginForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    
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
        setError(null);
        setSuccess(false);

        try {
            const response = await loginUser(data); // Autenticando o usuário
            localStorage.setItem('token', response.token); // Salvando o token no localStorage
            setSuccess(true);
            reset();

            // Redireciona após login
            setTimeout(() => {
                navigate('/'); // Adicionando um delay para a mensagem de sucesso ser visível
            }, 1000);
        } catch (error) {
            setError('Erro ao fazer login. Verifique suas credenciais.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img className="mx-auto h-12 w-auto" src={Logo} alt="Logo" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Faça login na sua conta
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">E-mail</label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                placeholder="E-mail"
                                {...register('email')}
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Senha</label>
                            <input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                                    errors.password ? 'border-red-500' : 'border-gray-300'
                                } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                placeholder="Senha"
                                {...register('password')}
                            />
                            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                        </div>
                    </div>

                    {error && <div className="text-red-500 text-center">{error}</div>}
                    {success && <div className="text-green-500 text-center">Login realizado com sucesso!</div>}

                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting || loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {loading ? 'Carregando...' : 'Entrar'}
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="mt-2 text-sm text-gray-600">
                        Não tem uma conta?{' '}
                        <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Crie sua conta
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
