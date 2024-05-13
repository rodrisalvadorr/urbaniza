import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { Publish } from '../screens/Publish';
import { Revise } from '../screens/Revise';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
	return (
		<Navigator screenOptions={{ headerShown: false }}>
			<Screen
				name='home'
				component={Home}
			/>

			<Screen
				name='publish'
				component={Publish}
			/>

			<Screen
				name='revisePublish'
				component={Revise}
			/>
		</Navigator>
	);
}
