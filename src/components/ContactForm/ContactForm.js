import styled from 'styled-components'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import axios from 'axios'
// import PhoneInput, {isValidPhoneNumber, isPossiblePhoneNumber} from 'react-phone-number-input';
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form'
import 'react-phone-number-input/style.css'
import { isPossiblePhoneNumber } from 'react-phone-number-input'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import logo from '../../img/logo.png'

const Main = styled.div`
	/* display: flex;
	flex-direction: column;
	align-items: center; */
	max-width: 1180px;
	margin: 0 auto;
	padding: 0 15px;
	width: 100%;

	@media (max-width: 1150px) {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`
const Wrapper = styled.div`
	display: flex;
	gap: 4rem;
	justify-content: space-between;
	padding-top: 5rem;
	width: 100%;

	@media (max-width: 1150px) {
		align-items: center;
		flex-direction: column;
		gap: 0;
	}

	@media (max-width: 991px) {
		padding-top: 10rem;
	}
`
const MainTitle = styled.h1`
	position: relative;
	font-size: var(--fs-md);
	font-weight: var(--fw-bold);
	font-style: italic;
	text-align: center;
	border-bottom: 1px solid rgb(226, 232, 240);
	padding-bottom: 2rem;

	& > p {
		font-size: var(--fs-sm);
		font-weight: var(--fw-medium);
		margin-top: 1rem;
		margin-bottom: 2rem;
	}

	& > img {
		top: 0.5rem;
		width: 150px;
		height: 150px;
		object-fit: cover;
		object-position: center;
	}

	//& > img {
	//  position: absolute;
	//  left: -10rem;
	//  width: 100px;
	//  height: 100px;
	//}

	@media (max-width: 768px) {
		display: none;
	}
`

const Body = styled.div`
	width: 100%;
	max-width: 70rem;
	box-shadow: var(--shadow);
	padding: 2.5rem 4rem;
	border-radius: var(--radius);
	margin-bottom: 2rem;

	@media (max-width: 768px) {
		padding: 2rem 1.5rem;
	}
`

const Input = styled.input`
	font-family: var(--family);
	font-size: var(--fs-sm);
	font-weight: var(--fw-medium);
	display: block;
	border: 1px solid rgb(226, 232, 240);
	border-radius: 0.25rem;
	padding: 1rem;
	width: 100%;
	transition: all 300ms ease-in-out;
	margin-top: 2.5rem;
	font-size: 1.4rem;

	&:focus {
		border-color: rgb(49, 130, 206);
		box-shadow: rgb(49 130 206) 0px 0px 0px 1px;
	}
`

const Phone = styled(PhoneInputWithCountry)`
	font-family: var(--family) !important;
	font-size: var(--fs-sm);
	font-weight: var(--fw-medium);
	display: block;
	border: 1px solid rgb(226, 232, 240);
	border-radius: 0.25rem;
	padding: 1rem;
	margin: 2.5rem 0;
	width: 100%;
	transition: all 300ms ease-in-out;
	display: flex;

	& > input {
		font-family: var(--family);
		font-size: var(--fs-sm);
		font-weight: var(--fw-medium);
		margin-left: 10px;
	}

	&:focus {
		border-color: rgb(49, 130, 206);
		box-shadow: rgb(49 130 206) 0px 0px 0px 1px;
	}
`

const Title = styled.h1`
	font-family: var(--family);
	font-weight: var(--fw-bold);
	font-size: var(--fs-md);
	color: var(--colors-text);
	margin: 0rem 0rem 2rem 0rem;
	text-align: center;
`

const Label = styled.label``
const InputSubmit = styled.input`
	background-color: rgb(43, 108, 176);
	color: #fff;
	cursor: pointer;
	padding: 1.2rem;
	border-radius: 0.6rem;
	font-family: var(--family);
	font-size: var(--fs-sm);
	font-weight: var(--fw-medium);
	width: 100%;

	margin-top: 2rem;
`

const ErrorMessage = styled.div`
	& > p {
		margin: 0.5rem 0px;
		color: rgb(197, 48, 48);
		font-weight: var(--fw-medium);
		@media (max-width: 768px) {
			font-size: 1rem;
		}
	}
`
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

