import React, { useContext } from 'react';

import {View, Text, Image} from 'react-native';

import {GameStateContext} from '../screens/Game';

import {coins} from '../../assets/images';
import { balanceIndicatorCoinsSide, yellow } from '../constants';


export function BalanceIndicator() {
	const {balance} = useContext(GameStateContext);

	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'flex-end',
			}}
		>
			<Text
				style={{
					color: yellow,
					fontSize: 22,
					fontWeight: 'bold',
				}}
			>
				{balance}
			</Text>

			<Image
				source={coins}
				width={balanceIndicatorCoinsSide}
				height={balanceIndicatorCoinsSide}
				style={{
					width: balanceIndicatorCoinsSide,
					height: balanceIndicatorCoinsSide,
					marginBottom: 7,
					marginLeft: 7,
				}}
			/>
		</View>
	)
}