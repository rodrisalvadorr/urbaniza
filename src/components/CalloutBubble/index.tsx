import { Address, ButtonText, ButtonView, Container } from './styles';

type Props = {
	address: string;
};

export function CalloutBubble({ address }: Props) {
	return (
		<Container>
			<Address>{address}</Address>

			<ButtonView>
				<ButtonText>Publicar</ButtonText>
			</ButtonView>
		</Container>
	);
}
