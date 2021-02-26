import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import {View, Text, StyleSheet, Animated} from 'react-native';
import { windowWidth } from '../constants';
import { animateValue } from '../helpers';


const progressBarColor = '#F53939';
const alertTextColor = '#E10481';
const initialProgress = 0;
const maxProgress = 90;
const animDuration = 3000;

CenteredLoadingBar.propTypes = {
	alertText: PropTypes.string.isRequired
};
export function CenteredLoadingBar({alertText}) {
	const progressBarWidth = useRef(new Animated.Value(initialProgress));

	const animProgressBar = () => {
		animateValue(
			progressBarWidth,
			maxProgress,
			animDuration,
		);
	};

	useEffect(() => {
		animProgressBar();
	}, []);

	return (
		<View style={styles.wrap}>
			<Text style={styles.text}>
				{alertText}
			</Text>
			<View
				style={{
					backgroundColor: 'white',
					width: windowWidth * 0.7,
					height: 20,
					borderRadius: 8,
					borderWidth: 1,
					borderColor: 'black',
					overflow: 'hidden',
				}}
			>
				<Animated.View
					style={{
						height: '100%',
						width: progressBarWidth.current.interpolate({
							inputRange: [0, 100],
							outputRange: ['0%', '100%'],
						}),
						backgroundColor: progressBarColor,
					}}
				/>
			</View>
		</View>
	)
};

const styles = StyleSheet.create({
	wrap: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 12,
	},
	text: {
		color: alertTextColor,
		fontSize: 16,
		marginBottom: 12,
	},
});