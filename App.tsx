import { ActivityIndicator, StatusBar, View } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import theme from './src/theme';
import { useFonts } from 'expo-font';

import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Routes } from './src/routes';

import { AuthContextProvider } from './src/contexts/AuthContext';

export default function App() {
	const fontsLoaded = useFonts({
		Inter_400Regular,
		Inter_700Bold,
	});

	return (
		<ThemeProvider theme={theme}>
			<StatusBar
				barStyle='light-content'
				backgroundColor='transparent'
				translucent
			/>
			<AuthContextProvider>
				{fontsLoaded ? <Routes /> : <ActivityIndicator />}
			</AuthContextProvider>
		</ThemeProvider>
	);
}
