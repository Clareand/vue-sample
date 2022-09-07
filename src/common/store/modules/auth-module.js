import {login, logout, register} from './auth-action'

const user = JSON.parse(localStorage.getItem("user"))

const initialState = user ? {status: {loggedIn : true}, user} : {status : {loggedIn:false}, user:null};

export const auth = {
    namespaced: true,
    state: initialState,
    actions : {
        login({commit},user){
            return login(user).then(
                user=>{
                    commit('loginSuccess',user);
                    return Promise.resolve(user)
                },
                error=>{
                    commit('loginFailure');
                    return Promise.reject(error)
                }
            )
        },
        register({commit},user){
            return register(user).then(
                response=>{
                    commit('registerSuccess');
                    return Promise.resolve(response.data)
                },
                error => {
                    commit('registerFailed');
                    return Promise.reject(error)
                }
            )
        },
        logout({commit}){
            logout();
            commit('logout')
        }
    },
    mutations:{
        loginSuccess(state, user){
            state.status.loggenIn = true;
            state.user = user
        },
        loginFailure(state){
            state.status.loggedIn = false;
            state.user = null
        },
        logout(state){
            state.status.loggedIn = false
            state.user = null
        },
        registerSuccess(state){
            state.status.loggedIn = false
        },
        registerFailed(state){
            state.status.loggedIn = false
        }
    }
}