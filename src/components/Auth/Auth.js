import styled from 'styled-components'
import { Button } from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import React, { Component } from 'react'
import axios from 'axios'
import SuccessLogin from '../SuccessLogin/SuccessLogin'
import Backdrop from '../Navigation/Backdrop/Backdrop'
import SuccessRegister from '../SuccessRegister/SuccessRegister'

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	padding-top: 15rem;
	flex-grow: 1;
	width: 100%;
`

const Body = styled.div`
	width: 100%;
	max-width: 60rem;
	padding: 0 2rem;
`

const Title = styled.h1`
	font-family: var(--family);
	font-weight: var(--fw-bold);
	font-size: var(--fs-md);
	color: var(--colors-text);
	margin: 0rem 0rem 2rem 0rem;
	text-align: center;
`

const Form = styled.form`
	display: flex;
	flex-direction: column;
	justify-self: center;
	box-shadow: var(--shadow);
	padding: 1.5rem;
	border-radius: var(--radius);
`

const ButtonGroup = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	margin-top: 0.7rem;
`

const validateEmail = email => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		)
}

export default class Auth extends Component {
	state = {
		formControls: {
			email: {
				value: '',
				type: 'email',
				label: 'Email',
				errorMessage: 'Введите корректный email',
				valid: false,
				touched: false,
				validation: {
					required: true,
					email: true,
				},
			},
			password: {
				value: '',
				type: 'password',
				label: 'Пароль',
				errorMessage: 'Введите корректный пароль',
				valid: false,
				touched: false,
				validation: {
					required: true,
					minLength: 6,
				},
			},
		},
		isFormValid: false,
		showModalLogin: false,
		showModalRegister: false,
	}

	loginHandler = async () => {
		const authData = {
			email: this.state.formControls.email.value,
			password: this.state.formControls.password.value,
			returnSecureToken: true,
		}

		try {
			const response = await axios.post(
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBa8TJmeQxixeSzerM4cRB1ZCvPLexzicE',
				authData
			)
			if (response.data.registered) {
				this.setState({
					showModalLogin: true,
				})
			}
		} catch (e) {
			if (e.response.status === 400) {
				this.setState({
					showModalLogin: false,
				})
			}
		}
	}

	registerHandler = async () => {
		const authData = {
			email: this.state.formControls.email.value,
			password: this.state.formControls.password.value,
			returnSecureToken: true,
		}

		try {
			const response = await axios.post(
				'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBa8TJmeQxixeSzerM4cRB1ZCvPLexzicE',
				authData
			)
			console.log(response.data)
			if (response.data.kind === 'identitytoolkit#SignupNewUserResponse') {
				this.setState({
					showModalRegister: true,
				})
			}
		} catch (e) {
			console.log(e)
			if (e.response.status === 400) {
				this.setState({
					showModalRegister: false,
				})
			}
		}
	}

	submitHandler = e => {
		e.preventDefault()
	}

	validateControl = (value, validation) => {
		if (!validation) {
			return true
		}

		let isValid = true
		if (validation.required) {
			isValid = value.trim() !== '' && isValid
		}
		if (validation.email) {
			isValid = validateEmail(value) && isValid
		}
		if (validation.minLength) {
			isValid = value.length >= validation.minLength && isValid
		}

		return isValid
	}

	onChangeHandler(e, controlName) {
		const formControls = { ...this.state.formControls }
		const control = { ...formControls[controlName] }

		control.value = e.target.value
		control.touched = true
		control.valid = this.validateControl(control.value, control.validation)
		formControls[controlName] = control

		let isFormValid = true

		Object.keys(formControls).forEach(name => {
			isFormValid = formControls[name].valid && isFormValid
		})

		this.setState({ formControls, isFormValid })
	}

	renderInputs = () => {
		return Object.keys(this.state.formControls).map((controlName, i) => {
			const control = this.state.formControls[controlName]
			return (
				<Input
					key={controlName + i}
					type={control.type}
					value={control.value}
					valid={control.valid}
					touched={control.touched}
					label={control.label}
					errorMessage={control.errorMessage}
					shouldValidate={!!control.validation}
					onChange={e => this.onChangeHandler(e, controlName)}
				/>
			)
		})
	}

	render() {
		return (
			<Wrapper>
				<Body>
					<Title>Авторизация</Title>
					{this.state.showModalRegister ? <SuccessRegister /> : null}
					{this.state.showModal ? <SuccessLogin /> : null}
					<Form onSubmit={this.submitHandler}>
						{this.renderInputs()}
						<ButtonGroup>
							<Button
								disabled={!this.state.isFormValid}
								full
								success
								p={'.9rem 1.7rem .9rem 1.7rem'}
								onClick={this.loginHandler}
							>
								Войти
							</Button>
							<Button
								disabled={!this.state.isFormValid}
								full
								primary
								p={'.9rem 1.7rem .9rem 1.7rem'}
								onClick={this.registerHandler}
							>
								Зарегистрироваться
							</Button>
						</ButtonGroup>
					</Form>
				</Body>
			</Wrapper>
		)
	}
}
