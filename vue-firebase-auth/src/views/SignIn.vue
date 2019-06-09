<template>
    <div class="container">
        <div class="columns is-centered">
            <div class="column is-half">
                <h1 class="title">Sign in</h1>

                <div class="notification is-danger" v-if="error">
                    {{ error }}
                </div>

                <form action="#" @submit.prevent="submit">
                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control">
                            <input
                                class="input"
                                type="text"
                                placeholder="e.g. test@test.com"
                                v-model.trim="$v.form.email.$model"
                                :class="{
                                    'is-danger': $v.form.email.$error
                                }"
                            >

                            <template v-if="$v.form.email.$error">
                                <p class="help is-danger" v-if="!$v.form.email.required">
                                    Email is required
                                </p>

                                <p class="help is-danger" v-if="!$v.form.email.email">
                                    Email must be valid
                                </p>
                            </template>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Password</label>
                        <div class="control">
                            <input
                                class="input"
                                type="password"
                                v-model.trim="$v.form.password.$model"
                                :class="{
                                    'is-danger': $v.form.password.$error
                                }"
                            >

                            <template v-if="$v.form.password.$error">
                                <p class="help is-danger" v-if="!$v.form.password.required">
                                    Password is required
                                </p>
                            </template>
                        </div>
                    </div>

                    <div class="control">
                        <button class="button is-primary">Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase'
    import { required, email } from 'vuelidate/lib/validators'

    export default {
        data () {
            return {
                form: {
                    email: '',
                    password: '',
                },

                error: null
            }
        },

        validations: {
            form: {
                email: {
                    required,
                    email
                },
                password: {
                    required
                }
            }
        },

        methods: {
            submit () {
                this.$v.$touch()

                if (this.$v.$invalid) {
                    return
                }

                firebase.auth().signInWithEmailAndPassword(
                    this.form.email,
                    this.form.password
                ).then(() => {
                    this.$router.replace(this.$route.query.redirect || {
                        name: 'home'
                    })
                }).catch(e => {
                    this.error = e.message
                })
            }
        }
    }
</script>
