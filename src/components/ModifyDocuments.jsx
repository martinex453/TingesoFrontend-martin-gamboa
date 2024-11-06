import { useEffect, useState } from "react";
import loanService from "../services/loan.service";
import { useNavigate } from "react-router-dom";
import { Box, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, FormControl } from '@mui/material';
import documentService from "../services/document.service";

const ModifyDocuments = () => {
    const [loanId, setLoanId] = useState(localStorage.getItem("loanId"));
    const [loan, setLoan] = useState({});
    const [docIngresos, setDocIngresos] = useState("");
    const [docAvaluo, setDocAvaluo] = useState("");
    const [docHistorialCrediticio, setDocHistorialCrediticio] = useState("");
    const [docEscrituraPrimeraVivienda, setDocEscrituraPrimeraVivienda] = useState("");
    const [docEstadoFinanciero, setDocEstadoFinanciero] = useState("");
    const [docPlanNegocios, setDocPlanNegocios] = useState("");
    const [docPresupuestoRemodelacion, setDocPresupuestoRemodelacion] = useState("");
    const navigate = useNavigate();

    const newDocuments = async (e) => {
        e.preventDefault();
        if(!docIngresos || !docAvaluo) {
            alert("Por favor suba los documentos de ingresos y avalúo");
            return;
        }

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

            await documentService.deleteDocuments(loanId);

            for (const doc of documents) {
                if (doc.file) {
                    const formData = {
                        loanId: loanId,
                        file: doc.file,
                        name: doc.name,
                    }
                    console.log("Uploading document:", doc.name);
                    
                    await documentService.uploadDocument(formData, loan.userId);
                }
            }
            
            alert("Tus documentos se han subido correctamente");
            await loanService.updateState(loan, 1);
            navigate("/myLoans");
        } catch (e) {
            console.log("There was an error applying for the loan or uploading documents!", e);
        }
    }

    const getLoanToModify = () => {
        loanService.getId(loanId)
            .then(response => {
                setLoan(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.log("Error getting loan", e);
            });
    }

    useEffect(() => {
        if (loanId) getLoanToModify();
    }, []);

    const getLoanTypeString = (loantype) => {
        if (loantype === 1) return "Primera Vivienda";
        if (loantype === 2) return "Segunda Vivienda";
        if (loantype === 3) return "Local comercial";
        if (loantype === 4) return "Remodelación";
        return "Tipo Desconocido";
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            component="form"
            onSubmit={newDocuments}
        >
            <div style={{ backgroundColor: '#90EE90', width: '100%', borderRadius: '12px', marginBottom: '10px'}}>
                <h2>Tu solicitud</h2>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>Capital</TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>Tipo de Crédito</TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>Plazo en años</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Estado</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loan.id && (
                            <TableRow key={loan.id}>
                                <TableCell align="left">{loan.capital}</TableCell>
                                <TableCell align="left">{getLoanTypeString(loan.loantype)}</TableCell>
                                <TableCell align="left">{loan.term}</TableCell>
                                <TableCell align="left">{"Informacion incompleta o incongruente"}</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {loan.loantype && (
                <Box 
                    mt={2} 
                    display="flex" 
                    flexDirection="column" 
                    alignItems="center" 
                    justifyContent="center" 
                    sx={{ gap: 2 }}
                >
                    <FormControl fullWidth style = {{color: '#000000', fontSize: '25px', textAlign: "center"}}>
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
                    {(loan.loantype === 1 || loan.loantype === 2) && (
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
                    {loan.loantype === 2 && (
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
                    {loan.loantype === 3 && (
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
                    {loan.loantype === 4 && (
                        <FormControl fullWidth style = {{color: '#000000', fontSize: '25px'}}>
                            <label htmlFor="PresupuestoRemodelacion">Presupuesto de Remodelación</label>
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
                Modificar documentos
            </Button>
        </Box>
    );
}

export default ModifyDocuments;
