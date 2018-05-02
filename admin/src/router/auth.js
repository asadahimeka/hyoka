import api from '../api'

const auth = {
  async loggedIn() {
    try {
      let res = await api.isLogin()
      return res.data.me && res.data.me.role == 'admin'
    } catch (error) {
      console.error(error)
      return false
    }
  }
}

export default auth
