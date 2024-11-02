import React, { useState } from 'react';
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from "react-router-dom";
import loanService from '../services/loan.service';
import documentService from '../services/document.service';

const ApplyForLoan = () => {
    const [userId, setUserid] = useState(() => Number(localStorage.getItem("user")));
    const [capital, setCapital] = useState("");
    const [term, setTerm] = useState("");
    const [loantype, setloantype] = useState(""); // Estado para el tipo de crédito
    const [interest, setInterest] = useState("");
    const [monthfee, setMonthFee] = useState("");
    const [status, setStatus] = useState(1);
    const [docIngresos, setDocIngresos] = useState("");
    const [docAvaluo, setDocAvaluo] = useState("");
    const [docHistorialCrediticio, setDocHistorialCrediticio] = useState("");
    const [docEscrituraPrimeraVivienda, setDocEscrituraPrimeraVivienda] = useState("");
    const [docEstadoFinanciero, setDocEstadoFinanciero] = useState("");
    const [docPlanNegocios, setDocPlanNegocios] = useState("");
    const [docPresupuestoRemodelacion, setDocPresupuestoRemodelacion] = useState("");
    const [rut, setRut] = useState("");
    const [propCost, setPropCost] = useState("");
    const navigate = useNavigate();

    const applyLoan = async (e) => {
        e.preventDefault();
        if (!capital || !term || !loantype || !interest || !propCost) {
            alert("All fields are required!");
            return;
        }

        // Validaciones para el interés
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
            loantype,
            interest,
            status,
            monthfee,
            propCost,
            userId,
        };

        try {
            const documents = [
                { file: docIngresos, name: "Comprobante de ingresos" },
                { file: docAvaluo, name: "Certificado de avalúo"},
                { file: docHistorialCrediticio, name: "Historial crediticio" },
                { file: docEscrituraPrimeraVivienda, name: "Escritura Primera Vivienda"},
                { file: docEstadoFinanciero, name: "Estado Financiero" },
                { file: docPlanNegocios, name: "Plan de Negocios" },
                { file: docPresupuestoRemodelacion, name: "Presupuesto de Remodelación"},
            ];

            const loanResponse = await loanService.create(loan);
            console.log("Loan applied successfully!", loanResponse.data);

            for (const doc of documents) {
                if (doc.file) {
                    const formData = {
                        loanId: loanResponse.data.id,
                        file: doc.file,
                        name: doc.name,
                    }
                    console.log("Uploading document:", doc.name);
                    // Llama a un servicio para subir el documento
                    await documentService.uploadDocument(formData, userId);
                }
            }
        
            alert("Tu solicitud ha sido enviada exitosamente.");
            navigate("/home");
        } catch (e) {
            console.log("There was an error applying for the loan or uploading documents!", e);
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            component="form"
            onSubmit={applyLoan}
        >
            <div style={{ backgroundColor: '#90EE90', width: '100%', borderRadius: '20px' }}><h1>Solicitud de credito</h1></div>
            <br/>
            <FormControl fullWidth sx={{width: '70vw'}}>
                <TextField
                    id="rut"
                    label="Rut"
                    type="text"
                    value={rut}
                    onChange={(e) => setRut(e.target.value)}
                    helperText="Ejemplo: 12345678-9"
                />
            </FormControl>
            <br/>
            <FormControl fullWidth sx={{width: '70vw'}}>
                <TextField
                    id="propCost"
                    label="Costo de la propiedad"
                    type="text"
                    value={propCost}
                    onChange={(e) => setPropCost(e.target.value)}
                    helperText="Ejemplo: 12345678-9"
                />
            </FormControl>
            <br/>
            <FormControl fullWidth sx={{width: '70vw'}}>
                <TextField
                    id="capital"
                    label="Capital a solicitar"
                    type="number"
                    value={capital}
                    onChange={(e) => setCapital(e.target.value)}
                />
            </FormControl>
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
            <FormControl fullWidth sx={{width: '70vw'}}>
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
            <FormControl fullWidth sx={{width: '70vw'}}>
                <TextField
                    id="interest"
                    label="Interes en porcentaje"
                    type="number"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    helperText="Ejemplo: 3%"
                />
            </FormControl>
            <br/>
            {loantype && (
                <Box 
                    mt={2} 
                    display="flex" 
                    flexDirection="column" 
                    alignItems="center" 
                    justifyContent="center" 
                    sx={{ gap: 2 }}
                >
                    <FormControl fullWidth style = {{color: '#000000', fontSize: '25px'}}>
                        <label htmlFor="ingresos">Comprobante de ingresos</label>
                        <input
                            accept="application/pdf"
                            id="ingresos"
                            type="file"
                            onChange={(e) => setDocIngresos(e.target.files[0])}
                        />
                    </FormControl>
                    <br/>
                    <FormControl fullWidth style = {{color: '#000000', fontSize: '25px'}}>
                        <label htmlFor="avaluo">Certificado de avalúo</label>
                        <input
                            accept="application/pdf"
                            id="avaluo"
                            type="file"
                            onChange={(e) => setDocAvaluo(e.target.files[0])}
                        />
                    </FormControl>
                    <br/>
                    {(loantype === "1" || loantype === "2") && (
                        <FormControl fullWidth style = {{color: '#000000', fontSize: '25px'}}>
                            <label htmlFor="historialCrediticio">Historial crediticio</label>
                            <input
                                accept="application/pdf"
                                id="historialCrediticio"
                                type="file"
                                onChange={(e) => setDocHistorialCrediticio(e.target.files[0])}
                            />
                            <br/>
                        </FormControl>
                        
                    )}
                    {loantype === "2" && (
                        <FormControl fullWidth style = {{color: '#000000', fontSize: '25px'}}>
                            <label htmlFor="EscrituraPrimeraVivienda">Escritura Primera Vivienda</label>
                            <input
                                accept="application/pdf"
                                id="EscrituraPrimeraVivienda"
                                type="file"
                                onChange={(e) => setDocEscrituraPrimeraVivienda(e.target.files[0])}
                            />
                            <br/>
                        </FormControl>
                    )}
                    {loantype === "3" && (
                        <>
                            <FormControl fullWidth style = {{color: '#000000', fontSize: '25px'}}>
                                <label htmlFor="EstadoFinanciero">Estado Financiero</label>
                                <input
                                    accept="application/pdf"
                                    id="EstadoFinanciero"
                                    type="file"
                                    onChange={(e) => setDocEstadoFinanciero(e.target.files[0])}
                                />
                            </FormControl>
                            <br/>
                            <FormControl fullWidth style = {{color: '#000000', fontSize: '25px'}}>
                                <label htmlFor="PlanNegocios">Plan de Negocios</label>
                                <input
                                    accept="application/pdf"
                                    id="PlanNegocios"
                                    type="file"
                                    onChange={(e) => setDocPlanNegocios(e.target.files[0])}
                                />
                                <br/>
                            </FormControl>
                        </>
                    )}
                    {loantype === "4" && (
                        <FormControl fullWidth style = {{color: '#000000', fontSize: '25px'}}>
                            <label htmlFor="PresupuestoRemodelacion" >Presupuesto de Remodelación</label>
                            <input
                                accept="application/pdf"
                                id="PresupuestoRemodelacion"
                                type="file"
                                onChange={(e) => setDocPresupuestoRemodelacion(e.target.files[0])}
                            />
                            <br/>
                        </FormControl>
                    )}
                </Box>
            )}
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Aplicar para Préstamo
            </Button>
        </Box>
    );
};

export default ApplyForLoan;