const Textarea = styled.textarea`
	width: 100%;
	font-family: var(--family);
	font-size: 1.4rem;
	font-weight: var(--fw-medium);
	display: block;
	border: 1px solid rgb(226, 232, 240);
	border-radius: 0.25rem;
	padding: 1rem;
	width: 100% !important;
	transition: all 300ms ease-in-out;
	resize: vertical;
	min-height: 7.5rem;

	&:focus {
		border-color: rgb(49, 130, 206);
		box-shadow: rgb(49 130 206) 0px 0px 0px 1px;
	}
`
const InstitutionTitle = styled.h2`
	font-family: var(--family);
	font-weight: var(--fw-bold);
	font-size: 3rem;
	font-style: italic;
	color: var(--colors-text);
	margin: 0rem 0rem 3rem 0rem;
	text-align: center;
	border-bottom: 1px solid rgb(226, 232, 240);
	padding-bottom: 2rem;
`
const InstitutionWrapper = styled.div`
	max-width: 30rem;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;

	@media (max-width: 1150px) {
		max-width: 70rem;
	}
`
const ButtonGroup = styled.div`
	display: flex;
	flex-direction: column;

	@media (max-width: 1150px) {
		flex-wrap: wrap;
		flex-direction: row;
		width: 100%;
	}
`
const ButtonLink = styled(Link)`
	background-color: rgba(43, 108, 176, 1);
	color: #fff;
	cursor: pointer;
	padding: 1.6rem 1.2rem;
	border-radius: 0.6rem;
	font-family: var(--family);
	font-size: var(--fs-sm);
	font-weight: var(--fw-medium);
	transition: background-color 0.22s ease-in-out;
	width: 100%;
	text-align: center;
	font-style: italic;
	margin-bottom: 1.7rem;

	&:hover {
		background-color: #314e89;
	}
`
const InfoList = styled.ul`
	position: relative;
	width: 100%;
	font-family: var(--family);
	font-weight: var(--fw-bold);
	font-style: italic;
	padding-left: 2.8rem;

	&:before {
		content: '!';
		position: absolute;
		top: -0.5rem;
		left: 0;
		font-size: 7rem;
		font-style: normal;
		font-weight: 900;
		color: red;
	}
`
const InfoItem = styled.li`
	position: relative;
	line-height: 2.7rem;
	margin-bottom: 0.8rem;
`

