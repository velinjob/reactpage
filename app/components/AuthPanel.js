import React from 'react';
import Button from './common/Button';

export default ({loggedIn, openAuthModalToSignIn, openAuthModalToSignUp, signOut}) => (
    <div className="auth-panel">
        { loggedIn ? <Button classSet="btn-primary" handleClick={signOut} text="Sign Out"/> :
            <div>
                <Button classSet="btn-primary btn-margin-left" handleClick={openAuthModalToSignIn} text="Sign In"/>
                <Button classSet="btn-primary btn-margin-left" handleClick={openAuthModalToSignUp} text="Sign Up"/>
            </div>
        }
    </div>
);