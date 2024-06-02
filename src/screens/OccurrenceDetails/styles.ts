import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';

export const Container = styled(SafeAreaView)`
  flex: 1;

  background-color: ${({ theme }) => theme.COLORS.PRIMARY_1};
`;

export const Header = styled.View`
  width: 100%;
  height: 150px;

  gap: 10px;

  background-color: ${({ theme }) => theme.COLORS.PRIMARY_5};

  padding: 15px;
`;

export const Title = styled.View`
  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  width: 100%;

  margin-bottom: 10px;
`;

export const ProblemDescription = styled.View`
  margin-left: 22px;
  margin-right: 30px;

  gap: 10px;

  width: 200px;
`;

export const ProblemTitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.TEXT};
    font-size: ${theme.FONT_SIZE.TITLE_4}px;
    font-weight: ${theme.FONT_WEIGHT.REGULAR};
  `};
`;

export const ProblemLocation = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.TEXT};
    font-size: ${theme.FONT_SIZE.SUBTITLE}px;
    font-weight: ${theme.FONT_WEIGHT.REGULAR};
  `};
`;

export const ProblemCloseButton = styled.TouchableOpacity`
  width: 48px;
  height: 48px;

  justify-content: center;
  align-items: center;
`;

export const ProblemClose = styled(Ionicons).attrs(({ theme }) => ({
  size: 20,
  color: theme.COLORS.GRAY_100
}))``;

export const Subtitle = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Author = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.TEXT};
    font-size: ${theme.FONT_SIZE.SMALL_TEXT_1}px;
    font-weight: ${theme.FONT_WEIGHT.REGULAR};
  `};
`;

export const CommentsAndLikes = styled.View`
  flex-direction: row;
  align-items: center;

  gap: 10px;
`;

export const CommentsAndLikesWrapper = styled.TouchableOpacity`
  gap: 4px;
  
  flex-direction: row;
  align-items: center;
`;

export const CommentsAndLikesCount = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_100};
    font-size: ${theme.FONT_SIZE.SUBTITLE}px;
    font-weight: ${theme.FONT_WEIGHT.REGULAR};
  `};
`;

export const CommentCount = styled(FontAwesome).attrs(({ theme }) => ({
  size: 15,
  color: theme.COLORS.GRAY_100,
}))`
  transform: scaleX(-1);
`;

export const LikeButton = styled(AntDesign).attrs(({ theme }) => ({
  size: 15,
  color: theme.COLORS.GRAY_100
}))``;

export const Separator = styled.View`
  background-color: ${({ theme }) => theme.COLORS.GRAY_500};

  height: 24px;
  width: 1px;
`;

export const Body = styled.View`
  flex: 1;
`;

export const Comment = styled.View`
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_4};

  padding: 10px 16px;
  gap: 10px;
`;

export const CommentHeader = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 7px;
`;

export const CommentHeaderImage = styled.Image`
  width: 24px;
  height: 24px;

  border-radius: 999px;
`;

export const CommentHeaderText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.TEXT};
    font-size: ${theme.FONT_SIZE.SUBTITLE}px;
    font-weight: ${theme.FONT_WEIGHT.BOLD};
  `};
`;

export const CommentBody = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.TEXT};
    font-size: ${theme.FONT_SIZE.BODY}px;
    font-weight: ${theme.FONT_WEIGHT.REGULAR};
  `};
`;

export const CommentFooter = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CommentFooterTime = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.TEXT};
    font-size: ${theme.FONT_SIZE.SUBTITLE}px;
    font-weight: ${theme.FONT_WEIGHT.REGULAR};
  `};
`;