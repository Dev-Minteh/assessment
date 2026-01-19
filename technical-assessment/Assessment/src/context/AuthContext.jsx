import { createContext, useEffect, useState} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState();
    const [token, setToken] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if(storedUser && storedToken){
        setUser(storedUser);
        setToken(storedToken);
    }

    setLoading(false);
    },[]);

  
   const login = async () => {
    const credentials = { username: "john_doe", password: "pass123" };

    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      console.log(data);

      setToken(data.token); 
      setUser(credentials); 

      localStorage.setItem("user", JSON.stringify(credentials));
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.error(error);
    }
  };


    const logout = () => {
        setUser(null);
        setToken("null");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
    return(
        <AuthContext.Provider value={{login, logout, user, token,loading, }}>
        {children}
        </AuthContext.Provider>
    )
}