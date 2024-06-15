import styled, { css } from "styled-components/native";
import { FontAwesome, AntDesign, Ionicons } from '@expo/vector-icons'

export const Container = styled.View`
  width: 100%;
  height: 150px;

  gap: 10px;

  background-color: ${({ theme }) => theme.COLORS.PRIMARY_5};

  padding: 15px;
`;

export const Title = styled.View`
  flex-direction: row;

  align-items: center;

  width: 100%;

  margin-bottom: 10px;
`;

export const Description = styled.View`
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

export const CloseButton = styled.TouchableOpacity`
  width: 48px;
  height: 48px;

  justify-content: center;
  align-items: center;
`;

export const Icon = styled(Ionicons).attrs(({ theme }) => ({
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

export const ButtonsWrapper = styled.View`
  flex-direction: row;
  align-items: center;

  gap: 10px;
`;

export const ButtonWrapper = styled.TouchableOpacity`
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

export const CommentIcon = styled(FontAwesome).attrs(({ theme }) => ({
  size: 20,
  color: theme.COLORS.GRAY_100,
}))`
  transform: scaleX(-1);
`;

export const LikeButton = styled(AntDesign).attrs(({ theme }) => ({
  size: 20,
  color: theme.COLORS.GRAY_100
}))``;

export const Separator = styled.View`
  background-color: ${({ theme }) => theme.COLORS.GRAY_500};

  height: 24px;
  width: 1px;
`;