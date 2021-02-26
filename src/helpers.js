/**
 * @param {number} min
 * @param {number} max
 * @returns random Int lesser or equal to MAX and greater or equal to MIN
 */
export const getRandomIntInclusive = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};


import {Animated} from 'react-native';

/**
 * 
 * @param {React.MutableRefObject<Animated.Value>} animatableValue
 * @param {number} toValue
 * @param {number} animDuration in milliseconds
 */
export const animateValue = (animatableValue, toValue, animDuration) => {
	Animated.timing(animatableValue.current, {
		toValue: toValue,
		duration: animDuration,
		useNativeDriver: false,
	}).start();
};

/**
 * @returns {number[]} sequence of unique random numbers
 * @param {number} length amount of numbers in sequence
 * @param {number} from minimal number
 * @param {number} to max number
 */
export const getRandomSequence = (length, from, to) => {
	var sequence = [];
	while(sequence.length < length) {
		const randomNumber = getRandomIntInclusive(from, to);
		if(sequence.indexOf(randomNumber) === -1) sequence.push(randomNumber);
	};
	return sequence;
};