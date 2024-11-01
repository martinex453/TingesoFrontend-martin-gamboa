import httpClient from "../http-common";

const uploadDocument = async (doc, userId) => {
    const formData = {
        file: doc.file,
        loanId: doc.loanId,
        userId: userId,
        docName: doc.name,
    }// El nombre del documento
    try {
        const response = await httpClient.post("/api/document/", formData, {
            headers: {
                "Content-Type": "multipart/form-data", // Asegúrate de establecer el tipo de contenido
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading document:", error);
        throw error; // Lanza el error para manejarlo más arriba si es necesario
    }
}

const downloadDocuments = loanId => {
    return httpClient.get(`/api/document/loanDocs/${loanId}`, { responseType: 'blob' });
}

const deleteDocuments = loanId => {
    return httpClient.delete(`/api/document/deleteLoanDocs/${loanId}`);
}


export default {uploadDocument, downloadDocuments, deleteDocuments};