import React from 'react';
import Image from 'constants/images';
import './NotFound.scss';

export default function NotFound() {
    return (
        <div className="not-found">
            <img src={Image.NOTFOUND} alt="notfound"/>
        </div>
    )
}
