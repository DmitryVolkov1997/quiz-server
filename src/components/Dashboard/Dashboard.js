import {useEffect, useState} from 'react'
import axios from 'axios'
import ActiveAdmin from '../ActiveAdmin/ActiveAdmin'
import {useSelector} from 'react-redux'
import XLSX from 'xlsx'
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css'
import {SiMicrosoftexcel} from 'react-icons/si'
import styled from 'styled-components';

const HeaderIcons = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  padding: 0 .3rem;

  & > .excel-icon {
    cursor: pointer;
  }

  & > .tooltip {
    border-bottom: 2px dotted #0055FX;
    cursor: pointer;
  }

  & > .tooltip:after {
    background: rgba(0, 0, 0, 0.8);
    border-radius: 10px 10px 10px 5px;
    box-shadow: 2px 2px 11px rgba(0, 0, 0, 0.6);
    color: #FFF;
    content: attr(data-tooltip); /* Основной код, который определяет, что будет во всплывающей подсказке*/
    margin-top: -31px;
    opacity: 0; /* Добавляем прозрачности элементу... */
    padding: 5px 9px;
    position: absolute;
    visibility: hidden; /* ...скрываем элемент */
    transition: all 0.5s ease-in-out; /* Добавляем немного анимации */
  }

  & > .tooltip:hover:after {
    opacity: 1; /* Показываем элемент */
    visibility: visible;
  }
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: var(--fw-medium);
	text-align: center;
`

const gridStyle = {
	minHeight: 550, maxWidth: '90vw', marginTop: 10, overflow: 'auto', boxShadow:
		'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
}

const Dashboard = () => {
	const {showActiveAdmin} = useSelector(state => state.quiz)
	
	//Pagination
	const [userData, setUserData] = useState([])
	
	useEffect(() => {
		try {
			const fetchData = async () => {
				const contacts = []
				const data = await axios.get(
					'https://contact-form-2d4a6-default-rtdb.firebaseio.com/contact.json'
				)
				Object.keys(data.data).forEach((key, i) => {
					contacts.unshift(data.data[key][0])
					// console.log(data.data[key][0])
				})
				setUserData(contacts)
			}
			fetchData()
		} catch (e) {
			console.log(e)
		}
	}, [])
	
	// Для изменения размера голонок нужно после header:'Имя добавить' defaultWidth: 350 и удалить defaultFlex: 2
	const columns = [
		{
			name: 'id',
			type: 'number',
			maxWidth: 40,
			header: 'ID',
			defaultVisible: false,
		},
		{name: 'Имя', defaultFlex: 2, header: 'Имя'},
		{name: 'Фамилия', defaultFlex: 2, header: 'Фамилия'},
		{name: 'Отчество', defaultFlex: 3, header: 'Отчество'},
		{name: 'Дата регистрации', defaultFlex: 3, header: 'Дата регистрации'},
		{name: 'Дата рождения', defaultFlex: 3, header: 'Дата рождения'},
		{name: 'Социальный статус', defaultFlex: 3, header: 'Социальный статус'},
		{name: 'Email', defaultFlex: 3, header: 'Email'},
		{name: 'Телефон', defaultFlex: 3, header: 'Телефон'},
		{name: 'Город', defaultFlex: 3, header: 'Город'},
		{name: 'Регион', defaultFlex: 3, header: 'Регион'},
		{name: 'Награды и достижение', defaultFlex: 3, header: 'Награды и достижение'},
		{
			name: 'Предполагаемая форма оплаты за обучение в ВУЗе',
			defaultFlex: 3,
			header: 'Предполагаемая форма оплаты за обучение в ВУЗе'
		},
		{name: 'Вид учебного заведения', defaultFlex: 3, header: 'Вид учебного заведения'},
		{name: 'Учебное заведение', defaultFlex: 3, header: 'Учебное заведение'},
		{name: 'Образовательная программа', defaultFlex: 3, header: 'Образовательная программа'},
		{name: 'Форма обучения', defaultFlex: 3, header: 'Форма обучения'},
		{name: 'Кафедра-консультант', defaultFlex: 3, header: 'Кафедра-консультант'},
		{name: 'Язык обучения', defaultFlex: 3, header: 'Язык обучения'},
		{name: 'Вопрос', defaultFlex: 3, header: 'Вопрос'},
	]
	
	const newDate = userData.map(user => {
		return {
			Имя: user.Имя,
			Фамилия: user.Фамилия,
			Отчество: user.Отчество,
			'Дата регистрации': user['Дата регистрации'],
			'Дата рождения': user['Дата рождения'],
			'Социальный статус': user['Социальный статус'],
			Email: user['Email'],
			Телефон: user['Телефон'],
			Город: user['Город'],
			Регион: user['Регион'],
			'Награды и достижение': user['Награды и достижение'],
			'Предполагаемая форма оплаты за обучение в ВУЗе':
				user['Предполагаемая форма оплаты за обучение в ВУЗе'],
			'Вид учебного заведения': user['Вид учебного заведения'],
			'Учебное заведение': user['Учебное заведение'],
			'Образовательная программа': user['Образовательная программа'],
			'Форма обучения': user['Форма обучения'],
			'Кафедра-консультант': user['Кафедра-консультант'],
			'Язык обучения': user['Язык обучения'],
			Вопрос: user['Вопрос'],
		}
	})
	
	const downloadExcel = () => {
		const newData = newDate.map(row => {
			delete row.tableData
			return row
		})
		const workSheet = XLSX.utils.json_to_sheet(newData)
		const workBook = XLSX.utils.book_new()
		XLSX.utils.book_append_sheet(workBook, workSheet, 'students')
		//Buffer
		// let buf = XLSX.write(workBook, {bookType: 'xlsx', type: 'buffer'})
		//Binary string
		XLSX.write(workBook, {bookType: 'xlsx', type: 'binary'})
		//Download
		XLSX.writeFile(workBook, 'StudentsData.xlsx')
	}
	
	return (
		<div>
			{!showActiveAdmin ? (
				<ActiveAdmin/>
			) : (
				<div
					style={{
						marginTop: '10rem',
						display: 'flex',
						justifyContent: 'center',
						width: '100%'
					}}
				>
					<div style={{maxWidth: "90vw", width: '100%'}}>
						<Title>Абитуриенты</Title>
						<HeaderIcons>
							<div style={{width: "3.5rem", height: "3.5rem"}} className='tooltip'
							     data-tooltip="Экспортировать в Excel">
								<SiMicrosoftexcel size={35} className='excel-icon' onClick={() => downloadExcel()}/>
							</div>
						</HeaderIcons>
						<ReactDataGrid
							idProperty='id'
							style={gridStyle}
							columns={columns}
							pagination
							dataSource={newDate}
							defaultLimit={5}
						/>
					</div>
				
				</div>
			)}
		</div>
	)
}

export default Dashboard
