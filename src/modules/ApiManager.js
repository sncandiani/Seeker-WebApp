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
    // Employees
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
        }, 
        // Interviews
        getInterviews(token) {
            return fetch(`${baseUrl}interviews`, {
                method: "GET", 
                headers:{
                    "Content-Type": "application/json", 
                    Accept: "application/json", 
                    Authorization: `Token ${token}`
                }, 
                body: JSON.stringify()
            }).then(resp => resp.json())
        }, 
        getInterviewTypes(token) {
            return fetch(`${baseUrl}interviewTypes`, {
                method: "GET", 
                headers:{
                    "Content-Type": "application/json", 
                    Accept: "application/json", 
                    Authorization: `Token ${token}`
                }, 
                body: JSON.stringify()
            }).then(resp => resp.json())
        }, 
        addInterview(interview, token) {
            return fetch(`${baseUrl}interviews`, {
                method: "POST", 
                headers:{
                    "Content-Type": "application/json", 
                    Accept: "application/json", 
                    Authorization: `Token ${token }`
                }, 
                body: JSON.stringify(interview)
            })
        }, 
        deleteInterview(interviewId) {
            return fetch(`${baseUrl}interviews/${interviewId}`, {
                method: "DELETE"
            })
        }, 
        retrieveInterview(interviewId) {
            return fetch(`${baseUrl}interviews/${interviewId}`, {
                method: "GET"
            }).then(resp => resp.json())
        }, 
        updateInterview(interview, token) {
            return fetch(`${baseUrl}interviews/${interview.id}`, {
                method: "PUT", 
                headers:{
                    "Content-Type": "application/json", 
                    Accept: "application/json", 
                    Authorization: `Token ${token}`
                }, 
                body: JSON.stringify(interview)
            })
        }, 
        updateCompanyFollowedUp(company, token) {
            return fetch(`${baseUrl}companies/${company.id}`, {
                method: "PATCH", 
                headers:{
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Token ${token}`
                }, 
                body: JSON.stringify(company)
            })
        }, 
        // Applications 
        getApplications(token) {
            return fetch(`${baseUrl}applications`, {
                method: "GET", 
                headers:{
                    "Content-Type": "application/json", 
                    Accept: "application/json", 
                    Authorization: `Token ${token}`
                }, 
                body: JSON.stringify()
            }).then(resp => resp.json())
        }, 
        addApplication(application, token) {
            return fetch(`${baseUrl}applications`, {
                method: "POST", 
                headers:{
                    "Content-Type": "application/json", 
                    Accept: "application/json", 
                    Authorization: `Token ${token}`
                }, 
                body: JSON.stringify(application)
            })
        }, 
        deleteApplication(applicationId) {
            return fetch(`${baseUrl}applications/${applicationId}`, {
                method: "DELETE"
            })
        }, 
        retrieveApplication(applicationId) {
            return fetch(`${baseUrl}applications/${applicationId}`, {
                method: "GET"
            }).then(resp => resp.json())
        }, 
        updateApplication(application, token) {
            return fetch(`${baseUrl}applications/${application.id}`, {
                method: "PUT", 
                headers:{
                    "Content-Type": "application/json", 
                    Accept: "application/json", 
                    Authorization: `Token ${token}`
                }, 
                body: JSON.stringify(application)
            })
        },
}

export default ApiManager