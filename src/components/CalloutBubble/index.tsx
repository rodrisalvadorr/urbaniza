import { Address, ButtonText, ButtonView, City, Container } from './styles';

type Props = {
	address: string;
	city: string;
};

export function CalloutBubble({ address, city }: Props) {
	return (
		<Container>
			<Address>{address}</Address>

			<City>{city}</City>

			<ButtonView>
				<ButtonText>Publicar</ButtonText>
			</ButtonView>
		</Container>
	);
}
