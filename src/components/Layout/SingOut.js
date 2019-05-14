import React from 'react';

import Firebase from '../firebase'

function SignOutButton() {
    const firebase = new Firebase();
    return(
        <button type="button" onClick={firebase.signOut}>
            Sign Out
        </button>
    );
}

export default SignOutButton;