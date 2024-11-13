import { useEffect, useState } from 'react';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = Boolean(localStorage.getItem("token"));
        
        setIsAuthenticated(token); // True if token exists, false otherwise
    }, [isAuthenticated]);

    return [isAuthenticated, setIsAuthenticated];

};

export default useAuth;