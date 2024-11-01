import React, { useState, useEffect } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableRow, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import loanService from '../services/loan.service';

const LoanDetails = () => {
    const [loanId, setLoanId] = useState(() => Number(localStorage.getItem("loanId")));
    const [loan, setLoan] = useState({});
    const Navigate = useNavigate();

    const getLoan = () => {
        loanService.getId(loanId)
            .then(response => {
                setLoan(response.data);
            })
            .catch((e) => {
                console.log("Error getting loan", e);
            });
    };

    useEffect(() => {
        getLoan();
    }, []);

    const handleType = (loanType) => {
        if (loanType === 1) return "Primera Vivienda";
        if (loanType === 2) return "Segunda Vivienda";
        if (loanType === 3) return "Local comercial";
        if (loanType === 4) return "Remodelación";
        return "Tipo Desconocido"; // Valor por defecto
    }

    const handleAcceptTerms = async () => {
        try {
            await loanService.updateState(loan, 5); // Cambia loan.data a loanId
            console.log("Estado actualizado correctamente.");
            Navigate("/myLoans");
        } catch (e) {
            console.log("Error updating loan state", e);
        }
    };

    return (
        <Box>
            <Typography variant="h5" sx={{backgroundColor: '#90EE90', marginBottom: "10px", borderRadius: "8px"}}>Detalles del Crédito</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Tipo de Crédito:</TableCell>
                            <TableCell>{handleType(loan.loantype) || 'N/A'}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Capital Solicitado:</TableCell>
                            <TableCell>{loan.capital || 'N/A'} clp</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Plazo del Crédito:</TableCell>
                            <TableCell>{loan.term || 'N/A'} años</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Interés Aplicado:</TableCell>
                            <TableCell>{loan.interest || 'N/A'}%</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Cuota Mensual:</TableCell>
                            <TableCell>{loan.monthQuote || 'N/A'} clp</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Total del Crédito:</TableCell>
                            <TableCell>{loan.total || 'N/A'} clp</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" color="primary" sx={{ marginTop: '10px' }} onClick={handleAcceptTerms}>
                Aceptar Términos
            </Button>
        </Box>
    );
};

export default LoanDetails;
