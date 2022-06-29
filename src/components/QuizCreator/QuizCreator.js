import styled from 'styled-components'
import React, { Component } from 'react'
import { Button } from '../UI/Button/Button'
import { createControl, validateForm, validate } from '../../form/formFramework'
import Auxillary from '../Auxillary/Auxillary'
import { CustomSelect } from '../UI/CustomSelect/CustomSelect'
import axios from '../../axios/axios-quiz'
import Input from '../UI/Input/Input'
import ActiveAdminCreator from '../ActiveAdminCreator/ActiveAdminCreator'
import Select from 'react-select'

const SelectEl = styled(Select).attrs({
	styles: {
		control: (provided, state) => ({
			...provided,
			borderRadius: 'var(--radius)',
			border: '1px solid rgb(226,232,240)',
			height: '45px',
			fontSize: 'var(--fs-sm)',
			fontWeight: 'var(--fw-medium)',
			wordWrap: 'break-word',
		}),
		option: (provided, state) => ({
			...provided,
			cursor: 'pointer',
			wordWrap: 'break-word',
		}),
		placeholder: (provided, state) => ({
			...provided,
			wordWrap: 'break-word',
			fontSize: '1.4rem',
		}),
	},
})`
	margin: 2.5rem 0;
`

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	flex-grow: 1;
	padding-top: 10rem;
	width: 100%;
`

const Body = styled.div`
	width: 100%;
	max-width: 60rem;
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
	padding: 1.5rem;
	border-radius: var(--radius);
	box-shadow: var(--shadow);
`

const ButtonGroup = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 1.5rem;
	margin-top: 1rem;
`

function createOptionControl(number) {
	return createControl(
		{
			label: `Вариант ${number}`,
			errorMessage: 'Значение не может быть пустым',
			id: number,
		},
		{ required: true }
	)
}

function createFormControls() {
	//Обнуляет контролы
	return {
		question: createControl(
			{
				label: 'Введите вопрос',
				errorMessage: 'Вопрос не может быть пустым',
			},
			{ required: true }
		),
		option1: createOptionControl(1),
		option2: createOptionControl(2),
		option3: createOptionControl(3),
		option4: createOptionControl(4),
		option5: createOptionControl(5),
	}
}

const options = [
	{ value: 1, label: 1 },
	{ value: 2, label: 2 },
	{ value: 3, label: 3 },
	{ value: 4, label: 4 },
	{ value: 5, label: 5 },
]

export default class QuizCreator extends Component {
	state = {
		quiz: [],
		isFormValid: false,
		rightAnswerId: 1,
		formControls: createFormControls(),
		titles: '',
		InoutTitleValue: '',
		showActiveAdminCreator: true,
		activeAdminPassword: '',
		category: '',
	}

	submitHandler = e => {
		e.preventDefault()
	}

	addQuestionHandler = e => {
		e.preventDefault()

		const quiz = this.state.quiz.concat()
		const index = quiz.length + 1

		const { question, option1, option2, option3, option4, option5 } =
			this.state.formControls

		const questionItem = {
			question: question.value,
			id: index,
			rightAnswerId: this.state.rightAnswerId,
			titles: this.state.titles,
			category: this.state.category.value,
			answers: [
				{ text: option1.value, id: option1.id },
				{ text: option2.value, id: option2.id },
				{ text: option3.value, id: option3.id },
				{ text: option4.value, id: option4.id },
				{ text: option5.value, id: option5.id },
			],
		}

		quiz.push(questionItem)
		this.setState({
			quiz,
			isFormValid: false,
			formControls: createFormControls(),
			category: '',
		})
	}

	createQuizHandler = async e => {
		e.preventDefault()
		try {
			await axios.post('/quizes.json', this.state.quiz)
			this.setState({
				quiz: [],
				isFormValid: false,
				rightAnswerId: 1,
				formControls: createFormControls(),
			})
		} catch (e) {
			console.log(e)
		}
	}

