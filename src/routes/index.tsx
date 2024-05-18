import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { useTheme } from 'styled-components/native';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';
import { useAuth } from '../hooks/useAuth';

export function Routes() {
	const { COLORS } = useTheme();
	const { token } = useAuth();

	return (
		<View style={{ flex: 1, backgroundColor: COLORS.PRIMARY_1 }}>
			<NavigationContainer>
				{token ? <AppRoutes /> : <AuthRoutes />}
			</NavigationContainer>
		</View>
	);
}
