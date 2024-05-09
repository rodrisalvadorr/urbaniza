import { ActivityIndicator, StatusBar, View } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import theme from './src/theme';
import { useFonts } from 'expo-font';

import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Routes } from './src/routes';

export default function App() {
	const fontsLoaded = useFonts({
		Inter_400Regular,
		Inter_700Bold,
	});

	if (!fontsLoaded) {
		<ActivityIndicator />;
	}

	return (
		<ThemeProvider theme={theme}>
			<StatusBar
				barStyle='light-content'
				backgroundColor='transparent'
				translucent
			/>
			<Routes />
		</ThemeProvider>
	);
}
