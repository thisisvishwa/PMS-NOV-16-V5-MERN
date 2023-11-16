```javascript
import React, { useState } from 'react';
import axios from 'axios';

const PasswordManagementPage = () => {
    const [passwords, setPasswords] = useState([]);
    const [newPassword, setNewPassword] = useState('');

    const getPasswords = async () => {
        const res = await axios.get('/api/passwords');
        setPasswords(res.data);
    }

    const addPassword = async () => {
        const res = await axios.post('/api/passwords', { password: newPassword });
        setPasswords([...passwords, res.data]);
    }

    const updatePassword = async (id) => {
        const updatedPassword = prompt('Enter new password');
        const res = await axios.put(`/api/passwords/${id}`, { password: updatedPassword });
        setPasswords(passwords.map(password => password._id === id ? res.data : password));
    }

    const deletePassword = async (id) => {
        await axios.delete(`/api/passwords/${id}`);
        setPasswords(passwords.filter(password => password._id !== id));
    }

    return (
        <div>
            <h1>Password Management</h1>
            <input type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <button onClick={addPassword}>Add Password</button>
            <ul>
                {passwords.map(password => (
                    <li key={password._id}>
                        {password.password}
                        <button onClick={() => updatePassword(password._id)}>Update</button>
                        <button onClick={() => deletePassword(password._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PasswordManagementPage;
```