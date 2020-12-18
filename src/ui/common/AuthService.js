import axios from 'axios';

export default class AuthService {
    // Initializing important variables
    constructor(domain) {
        this.domain = domain || 'http://83.69.126.22:5821' // API server domain
        this.login = this.login.bind(this)
    }

    async login(login, password) {
        const client_id = "09cd26c447e23bd197e7de7a727d8bc5ce12dbf650e6a9685e8129236ffba6d5"

        const formData = {
          email: login,
          password: password,
          grant_type: 'password',
          client_id: client_id
        }

        const data = Object.keys(formData).map(prop => `${prop}=${formData[prop]}`).join('&')

        const headers = {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/x-www-form-urlencoded'
            }
        }

        await axios.post('http://83.69.126.22:5821/oauth/token',
            data,
            headers
        ).then( response => {
            localStorage.setItem( 'id_token', response.data.access_token );
            return Promise.resolve(response);
        });
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // Getting token from local storage
        return !!token // handwaving here
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }


    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}
