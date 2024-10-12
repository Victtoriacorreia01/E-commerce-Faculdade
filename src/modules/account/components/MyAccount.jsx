import React, { useState, useEffect } from 'react';
import { getUserProfile } from '../services/userService'; 
import { useNavigate } from 'react-router-dom';
import '../styles/MyAccount.css';
import { FaUserCircle } from 'react-icons/fa'; // Importa um ícone de perfil de usuário

const MyAccount = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [addresses, setAddresses] = useState([]); // Estado para os endereços
    const navigate = useNavigate();

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login/login'); // Redireciona se não houver token
                    return;
                }
                const response = await getUserProfile(); // Busca dados do usuário
                setUser(response);
                setAddresses(response.addresses || []); // Inicializa os endereços
            } catch (error) {
                navigate('/login/login'); // Redireciona para login se houver erro
            } finally {
                setLoading(false);
            }
        };
        loadUserData();
    }, [navigate]);

    const handleAddAddress = () => {
        setAddresses([...addresses, { country: '', cityState: '', postalCode: '', taxId: '' }]);
    };

    const handleInputChange = (index, field, value) => {
        const updatedAddresses = [...addresses];
        updatedAddresses[index][field] = value;
        setAddresses(updatedAddresses);
    };

    if (loading) {
        return <div className="loading">Carregando...</div>; // Mensagem de carregamento
    }

    return (
        <div className="account-settings">
            <aside className="sidebar">
                <ul>
                    <li>Minha Conta</li>
                    <li>Segurança</li>
                    <li>Cupons</li>
                    <li>Meus Pedidos</li>
                    <li>Meus Favoritos</li>
                    <li className="danger">Sair da conta</li>
                </ul>
            </aside>

            <main className="profile-content">
                <section className="profile-header">
                    <div className="profile-info">
                        <FaUserCircle className="profile-pic" size={100} /> {/* Ícone de perfil de usuário */}
                        <div>
                            <h2>{user?.name}</h2>
                            <p>{user?.jobTitle}</p>
                            <p>{user?.location}</p>
                        </div>
                    </div>
                    <button className="edit-button">Edit</button>
                </section>

                <section className="personal-info">
                    <div className="section-header">
                        <h3>Informações Pessoais</h3>
                        <button className="edit-button">Edit</button>
                    </div>
                    <div className="info-grid">
                        <div><strong>Primeiro Nome:</strong> {user?.firstName}</div>
                        <div><strong>Segundo Nome:</strong> {user?.lastName}</div>
                        <div><strong>Email:</strong> {user?.email}</div>
                        <div><strong>Telefone:</strong> {user?.phone}</div>
                        <div><strong>Bio:</strong> {user?.bio}</div>
                    </div>
                </section>

                <section className="address-info">
                    <div className="section-header">
                        <h3>Endereço</h3>
                        <button className="edit-button" onClick={handleAddAddress}>Adicionar Endereço</button>
                    </div>
                    {addresses && addresses.length > 0 ? (
                        addresses.map((address, index) => (
                            <div key={index} className="info-grid">
                                <div>
                                    <strong>País:</strong>
                                    <input
                                        type="text"
                                        value={address.country}
                                        onChange={(e) => handleInputChange(index, 'country', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <strong>Cidade/Estado:</strong>
                                    <input
                                        type="text"
                                        value={address.cityState}
                                        onChange={(e) => handleInputChange(index, 'cityState', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <strong>Código Postal:</strong>
                                    <input
                                        type="text"
                                        value={address.postalCode}
                                        onChange={(e) => handleInputChange(index, 'postalCode', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <strong>Detalhes (Tax ID):</strong>
                                    <input
                                        type="text"
                                        value={address.taxId}
                                        onChange={(e) => handleInputChange(index, 'taxId', e.target.value)}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Nenhum endereço adicionado.</p>
                    )}
                </section>
            </main>
        </div>
    );
};

export default MyAccount;
