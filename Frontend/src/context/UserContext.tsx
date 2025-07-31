import axios from "axios";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import toast, { Toaster } from "react-hot-toast";


const server = "http://localhost:9000";

export interface User {
    _id: string,
    name: string,
    email: string,
    role: string,
    playlists: string[]
}

interface UserType {
    user: User | null;
    isAuth: boolean;
    loading: boolean;
    btnLoading: boolean;
    loginUser: (
        email: string,
        password: string,
        navigate: (path: string) => void,
    ) => Promise<void>;
    registerUser: (
        name: string,
        email: string,
        password: string,
        navigate: (path: string) => void,
    ) => Promise<void>;

    logout: () => Promise<void>
}

const UserContext = createContext<UserType | undefined>(undefined);

interface UserProvider {
    children: ReactNode
}

export const UserProvider: React.FC<UserProvider> = ({ children }) => {

    const [user, setUser] = useState<User | null>(null)
    const [loading, setloading] = useState(true);
    const [isAuth, setisAuth] = useState(false);
    const [btnLoading, setbtnLoading] = useState(false);

    async function loginUser(email: string, password: string, navigate: (path: string) => void) {
        setbtnLoading(true);
        try {

            const { data } = await axios.post(`${server}/api/v1/user/login`, {
                email, password
            });

            toast.success(data.message);
            localStorage.setItem("token", data.token);
            setUser(data.user);
            setisAuth(true);

            navigate("/");

        } catch (err: any) {
            toast.error(err.response?.data?.message || "An error Occured");
        }

        setbtnLoading(false);
    }


    async function registerUser(name: string, email: string, password: string, navigate: (path: string) => void) {
        setbtnLoading(true);
        try {

            const { data } = await axios.post(`${server}/api/v1/user/register`, {
                name, email, password
            });

            toast.success(data.message);
            localStorage.setItem("token", data.token);
            setUser(data.user);
            setisAuth(true);

            navigate("/");

        } catch (err: any) {
            toast.error(err.response?.data?.message || "An error Occured");
        }

        setbtnLoading(false);
    }

    async function fetchUser() {
        try {

            const { data } = await axios.get(`${server}/api/v1/user/profile`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            });

            setUser(data);
            setisAuth(true);
            setloading(false);

        } catch (error) {
            console.log(error);
            setloading(false);

        }
    }

    async function logout() {
        localStorage.clear();
        setUser(null);
        setisAuth(false);

        toast.success("User Logged out");
    }

    useEffect(() => {
        fetchUser();
    }, [])


    return <UserContext.Provider value={{ user, isAuth, loading, btnLoading, loginUser, registerUser, logout }}>

        {children}
        <Toaster />
    </UserContext.Provider>
};

export const UserData = (): UserType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("userData must be used in UserProvider");
    }

    return context;
}