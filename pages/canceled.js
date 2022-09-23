import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BiError } from 'react-icons/bi';

import { useStateContext } from '../context/StateContext';

const Canceled = () => {
    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

    useEffect(() => {
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
    }, []);

    return (
        <div className="success-wrapper">
            <div className="success cancel">
                <p className="icon">
                    <BiError />
                </p>
                <h2>Ooops something went wrong!</h2>
                <p className="email-msg">Try again later.</p>
                <Link href="/">
                    <button type="button" width="300px" className="btn">
                        Go back Shopping
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Canceled
