import React, { useEffect, useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"
import { toast } from 'react-hot-toast'
import Link from 'next/link';
import { useStateContext } from '../context/StateContext';
import { useRouter } from 'next/router';
import { client } from '../lib/client';

const register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { user, setUserLocale } = useStateContext()
    const router = useRouter()
    const handleSubmit = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const data = {
                    uid: userCredential.user.uid,
                    email: userCredential.user.email
                }
                const query = `*[_type == "users" && firebaseId == "${data.uid}"][0]`
                const users = await client.fetch(query)
                if (users) {
                    setUserLocale(users);
                }
                router.push('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === 'auth/user-not-found') {
                    toast.error('Email o contraseña incorrecto')
                }
                if (errorCode === 'auth/invalid-email') {
                    toast.error('Email inválido')
                }
            });
    }
    useEffect(() => {
        if (user) {
            router.push('/')
        }
    }, [user])
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
