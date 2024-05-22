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
	ProblemModalItemImage,
	ProblemModalItemTitle,
	ProblemModalView,
} from './styles';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';

import { Entypo, FontAwesome } from '@expo/vector-icons';

import { useTheme } from 'styled-components/native';
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import { reverseGeocodeAsync } from 'expo-location';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

import hole from '../../assets/filters/hole.png';
import tree from '../../assets/filters/tree.png';
import lightning from '../../assets/filters/lightning.png';
import waste_water from '../../assets/filters/waste_water.png';

type RouteParams = {
	latitude: number;
	longitude: number;
	problem?: string;
	description?: string;
};

type Problem = {
	id: number;
	title: string;
};

export function Publish() {
	const route = useRoute();
	const { latitude, longitude } = route.params as RouteParams;

	const navigation = useNavigation();

	const [address, SetAddress] = useState<string>('');
	const [problem, setProblem] = useState<Problem>({
		id: 0,
		title: 'Selecione o Problema',
	});
	const [problemModal, setProblemModal] = useState<boolean>(false);
	const [description, setDescription] = useState<string>('');

	const theme = useTheme();

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

	function handleSetProblem(problem: Problem) {
		setProblem(problem);
		setProblemModal(false);
	}

	function handleRevise() {
		navigation.navigate('revisePublish', {
			latitude,
			longitude,
			problem: problem.id,
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
						<ProblemItemText>{problem.title}</ProblemItemText>
						<Entypo
							name={problemModal ? 'chevron-up' : 'chevron-down'}
							size={20}
							color={theme.COLORS.GRAY_100}
						/>
					</ProblemItem>

					{problemModal && (
						<ProblemModal>
							<Header
								title='Selecione o Problema'
								backgroundColor
								onPress={() => setProblemModal(false)}
							/>
							<ProblemModalView>
								<ProblemModalItem
									onPress={() =>
										handleSetProblem({ id: 1, title: 'Buraco na rua' })
									}
								>
									<ProblemModalItemImage source={hole} />
									<ProblemModalItemTitle>Buraco na rua</ProblemModalItemTitle>
								</ProblemModalItem>

								<ProblemModalItem
									onPress={() =>
										handleSetProblem({ id: 2, title: 'Falta de iluminação' })
									}
								>
									<ProblemModalItemImage source={tree} />
									<ProblemModalItemTitle>
										Falta de iluminação
									</ProblemModalItemTitle>
								</ProblemModalItem>

								<ProblemModalItem
									onPress={() =>
										handleSetProblem({ id: 3, title: 'Queda de árvore' })
									}
								>
									<ProblemModalItemImage source={lightning} />
									<ProblemModalItemTitle>Queda de árvore</ProblemModalItemTitle>
								</ProblemModalItem>

								<ProblemModalItem
									onPress={() =>
										handleSetProblem({ id: 4, title: 'Entupimento de esgoto' })
									}
								>
									<ProblemModalItemImage source={waste_water} />
									<ProblemModalItemTitle>
										Entupimento de esgoto
									</ProblemModalItemTitle>
								</ProblemModalItem>
							</ProblemModalView>
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
