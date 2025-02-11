import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile, updateUserAddress } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { Modal, Box, TextField, Button } from '@mui/material';
import '../styles/MyAccount.css';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../../../assets/logo.png'; 

const MyAccount = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openPersonalModal, setOpenPersonalModal] = useState(false);
    const [openAddressModal, setOpenAddressModal] = useState(false);
    const [editedUser, setEditedUser] = useState({ telephone: '', email: '', birthdate: '' });
    const [address, setAddress] = useState({});
    const [profileImage, setProfileImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
            setEditedUser(JSON.parse(userData));
        } else {
            loadUserData();
        }
    }, []);

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
                localStorage.setItem('user', JSON.stringify(response)); 
            } catch (error) {
                console.error(error);
                navigate('/login/login');
            } finally {
                setLoading(false);
            }
        };
        loadUserData();
    }, [navigate]);

    const handleChange = (setState) => (field, value) => {
        setState((prev) => {
            const updatedState = { ...prev, [field]: value };
            return updatedState;
        });
    };

    const handleSavePersonalInfo = async () => {
        try {
            await updateUserProfile(editedUser);
            const updatedUser = await getUserProfile();  
            setEditedUser(updatedUser);  
            setOpenPersonalModal(false);
        } catch (error) {
            console.error('Erro ao atualizar informações pessoais:', error);
        }
    };

    const handleSaveAddress = async () => {
        try {
            await updateUserAddress(address);
            const updatedUser = await getUserProfile();  
            setUser(updatedUser);
            setAddress(updatedUser.address || {});
            setOpenAddressModal(false);
        } catch (error) {
            console.error('Erro ao atualizar endereço:', error);
        }
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
                    <h3 className="h3">Informações Pessoais</h3>
                    <button className="edit-button" onClick={() => setOpenPersonalModal(true)}>Editar</button>
                </div>
                <div className="info-grid">
                    <div><strong>Email:</strong> {user?.email}</div>
                    <div><strong>Telefone:</strong> {user?.telephone}</div>
                    <div><strong>Data de Nascimento:</strong> {user?.birthdate}</div>
                </div>

                <div className="section-header">
                    <h3 className="h3">Meu Endereço</h3>
                    <button className="edit-button" onClick={() => setOpenAddressModal(true)}>Editar</button>
                </div>
                <div className="info-grid">
                    <div><strong>Rua:</strong> {address.street}</div>
                    <div><strong>Número:</strong> {address.number}</div>
                    <div><strong>Bairro:</strong> {address.district}</div>
                    <div><strong>CEP:</strong> {address.cep}</div>
                    <div><strong>Cidade/Estado:</strong> {address.city}</div>
                    <div><strong>Referência:</strong> {address.reference}</div>
                </div>

                <Modal open={openPersonalModal} onClose={() => setOpenPersonalModal(false)}>
                    <Box className="modal-box">
                        <h2 className="edit">Editar Informações Pessoais</h2>
                        <TextField
                            label="Data de Nascimento"
                            value={editedUser.birthdate || ''}  
                            onChange={(e) => handleChange(setEditedUser)('birthdate', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Telefone"
                            value={editedUser.telephone || ''}
                            onChange={(e) => handleChange(setEditedUser)('telephone', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSavePersonalInfo}
                        >
                            Salvar
                        </Button>
                    </Box>
                </Modal>

                <Modal open={openAddressModal} onClose={() => setOpenAddressModal(false)}>
                    <Box className="modal-box">
                        <h2 className="edit">Editar Endereço</h2>
                        <TextField
                            label="Rua"
                            value={address.street || ''}
                            onChange={(e) => handleChange(setAddress)('street', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Número"
                            value={address.number || ''}
                            onChange={(e) => handleChange(setAddress)('number', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Bairro"
                            value={address.district || ''}
                            onChange={(e) => handleChange(setAddress)('district', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="CEP"
                            value={address.cep || ''}
                            onChange={(e) => handleChange(setAddress)('cep', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Cidade/Estado"
                            value={address.city || ''}
                            onChange={(e) => handleChange(setAddress)('city', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Referência"
                            value={address.reference || ''}
                            onChange={(e) => handleChange(setAddress)('reference', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSaveAddress}
                        >
                            Salvar
                        </Button>
                    </Box>
                </Modal>
            </main>
        </div>
    );
};

export default MyAccount;
