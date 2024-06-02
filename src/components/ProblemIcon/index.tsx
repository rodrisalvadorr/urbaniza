import { Image, ImageProps } from 'react-native';

import hole from '../../assets/filters/hole.png';
import lightning from '../../assets/filters/lightning.png';
import tree from '../../assets/filters/tree.png';
import waste_water from '../../assets/filters/waste_water.png';

type Props = ImageProps & {
	type: number;
};

export function ProblemIcon({ type, style }: Props) {
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
		<Image
			style={style}
			source={image}
		/>
	);
}
