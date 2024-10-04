import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService'; // Importando o serviço
import { AiOutlineMail } from 'react-icons/ai'; // Importando o ícone de e-mail
import Logo from "../../../assets/logo.png";

const createUserFormSchema = z.object({
  email: z.string().min(1, 'O e-mail é obrigatório.').email('Informe um endereço de e-mail válido.'),
  name: z.string().min(1, 'Campo obrigatório.'),
  password: z.string().min(8, 'Verifique se a sua senha tem pelo menos 8 caracteres.'),
  passwordConfirmation: z.string().min(1, 'Informe a sua senha novamente.'),
}).refine(({ password, passwordConfirmation }) => password === passwordConfirmation, {
  message: 'As senhas informadas não correspondem. Tente novamente.',
  path: ['passwordConfirmation'],
});

export default function RegisterPrinc() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      passwordConfirmation: '',
    },
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: zodResolver(createUserFormSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage('');  // Resetar mensagens de erro anteriores
    setSuccess(false);    // Resetar o estado de sucesso anterior
    try {
      // Chama o serviço de registro, que faz a requisição ao backend
      await registerUser(data);
      setLoading(false);
      setSuccess(true); // Define sucesso ao cadastrar
      reset(); // Reseta o formulário após o sucesso
      setTimeout(() => {
        navigate('/login/login'); // Redireciona o usuário para a página de login após 3 segundos
      }, 5000); // Mostra o modal por 3 segundos
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      setErrorMessage('Erro ao registrar usuário. Tente novamente.');
      setLoading(false);
    }
  };

  const onError = (errors) => console.log(errors);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src={Logo} alt="Logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crie sua conta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">E-mail</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="E-mail"
                {...register('email')}
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>
            <div>
              <label htmlFor="name" className="sr-only">Nome</label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nome"
                {...register('name')}
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Senha</label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Senha"
                {...register('password')}
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>
            <div>
              <label htmlFor="passwordConfirmation" className="sr-only">Confirme sua senha</label>
              <input
                id="passwordConfirmation"
                type="password"
                autoComplete="new-password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirme sua senha"
                {...register('passwordConfirmation')}
              />
              {errors.passwordConfirmation && <span className="text-red-500 text-sm">{errors.passwordConfirmation.message}</span>}
            </div>
          </div>

          {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}
          {success && <div className="text-green-500 text-center">Cadastro realizado com sucesso!</div>}

          <div>
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? 'Carregando...' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>

      {success && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-auto shadow-lg text-center">
            <AiOutlineMail className="text-4xl text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Enviado com sucesso!</h3>
            <p className="text-gray-600 mt-2">Por favor, cheque seu e-mail para confirmar o cadastro.</p>
          </div>
        </div>
      )}
    </div>
  );
}
