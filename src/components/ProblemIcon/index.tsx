import { Image, ImageSourcePropType } from 'react-native';
import { BackgroundColorProps, Container } from './styles';
import { MaterialIcons } from '@expo/vector-icons';

import hole from '../../assets/hole.png';
import lightning from '../../assets/lightning.png';
import tree from '../../assets/tree.png';
import waste_water from '../../assets/waste-water.png';

type Props = {
	backgroundColor?: BackgroundColorProps;
	name: string;
};

export function ProblemIcon({ backgroundColor = 'BLACK', name }: Props) {
	let image: ImageSourcePropType;

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
		<Container backgroundColor={backgroundColor}>
			<Image source={image} />
		</Container>
	);
}