const optionsRegion = [
	{ value: 'Акмолинская', label: 'Акмолинская' },
	{ value: 'Актюбинская', label: 'Актюбинская' },
	{ value: 'Алматинская', label: 'Алматинская' },
	{ value: 'Алматы', label: 'Алматы' },
	{ value: 'Астана', label: 'Астана' },
	{ value: 'Атырауская', label: 'Атырауская' },
	{
		value: 'Восточно-Казахстанская область',
		label: 'Восточно-Казахстанская область',
	},
	{ value: 'Жамбылская', label: 'Жамбылская' },
	{ value: 'ЗКО', label: 'ЗКО' },
	{ value: 'Карагандинская', label: 'Карагандинская' },
	{ value: 'Костанайская', label: 'Костанайская' },
	{ value: 'Кызылординская', label: 'Кызылординская' },
	{ value: 'Мангыстауская', label: 'Мангыстауская' },
	{ value: 'Павлодарская', label: 'Павлодарская' },
	{
		value: 'Северо-Казахстанская область',
		label: 'Северо-Казахстанская область',
	},
	{ value: 'Туркестанская', label: 'Туркестанская' },
	{ value: 'Шымкент', label: 'Шымкент' },
	{ value: 'ЮКО', label: 'ЮКО' },
]
const optionsSocialStatus = [
	{ value: 'благополучная семья', label: 'благополучная семья' },
	{ value: 'инвалид детства', label: 'инвалид детства' },
	{ value: 'инвалид 1 группы', label: 'инвалид 1 группы' },
	{ value: 'инвалид 2 группы', label: 'инвалид 2 группы' },
	{ value: 'инвалид 3 группы', label: 'инвалид 3 группы' },
	{
		value: 'дети сироты (школа интернат)',
		label: 'дети сироты (школа интернат)',
	},
	{
		value: 'дети сироты (патронатная семья)',
		label: 'дети сироты (патронатная семья)',
	},
]
const optionsAchievement = [
	{
		value: 'претендент на знак «Алтын белгі» ',
		label: 'претендент на знак «Алтын белгі» ',
	},
	{
		value:
			'победитель олимпиад и спортивных соревнований (международных, республиканских, областных)» ',
		label:
			'победитель олимпиад и спортивных соревнований (международных, республиканских, областных)» ',
	},
	{
		value: 'победитель Республиканской Интернет-олимпиады, проводимой КарТУ»',
		label: 'победитель Республиканской Интернет-олимпиады, проводимой КарТУ',
	},
]
const optionsPayment = [
	{
		value: 'за счет Республиканского выделенного гранта',
		label: 'за счет Республиканского выделенного гранта',
	},
	{
		value: 'за счет собственных средств',
		label: 'за счет собственных средств',
	},
	{ value: 'за счет работодателя', label: 'за счет работодателя' },
]
const optionsCities = [
	{ value: 'Абай', label: 'Абай' },
	{ value: 'Караганда', label: 'Караганда' },
	{ value: 'Шахтинск', label: 'Шахтинск' },
	{ value: 'Сарань', label: 'Сарань' },
	{ value: 'Темиртау', label: 'Темиртау' },
	{ value: 'Приозерск', label: 'Приозерск' },
	{ value: 'Балхаш', label: 'Балхаш' },
	{ value: 'Жезказган', label: 'Жезказган' },
	{ value: 'Сатпаев', label: 'Сатпаев' },
	{ value: 'Улытауский', label: 'Улытауский' },
	{ value: 'Актогайский', label: 'Актогайский' },
	{ value: 'Абайский', label: 'Абайский' },
	{ value: 'Бухар-Жырауский', label: 'Бухар-Жырауский' },
	{ value: 'Жанааркинский', label: 'Жанааркинский' },
	{ value: 'Каражал', label: 'Каражал' },
	{ value: 'Нуринский', label: 'Нуринский' },
	{ value: 'Каркаралинский', label: 'Каркаралинский' },
	{ value: 'Осакаровский', label: 'Осакаровский' },
	{ value: 'Шетский', label: 'Шетский' },
	{
		value: 'Акмолинская область (все районы и города)',
		label: 'Акмолинская область (все районы и города)',
	},
	{
		value: 'Актюбинская область (все районы и города)',
		label: 'Актюбинская область (все районы и города)',
	},
	{
		value: 'Алматинская (все районы и города)',
		label: 'Алматинская (все районы и города)',
	},
	{
		value: 'Восточно-Казахстанская область (все районы и города)',
		label: 'Восточно-Казахстанская область (все районы и города)',
	},
	{ value: 'Астана', label: 'Астана' },
	{ value: 'Шымкент', label: 'Шымкент' },
	{
		value: 'Жамбылская область (все районы и города)',
		label: 'Жамбылская область (все районы и города)',
	},
	{
		value: 'Западно-Казахстанская область (все районы и города)',
		label: 'Западно-Казахстанская область (все районы и города)',
	},
	{
		value: 'Костанайская область (все районы и города)',
		label: 'Костанайская область (все районы и города)',
	},
	{
		value: 'Северо-Казахстанская область (все районы и города)',
		label: 'Северо-Казахстанская область (все районы и города)',
	},
	{
		value: 'Атырауская область (все районы и города)',
		label: 'Атырауская область (все районы и города)',
	},
	{ value: 'Алматы', label: 'Алматы' },
	{
		value: 'Кызылординская область (все районы и города)',
		label: 'Кызылординская область (все районы и города)',
	},
	{
		value: 'Мангыстауская область (все районы и города)',
		label: 'Мангыстауская область (все районы и города)',
	},
	{
		value: 'Павлодарская область (все районы и города)',
		label: 'Павлодарская область (все районы и города)',
	},
	{
		value: 'Туркестанская область (все районы и города)',
		label: 'Туркестанская область (все районы и города)',
	},
]
const optionInstitutionType = [
	{ value: 'школа', label: 'школа' },
	{ value: 'колледж', label: 'колледж' },
	{
		value: 'университет (бакалавриат/магистратура)',
		label: 'университет (бакалавриат/магистратура)',
	},
	{
		value: 'предприятие корпоративного университета',
		label: 'предприятие корпоративного университета',
	},
	{ value: 'другое', label: 'другое' },
]
const optionsInstitution = [
	{
		value: 'Карагандинский технический университет',
		label: 'Карагандинский технический университет',
	},
	{ value: 'Карагандинский университет', label: 'Карагандинский университет' },
	{ value: 'Академия Болашак', label: 'Академия Болашак' },
	{
		value: 'Карагандинский экономический университет',
		label: 'Карагандинский экономический университет',
	},
	{ value: 'другое учебное заведение', label: 'другое учебное заведение' },
]
const optionsFormStudy = [
	{ value: 'дневная', label: 'дневная' },
	{ value: 'дневная сокращенная', label: 'дневная сокращенная' },
	{ value: 'магистратура', label: 'магистратура' },
	{ value: 'докторантура', label: 'докторантура' },
	{ value: 'второе высшее', label: 'второе высшее' },
	{ value: 'дистанционная сокращенная', label: 'дистанционная сокращенная' },
	{ value: 'не определился', label: 'не определился' },
	{
		value: 'очная (для поступающих в КИТ)',
		label: 'очная (для поступающих в КИТ)',
	},
	{
		value: 'заочная (для поступающих в КИТ)',
		label: 'заочная (для поступающих в КИТ)',
	},
]
const optionsEducationProgram = [
	{ value: 'Не определился', label: 'Не определился' },
	{
		value: 'В031 Мода, дизайн интерьера и промышленный дизайн',
		label: 'В031 Мода, дизайн интерьера и промышленный дизайн',
	},
	{
		value: 'В044 Менеджмент и управление',
		label: 'В044 Менеджмент и управление',
	},
	{
		value: 'В045 Аудит и налогообложение',
		label: 'В045 Аудит и налогообложение',
	},
	{
		value: 'В046 Финансы, экономика, банковское и страховое дело',
		label: 'В046 Финансы, экономика, банковское и страховое дело',
	},
	{ value: 'В047 Маркетинг и реклама', label: 'В047 Маркетинг и реклама' },
	{
		value: 'В050 Биологические и смежные науки',
		label: 'В050 Биологические и смежные науки',
	},
	{
		value: 'В057 Информационные технологии',
		label: 'В057 Информационные технологии',
	},
	{
		value: 'В058 Информационная безопасность',
		label: 'В058 Информационная безопасность',
	},
	{
		value: 'В059 Коммуникации и коммуникационные технологии',
		label: 'В059 Коммуникации и коммуникационные технологии',
	},
	{
		value: 'В060 Химическая инженерия и процессы',
		label: 'В060 Химическая инженерия и процессы',
	},
	{
		value: 'В061 Материаловедение и технологии',
		label: 'В061 Материаловедение и технологии',
	},
	{
		value: 'В062 Электротехника и энергетика',
		label: 'В062 Электротехника и энергетика',
	},
	{
		value: 'В063 Электротехника и автоматизация',
		label: 'В063 Электротехника и автоматизация',
	},
	{
		value: 'В064 Механика и металлообработкая',
		label: 'В064 Механика и металлообработка',
	},
	{
		value: 'В065 Автотранспортные средства',
		label: 'В065 Автотранспортные средства',
	},
	{ value: 'В073 Архитектура', label: 'В073 Архитектура' },
	{
		value:
			'В074 Градостроительство, строительные работы и гражданское строительство',
		label:
			'В074 Градостроительство, строительные работы и гражданское строительство',
	},
	{
		value: 'В075 Кадастр и землеустройство',
		label: 'В075 Кадастр и землеустройство',
	},
	{
		value: 'В076 Стандартизация, сертификация и метрология (по отраслям)',
		label: 'В076 Стандартизация, сертификация и метрология (по отраслям)',
	},
	{
		value: 'В094 Санитарно-профилактические мероприятия',
		label: 'В094 Санитарно-профилактические мероприятия',
	},
	{ value: 'В095 Транспортные услуги', label: 'В095 Транспортные услуги' },
]
const optionsLanguage = [
	{ value: 'қазақ', label: 'қазақ' },
	{ value: 'русский', label: 'русский' },
]
const optionsManager = [
	{ value: 'АиД', label: 'АиД' },
	{ value: 'АНК-СГД', label: 'АНК-СГД' },
	{ value: 'АНК-СГД', label: 'АНК-СГД' },
	{ value: 'АПП', label: 'АПП' },
	{ value: 'ВК', label: 'ВК' },
	{ value: 'Высшая математика', label: 'Высшая математика' },
	{ value: 'ГРМПИ', label: 'ГРМПИ' },
	{ value: 'Другой источник информации', label: 'Другой источник информации' },
	{ value: 'ИВС', label: 'ИВС' },
	{ value: 'ИК', label: 'ИК' },
	{ value: 'ИТБ', label: 'ИТБ' },
	{ value: 'ИЯ', label: 'ИЯ' },
	{
		value: 'КИТ (Колледж инновационных технологий)',
		label: 'КИТ (Колледж инновационных технологий)',
	},
	{ value: 'КЯиК', label: 'КЯиК' },
	{ value: 'МДиГ', label: 'МДиГ' },
	{ value: 'Механика', label: 'Механика' },
	{ value: 'НТМ', label: 'НТМ' },
	{ value: 'ПТ', label: 'ПТ' },
	{ value: 'РАиОТ', label: 'РАиОТ' },
	{ value: 'РМПИ', label: 'РМПИ' },
	{ value: 'РЯИК', label: 'РЯИК' },
	{ value: 'Смит', label: 'Смит' },
	{ value: 'ТОМиС', label: 'ТОМиС' },
	{ value: 'ТСС', label: 'ТСС' },
	{ value: 'ТТиЛС', label: 'ТТиЛС' },
	{ value: 'ФВ', label: 'ФВ' },
	{ value: 'Физика', label: 'Физика' },
	{ value: 'ХиХТ', label: 'ХиХТ' },
	{ value: 'ЭМП', label: 'ЭМП' },
	{ value: 'ЭС', label: 'ЭС' },
]
const default_value = 'не выбрано'
let options = {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
}

