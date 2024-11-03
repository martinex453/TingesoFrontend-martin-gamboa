import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Box, FormControl } from '@mui/material';
import userService from "../services/user.service";

const Login = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const userLog = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            console.log("Email and password are required!");
            return;
        }
        const user = {
            password,
            email,
        };

        await userService.login(user)
        .then(async response => {
            if(response.data != 0){
                console.log("User logged in successfully!");
                const userType = await userService.getId(response.data);
                localStorage.setItem("usertype", userType.data.usertype);
                localStorage.setItem("user", JSON.stringify(response.data));
                navigate("/home");
            }
            else{
                alert("Usuario o contraseña incorrectos");
            }
        })
        .catch(e => {
            console.log("There was an error logging in the user!",e);
        });
    };
    return (
        <Box 
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            component="form"
            style={{ backgroundColor: '#90EE90', width: '30vw', margin: 'auto', padding: '20px', borderRadius: '15px' }}
        >
            <h1>Bienvenido a PrestaBanco</h1>
            <h4>Ingresa tus datos para iniciar sesion</h4>
            <hr/>

                <FormControl fullWidth>
                    <TextField
                        id="email"
                        label="Email"
                        type="email"
                        variant="standard"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <br/>
                <FormControl fullWidth>
                    <TextField
                        id="password"
                        label="Password"
                        variant="standard"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                <br/>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    style={{margin: 'auto', padding: '12px 40px', fontSize: '20px'}}
                    onClick={(e) => userLog(e)}
                >
                    Login
                </Button>
                <br/>
                <Link to="/">Register</Link>
        </Box>
    );
    
}

export default Login;