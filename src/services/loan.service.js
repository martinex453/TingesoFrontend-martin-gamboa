import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get("/api/loan/");
}

const getLoansForEvaluate = () => {
    return httpClient.get("/api/loan/loansForEvaluate");
}

const getUserLoans = userId => {
    return httpClient.get(`/api/loan/userLoans/${userId}`);
}


const getId = id => {
    return httpClient.get(`/api/loan/${id}`);
}

const getCapital = capital => {
    return httpClient.get(`/api/loan/capital/${capital}`);
}

const getUserId = userId => {
    return httpClient.get(`/api/loan/userId/${userId}`);
}

const getTerm = term => {
    return httpClient.get(`/api/loan/term/${term}`);
}

const create = data => {
    return httpClient.post("/api/loan/", data);
}

const update = data => {
    return httpClient.put("/api/loan/", data);
}

const remove = id => {
    return httpClient.delete(`/api/loan/${id}`);
}

const simulate = (capital, term, interest) => {
    return httpClient.post(`/api/loan/simulate/${capital}/${term}/${interest}`);
}

const incomeQuota = (income, id) => {
    return httpClient.post(`/api/loan/incomeQuota/${income}/${id}`);
}

const debtIncome = async (userId, income) => {
    return httpClient.post(`/api/loan/debtIncome/${userId}/${income}`);
}

const savingCapacity = (balance, loanId, consistentSaving, periodicSavings, seniorityBalance, recentRetirement) => {
    return httpClient.post(`/api/loan/savingCapacity`, null, {
        params: {
            balance,
            loanId,
            consistentSaving,
            periodicSavings,
            seniorityBalance,
            recentRetirement,
        },
    });
}

const statusInt = (loanId) => {
    return httpClient.get(`/api/loan/statusInt/${loanId}`);
}

const updateState = (loan, state) => {
    return httpClient.put(`/api/loan/upState/${state}`, loan);
}

const maxCapital = loanId => {
    return httpClient.get(`/api/document/loanDocs/${loanId}`, { responseType: 'blob' });
}

export default {getAll, getId, getCapital, getUserId, getTerm, create, update, remove, simulate, incomeQuota, savingCapacity, debtIncome,
    statusInt, updateState, maxCapital, getLoansForEvaluate, getUserLoans};