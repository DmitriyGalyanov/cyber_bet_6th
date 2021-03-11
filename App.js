import React from 'react';

import AppInside from './AppInside';

//redux
import {store} from './src/redux/store';
import {Provider} from 'react-redux';

//redux-persist
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './src/redux/store';

import { CenteredLoadingBar } from './src/components';


const App = () => {

	return (
		<Provider store={store}>
			<PersistGate
				loading={<CenteredLoadingBar alertText='appstateisloading'/>}
				persistor={persistor}
			>
				<AppInside />
			</PersistGate>
		</Provider>
	);
};

export default App;