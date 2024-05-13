import { useTheme } from 'styled-components/native';
import { Header } from '../../components/Header';
import {
	Buttons,
	Container,
	Form,
	FormItem,
	FormSmallSubtitle,
	FormSubtitle,
	FormTitle,
	Photo,
} from './styles';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { reverseGeocodeAsync } from 'expo-location';
import { Button } from '../../components/Button';

type RouteParams = {
	latitude: number;
	longitude: number;
	problem: string;
	description: string;
};

export function Revise() {
	const route = useRoute();
	const { latitude, longitude, problem, description } =
		route.params as RouteParams;

	const [address, setAddress] = useState<string>('');
	const [buttons, setButtons] = useState<boolean>(false);
	const [publish, setPublish] = useState<boolean>(false);

	const theme = useTheme();

	const navigation = useNavigation();

	useEffect(() => {
		getAddress();
	}, []);

	async function getAddress() {
		const address = await reverseGeocodeAsync({
			latitude,
			longitude,
		});

		const { formattedAddress } = address[0];

		setAddress(formattedAddress ?? '');
	}

	function handleConfirm() {
		setButtons(true);
		setPublish(true);

		setTimeout(() => {
			navigation.navigate('home', {
				latitude,
				longitude,
				problem,
				description,
				createdAt: new Date().toString(),
			});
		}, 2000);
	}

	function handleEdit() {
		navigation.navigate('publish', {
			latitude,
			longitude,
			problem,
			description,
		});
	}

	return (
		<Container>
			<Header
				title='Publicar'
				backgroundColor
			/>
			<Form>
				<FormItem>
					<FormTitle>Revise sua demanda</FormTitle>
					<FormSubtitle>Revise sua ocorrência antes de publicar</FormSubtitle>
				</FormItem>

				<Photo>
					<FontAwesome
						name='photo'
						size={30}
						color={theme.COLORS.GRAY_200}
					/>
				</Photo>

				<FormItem>
					<FormSubtitle>{problem}</FormSubtitle>
				</FormItem>

				<FormItem>
					<FormSmallSubtitle>{address}</FormSmallSubtitle>
				</FormItem>

				<FormItem>
					<FormSubtitle>Descrição</FormSubtitle>
					<FormSmallSubtitle>{description}</FormSmallSubtitle>
				</FormItem>
			</Form>

			<Buttons>
				<Button
					title='Editar'
					type='SECONDARY'
					onPress={handleEdit}
					disabled={buttons}
					style={{ marginBottom: 16, width: 156 }}
				/>

				<Button
					title='Confirmar e Publicar'
					type='PRIMARY'
					onPress={handleConfirm}
					disabled={buttons}
					loading={publish}
					style={{ marginBottom: 16, width: 156 }}
				/>
			</Buttons>
		</Container>
	);
}
