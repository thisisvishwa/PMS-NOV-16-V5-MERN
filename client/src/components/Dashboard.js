```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [passwords, setPasswords] = useState([]);

    useEffect(() => {
        getPasswords();
    }, []);

    const getPasswords = async () => {
        const res = await axios.get('/api/passwords');
        setPasswords(res.data);
    }

    return (
        <div>
            <h2>Your Passwords</h2>
            <ul>
                {passwords.map((password, index) => (
                    <li key={index}>
                        <p>Website: {password.website}</p>
                        <p>Password: {password.password}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;
```