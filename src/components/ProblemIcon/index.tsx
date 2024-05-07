import { ImageSourcePropType } from 'react-native';
import { BackgroundColorProps, Container } from './styles';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
	backgroundColor?: BackgroundColorProps;
	name: keyof typeof MaterialIcons.glyphMap;
};

export function ProblemIcon({ backgroundColor = 'BLACK', name }: Props) {
	return (
		<Container backgroundColor={backgroundColor}>
			<MaterialIcons
				name={name}
				size={20}
			/>
		</Container>
	);
}
