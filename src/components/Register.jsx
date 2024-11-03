import { React, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Box, FormControl } from '@mui/material';
import userService from "../services/user.service";


const Register = () => {
    const [name, setName] = useState("");
    const {id} = useParams();
    const [password, setPassword] = useState("");
    const [birthdate, setbirthDate] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [usertype, setUserType] = useState(1);
    const [rut, setRut] = useState("");
    const navigate = useNavigate();

    localStorage.setItem("user", JSON.stringify(""));

    const formatDate = (date) => {
        const [year, month, day] = date.split('-');
        return `${year}-${month}-${day}`;
    };

    const userReg = (e) => {
        e.preventDefault();
        if (!name || !password || !birthdate || !email || !phone || !address) {
            alert("Rellene todos los campos");
            return;
        }

        console.log("paso");

        const user = {
            name,
            password,
            birthdate,
            email,
            phone,
            address,
            usertype,
            id,
            rut
        };

        console.log(usertype);
        console.log(birthdate);
        userService.create(user)
            .then((response) => {
                console.log("User created successfully!", response.data);
                navigate("/login");
            })
            .catch((e) => {
                console.log("There was an error registering the user!", e);
            });
    };
    return (
        <Box 
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            component="form"
            onSubmit={userReg}
            style={{ backgroundColor: '#90EE90', width: '30vw', margin: 'auto', padding: '20px', borderRadius: '15px' }}
        >
            
            <h1>Bienvenido a PrestaBanco</h1>
            <h4>Por favor, rellene los siguientes campos para registrarse</h4>
                <FormControl fullWidth>
                    <TextField
                        id="rut"
                        label="Rut"
                        type="rut"
                        variant="standard"
                        value={rut}
                        onChange={(e) => setRut(e.target.value)}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        id="name"
                        label="Name"
                        type="text"
                        variant="standard"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        id="email"
                        label="Email"
                        variant="standard"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        variant="standard"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        id="date"
                        variant="standard"
                        type="date"
                        value={birthdate}
                        onChange={(e) => formatDate(setbirthDate(e.target.value))}
                        helperText="Fecha de nacimiento"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        id="phone"
                        label="Phone"
                        type="tel"
                        variant="standard"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        helperText="Ejemplo: 123456789"
                    />
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        id="address"
                        label="Address"
                        variant="standard"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        helperText="Calle 123, Ciudad 1"
                    />
                </FormControl>
                <FormControl>
                    <br/>
                    <Button
                        variant="contained"
                        color="info"
                        onClick={(e) => userReg(e)}
                        style={{margin: 'auto', padding: '12px 20px', fontSize: '20px'}}
                        >Registrar</Button>
                </FormControl>
            <hr/>
            <Link to="/login">Iniciar sesión</Link>
        </Box>
    );      
};

export default Register;