	// createQuizHandler = (e) => {
	//     e.preventDefault();
	//
	//     axios.post("https://react-quize-1ad48-default-rtdb.firebaseio.com/quizes.json", this.state.quiz)
	//     .then(response => console.log(response))
	//     .catch(error => console.log(error));
	// };

	changeHandler = (value, controlName) => {
		const formControls = { ...this.state.formControls }
		const control = { ...formControls[controlName] }

		control.touched = true
		control.value = value
		control.valid = validate(control.value, control.validation)

		formControls[controlName] = control

		this.setState({
			formControls,
			isFormValid: validateForm(formControls),
		})
	}

	renderControls = () => {
		return Object.keys(this.state.formControls).map((controlName, i) => {
			const control = this.state.formControls[controlName]

			return (
				<Auxillary key={controlName + i}>
					<Input
						label={control.label}
						value={control.value}
						valid={control.valid}
						shouldValidate={!!control.validation}
						touched={control.touched}
						errorMessage={control.errorMessage}
						onChange={e => this.changeHandler(e.target.value, controlName)}
					/>

					{i === 0 ? (
						<hr
							style={{
								borderBottom: '1.5px solid #ced4da',
								marginBottom: '1rem',
							}}
						/>
					) : null}
				</Auxillary>
			)
		})
	}

	handleInputValue = e => {
		this.setState({
			titles: e.target.value,
		})
	}

	/* 	onChangeTitle = e => {
		this.setState({
			titles: this.state.inputTitleValue,
		})
	} */
	// Были проблемы при вводе заголовка warning

	onChangeActiveAdminPassword = password => {
		this.setState({
			activeAdminPassword: password,
		})
	}

	handleShowActiveAdminCreator = () => {
		if (this.state.activeAdminPassword === 'kstu2022') {
			this.setState({
				showActiveAdminCreator: false,
			})
		}
	}

	institutionType = [
		{ value: 'Бакалавриат', label: 'Бакалавриат' },
		{ value: 'Магистратура', label: 'Магистратура' },
		{ value: 'Докторантура', label: 'Докторантура' },
		{
			value: 'Колледж инновационных технологий',
			label: 'Колледж инновационных технологий',
		},
	]

	render() {
		return (
			<>
				{!this.state.showActiveAdminCreator ? (
					<ActiveAdminCreator
						onChange={this.onChangeActiveAdminPassword}
						onClickButton={this.handleShowActiveAdminCreator}
					/>
				) : (
					<Wrapper>
						<Body>
							<Title>Создать тест</Title>
							<Form onSubmit={this.submitHandler}>
								<div>
									<Input
										onChange={this.handleInputValue}
										value={this.state.titles}
										label='Название предмета'
									/>
									{/* <Button style={{width: "100%", margin: "1rem 0 2rem"}}
                                            p={".9rem 1.7rem .9rem 1.7rem"}
                                            primary>Добавить заголовок</Button> */}
									<SelectEl
										placeholder='Образовательная программа'
										classNamePrefix='addl-class'
										options={this.institutionType}
										value={this.state.category}
										onChange={e => this.setState({ category: e })}
									/>
								</div>
								{this.renderControls()}
								<CustomSelect
									options={options}
									placeholder='Выберите правильный ответ'
									onChange={e => this.setState({ rightAnswerId: +e.value })}
								/>
								<ButtonGroup>
									<Button
										disabled={!this.state.isFormValid}
										full
										primary
										type='primary'
										p={'.9rem 1.7rem .9rem 1.7rem'}
										onClick={this.addQuestionHandler}
									>
										Добавить вопрос
									</Button>
									<Button
										disabled={this.state.quiz.length === 0}
										full
										success
										type='success'
										onClick={this.createQuizHandler}
										p={'.9rem 1.7rem .9rem 1.7rem'}
									>
										Создать тест
									</Button>
								</ButtonGroup>
							</Form>
						</Body>
					</Wrapper>
				)}
			</>
		)
	}
}
