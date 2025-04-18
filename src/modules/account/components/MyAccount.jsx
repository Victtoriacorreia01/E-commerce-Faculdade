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
                    navigate('/account/account');
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
            setUser((prev) => ({
                ...prev,
                ...editedUser,
            }));
            localStorage.setItem('user', JSON.stringify({ ...user, ...editedUser }));
            setOpenPersonalModal(false);
        } catch (error) {
            console.error('Error updating personal information:', error);
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
            console.error('Error updating address:', error);
        }
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
            console.log('Imagem enviada com sucesso:', response);
    
            setProfileImage(URL.createObjectURL(file)); // Atualiza a imagem localmente
        } catch (error) {
            console.error('Erro ao enviar imagem:', error);
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
                    <div><strong>ZIP Code:</strong> {address.cep}</div>
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
                            value={address.cep || ''}
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
