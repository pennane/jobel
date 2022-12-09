import { useState } from 'react';
import { API_BASE_URL } from '../../constants'
import { useAuthContext } from '../../hooks/useAuthContext'

export const LogoutButton = () => {

    const { user, isLoggedIn, logout } = useAuthContext();
    const [loading, setLoading] = useState(false)

    return (<div>
        <button onClick={logout}>log out</button>
    </div >)

}