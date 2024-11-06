import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import loanService from "../services/loan.service";

const MyLoans = () => {
    const [loans, setLoans] = useState([]);
    const [userId, setUserid] = useState(() => Number(localStorage.getItem("user")));
    const navigate = useNavigate();

    const getLoans = () => {
        loanService.getUserLoans(userId)
            .then(response => {
                setLoans(response.data);
            })
            .catch((e) => {
                console.log("Error getting loans", e);
            });
    }

    useEffect(() => {
        getLoans();
    }, []);

    const getStatusString = (status) => {
        if (status === 1) return "En revisión inicial";
        if (status === 2) return "Informacion incompleta o incongruente";
        if (status === 3) return "En evaluación";
        if (status === 4) return "Pre-aprobado";
        if (status === 5) return "En aprobación final";
        if (status === 7) return "Rechazado";
        if (status === 6) return "Aprobado";
        if (status === 9) return "En desembolso";
        if (status === 8) return "Cancelado";
        return "Desconocido";
    }

    const getLoanTypeString = (loantype) => {
        if (loantype === 1) return "Primera Vivienda";
        if (loantype === 2) return "Segunda Vivienda";
        if (loantype === 3) return "Local comercial";
        if (loantype === 4) return "Remodelación";
        return "Tipo Desconocido";
    }

    const handleModifyDocuments = (loanId) => {
        localStorage.setItem("loanId", loanId);
        navigate("/modifyDocuments");
    }

    const handleAcceptTerms = async (loanId) => {
        localStorage.setItem("loanId", loanId);
        navigate("/loanDetails");
    }
    
    const handleMoney = async (loanId) => {
        const loan = await loanService.getId(loanId);
        await loanService.updateState(loan.data, 9);
        getLoans();
    }

    const handleCancel = async (loanId) => {
        const loan = await loanService.getId(loanId);
        console.log(loan.data);
        await loanService.updateState(loan.data, 8);
        getLoans();
    }

    return (
        <Box>
            <div style={{ backgroundColor: '#90EE90', width: '100%', borderRadius: '12px' }}><h2>Mis solicitudes de credito</h2></div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>Capital</TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>Tipo de Crédito</TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>Plazo en años</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Estado</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Total</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Cuota Mensual</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loans.length > 0 ? (
                            loans.map((loan) => (
                                <TableRow key={loan.id}>
                                    <TableCell align="left">{loan.capital}</TableCell>
                                    <TableCell align="left">{getLoanTypeString(loan.loantype)}</TableCell>
                                    <TableCell align="right">{loan.term}</TableCell>
                                    <TableCell align="left">{getStatusString(loan.status)}</TableCell>
                                    <TableCell align="left">{loan.total}</TableCell>
                                    <TableCell align="left">{loan.monthQuote}</TableCell>
                                    <TableCell align="center">
                                        {loan.status === 2 && (
                                            <Button variant="contained" onClick={() => handleModifyDocuments(loan.id)}>
                                                Modificar Documentos
                                            </Button>
                                        )}
                                        {loan.status === 4 && (
                                            <Button variant="contained" onClick={() => handleAcceptTerms(loan.id)}>
                                                Ver detalles
                                            </Button>
                                        )}
                                        {loan.status === 6 && (
                                            <Button variant="contained" onClick={() => handleMoney(loan.id)}>
                                                Solicitar Desembolso
                                            </Button>
                                        )}
                                    </TableCell>
                                    {loan.status !== 8 && loan.status !== 9 && (
                                        <TableCell align="center">
                                            <Button variant="contained" onClick={() => handleCancel(loan.id)}>
                                                Cancelar Solicitud
                                            </Button>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    No hay solicitudes de crédito disponibles.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default MyLoans;
