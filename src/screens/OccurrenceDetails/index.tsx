import { useNavigation, useRoute } from '@react-navigation/native';
import {
	Body,
	Container,
	Footer,
	FooterWrapper,
	Icon,
	SendButton,
} from './styles';
import { api } from '../../services/api';
import { useEffect, useState } from 'react';
import { Alert, FlatList, Keyboard, Text, View } from 'react-native';
import { OccurrenceDTO } from '../../dtos/OccurrenceDTO';
import { reverseGeocodeAsync } from 'expo-location';
import { useTheme } from 'styled-components/native';
import { Input } from '../../components/Input';
import { AppError } from '../../utils/AppError';
import { Problem } from '../../components/Problem';
import { Comment } from '../../components/Comment';
import { Loading } from '../../components/Loading';
import { storageUserGet } from '../../storage/storageUser';
import { UserDTO } from '../../dtos/UserDTO';

type RouteParams = {
	id: string;
};

export function OccurrenceDetails() {
	const [isLoading, setIsLoading] = useState(true);

	const [occurrence, setOccurrence] = useState<OccurrenceDTO>(
		{} as OccurrenceDTO
	);
	const [authenticatedUser, setAuthenticatedUser] = useState<UserDTO>(
		{} as UserDTO
	);
	const [formattedAddress, setFormattedAddress] = useState<string>('');
	const [commentInput, setCommentInput] = useState('');

	const route = useRoute();
	const { id } = route.params as RouteParams;

	const theme = useTheme();

	const navigation = useNavigation();

	useEffect(() => {
		fetchOccurrenceDetails();
	}, []);

	useEffect(() => {
		if (occurrence.occurrence) {
			getAddress();
		}
	}, [occurrence]);

	useEffect(() => {
		getUserInfo();
	}, []);

	async function fetchOccurrenceDetails() {
		try {
			const response = await api.get(`/occurrences/${id}`);

			if (response.data) {
				setOccurrence(response.data);
			}

			setIsLoading(false);
		} catch (error) {
			Alert.alert(
				'Erro',
				'Não foi possível obter as informações da ocorrência',
				[
					{
						text: 'Ok',
						onPress: () => navigation.navigate('home'),
					},
				]
			);
		}
	}

	async function getAddress() {
		const address = await reverseGeocodeAsync({
			latitude: occurrence.occurrence.latitude,
			longitude: occurrence.occurrence.longitude,
		});

		const { formattedAddress } = address[0];

		setFormattedAddress(formattedAddress ?? '');
	}

	async function getUserInfo() {
		const user = await storageUserGet();
		setAuthenticatedUser(user);
	}

	async function handleCreateComment() {
		setCommentInput('');
		Keyboard.dismiss();

		try {
			const response = await api.post(
				`/occurrences/${occurrence.occurrence.id}/comments`,
				{
					comment: commentInput,
				}
			);

			if (response.status === 201) {
				await fetchOccurrenceDetails();
			}
		} catch (error) {
			const isAppError = error instanceof AppError;
			const title = isAppError
				? error.message
				: 'Não foi possível criar o comentário.';

			Alert.alert('Erro', title);
		}
	}

	if (isLoading) {
		return <Loading />;
	}

	return (
		occurrence.occurrence && (
			<Container>
				<Problem
					user={occurrence.occurrence.user.name}
					address={formattedAddress}
					createdAt={occurrence.occurrence.created_at}
					icon={occurrence.occurrence.problem_id}
					commentCount={occurrence.comments.length}
					likeCount={1}
				/>

				<Body>
					<FlatList
						data={occurrence.comments}
						keyExtractor={item => item.created_at}
						renderItem={({ item }) => (
							<Comment
								user={item.user.name}
								comment={item.comment}
								createdAt={item.created_at}
								likeCount={1}
								occurrenceId={item.occurrence_id}
								onCommentEdited={fetchOccurrenceDetails}
								authorId={item.user_id}
								authenticatedUserId={authenticatedUser.id}
							/>
						)}
						ListEmptyComponent={() => (
							<View
								style={{
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<Text
									style={{
										fontSize: theme.FONT_SIZE.SUBTITLE,
										color: theme.COLORS.GRAY_300,
									}}
								>
									Nenhum comentário
								</Text>
							</View>
						)}
					/>
				</Body>

				<Footer>
					<FooterWrapper>
						<Input
							placeholder='Comentar...'
							value={commentInput}
							onChangeText={setCommentInput}
						/>
						<SendButton onPress={handleCreateComment}>
							<Icon name='send' />
						</SendButton>
					</FooterWrapper>
				</Footer>
			</Container>
		)
	);
}
