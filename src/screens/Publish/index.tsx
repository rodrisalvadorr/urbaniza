import {
	Container,
	Form,
	FormItem,
	FormItemTitle,
	ImageContainer,
	ImageSelectButton,
	ProblemItem,
	ProblemItemText,
	ProblemModal,
	ProblemModalItem,
	ProblemModalItemTitle,
} from './styles';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';

import { Entypo, FontAwesome } from '@expo/vector-icons';

import { useTheme } from 'styled-components/native';
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { FlatList, View } from 'react-native';
import { reverseGeocodeAsync } from 'expo-location';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

type RouteParams = {
	latitude: number;
	longitude: number;
	problem?: string;
	description?: string;
};

export function Publish() {
	const route = useRoute();
	const { latitude, longitude } = route.params as RouteParams;

	const navigation = useNavigation();

	const [address, SetAddress] = useState<string>('');
	const [problem, setProblem] = useState<string>('Selecione');
	const [problemModal, setProblemModal] = useState<boolean>(false);
	const [description, setDescription] = useState<string>('');

	const theme = useTheme();

	const problems = [
		'Entupimento de esgoto',
		'Falta de iluminação',
		'Queda de árvore',
		'Buraco na rua',
	];

	useEffect(() => {
		getAddress();
	}, []);

	async function getAddress() {
		const address = await reverseGeocodeAsync({
			latitude,
			longitude,
		});

		const { formattedAddress } = address[0];

		SetAddress(formattedAddress ?? '');
	}

	function handleRevise() {
		navigation.navigate('revisePublish', {
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
					<FormItemTitle>Confirme o Endereço</FormItemTitle>
					<Input
						value={address}
						onChangeText={SetAddress}
						multiline
						numberOfLines={2}
					/>
				</FormItem>

				<FormItem>
					<FormItemTitle>Selecione o Problema</FormItemTitle>
					<ProblemItem
						activeOpacity={0.7}
						onPress={() => setProblemModal(!problemModal)}
					>
						<ProblemItemText>{problem}</ProblemItemText>
						<Entypo
							name={problemModal ? 'chevron-up' : 'chevron-down'}
							size={20}
							color={theme.COLORS.GRAY_100}
						/>
					</ProblemItem>

					{problemModal && (
						<ProblemModal>
							<FlatList
								data={problems}
								keyExtractor={item => item}
								renderItem={({ item }) => (
									<ProblemModalItem
										activeOpacity={0.7}
										onPress={() => (setProblem(item), setProblemModal(false))}
									>
										<ProblemModalItemTitle>{item}</ProblemModalItemTitle>
									</ProblemModalItem>
								)}
							></FlatList>
						</ProblemModal>
					)}
				</FormItem>

				<FormItem>
					<FormItemTitle>Descrição</FormItemTitle>
					<Input
						multiline
						numberOfLines={5}
						placeholder='Adicione uma descrição sobre sua ocorrência'
						value={description}
						onChangeText={setDescription}
					/>
				</FormItem>

				<FormItem style={{ paddingHorizontal: 61, alignItems: 'center' }}>
					<FormItemTitle style={{ textAlign: 'center' }}>
						Adicione uma foto que demonstre bem a sua ocorrência
					</FormItemTitle>

					<ImageSelectButton activeOpacity={0.7}>
						<ImageContainer>
							<FontAwesome
								name='camera'
								size={20}
								color={theme.COLORS.GRAY_200}
							/>
						</ImageContainer>

						<ImageContainer>
							<FontAwesome
								name='file-image-o'
								size={20}
								color={theme.COLORS.GRAY_200}
							/>
						</ImageContainer>
					</ImageSelectButton>
				</FormItem>
			</Form>

			<View style={{ alignItems: 'center' }}>
				<Button
					title='Avançar'
					onPress={handleRevise}
					style={{ marginBottom: 16, width: 258, marginHorizontal: 'auto' }}
				/>
			</View>
		</Container>
	);
}
