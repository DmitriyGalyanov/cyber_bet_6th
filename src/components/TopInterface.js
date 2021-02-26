import React, { useContext } from 'react';

import {View, Image, Text, ImageBackground} from 'react-native';

import {GameStateContext} from '../screens/Game';

import {
	topInterfaceHeight,
	windowWidth,
	mainBGColor,
	heartWrapSide,
	heartSide,
	mainTextColor,
} from '../constants';
import {heart} from '../../assets/images';
import { BalanceIndicator } from './BalanceIndicator';


export function TopInterface() {
	const {livesCount} = useContext(GameStateContext);

	return (
		<View
			style={{
				height: topInterfaceHeight,
				width: windowWidth,
				// position: 'absolute',
			}}
		>
			<View
				style={{
					height: topInterfaceHeight * 0.35,
					width: '100%',
					backgroundColor: mainBGColor,
					position: 'absolute',
				}}
			/>
			<View>
				<View
					style={{
						width: heartWrapSide,
						height: heartWrapSide,
						borderColor: mainBGColor,
						borderWidth: 3,
						borderRadius: heartWrapSide * 0.5,
						justifyContent: 'center',
						alignItems: 'center',
						paddingTop: 4,
						backgroundColor: '#fff',
						position: 'absolute',
						top: topInterfaceHeight * 0.2,
						left: 50,
					}}
				>
					<ImageBackground
						source={heart}
						width={heartSide}
						height={heartSide}
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							width: heartSide,
							height: heartSide,
						}}
					>
						<Text
							style={{
								fontWeight: 'bold',
								color: mainTextColor,
								paddingBottom: 2,
							}}
						>
							{livesCount}
						</Text>
					</ImageBackground>
				</View>
				<View
					style={{
						backgroundColor: '#fff',
						width: 90,
						height: 90,
						borderRadius: 45,
						borderColor: mainBGColor,
						borderWidth: 3,
						alignSelf: 'center',
						marginTop: 25,
					}}
				/>
			</View>
			<View
				style={{
					alignItems: 'flex-end',
					paddingRight: 26,
				}}
			>
				<BalanceIndicator />
			</View>
		</View>
	)
}