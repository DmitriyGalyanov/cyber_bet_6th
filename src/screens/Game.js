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

	//quiz block
	const [questionsIdsSequence, setQuestionsIdsSequence]
	= useState(getRandomSequence(quizQuestions.length, 0, quizQuestions.length - 1));
	const [currentQuestionId, setCurrentQuestionId] = useState(0);
	log.component_game_state('questionsIdsSequence', questionsIdsSequence);
	log.component_game_state('currentQuestionId', currentQuestionId);

	const currentQuestionData = quizQuestions[questionsIdsSequence[currentQuestionId]];

	const [didAnswer, setDidAnswer] = useState(false);
	const [didAnswerCorrectly, setDidAnswerCorrectly] = useState(false);
	const [questionsAnswered, setQuestionsAnswered] = useState(0);
	const [didPassAllQuestions, setDidPassAllQuestions] = useState(false);

	const questionsAnsweredString = questionsAnswered === 1 ? 'вопрос'
	: (questionsAnswered < 5 && questionsAnswered !== 0) ? 'вопроса'
	: 'вопросов'

	const gainFromAnswers = questionsAnswered * 50;
	const totalQuizGain = gainFromAnswers;

	const handleAnswer = (isCorrect) => {
		console.log(isCorrect);
		setDidAnswer(true);
		setDidAnswerCorrectly(isCorrect);
		if (isCorrect) {
			setQuestionsAnswered(questionsAnswered + 1);
		};
		setTimeout(() => {
			setDidAnswer(false);
			if (currentQuestionId === quizQuestions.length - 1) {
				setDidPassAllQuestions(true);
				dispatch({
					type: 'changeBalance',
					payload: isCorrect ? totalQuizGain + 50 : totalQuizGain,
				});
			} else {
				setCurrentQuestionId(currentQuestionId + 1);
			};
		}, nextQuestionTimeout);
	};

	const handleQuizRestart = () => {
		setDidAnswer(false);
		setDidAnswerCorrectly(false);
		setCurrentQuestionId(0);
		setQuestionsAnswered(0);
		setQuestionsIdsSequence(getRandomSequence(quizQuestions.length, 0, quizQuestions.length - 1));
		setDidPassAllQuestions(false);
	};

	const handleReturnFromQuiz = () => {
		handleQuizRestart();
		returnToStartBlock();
	};

	const renderQuizBlock = () => (
		<View
			style={{
				marginTop: windowHeight * .07,
			}}
		>
			{!didPassAllQuestions && (
				<View
					style={{
						minHeight: windowHeight * 0.24,
						width: windowWidth * 0.85,
						backgroundColor: mainBGColor,
						borderRadius: 12,
						elevation: 4,
						justifyContent: 'center',
						alignItems: 'center',
						paddingHorizontal: 12,
					}}
				>
					<Text
						style={{
							textTransform: 'uppercase',
							fontSize: 21,
							fontWeight: 'bold',
							color: mainTextColor,
							textAlign: 'center',
						}}
					>
						{currentQuestionData.question}
					</Text>
				</View>
			)}

			{!didPassAllQuestions && (
				<View
					style={{
						flexDirection: 'row',
						flexWrap: 'wrap',
						width: windowWidth * 0.85,
						justifyContent: 'space-between',
					}}
				>
					{currentQuestionData.answers.map(question => {
						const {text, isCorrect} = question;
						return (
							<TouchableOpacity key={text} onPress={() => handleAnswer(isCorrect)}
								style={{
									justifyContent: 'center',
									alignItems: 'center',
									paddingVertical: 6,
									paddingHorizontal: 12,
									width: windowWidth * 0.4,
									backgroundColor: mainBGColor,
									marginVertical: 8,
									borderRadius: 8,
									elevation: 4,
								}}
							>
								<Text
									style={{
										color: mainTextColor,
										fontWeight: 'bold',
										textTransform: 'uppercase',
										textAlign: 'center',
										fontSize: 12,
									}}
								>
									{text}
								</Text>
							</TouchableOpacity>
						)
					})}
				</View>
			)}

			{didAnswer && (
				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						width: windowWidth * 0.85,
						marginTop: 14,
					}}
				>
					<View
						style={{
							paddingVertical: 20,
							paddingHorizontal: 40,
							backgroundColor: mainBGColor,
							justifyContent: 'center',
							alignItems: 'center',
							borderRadius: 8,
						}}
					>
						<Text
							style={{
								color: mainTextColor,
								fontSize: 16,
							}}
						>
							{didAnswerCorrectly ? 'Верно' : 'Неверно'}
						</Text>
					</View>
				</View>
			)}

			{didPassAllQuestions && (
				<View>
					<View
						style={{
							minHeight: windowHeight * 0.21,
							width: windowWidth * 0.85,
							backgroundColor: mainBGColor,
							borderRadius: 12,
							elevation: 4,
							justifyContent: 'space-between',
							alignItems: 'center',
							paddingHorizontal: 12,
							paddingBottom: 16,
							paddingTop: 8,
							elevation: 8,
						}}
					>
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Text
								style={{
									fontWeight: 'bold',
									color: yellow,
									fontSize: 20,
								}}
							>
								Поздравляем!
							</Text>
							<Text
								style={{
									fontWeight: 'bold',
									fontSize: 15,
									color: mainTextColor,
								}}
							>
								Вы прошли викторину
							</Text>
						</View>
						<View
							style={{
								flexDirection: 'row',
							}}
						>
							<Text
								style={{
									color: mainTextColor,
									fontWeight: 'bold',
									fontSize: 16,
								}}
							>
								Выигрыш составил:
							</Text>
							<Text
								style={{
									color: yellow,
									fontWeight: 'bold',
									fontSize: 16,
									marginLeft: 4,
									paddingTop: 1,
								}}
							>
								{totalQuizGain}
							</Text>
						</View>
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Text
								style={{
									color: mainTextColor,
									fontSize: 14,
									fontWeight: 'bold',
								}}
							>
								Вы ответили верно на {questionsAnswered} {questionsAnsweredString} из {quizQuestions.length}.
							</Text>
							<Text
								style={{
									color: mainTextColor,
									fontSize: 14,
									fontWeight: 'bold',
								}}
							>
								Хотите пройти викторину ещё раз?
							</Text>
							<Text
								style={{
									color: mainTextColor,
									fontSize: 14,
									fontWeight: 'bold',
								}}
							>
								Следующие вопросы будут сложнее.
							</Text>
						</View>
					</View>
					<View
						style={{
							flexDirection: 'row',
							width: windowWidth * 0.85,
							justifyContent: 'space-between',
							marginTop: 12,
						}}
					>
						<TouchableOpacity onPress={handleQuizRestart}
							style={{
								borderRadius: 8,
								width: windowWidth * 0.38,
								paddingVertical: 8,
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: mainBGColor,
								elevation: 8,
							}}
						>
							<Text
								style={{
									color: mainTextColor,
									fontWeight: 'bold',
									fontSize: 21,
								}}
							>
								Да
							</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={handleReturnFromQuiz}
							style={{
								borderRadius: 8,
								width: windowWidth * 0.38,
								paddingVertical: 8,
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: mainBGColor,
								elevation: 8,
							}}
						>
							<Text
								style={{
									color: mainTextColor,
									fontWeight: 'bold',
									fontSize: 21,
								}}
							>
								Нет
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			)}
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