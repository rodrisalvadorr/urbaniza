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
import { Alert } from 'react-native';
import { api } from '../../services/api';
import { problemIdToTitle } from '../../utils/ProblemList';

type RouteParams = {
	latitude: number;
	longitude: number;
	problem: number;
	description: string;
};

export function Revise() {
	const route = useRoute();
	const { latitude, longitude, problem, description } =
		route.params as RouteParams;

	const [address, setAddress] = useState<string>('');
	const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false);

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

	async function handleConfirm() {
		try {
			setButtonsDisabled(true);

			await api.post('/occurrences', {
				problemId: problem,
				latitude,
				longitude,
				comment: description,
			});

			navigation.navigate('home');
		} catch (error) {
			Alert.alert(
				'Erro no servidor',
				'Não foi possível publicar. Tente mais tarde'
			);

			setButtonsDisabled(false);
		}
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
				onPress={() => navigation.goBack()}
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
					<FormSubtitle>{problemIdToTitle(problem)}</FormSubtitle>
				</FormItem>

				<FormItem>
					<FormSmallSubtitle>{address}</FormSmallSubtitle>
				</FormItem>

				{description && (
					<FormItem>
						<FormSubtitle>Descrição</FormSubtitle>
						<FormSmallSubtitle>{description}</FormSmallSubtitle>
					</FormItem>
				)}
			</Form>

			<Buttons>
				<Button
					title='Editar'
					type='SECONDARY'
					onPress={handleEdit}
					disabled={buttonsDisabled}
					style={{ marginBottom: 16, width: 156 }}
				/>

				<Button
					title='Confirmar e Publicar'
					type='PRIMARY'
					onPress={handleConfirm}
					disabled={buttonsDisabled}
					loading={buttonsDisabled}
					style={{ marginBottom: 16, width: 156 }}
				/>
			</Buttons>
		</Container>
	);
}
