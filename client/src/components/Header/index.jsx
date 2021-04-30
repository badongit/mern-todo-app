import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss';
import AvatarDefault from 'assets/images/avatar-default.jpg';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

Header.propTypes = {
    display: PropTypes.string,
    logOut: PropTypes.func,
};

Header.defaultProps = {
    display: '',
    logOut: null,
}

function Header(props) {
    const { display, logOut } = props;
    const { user } = useSelector(state => state.auth);

    return (
        <div className="header" style={{display}}>
            <h2>
                <div className="avatar">
                    <img src={AvatarDefault} alt="avatar"/>
                </div>
                <a href="/posts"><p>{user.username}</p></a>
            </h2>
            <hr/>
            <div className="nav">
                <Link to="/posts">
                    <div className="nav-item">
                        <i className="fa fa-inbox"></i>
                        <p>Inbox</p>
                    </div>
                </Link>
            </div>
            <hr/>
            <Button onClick={logOut}>
                <div className="nav-item">
                    <i className="fas fa-sign-out-alt"></i>
                    <p>Log out</p>
                </div>
            </Button>
        </div>
    );
}

export default Header;