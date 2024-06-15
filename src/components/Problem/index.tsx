import { PROBLEM } from '../../utils/ProblemList';
import { ProblemIcon } from '../ProblemIcon';
import {
	Author,
	ButtonWrapper,
	ButtonsWrapper,
	CommentIcon,
	CommentsAndLikesCount,
	Container,
	Icon,
	LikeButton,
	CloseButton,
	Description,
	ProblemLocation,
	ProblemTitle,
	Separator,
	Subtitle,
	Title,
} from './styles';
import { useNavigation } from '@react-navigation/native';

type Props = {
	icon: number;
	address: string;
	createdAt: string;
	user: string;
	commentCount: number;
	likeCount: number;
	isCloseButtonVisible?: boolean;
};

export function Problem({
	icon,
	address,
	createdAt,
	user,
	commentCount,
	likeCount,
	isCloseButtonVisible = true,
}: Props) {
	const navigation = useNavigation();

	return (
		<Container>
			<Title>
				<ProblemIcon
					style={{ width: 65, height: 65 }}
					type={icon}
				/>

				<Description>
					<ProblemTitle>{PROBLEM[icon]}</ProblemTitle>
					<ProblemLocation>{address}</ProblemLocation>
				</Description>

				{isCloseButtonVisible && (
					<CloseButton onPress={() => navigation.navigate('home')}>
						<Icon name='close-sharp' />
					</CloseButton>
				)}
			</Title>

			<Subtitle>
				<Author>{`Postado em ${createdAt} por ${user}`}</Author>
				<ButtonsWrapper>
					<ButtonWrapper disabled>
						<CommentsAndLikesCount>{commentCount}</CommentsAndLikesCount>
						<CommentIcon name='comment-o' />
					</ButtonWrapper>

					<Separator />

					<ButtonWrapper>
						<CommentsAndLikesCount>{likeCount}</CommentsAndLikesCount>
						<LikeButton name='like1' />
					</ButtonWrapper>
				</ButtonsWrapper>
			</Subtitle>
		</Container>
	);
}
