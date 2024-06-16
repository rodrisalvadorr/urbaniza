import { Alert, View } from 'react-native';
import {
	Button,
	ButtonWrapper,
	ButtonsWrapper,
	CommentBody,
	CommentFooter,
	CommentFooterTime,
	CommentHeader,
	CommentHeaderImage,
	CommentHeaderText,
	CommentsAndLikesCount,
	Container,
	EditButton,
	LikeButton,
	Separator,
} from './styles';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';
import { Input } from '../Input';
import { api } from '../../services/api';
import { AppError } from '../../utils/AppError';

type Props = {
	user: string;
	comment: string;
	createdAt: string;
	likeCount: number;
	occurrenceId: string;
	authorId: string;
	authenticatedUserId: string;
	onCommentEdited: () => void;
};

export function Comment({
	user,
	comment,
	createdAt,
	likeCount,
	occurrenceId,
	authorId,
	authenticatedUserId,
	onCommentEdited,
}: Props) {
	const [isEditing, setIsEditing] = useState(false);
	const [originalComment, setOriginalComment] = useState(comment);
	const [editedComment, setEditedComment] = useState(originalComment);

	function handleEditComment() {
		setIsEditing(!isEditing);
		setEditedComment(originalComment);
	}

	async function handleSubmitComment() {
		try {
			await api.put(`/occurrences/${occurrenceId}/comments`, {
				comment: editedComment,
			});

			onCommentEdited();

			setOriginalComment(editedComment);
		} catch (error) {
			const title =
				error instanceof AppError
					? error.message
					: 'Não foi editar o comentário no momento. Tente mais tarde.';

			Alert.alert('Erro', title);
		} finally {
			setIsEditing(false);
		}
	}

	return (
		<Container>
			<CommentHeader>
				<CommentHeaderImage source={require('../../assets/profile.png')} />
				<CommentHeaderText>{user}</CommentHeaderText>
			</CommentHeader>

			<View>
				{!isEditing ? (
					<CommentBody>{comment}</CommentBody>
				) : (
					<Input
						value={editedComment}
						onChangeText={setEditedComment}
						autoFocus
					/>
				)}
			</View>

			<CommentFooter>
				<CommentFooterTime>
					{formatDistanceToNow(new Date(createdAt), {
						addSuffix: true,
						locale: ptBR,
					})}
				</CommentFooterTime>

				<ButtonsWrapper>
					{authorId === authenticatedUserId && (
						<>
							<ButtonWrapper>
								<Button onPress={handleEditComment}>
									{!isEditing ? (
										<EditButton name='edit' />
									) : (
										<EditButton name='x' />
									)}
								</Button>
							</ButtonWrapper>

							<Separator />
						</>
					)}

					<ButtonWrapper>
						{!isEditing && (
							<CommentsAndLikesCount>{likeCount}</CommentsAndLikesCount>
						)}
						{!isEditing ? (
							<Button>
								<LikeButton name='like1' />
							</Button>
						) : (
							<Button onPress={handleSubmitComment}>
								<EditButton name='check' />
							</Button>
						)}
					</ButtonWrapper>
				</ButtonsWrapper>
			</CommentFooter>
		</Container>
	);
}
