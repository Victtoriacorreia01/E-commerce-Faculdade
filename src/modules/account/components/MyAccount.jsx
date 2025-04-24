import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile, updateUserAddress, uploadProfileImage } from '../services/userService';
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
        const loadUserData = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                navigate('/login/login');
                return;
            }
            try {
                const response = await getUserProfile(); 
                console.log('Dados do usuário:', response);
    
                setUser(response); 
                setEditedUser({
                    telephone: response.telephone || '',
                    email: response.email || '',
                    birthdate: response.birthdate || '',
                });
    
                setAddress({
                    street: response?.address?.street || '',
                    number: response?.address?.number || '',
                    district: response?.address?.district || '',
                    cep: response?.address?.cep || '',
                    city: response?.address?.city || '',
                    reference: response?.address?.reference || '',
                });
    
                localStorage.setItem('user', JSON.stringify(response)); 
            } catch (error) {
                console.error('Erro ao carregar dados do usuário:', error);
                navigate('/login/login');
            } finally {
                setLoading(false); 
            }
        };
    
        loadUserData();
    }, [navigate]);
    
    const validateUserData = () => {
        if (!editedUser.email.includes('@')) {
            alert('Email inválido.');
            return false;
        }
        if (editedUser.telephone.length < 10) {
            alert('Telefone inválido. Deve conter ao menos 10 dígitos.');
            return false;
        }
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(editedUser.birthdate)) {
            alert('Data de nascimento inválida. Use o formato DD/MM/AAAA.');
            return false;
        }
        return true;
    };
    

    const handleChange = (setState) => (field, value) => {
        setState((prev) => ({ ...prev, [field]: value }));
    };

    const handleSavePersonalInfo = async () => {
        if (!validateUserData()) return;


        try {
            const formattedUser = {
                ...editedUser,
                telephone: editedUser.telephone.replace(/\D/g, ''),
                birthdate: editedUser.birthdate.split('/').reverse().join('-'),
            };

            await updateUserProfile(formattedUser);
            const updatedUser = { ...user, ...formattedUser };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setOpenPersonalModal(false);
            alert('Informações pessoais atualizadas com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar informações pessoais:', error);
            alert('Erro ao atualizar informações. Tente novamente.');
        }
    };

    const handleSaveAddress = async () => {
        try {

            const formattedAddress = {
                ...address,
                cep: address.cep.replace(/\D/g, ''),
            };
    
            console.log('Dados do endereço a serem atualizados:', formattedAddress);
    
            await updateUserAddress(formattedAddress);
    
            const updatedUser = { ...user, address: formattedAddress }; 
            setUser(updatedUser); 
            localStorage.setItem('user', JSON.stringify(updatedUser)); 
            setOpenAddressModal(false);
            alert('Endereço atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar o endereço:', error);
            alert('Erro ao atualizar o endereço. Tente novamente.');
        }
    };
    
    const formatCep = (cep) => {
        return cep.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').slice(0, 9);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login/login');
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const response = await uploadProfileImage(file);
            console.log('Resposta do upload da imagem:', response);
            console.log('URL da imagem de perfil:', response.imageUrl);
            const updatedUser = { ...user, image: response.imageUrl };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setProfileImage(URL.createObjectURL(file));
            alert('Imagem do perfil atualizada com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar imagem:', error);
            alert('Não foi possível atualizar a imagem. Tente novamente.');
        }
    };

    return (
        <div className="account-settings">
            <aside className="sidebar">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="sidebar-logo" />
                </div>
                <ul>
                    <li onClick={() => navigate('/account/account')}>My Account</li>
                    <li onClick={() => navigate('/order/order')}>My Orders</li>
                    <li onClick={() => navigate('/favorite/favorite')}>My Favorites</li>
                    <li className="danger" onClick={handleLogout}>Log Out</li>
                </ul>
            </aside>
            <main className="profile-content">
                <section className="profile-header">
                    <div className="profile-info">
                        <label htmlFor="upload-button" className="profile-pic-container">
                            {profileImage ? (
                                <img src={profileImage} alt="Profile" className="profile-pic" />
                            ) : (
                                <FaUserCircle className="profile-pic cursor-pointer" size={100} />
                            )}
                        </label>
                        <input
                            id="upload-button"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageUpload}
                        />
                        <div>
                            <h2>{user?.name}</h2>
                            <p>{user?.jobTitle}</p>
                            <p>{user?.location}</p>
                        </div>
                    </div>
                </section>
                <div className="section-header">
                    <h3 className="h3">Personal Information</h3>
                    <button className="edit-button" onClick={() => setOpenPersonalModal(true)}>Edit</button>
                </div>
                <div className="info-grid">
                    <div><strong>Email:</strong> {user?.email}</div>
                    <div><strong>Phone:</strong> {user?.telephone}</div>
                    <div><strong>Birthdate:</strong> {user?.birthdate}</div>
                </div>
                <div className="section-header">
                    <h3 className="h3">My Address</h3>
                    <button className="edit-button" onClick={() => setOpenAddressModal(true)}>Edit</button>
                </div>
                <div className="info-grid">
                    <div><strong>Street:</strong> {address.street}</div>
                    <div><strong>Number:</strong> {address.number}</div>
                    <div><strong>District:</strong> {address.district}</div>
                    <div><strong>ZIP Code:</strong> {formatCep(address.cep || '')}</div>
                    <div><strong>City/State:</strong> {address.city}</div>
                    <div><strong>Reference:</strong> {address.reference}</div>
                </div>
                <Modal open={openPersonalModal} onClose={() => setOpenPersonalModal(false)}>
                    <Box className="modal-box">
                        <h2 className="edit">Edit Personal Information</h2>
                        <TextField
                            label="Birthdate (dd/mm/yyyy)"
                            value={editedUser.birthdate || ''}
                            onChange={(e) => handleChange(setEditedUser)('birthdate', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Phone"
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
                            Save
                        </Button>
                    </Box>
                </Modal>
                <Modal open={openAddressModal} onClose={() => setOpenAddressModal(false)}>
                    <Box className="modal-box">
                        <h2 className="edit">Edit Address</h2>
                        <TextField
                            label="Street"
                            value={address.street || ''}
                            onChange={(e) => handleChange(setAddress)('street', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Number"
                            value={address.number || ''}
                            onChange={(e) => handleChange(setAddress)('number', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="District"
                            value={address.district || ''}
                            onChange={(e) => handleChange(setAddress)('district', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="ZIP Code"
                            value={formatCep(address.cep || '')}
                            onChange={(e) => handleChange(setAddress)('cep', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="City/State"
                            value={address.city || ''}
                            onChange={(e) => handleChange(setAddress)('city', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Reference"
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
                            Save
                        </Button>
                    </Box>
                </Modal>
            </main>
        </div>
    );
};

export default MyAccount;
