import { useNavigation } from '@react-navigation/native';
import { BackButton, Container, HeaderStyleProps, Icon, Title } from './styles';

type Props = HeaderStyleProps & {
	title?: string;
};

export function Header({ backgroundColor = false, title }: Props) {
	const navigation = useNavigation();

	function handleGoBack() {
		navigation.navigate('home');
	}

	return (
		<Container backgroundColor={backgroundColor}>
			<BackButton onPress={handleGoBack}>
				<Icon name='arrow-left' />
			</BackButton>

			<Title>{title}</Title>
		</Container>
	);
}
