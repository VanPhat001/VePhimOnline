<template>
    <div class="register-view">
        <Form :validation-schema="schema">
            <form class="m-5" @submit.prevent="registerAccount">
                <h3>Đăng ký</h3>

                <div class="row mt-3">
                    <div class="col">
                        <label for="fullname">Họ tên</label>
                        <Field name="fullname" type="text" v-model="fullname" />
                        <ErrorMessage name="fullname" class="data-error" />
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col">
                        <label for="city">Thành phố</label>
                        <Field name="city" type="text" v-model="city" />
                        <ErrorMessage name="city" class="data-error" />
                    </div>

                    <div class="col">
                        <label for="dateOfBirth">Ngày sinh</label>
                        <Field name="dateOfBirth" type="date" v-model="dateOfBirth" />
                        <ErrorMessage name="dateOfBirth" class="data-error" />
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col">
                        <label for="phoneNumber">Số điện thoại</label>
                        <Field name="phoneNumber" type="text" v-model="phoneNumber" />
                        <ErrorMessage name="phoneNumber" class="data-error" />
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col">
                        <label for="username">Tài khoản:</label>
                        <Field name="username" type="text" v-model="username" />
                        <ErrorMessage name="username" class="data-error" />
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col">
                        <label for="password">Mật khẩu:</label>
                        <Field name="password" type="password" v-model="password" />
                        <ErrorMessage name="password" class="data-error" />
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col">
                        <label for="password2">Nhập lại mật khẩu:</label>
                        <Field name="password2" type="password" v-model="password2" />
                        <ErrorMessage name="password2" class="data-error" />
                    </div>
                </div>



                <div class="row mt-5">
                    <div class="col">
                        <button class="btn py-2 px-4 btn-primary" type="submit">Đăng ký</button>
                        <button class="btn py-2 px-4 btn-secondary ml-1" type="reset">Reset</button>
                    </div>
                </div>
            </form>
        </Form>
    </div>
</template>


<script>
import * as yup from 'yup'
import { ErrorMessage, Field, Form } from 'vee-validate'
import serviceProvider from '../services'
export default {
    components: {
        ErrorMessage, Field, Form
    },

    data() {
        const schema = yup.object().shape({
            fullname: yup
                .string()
                .required("Không được bỏ trống.")
                .min(4, "Phải có ít nhất 4 kí tự.")
                .max(50, "Tối đa chỉ được 50 kí tự."),
            city: yup
                .string()
                .required("Không được bỏ trống.")
                .max(20, "Tối đa chỉ được 20 kí tự."),
            dateOfBirth: yup
                .string()
                .required("Không được bỏ trống."),
            phoneNumber: yup
                .string()
                .required("Không được bỏ trống.")
                .max(12, "Tối đa chỉ được 12 kí tự."),
            username: yup
                .string()
                .required("Không được bỏ trống.")
                .min(8, "Phải có ít nhất 8 kí tự.")
                .max(20, "Tối đa chỉ được 20 kí tự."),
            password: yup
                .string()
                .required("Không được bỏ trống.")
                .min(8, "Phải có ít nhất 8 kí tự.")
                .max(16, "Tối đa chỉ được 16 kí tự."),
            password2: yup
                .string()
                .required("Không được bỏ trống.")
                .min(8, "Phải có ít nhất 8 kí tự.")
                .max(16, "Tối đa chỉ được 16 kí tự."),
        })
        return {
            schema,
            fullname: 'test hoten',
            username: 'new user',
            password: 'new user',
            password2: 'new user',
            city: 'cantho',
            dateOfBirth: '2020-02-02',
            phoneNumber: '0939111333',
        }
    },

    methods: {
        registerAccount() {
            if (this.password != this.password2) {
                this.password2 = ''
                alert('Mật khẩu không giống nhau!');
                document.querySelector('input[name=password2]').focus()
                return
            }

            serviceProvider.createAccount({
                name: this.fullname,
                city: this.city,
                dateOfBirth: this.dateOfBirth,
                username: this.username,
                password: this.password,
                phoneNumber: this.phoneNumber,
            })
                .then(response => {
                    const account = response[0]
                    this.$store.dispatch('loginAccount', account)
                    this.$router.push({ name: 'home'})
                    console.log('ok', response);

                })
                .catch(err => {
                    console.log(err) 
                    alert('Username đã tồn tại!')
                })
        }
    }
}
</script>


<style lang="scss" scoped>
label {
    display: block;
}

input {
    width: 100%;
}

.data-error {
    display: block;
    color: red;
}
</style>