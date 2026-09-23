import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const url = "https://dummyjson.com/auth/login"
    const navigate = useNavigate();

    const onLogin = async () => {
        try {
            const token = await axios.post(url, { username, password });
            console.log(token);
            localStorage.setItem("token", token.data.accessToken);
            setIsLogged(true);
            navigate(`/user/${token.data.id}`);
        } catch (e) {
            setIsLogged(false);
        }
    }
    return (
        <>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={onLogin}>Se connecter</button>
            {isLogged ? <p>Connexion réussie</p> : (username && password) && <p>Connexion échouée</p>}
        </>
    );
}
export default Login;