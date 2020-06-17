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
    updateCompany(company, token) {
        return fetch(`${baseUrl}companies/${company.id}`, {
            method: "PUT", 
            headers:{
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Token ${token}`
            }, 
            body: JSON.stringify(company)
        })
    },
    deleteCompany(companyId) {
        return fetch(`${baseUrl}companies/${companyId}`, {
            method: "DELETE"
        })
    }, 
    retrieveCompany(companyId) {
        return fetch(`${baseUrl}companies/${companyId}`).then(resp => resp.json())
    }, 
    getEmployees(token) {
        return fetch(`${baseUrl}employees`, {
            method: "GET", 
            headers: {
             "Content-Type": "application/json",
             Accept: "application/json",
             Authorization: `Token ${token}`
            }, 
            body: JSON.stringify()
        }).then((resp) => resp.json())
     },
     addEmployee(employee, token) {
        return fetch(`${baseUrl}employees`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Token ${token}`
              },
              body: JSON.stringify(employee),
        })},
        deleteEmployee(employeeId) {
            return fetch(`${baseUrl}employees/${employeeId}`, {
                method: "DELETE"
            })
        }, 
        updateEmployeeContacted(employee, token) {
            return fetch(`${baseUrl}employees/${employee.id}`, {
                method: "PATCH", 
                headers:{
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Token ${token}`
                }, 
                body: JSON.stringify(employee)
            })
        }, 
        retrieveEmployee(employeeId) {
            return fetch(`${baseUrl}employees/${employeeId}`).then(resp => resp.json())
        },
        updateEmployee(employee, token) {
            return fetch(`${baseUrl}employees/${employee.id}`, {
                method: "PUT", 
                headers:{
                    "Content-Type": "application/json", 
                    Accept: "application/json", 
                    Authorization: `Token ${token}`
                }, 
                body: JSON.stringify(employee)
            })
        }
}

export default ApiManager