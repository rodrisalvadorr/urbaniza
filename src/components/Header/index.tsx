import { useNavigation } from '@react-navigation/native';
import { BackButton, Container, HeaderStyleProps, Icon, Title } from './styles';

type Props = HeaderStyleProps & {
	title?: string;
	onPress: () => void;
};

export function Header({ backgroundColor = false, title, onPress }: Props) {
	return (
		<Container backgroundColor={backgroundColor}>
			<BackButton onPress={onPress}>
				<Icon name='arrow-left' />
			</BackButton>

			<Title>{title}</Title>
		</Container>
	);
}
