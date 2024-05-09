import { BackButton, Container, HeaderStyleProps, Icon, Title } from './styles';

type Props = HeaderStyleProps & {
	title?: string;
};

export function Header({ backgroundColor = false, title }: Props) {
	return (
		<Container backgroundColor={backgroundColor}>
			<BackButton>
				<Icon name='arrow-left' />
			</BackButton>

			<Title>{title}</Title>
		</Container>
	);
}
