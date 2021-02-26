import React from 'react';
import PropTypes from 'prop-types';

import {
	TouchableOpacity,
	Text,
} from 'react-native';
import { mainBGColor, mainTextColor, windowWidth } from '../constants';


ActionButton.propTypes = {
	onPress: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
};
/**
 * @param {{onPress: func, title: string}} props
 */
export function ActionButton ({onPress, title}) {
	const handlePress = () => {
		onPress();
	};

	return (
		<TouchableOpacity onPress={handlePress}
			style={{
				backgroundColor: mainBGColor,
				width: windowWidth * 0.75,
				paddingVertical: 18,
				justifyContent: 'center',
				alignItems: 'center',
				borderRadius: 10,
				elevation: 10,
			}}
		>
			<Text
				style={{
					color: mainTextColor,
					fontSize: 20,
					fontWeight: 'bold',
					textTransform: 'uppercase',
				}}
			>
				{title}
			</Text>
		</TouchableOpacity>
	)
}