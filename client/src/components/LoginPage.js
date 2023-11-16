```javascript
import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginFailure, setLoginFailure] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/users/login', { email, password });
            if (res.data.success) {
                localStorage.setItem('token', res.data.token);
                window.location = '/dashboard';
            } else {
                setLoginFailure(res.data.message);
            }
        } catch (err) {
            setLoginFailure('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </label>
                <input type="submit" value="Login" />
            </form>
            {loginFailure && <p>{loginFailure}</p>}
        </div>
    );
};

export default LoginPage;
```