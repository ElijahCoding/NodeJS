<template>
    <div class="container">
        <div class="columns is-centered">
            <div class="column is-half">
                <h1 class="title">Sign up</h1>

                <div class="notification is-danger" v-if="error">
                    {{ error }}
                </div>

                <form action="#" @submit.prevent="submit">
                    <div class="field">
                        <label class="label">Name</label>
                        <div class="control">
                            <input
                                class="input"
                                type="text"
                                placeholder="e.g. Elijah"
                                v-model="form.name"
                            >
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control">
                            <input
                                class="input"
                                type="text"
                                placeholder="e.g. test@test.com"
                                v-model="form.email"
                            >
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Password</label>
                        <div class="control">
                            <input
                                class="input"
                                type="password"
                                v-model="form.password"
                            >
                        </div>
                    </div>

                    <div class="control">
                        <button class="button is-primary">Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase'

    export default {
        data () {
            return {
                form: {
                    name: '',
                    email: '',
                    password: '',
                },

                error: null
            }
        },

        methods: {
            submit () {
                firebase.auth().createUserWithEmailAndPassword(
                    this.form.email,
                    this.form.password
                ).then(data => {
                    data.user.updateProfile({
                        displayName: this.form.name
                    }).then(() => {
                        alert(1)
                    })
                }).catch(e => {
                    this.error = e.message
                })
            }
        }
    }
</script>
