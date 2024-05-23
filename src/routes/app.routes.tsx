import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { Publish } from '../screens/Publish';
import { Revise } from '../screens/Revise';
import { OccurrenceDetails } from '../screens/OccurrenceDetails';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
	return (
		<Navigator screenOptions={{ headerShown: false }}>
			<Screen
				name='home'
				component={Home}
			/>

			<Screen
				name='occurrenceDetails'
				component={OccurrenceDetails}
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
