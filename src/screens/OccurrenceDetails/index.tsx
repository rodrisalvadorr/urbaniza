import { useNavigation, useRoute } from '@react-navigation/native';
import {
	Author,
	Body,
	Comment,
	CommentBody,
	CommentCount,
	CommentFooter,
	CommentFooterTime,
	CommentHeader,
	CommentHeaderImage,
	CommentHeaderText,
	CommentsAndLikes,
	CommentsAndLikesCount,
	CommentsAndLikesWrapper,
	Container,
	Header,
	LikeButton,
	ProblemClose,
	ProblemCloseButton,
	ProblemDescription,
	ProblemLocation,
	ProblemTitle,
	Separator,
	Subtitle,
	Title,
} from './styles';
import { api } from '../../services/api';
import { useEffect, useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import { OccurrenceDTO } from '../../dtos/OccurrenceDTO';
import { reverseGeocodeAsync } from 'expo-location';
import { ProblemIcon } from '../../components/ProblemIcon';
import { PROBLEM } from '../../utils/ProblemList';
import { useTheme } from 'styled-components/native';

type RouteParams = {
	id: string;
};

export function OccurrenceDetails() {
	const [occurrence, setOccurrence] = useState<OccurrenceDTO>(
		{} as OccurrenceDTO
	);
	const [formattedAddress, setFormattedAddress] = useState<string>('');
	const [likeCount, setLikeCount] = useState(0);

	const route = useRoute();
	const { id } = route.params as RouteParams;

	const navigation = useNavigation();
	const theme = useTheme();

	useEffect(() => {
		fetchOccurrenceDetails();
	}, []);

	useEffect(() => {
		if (occurrence.occurrence) {
			getAddress();
		}
	}, [occurrence]);

	async function fetchOccurrenceDetails() {
		try {
			const response = await api.get(`/occurrences/${id}`);

			if (response.data) {
				setOccurrence(response.data);
			}
		} catch (error) {
			Alert.alert(
				'Erro',
				'Não foi possível obter as informações da ocorrência'
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

	return (
		occurrence.occurrence && (
			<Container>
				<Header>
					<Title>
						<ProblemIcon
							style={{ width: 65, height: 65 }}
							type={occurrence.occurrence.problem_id}
						/>

						<ProblemDescription>
							<ProblemTitle>
								{PROBLEM[occurrence.occurrence.problem_id]}
							</ProblemTitle>
							<ProblemLocation>{formattedAddress}</ProblemLocation>
						</ProblemDescription>

						<ProblemCloseButton onPress={() => navigation.navigate('home')}>
							<ProblemClose name='close-sharp' />
						</ProblemCloseButton>
					</Title>

					<Subtitle>
						<Author>
							{/* {`Postado em ${
								occurrence.comments
									? occurrence.comments[0].created_at
									: 'algum momento no passado'
							} por ${
								occurrence.comments
									? occurrence.comments[0].user.name
									: 'algum usuário'
							}`} */}
						</Author>
						<CommentsAndLikes>
							<CommentsAndLikesWrapper disabled>
								<CommentsAndLikesCount>
									{occurrence.comments.length}
								</CommentsAndLikesCount>
								<CommentCount name='comment-o' />
							</CommentsAndLikesWrapper>

							<Separator />

							<CommentsAndLikesWrapper
								onPress={() =>
									likeCount === 0 ? setLikeCount(1) : setLikeCount(0)
								}
							>
								<CommentsAndLikesCount>{likeCount}</CommentsAndLikesCount>
								<LikeButton name='like1' />
							</CommentsAndLikesWrapper>
						</CommentsAndLikes>
					</Subtitle>
				</Header>
				<Body>
					<FlatList
						data={occurrence.comments}
						keyExtractor={item => item.created_at}
						renderItem={({ item }) => (
							<Comment>
								<CommentHeader>
									<CommentHeaderImage
										source={require('../../assets/profile.png')}
									/>
									<CommentHeaderText>{item.user.name}</CommentHeaderText>
								</CommentHeader>

								<View>
									<CommentBody>{item.comment}</CommentBody>
								</View>

								<CommentFooter>
									<CommentFooterTime>{item.created_at}</CommentFooterTime>

									<CommentsAndLikesWrapper>
										<CommentsAndLikesCount>{likeCount}</CommentsAndLikesCount>
										<LikeButton name='like1' />
									</CommentsAndLikesWrapper>
								</CommentFooter>
							</Comment>
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
			</Container>
		)
	);
}
