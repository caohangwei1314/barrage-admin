import { login } from '@/api/login'
import * as users from '@/api/users'
import { getToken, setToken, removeToken } from '@/utils/auth'
import store from '../../store'

const user = {
  state: {
    token: getToken()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_STATUS: (state, status) => {
      state.status = status
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          switch (response.code) {
            case 0:
              store.state.token = response.data
              setToken(response.data)
              commit('SET_TOKEN', response.data)
              users.detail().then(result => {
                commit('SET_STATUS', result.data.status)
              })
              resolve(response)
              console.log(store.state.status)
              break
            case 1:
              resolve(response)
              break
            default:
              break
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
