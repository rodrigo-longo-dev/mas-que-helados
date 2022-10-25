import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"

const register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage)
            });
    }
    return (
        <div className="register__container">
            <div className="register__box">
                <p>Registro</p>
                <input type="email" className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <br />
                <br />
                <input type="password" className="input" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
                <br />
                <br />
                <button onClick={handleSubmit} className={`button ${email === '' || password === '' ? 'button--disabled' : ''}`}>Registro</button>
            </div>
        </div>
    )
}

export default register
