import React, { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"
import { toast } from 'react-hot-toast'
import Link from 'next/link';

const register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
                // if (errorCode === 'auth/email-already-in-use') {
                //     toast.error('Email en uso')
                // }
            });
    }
    return (
        <div className="register__container">
            <div className="register__box">
                <p>Inicio de sesión</p>
                <input type="email" className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <br />
                <br />
                <input type="password" className="input" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
                <br />
                <br />
                <button onClick={handleSubmit} className={`button ${email === '' || password === '' ? 'button--disabled' : ''}`}>Iniciar sesión</button>
                <br />
                <br />
                <Link href="/register">¿No tienes cuenta? Regístrate</Link>
            </div>
        </div>
    )
}

export default register
