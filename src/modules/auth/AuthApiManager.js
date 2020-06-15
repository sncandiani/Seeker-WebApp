const baseUrl = "http://127.0.0.1:8000/";

const AuthApiManager = {
    loginUser(user) {
        return fetch(`${baseUrl}login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(user),
        }).then((resp) => resp.json());
    ;
      },
      registerUser(user) {
         return fetch(`${baseUrl}register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(user),
        }).then((resp) => resp.json());
      },
      getUser(seeker_id) {
        return fetch(`${baseUrl}seekers/${seeker_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(),
        }).then(resp => resp.json())
      }
}

export default AuthApiManager