import React, { useContext, useState } from 'react';
import '../Login/Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';


const Login = () => {

    const { signIn } = useContext(AuthContext)
    const [show, setShow] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()
    console.log(location);

    const from = location.state?.from?.pathname || '/';

    const handleLogIn = (event) => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);
        signIn(email, password)
            .then(result => {
                const loggedUser = result.user;
                // console.log(loggedUser);
                form.reset();
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className='form-container'>
            <h2 className='form-tittle'>Login</h2>

            <form onSubmit={handleLogIn}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type='email' name='email' id='email' required />
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type={show ? "text" : "password"} name='password' id='password' required />
                    <p onClick={() => setShow(!show)}><small>
                        {show ? 'hide password' : 'show password'}
                    </small></p>
                </div>
                <input className='btn-submit' type="submit" value="Login" />
            </form>

            <p><small>New to Ema John? <Link to='/signup'>Create an account</Link></small></p>
        </div>
    );
};

export default Login;