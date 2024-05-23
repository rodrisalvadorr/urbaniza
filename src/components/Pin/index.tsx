import { Container } from './styles';

import hole from '../../assets/pins/hole_pin.png';
import lightning from '../../assets/pins/light_pin.png';
import tree from '../../assets/pins/tree_pin.png';
import waste_water from '../../assets/pins/waste_water_pin.png';
import { LatLng } from 'react-native-maps';

type Props = {
	type: number;
	coordinate: LatLng;
	onPress: () => void;
};

export function Pin({ type, coordinate, onPress }: Props) {
	let image;

	switch (type) {
		case 1:
			image = hole;
			break;

		case 2:
			image = lightning;
			break;

		case 3:
			image = tree;
			break;

		case 4:
			image = waste_water;
			break;
	}

	return (
		<Container
			image={image}
			coordinate={coordinate}
			onPress={onPress}
		/>
	);
}
