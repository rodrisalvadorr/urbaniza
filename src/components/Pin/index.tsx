import { ImageSourcePropType } from 'react-native';
import { Container } from './styles';

import hole from '../../assets/hole_pin.png';
import lightning from '../../assets/light_pin.png';
import tree from '../../assets/tree_pin.png';
import waste_water from '../../assets/waste_water_pin.png';
import { LatLng } from 'react-native-maps';

type Props = {
	name: string;
	coordinate: LatLng;
};

export function Pin({ name, coordinate }: Props) {
	let image;

	if (name === 'hole') {
		image = hole;
	} else if (name === 'lightning') {
		image = lightning;
	} else if (name === 'tree') {
		image = tree;
	} else {
		image = waste_water;
	}

	return (
		<Container
			image={image}
			coordinate={coordinate}
		/>
	);
}
