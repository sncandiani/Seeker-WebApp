const baseUrl = "http://127.0.0.1:8000/";

const ApiManager =  {
    // Companies
    addCompany(company, token) {
        return fetch(`${baseUrl}companies`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Token ${token}`
              },
              body: JSON.stringify(company),
        })},
    getCompanies(token) {
       return fetch(`${baseUrl}companies`, {
           method: "GET", 
           headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${token}`
           }, 
           body: JSON.stringify()
       }).then((resp) => resp.json())
    }, 
    deleteCompany(companyId) {
        return fetch(`${baseUrl}companies/${companyId}`, {
            method: "DELETE"
        })
    }, 
    retrieveCompany(companyId, token) {
        return fetch(`${baseUrl}companies/${companyId}`).then(resp => resp.json())
    }
}

export default ApiManager