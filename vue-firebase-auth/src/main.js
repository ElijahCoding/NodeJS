import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

require('./assets/scss/app.scss')


firebase.initializeApp({
    apiKey: "AIzaSyCm307jEzX1TAHbtF91JFGhmyloIQmNsGA",
    authDomain: "vue-firebase-auth-be65f.firebaseapp.com",
    databaseURL: "https://vue-firebase-auth-be65f.firebaseio.com",
    projectId: "vue-firebase-auth-be65f",
    storageBucket: "vue-firebase-auth-be65f.appspot.com",
    messagingSenderId: "9129366464",
    appId: "1:9129366464:web:21bc8a33cb3eb5d5"
})

firebase.auth().onAuthStateChanged(user => {
    store.dispatch('fetchUser', user)

    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
})
