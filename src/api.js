import axios from 'axios'
export const fetchUserList = async () => {
    try {
        const response = await axios.post('http://localhost:3000/api/v2/users/tokens', { email: 'test@skand.io', password: 'password' })
        const token = response.headers.authorization
        localStorage.setItem('authorization', token)
        const users = await axios.get('http://localhost:3000/api/v2/users', { headers: { authorization: token } })
        return users.data.users
    } catch (e){
        console.log(e)
    }
}