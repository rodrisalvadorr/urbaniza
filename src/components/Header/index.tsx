import { Container, HeaderStyleProps, Title } from './styles';
import { Feather } from '@expo/vector-icons';

export function Header({ backgroundColor, title }: HeaderStyleProps) {
	return (
		<Container>
			<Feather
				name='arrow-left'
				size={16}
			/>
			<Title>{title}</Title>
		</Container>
	);
}
