import { React, useState } from "react";
import { TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import userService from "../services/loan.service";

const SimulateLoan = () => {
    const [capital, setCapital] = useState("");
    const [term, setTerm] = useState("");
    const [interest, setInterest] = useState("");
    const [result, setResult] = useState(null);
    const [loantype, setloantype] = useState("1");
    const [submittedValues, setSubmittedValues] = useState({ capital: "", term: "", interest: "" });
    const SimulateLoan = (e) => {
        e.preventDefault();
        if (!capital || !term || !interest) {
            console.log("All fields are required!");
            return;
        }
        switch (loantype) {
            case "1":
                if (interest > 5 || interest < 3.5) {
                    alert("El interes debe estar entre 3.5 y 5");
                    return;
                }
                break;
            case "2":
                if (interest > 6 || interest < 4) {
                    alert("El interés debe estar entre 4 y 6");
                    return;
                }
                break;
            case "3":
                if (interest > 7 || interest < 5) {
                    alert("El interés debe estar entre 5 y 7");
                    return;
                }
                break;
            case "4":
                if (interest > 6 || interest < 4.5) {
                    alert("El interés debe estar entre 4.5 y 6");
                    return;
                }
                break;
        }
        const loan = {
            capital,
            term,
            interest
        };
        userService.simulate(capital, term, interest)
            .then(response => {
                setResult(response.data);
                setSubmittedValues({ capital, term, interest });
            })
            .catch(e => {
                console.log("There was an error simulating the loan!",e);
            });
    };
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            component="form"
            onSubmit={SimulateLoan}
        >
            <div style={{ backgroundColor: '#90EE90', width: '100%', borderRadius: '20px', marginBottom: '5vh'}}><h1>Simulador de credito</h1></div>
            <Box>
            <br/>
            <FormControl fullWidth>
                <TextField
                    id="capital"
                    label="Capital a solicitar"
                    type="number"
                    value={capital}
                    onChange={(e) => setCapital(e.target.value)}
                />
            </FormControl>
            <br/>
            <br/>
            <FormControl fullWidth sx={{width: '70vw'}}>
                <TextField
                    id="term"
                    label="Plazo en años"
                    type="number"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                />
            </FormControl>
            <br/>
            <br/>
            <FormControl fullWidth>
                <InputLabel id="loan-type-label">Tipo de crédito</InputLabel>
                <Select
                    labelId="loan-type-label"
                    id="loan-type"
                    value={loantype}
                    onChange={(e) => setloantype(e.target.value)}
                >
                    <MenuItem value="1">Primera vivienda</MenuItem>
                    <MenuItem value="2">Segunda Vivienda</MenuItem>
                    <MenuItem value="3">Propiedades Comerciales</MenuItem>
                    <MenuItem value="4">Remodelación</MenuItem>
                </Select>
            </FormControl>
            <br/>
            <br/>
            <FormControl fullWidth>
                <TextField
                    id="interest"
                    label="Interes en porcentaje"
                    type="number"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    helperText="Ejemplo: 3%"
                />
            </FormControl>
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Simular Credito
                </Button>
                {result && (
                <Typography variant="h6" color="textSecondary" sx={{ mt: 2, backgroundColor: '#90EE90', padding: '20px', borderRadius: '20px', color: '#ffffff', fontWeight: 'bold' }}>
                    {typeof result === 'string' ? result : `Su crédito de ${submittedValues.capital} dolares, en un plazo de ${submittedValues.term} años, a un interés del ${submittedValues.interest}% es:\n${result} mensuales por ${submittedValues.term*12} meses.`}
                </Typography>
                )}
            </Box>
        </Box>
    );
};

export default SimulateLoan;