<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link :to="{ name: 'home' }" class="navbar-item">
                <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
            </router-link>

            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div class="navbar-menu">
            <div class="navbar-end">
                <template v-if="user.loggedIn">
                    <div class="navbar-item">
                        {{ user.data.displayName }}
                    </div>

                    <div class="navbar-item">
                        <div class="buttons">
                            <a @click.prevent="signOut" href="#" class="button is-light">
                                Sign out
                            </a>
                        </div>
                    </div>
                </template>
                <div class="navbar-item" v-else>
                    <div class="buttons">
                        <router-link :to="{ name: 'signup' }" class="button is-primary">
                            <strong>Sign up</strong>
                        </router-link>
                        <router-link :to="{ name: 'signin' }" class="button is-light">
                            Sign in
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    import { mapGetters } from 'vuex'
    import firebase from 'firebase'

    export default {
        computed: {
            ...mapGetters({
                user: 'user'
            })
        },

        methods: {
            signOut () {
                firebase.auth().signOut().then(() => {
                    this.$router.replace({
                        name: 'home'
                    })
                })
            }
        }
    }
</script>

<style>
    .navbar {
        margin-bottom: 40px;
    }
</style>