const ContactForm = () => {
	const [disabledButton, setDisabledButton] = useState(false)
	const navigate = useNavigate()
	const {
		register,
		control,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({ mode: 'onChange' })
	const onSubmit = async data => {
		data && setDisabledButton(true)
		try {
			await axios.post(
				'https://contact-form-2d4a6-default-rtdb.firebaseio.com/contact.json',
				[
					{
						Имя:
							data.firstName.slice(0, 1).toUpperCase() +
							data.firstName.slice(1).toLowerCase(),
						Фамилия:
							data.lastName.slice(0, 1).toUpperCase() +
							data.lastName.slice(1).toLowerCase(),
						Отчество:
							data.patronymic.slice(0, 1).toUpperCase() +
							data.patronymic.slice(1).toLowerCase(),
						Email: data.email.toLowerCase(),
						Регион: data.region,
						'Социальный статус': data.socialStatus,
						'Предполагаемая форма оплаты за обучение в ВУЗе': data.payment,
						'Награды и достижение': data.achievement,
						'Дата регистрации': new Date().toLocaleString('ru', options),
						Город: data.cities,
						'Вид учебного заведения': data.institutionType,
						'Учебное заведение': data.institution,
						'Форма обучения': data.formStudy,
						'Образовательная программа': data.educationProgram,
						'Язык обучения': data.language,
						'Кафедра-консультант': data.manager,
						Вопрос: data.question ? data.question : 'нет вопросов',
						'Дата рождения': data.birthday,
						Телефон: data['phone-input'],
					},
				]
			)
			navigate('/success', { replace: true })
			reset()
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<Main>
			<MainTitle>
				Әлеуетті талапкердің жеке карточкасы/ Личная карточка потенциального
				абитуриента
				<p>
					барлық деректерді жеке куәлік бойынша толтыру қажет / все данные
					заполнять по удостоверению личности*
				</p>
				<img src={logo} alt='логотип kstu' />
			</MainTitle>
			<Wrapper>
				<Body>
					<Title>Регистрация</Title>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Label>
							<Input
								placeholder='Аты (Имя)*'
								{...register('firstName', {
									required: 'Поле обязательно к заполнению',
									minLength: {
										value: 2,
										message: 'Минимум 2 символа',
									},
								})}
							/>
						</Label>
						<ErrorMessage>
							{errors?.firstName && (
								<p>{errors?.firstName?.message || 'Error!'}</p>
							)}
						</ErrorMessage>
						<Label>
							<Input
								placeholder='Тегі (Фамилия)*'
								{...register('lastName', {
									required: 'Поле обязательно к заполнению',
									minLength: {
										value: 2,
										message: 'Минимум 2 символа',
									},
								})}
							/>
						</Label>
						<ErrorMessage>
							{errors?.lastName && (
								<p>{errors?.lastName?.message || 'Error!'}</p>
							)}
						</ErrorMessage>
						<Label>
							<Input
								placeholder='Әкесінің аты (Отчество)*'
								{...register('patronymic', {
									required: 'Поле обязательно к заполнению',
									minLength: {
										value: 2,
										message: 'Минимум 2 символа',
									},
								})}
							/>
						</Label>
						<ErrorMessage>
							{errors?.patronymic && (
								<p>{errors?.patronymic?.message || 'Error!'}</p>
							)}
						</ErrorMessage>
						<Label>
							<Input
								defaultValue='1960-01-01'
								type='date'
								placeholder='Дата рождения'
								{...register('birthday')}
							/>
						</Label>
						<ErrorMessage></ErrorMessage>
						<Controller
							control={control}
							defaultValue={default_value}
							name='socialStatus'
							render={({ field: { onChange, value, name, ref } }) => (
								<SelectEl
									placeholder='Социальный статус'
									inputRef={ref}
									classNamePrefix='addl-class'
									options={optionsSocialStatus}
									value={optionsSocialStatus.find(c => c.value === value)}
									onChange={val => onChange(val.value)}
								/>
							)}
						/>
						<Label>
							<Input
								placeholder='Email*'
								{...register('email', {
									required: 'Поле обязательно к заполнению',
									pattern: {
										value: /\S+@\S+\.\S+/,
										message:
											'Введенное значение не соответствует формату электронной почты',
									},
								})}
							/>
						</Label>
						<ErrorMessage>
							{errors?.email && <p>{errors?.email?.message || 'Error!'}</p>}
						</ErrorMessage>

						{/*<Controller*/}
						{/*  name="phone-input"*/}
						{/*  control={control}*/}
						{/*  rules={{*/}
						{/*      validate: (value) => isPossiblePhoneNumber(value)*/}
						{/*  }}*/}
						{/*  render={({field: {onChange, value}}) => (*/}
						{/*    <Phone*/}
						{/*      value={value}*/}
						{/*      onChange={onChange}*/}
						{/*      defaultCountry="KZ"*/}
						{/*      id="phone-input"*/}
						{/*      placeholder="Телефон"*/}
						{/*    />*/}
						{/*  )}*/}
						{/*/>*/}
						{/*<ErrorMessage>*/}
						{/*    {errors["phone-input"] && (*/}
						{/*      <p className="error-message">Недействительный телефон</p>*/}
						{/*    )}*/}
						{/*</ErrorMessage>*/}
						<Phone
							name='phone-input'
							control={control}
							defaultCountry='KZ'
							placeholder='Телефон'
							rules={{
								required: true,
								validate: value => isPossiblePhoneNumber(value),
							}}
						/>
						<ErrorMessage>
							{errors['phone-input'] && (
								<p className='error-message'>Недействительный телефон</p>
							)}
						</ErrorMessage>

						<Controller
							control={control}
							defaultValue={default_value}
							name='region'
							render={({ field: { onChange, value, name, ref } }) => (
								<SelectEl
									placeholder='Аймақ
													(Регион)'
									inputRef={ref}
									classNamePrefix='addl-class'
									options={optionsRegion}
									value={optionsRegion.find(c => c.value === value)}
									onChange={val => onChange(val.value)}
								/>
							)}
						/>

						<Controller
							control={control}
							defaultValue={default_value}
							name='achievement'
							render={({ field: { onChange, value, name, ref } }) => (
								<SelectEl
									placeholder='Награды и достижение'
									inputRef={ref}
									classNamePrefix='addl-class'
									options={optionsAchievement}
									value={optionsAchievement.find(c => c.value === value)}
									onChange={val => onChange(val.value)}
								/>
							)}
						/>

						<Controller
							control={control}
							defaultValue={default_value}
							name='payment'
							render={({ field: { onChange, value, name, ref } }) => (
								<SelectEl
									placeholder='Предполагаемая форма оплаты за обучение в ВУЗе'
									inputRef={ref}
									classNamePrefix='addl-class'
									options={optionsPayment}
									value={optionsPayment.find(c => c.value === value)}
									onChange={val => onChange(val.value)}
								/>
							)}
						/>

						<Controller
							control={control}
							defaultValue={default_value}
							name='cities'
							render={({ field: { onChange, value, name, ref } }) => (
								<SelectEl
									placeholder='Қала/кент/ауыл (Город/поселок/село)
                '
									inputRef={ref}
									classNamePrefix='addl-class'
									options={optionsCities}
									value={optionsCities.find(c => c.value === value)}
									onChange={val => onChange(val.value)}
								/>
							)}
						/>

						<Controller
							control={control}
							defaultValue={default_value}
							name='institutionType'
							render={({ field: { onChange, value, name, ref } }) => (
								<SelectEl
									placeholder='Вид учебного заведения'
									inputRef={ref}
									classNamePrefix='addl-class'
									options={optionInstitutionType}
									value={optionInstitutionType.find(c => c.value === value)}
									onChange={val => onChange(val.value)}
								/>
							)}
						/>

						<Controller
							control={control}
							defaultValue={default_value}
							name='institution'
							render={({ field: { onChange, value, name, ref } }) => (
								<SelectEl
									placeholder='Оқу орны (Учебное заведение)'
									inputRef={ref}
									classNamePrefix='addl-class'
									options={optionsInstitution}
									value={optionsInstitution.find(c => c.value === value)}
									onChange={val => onChange(val.value)}
								/>
							)}
						/>

						<Controller
							control={control}
							defaultValue={default_value}
							name='formStudy'
							render={({ field: { onChange, value, name, ref } }) => (
								<SelectEl
									placeholder='Оқу түрі (Форма обучения)'
									inputRef={ref}
									classNamePrefix='addl-class'
									options={optionsFormStudy}
									value={optionsFormStudy.find(c => c.value === value)}
									onChange={val => onChange(val.value)}
								/>
							)}
						/>

						<Controller
							control={control}
							defaultValue={default_value}
							name='educationProgram'
							render={({ field: { onChange, value, name, ref } }) => (
								<SelectEl
									placeholder='Предполагаемая образовательная программа'
									inputRef={ref}
									classNamePrefix='addl-class'
									options={optionsEducationProgram}
									value={optionsEducationProgram.find(c => c.value === value)}
									onChange={val => onChange(val.value)}
								/>
							)}
						/>

						<Controller
							control={control}
							defaultValue={default_value}
							name='language'
							render={({ field: { onChange, value, name, ref } }) => (
								<SelectEl
									placeholder='Оқу тілі (Язык обучения)'
									inputRef={ref}
									classNamePrefix='addl-class'
									options={optionsLanguage}
									value={optionsLanguage.find(c => c.value === value)}
									onChange={val => onChange(val.value)}
								/>
							)}
						/>

						<Controller
							control={control}
							defaultValue={default_value}
							name='manager'
							render={({ field: { onChange, value, name, ref } }) => (
								<SelectEl
									placeholder='Кафедра-консультант - от кого получена информация о ВУЗе)'
									inputRef={ref}
									classNamePrefix='addl-class'
									options={optionsManager}
									value={optionsManager.find(c => c.value === value)}
									onChange={val => onChange(val.value)}
								/>
							)}
						/>
						<Textarea
							placeholder='Сіздің сұрақ/жауап (Ваш вопрос/ответ)'
							{...register('question')}
						/>
						<InputSubmit disabled={disabledButton} type='submit' />
					</form>
				</Body>
				<InstitutionWrapper>
					<InstitutionTitle>Образовательные программы</InstitutionTitle>
					<ButtonGroup>
						<ButtonLink to='/quiz-list/bakalavriat'>Бакалавриат</ButtonLink>
						<ButtonLink to='/quiz-list/magistratura'>Магистратура</ButtonLink>
						<ButtonLink to='/quiz-list/doktorantura'>Докторантура</ButtonLink>
						<ButtonLink to='/quiz-list/bakalavriat'>
							Колледж инновационных технологий
						</ButtonLink>
					</ButtonGroup>
				</InstitutionWrapper>
			</Wrapper>
			<InfoList>
				<InfoItem>
					После регистрации, в Личном кабинете вам будут доступны тесты
					Образовательных программ, тесты по предметам ЕНТ
				</InfoItem>
				<InfoItem>
					1. Бакалавриат: тесты по Образовательным программам, тесты по
					предметам ЕНТ
				</InfoItem>
				<InfoItem>
					2. Магистратура: тесты по иностранному языку, тесты на готовность к
					обучению, тесты по спец.дисциплинам
				</InfoItem>
				<InfoItem>
					3. Докторантура: тесты на готовность к обучению, тесты по
					спец.дисциплинам
				</InfoItem>
				<InfoItem>
					4. Колледж инновационных технологий: тесты по математике, тесты по
					физике, тесты по Истории Казахстана
				</InfoItem>
			</InfoList>
		</Main>
	)
}

export default ContactForm
