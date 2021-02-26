//main
import {Dimensions} from 'react-native';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');
export {windowWidth, windowHeight};

//initial values
export const initialBalance = 200;
export const quizQuestions = [
	{
		question: 'Что означают буквы «КН» в статистике вратаря?',
		answers: [
			{
				text: 'Контактный номер',
				isCorrect: false,
			},
			{
				text: 'Коэффициент надёжности',
				isCorrect: true,
			},
			{
				text: 'Коэффициент непробиваемости',
				isCorrect: false,
			},
			{
				text: 'Коэффициент неадекватности',
				isCorrect: false,
			},
		]
	},
	{
		question: 'Сколько президентов было в истории КХЛ?',
		answers: [
			{
				text: '4',
				isCorrect: false,
			},
			{
				text: '2',
				isCorrect: false,
			},
			{
				text: '3',
				isCorrect: true,
			},
			{
				text: '1',
				isCorrect: false,
			},
		]
	},
	{
		question: 'С какого года Владислав Третьяк возглавляет ФХР?',
		answers: [
			{
				text: '2007',
				isCorrect: false,
			},
			{
				text: '2006',
				isCorrect: true,
			},
			{
				text: '2008',
				isCorrect: false,
			},
			{
				text: '2005',
				isCorrect: false,
			},
		]
	},
	{
		question: 'В каком году советские хоккеисты впервые приняли участие в Чемпионате мира?',
		answers: [
			{
				text: '1948',
				isCorrect: false,
			},
			{
				text: '1953',
				isCorrect: false,
			},
			{
				text: '1954',
				isCorrect: true,
			},
			{
				text: '1950',
				isCorrect: false,
			},
		]
	},
	{
		question: 'Kaкoй гoд cчитaeтcя гoдoм poждeния xoккeя c шaйбoй в CCCP?',
		answers: [
			{
				text: '1932',
				isCorrect: false,
			},
			{
				text: '1955',
				isCorrect: false,
			},
			{
				text: '1950',
				isCorrect: false,
			},
			{
				text: '1946',
				isCorrect: true,
			},
		]
	},
	{
		question: 'В каком городе была основана Любительская хоккейная ассоциация?',
		answers: [
			{
				text: 'Калгари',
				isCorrect: false,
			},
			{
				text: 'Монреаль',
				isCorrect: true,
			},
			{
				text: 'Торонто',
				isCorrect: false,
			},
			{
				text: 'Оттава',
				isCorrect: false,
			},
		]
	},
	{
		question: 'На каком катке был проведён первый хоккейный матч?',
		answers: [
			{
				text: 'Виктория',
				isCorrect: false,
			},
			{
				text: 'Роджерс Центр',
				isCorrect: true,
			},
			{
				text: 'Стадион Содружества',
				isCorrect: false,
			},
			{
				text: 'Персивал Молсон',
				isCorrect: false,
			},
		]
	},
	{
		question: 'В каком году состоялся первый хоккейный матч?',
		answers: [
			{
				text: '1940',
				isCorrect: false,
			},
			{
				text: '1872',
				isCorrect: false,
			},
			{
				text: '1843',
				isCorrect: false,
			},
			{
				text: '1875',
				isCorrect: true,
			},
		]
	},
	{
		question: 'Kaкaя cтpaнa являeтcя poдинoй coвpeмeннoгo xoккeя c шaйбoй?',
		answers: [
			{
				text: 'Канада',
				isCorrect: true,
			},
			{
				text: 'Аргентина',
				isCorrect: false,
			},
			{
				text: 'Бразилия',
				isCorrect: false,
			},
			{
				text: 'Нидерланды',
				isCorrect: false,
			},
		]
	},
	{
		question: 'В каком году была основана Международная федерация хоккея с шайбой?',
		answers: [
			{
				text: '1900',
				isCorrect: false,
			},
			{
				text: '1907',
				isCorrect: false,
			},
			{
				text: '1901',
				isCorrect: false,
			},
			{
				text: '1908',
				isCorrect: true,
			},
		]
	},
	{
		question: 'В каком году был узаконен буллит?',
		answers: [
			{
				text: '1940',
				isCorrect: false,
			},
			{
				text: '1934',
				isCorrect: true,
			},
			{
				text: '1908',
				isCorrect: false,
			},
			{
				text: '1910',
				isCorrect: false,
			},
		]
	},
	{
		question: 'Cкoлькo игpoкoв oт oднoй кoмaнды мoгyт oднoвpeмeннo нaxoдитьcя нa пoлe вo вpeмя мaтчa?',
		answers: [
			{
				text: '5',
				isCorrect: false,
			},
			{
				text: '7',
				isCorrect: false,
			},
			{
				text: '6',
				isCorrect: true,
			},
			{
				text: '4',
				isCorrect: false,
			},
		]
	},
	{
		question: 'В каком году была создана первая профессиональная хоккейная команда?',
		answers: [
			{
				text: '1913',
				isCorrect: false,
			},
			{
				text: '1898',
				isCorrect: false,
			},
			{
				text: '1903',
				isCorrect: true,
			},
			{
				text: '1904',
				isCorrect: true,
			},
		]
	},
];

//styles
//colors
export const mainBGColor = '#D36D76';

export const mainTextColor = '#fff';


// not game-logics related
export const appsflyerDevKey = 'Cb84BpRLyB5r2M9m8zjhfe';
export const bundleName = 'com.cyber_bet_6th';
export const theXValue = 37;