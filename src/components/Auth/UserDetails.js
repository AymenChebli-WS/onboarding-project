import React, {useState, useEffect} from 'react'
import { app } from '../../firebase'


const UserDetails = () => {
    const auth = app.auth();
    const user = auth.currentUser;
    

    return (
        <div>
            {user.displayName}
        </div>
    )
}

export default UserDetails
