import { createContext, useContext, useEffect, useState } from "react";
import api from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // check if user is logged in when app loads
    const fetchUser = async () => {
        try {
            const res = await api.get("/auth/me", {
                withCredentials: true
            });
            setUser(res.data.user);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    // login function
    const login = async (formData) => {
        await api.post("/auth/login", formData, {
            withCredentials: true
        });
        await fetchUser();
    };

    // logout function
    const logout = async () => {
        await api.post("/auth/logout", {}, {
            withCredentials: true
        });
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);