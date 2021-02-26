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
export function Game() {
	
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
	)
}