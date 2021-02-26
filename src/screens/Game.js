import React, {useEffect, useReducer, useState} from 'react';

import { ImageBackground, View, Text, TextInput, TouchableOpacity, BackHandler, } from 'react-native';
import {
	TopInterface,
	ActionButton,
} from '../components';

import {
	grayedText,
	green,
	initialBalance,
	initialBet,
	mainBGColor,
	mainTextColor,
	quizQuestions,
	windowHeight,
	windowWidth,
	yellow,
	nextQuestionTimeout,
} from '../constants';
import {background} from '../../assets/images';
import {getRandomIntInclusive, getRandomSequence} from '../helpers';

import {log} from '../logger';


const initialGameState = {
	balance: initialBalance,
	betInfo: {
		value: initialBet,
		isMade: false,
	},
	
	livesCount: 3,

	mode: '',

	selectedQuizData: {
		name: '',
		0: {
			question: '',
			answers: [
				{
					text: '',
					isCorrect: false,
				},
			],
		},
	},
};

function gameReducer(state, action) {
	switch(action.type) {
		case 'changeBalance':
			return {...state, balance: state.balance + +action.payload};
		case 'setMode':
			return {...state, mode: action.payload};
		case 'setBetInfo':
			return {...state, betInfo: action.payload};
		case 'setLivesCount':
			return {...state, livesCount: action.payload};
		case 'setSelectedQuizData':
			return {...state, selectedQuizData: action.payload};
		default:
			log.warn(`Game reducer recieved an Action with invalid Type (${action.type}). No state changes happened`);
			return {...state};
	};
};

export const GameStateContext = React.createContext(null);
export const GameStateDispatch = React.createContext(null);
export function Game() {
	const [state, dispatch] = useReducer(gameReducer, initialGameState);
	
	//balance restoring
	useEffect(() => {
		if (state.balance === 0) {
			dispatch({
				type: 'changeBalance',
				payload: 500,
			});
		};
	}, [state.balance]);
	const returnToStartBlock = () => {
		// additions required?
		dispatch({
			type: 'setMode',
			payload: '',
		});
	};

	//back button handling
	const backHandleFunc = () => {
		if (!state.mode) return false;
		if (state.mode === 'quiz') {
			return true;
		};
		if (state.mode === 'betQuestion' && !state.betInfo.isMade) {
			returnToStartBlock();
			return true;
		};
		if (state.mode === 'betQuestion' && state.betInfo.isMade) {
			return true;
		};
	};

	useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backHandleFunc,
		);

		return () => {backHandler.remove()};
	}, [backHandleFunc]);
	//kinda routing
	const callQuiz = () => {
		log.info('quiz called');
		setQuestionsIdsSequence(
			getRandomSequence(quizQuestions.length, 0, quizQuestions.length - 1));
		dispatch({
			type: 'setMode',
			payload: 'quiz',
		});
	};

	const callBetQuestion = () => {
		log.info('bet question called');
		dispatch({
			type: 'setMode',
			payload: 'betQuestion',
		});
	};
	//start block
	const renderStartBlock = () => (
		<View
			style={{
				marginTop: windowHeight * .1,
			}}
		>
			<ActionButton
				onPress={callQuiz}
				title='викторина'
			/>
			<View
				style={{
					marginTop: 40,
					marginBottom: 6,
				}}
			>
				<ActionButton
					onPress={callBetQuestion}
					title='вопрос со ставкой'
				/>
			</View>
			<View
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					width: windowWidth * 0.7,
					alignSelf: 'center',
				}}
			>
				<Text
					style={{
						color: '#000',
						fontWeight: 'bold',
						fontSize: 16,
					}}
				>
					ПОДСКАЗКА:
				</Text>
				<Text
					style={{
						textAlign: 'center',
						color: grayedText,
						fontSize: 13,
						fontWeight: 'bold',
						lineHeight: 17,
					}}
				>
					Проверьте свои знания, поставив монеты. Если Вы ответите правильно, ваш выигрыш увеличится вдвое.
				</Text>
				<Text
					style={{
						textAlign: 'center',
						color: grayedText,
						fontSize: 13,
						fontWeight: 'bold',
						lineHeight: 17,
					}}
				>
					Подсказки 50/50 не будет!
				</Text>
			</View>
		</View>
	);
	return (
		<View
			style={{ //style is present solely for start test purposes
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Text>
				Game Screen
			</Text>
		</View>
	//render block
	return (
		<GameStateContext.Provider value={state}>
			<GameStateDispatch.Provider value={dispatch}>
			</GameStateDispatch.Provider>
		</GameStateContext.Provider>
	)
}