import React, { useEffect, useState } from 'react'
import { auth } from "../firebase"
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import { client } from '../lib/client'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router';

const completeRegister = () => {
  const [data, setData] = useState({});
  const [userUid, setUserUid] = useState();
  const changeData = (field, value) => {
    const dataUpdated = Object.assign({}, data);
    dataUpdated[field] = value;
    setData(dataUpdated);
  }
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const email = user.email;
        setUserUid(uid);
        changeData('email', email);
      }
    });
  }, [])
  const router = useRouter() 
  
  const error = []

  const validateErrors = () => {
    if (!data.fullName || !data.comercialName || !data.phoneNumber || !data.contact || !data.street || !data.poblation || !data.city || !data.postalCode || !data.email || !data.dni || !data.deliveryTime) {
      error.push('Hay que completar todos los campos')
    }
  }

  const handleSubmit = () => {
    validateErrors()
    if (error.length > 0) {
      return toast.error(error[0])
    }
    const doc = {
      _type: 'users',
      _id: userUid,
      firebaseId: userUid,
      fullName: data.fullName,
      comercialName: data.comercialName,
      phoneNumber: data.phoneNumber,
      contact: data.contact,
      direction: {
        street: data.street,
        poblation: data.poblation,
        city: data.city,
        postalCode: data.postalCode,
      },
      email: data.email,
      dni: data.dni,
      deliveryTime: data.deliveryTime,
    }
    console.log(doc);
    client.createIfNotExists(doc).then((res) => {
      if (res._id) {
        router.push('/')
      }
    })
  }

  return (
    <div className="register__container">
      <div className="register__box">
        <p>Completar registro</p>
        <input type="text" className="input" placeholder="Nombre Completo" value={data.fullName} onChange={e => changeData('fullName', e.target.value)} />
        <br />
        <br />
        <input type="text" className="input" placeholder="Nombre Comercial" value={data.comercialName} onChange={e => changeData('comercialName', e.target.value)} />
        <br />
        <br />
        <input type="text" className="input" placeholder="Número de teléfono" value={data.phoneNumber} onChange={e => changeData('phoneNumber', e.target.value)} />
        <br />
        <br />
        <input type="text" className="input" placeholder="Nombre de contacto" value={data.contact} onChange={e => changeData('contact', e.target.value)} />
        <br />
        <br />
        <h5>Dirección</h5>
        <br />
        <input type="text" className="input" placeholder="Calle" value={data.street} onChange={e => changeData('street', e.target.value)} />
        <br />
        <br />
        <input type="text" className="input" placeholder="Población" value={data.poblation} onChange={e => changeData('poblation', e.target.value)} />
        <br />
        <br />
        <input type="text" className="input" placeholder="Ciudad" value={data.city} onChange={e => changeData('city', e.target.value)} />
        <br />
        <br />
        <input type="text" className="input" placeholder="Código Postal" value={data.postalCode} onChange={e => changeData('postalCode', e.target.value)} />
        <br />
        <br />
        <h5>Mas datos</h5>
        <br />
        <input type="email" className="input" placeholder="email" value={data.email} disabled />
        <br />
        <br />
        <input type="text" className="input" placeholder="DNI / NIE / Pasaporte" value={data.dni} onChange={e => changeData('dni', e.target.value)} />
        <br />
        <br />
        <input type="text" className="input" placeholder="Horario preferido de entrega" value={data.deliveryTime} onChange={e => changeData('deliveryTime', e.target.value)} />
        <br />
        <br />
        <button onClick={handleSubmit} className="button">Completar</button>
      </div>
    </div>
  )
}

export default completeRegister
