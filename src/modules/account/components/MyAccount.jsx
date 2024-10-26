import React, { useState, useEffect } from 'react';
import { getUserProfile } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { Modal, Box, TextField, Button } from '@mui/material';
import '../styles/MyAccount.css';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../../../assets/logo.png'; // Ajuste o caminho conforme necessário


const MyAccount = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openPersonalModal, setOpenPersonalModal] = useState(false);
    const [openAddressModal, setOpenAddressModal] = useState(false);
    const [editedUser, setEditedUser] = useState({});
    const [address, setAddress] = useState({});
    const [profileImage, setProfileImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    navigate('/login/login');
                    return;
                }
                const response = await getUserProfile();
                setUser(response);
                setEditedUser(response);
                setAddress(response.address || {});
            } catch (error) {
                console.log(error);
                navigate('/login/login');
            } finally {
                setLoading(false);
            }
        };
        loadUserData();
    }, [navigate]);

    const handleChange = (setState) => (field, value) => {
        setState((prev) => ({ ...prev, [field]: value }));
    };

    const handleSavePersonalInfo = () => {
        setUser(editedUser);
        setOpenPersonalModal(false);
        console.log('Informações pessoais atualizadas:', editedUser);
    };

    const handleSaveAddress = () => {
        setUser({ ...user, address });
        setOpenAddressModal(false);
        console.log('Endereço atualizado:', address);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login/login');
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setProfileImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    if (loading) {
        return <div className="loading">Carregando...</div>;
    }

    return (
        <div className="account-settings">
            <aside className="sidebar">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="sidebar-logo" />
                </div>
                <ul>
                    <li onClick={() => navigate('/account/account')}>Minha Conta</li>
                    <li onClick={() => navigate('/order/order')}>Meus Pedidos</li>
                    <li onClick={() => navigate('/favorite/favorite')}>Meus Favoritos</li>
                    <li className="danger" onClick={handleLogout}>Sair da conta</li>
                </ul>
            </aside>
            <main className="profile-content">
                <section className="profile-header">
                    <div className="profile-info">
                        {profileImage ? (
                            <img src={profileImage} alt="Profile" className="profile-pic" />
                        ) : (
                            <FaUserCircle className="profile-pic" size={100} />
                        )}
                        <div>
                            <h2>{user?.name}</h2>
                            <p>{user?.jobTitle}</p>
                            <p>{user?.location}</p>
                        </div>
                    </div>
                    <label htmlFor="upload-button" className="edit-button">
                        Upload Foto
                    </label>
                    <input
                        id="upload-button"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImageUpload}
                    />
                </section>

                <div className="section-header">
                    <h3 className='h3'>Informações Pessoais</h3>
                    <button className="edit-button" onClick={() => setOpenPersonalModal(true)}>Editar</button>
                </div>
                <div className="info-grid">
                    <div><strong>Primeiro Nome:</strong> {user?.firstName}</div>
                    <div><strong>Segundo Nome:</strong> {user?.lastName}</div>
                    <div><strong>Email:</strong> {user?.email}</div>
                    <div><strong>Telefone:</strong> {user?.phone}</div>
                    <div><strong>Data de Nascimento:</strong> {user?.birthDate}</div>
                </div>

                <div className="section-header">
                    <h3 className='h3'>Meu Endereço</h3>
                    <button className="edit-button" onClick={() => setOpenAddressModal(true)}>Editar</button>
                </div>
                <div className="info-grid">
                    <div><strong>Rua:</strong> {address.street}</div>
                    <div><strong>Número:</strong> {address.number}</div>
                    <div><strong>Bairro:</strong> {address.neighborhood}</div>
                    <div><strong>CEP:</strong> {address.cep}</div>
                    <div><strong>Cidade/Estado:</strong> {address.cityState}</div>
                    <div><strong>Referência:</strong> {address.reference}</div>
                </div>

                <Modal open={openPersonalModal} onClose={() => setOpenPersonalModal(false)}>
                    <Box className="modal-box">
                        <h2>Editar Informações Pessoais</h2>
                        <TextField
                            label="Primeiro Nome"
                            value={editedUser.firstName || ''}
                            onChange={(e) => handleChange(setEditedUser)('firstName', e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            value={editedUser.email || ''}
                            onChange={(e) => handleChange(setEditedUser)('email', e.target.value)}
                            fullWidth
                        />
                        <Button onClick={handleSavePersonalInfo} className="save-button">
                            Salvar
                        </Button>
                    </Box>
                </Modal>

                <Modal open={openAddressModal} onClose={() => setOpenAddressModal(false)}>
                    <Box className="modal-box">
                        <h2>Editar Endereço</h2>
                        <TextField
                            label="Rua"
                            value={address.street || ''}
                            onChange={(e) => handleChange(setAddress)('street', e.target.value)}
                            fullWidth
                        />
                        <Button onClick={handleSaveAddress} className="save-button">
                            Salvar
                        </Button>
                    </Box>
                </Modal>
            </main>
        </div>
    );
};

export default MyAccount;
