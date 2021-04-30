import React from 'react';
import { Spinner } from 'reactstrap';
import './Loading.scss';

function Loading(props) {
    return (
        <div className="loading d-flex justify-content-center ">
            <Spinner animation="border" variant="infor" />
        </div>
    );
}

export default Loading;