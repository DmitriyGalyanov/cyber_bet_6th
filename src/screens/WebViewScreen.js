import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import {Alert, Text, View} from 'react-native';

import {WebView} from 'react-native-webview';

import {log} from '../logger';


/**
 * Creates a Full-Screen-sized WebView using passed url
 * @param {{url: string}} props
 */
export const WebViewScreen = React.memo(props => {
	const {url} = props;
	log.webViewScreen('\nWebViewScreen URL:', url, '\n');

	return (
		<View style={{flex: 1}}>
			<WebView
				source={{
					uri: url
				}}
				onLoadStart={() => console.log('WebView load started')}
				onLoadEnd={() => console.log('WebView load ended')}
			/>
		</View>
	)
})
// WebViewScreen.propTypes = {
// 	url: PropTypes.string.isRequired,
// };