import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import { Home } from './src/screens/Home';
import { ThemeProvider } from 'styled-components/native';
import theme from './src/theme';
import { useFonts } from 'expo-font';

import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';

export default function App() {
	const fontsLoaded = useFonts({
		Inter_400Regular,
		Inter_700Bold,
	});

	if (!fontsLoaded) {
		<ActivityIndicator />;
	}

	return (
		<View>
			<ThemeProvider theme={theme}>
				<StatusBar style='auto' />
				<Home />
			</ThemeProvider>
		</View>
	);
}
