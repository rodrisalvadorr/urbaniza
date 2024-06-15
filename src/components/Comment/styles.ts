import styled, { css } from "styled-components/native";
import { Feather, AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";

export const Container = styled.View`
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

export const Footer = styled.View`
  width: 100%;
  height: 72px;

  background-color: ${({ theme }) => theme.COLORS.PRIMARY_2};

  padding: 17px 21px;
`;

export const FooterWrapper = styled.View`
  flex-direction: row;

  gap: 21px;
`;

export const SendButton = styled.TouchableOpacity`
  height: 35px;
  width: 35px;

  border-radius: 10px;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
`;

export const EditButton = styled(Feather).attrs(({ theme }) => ({
  size: 20,
  color: theme.COLORS.GRAY_100
}))``;

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

export const Separator = styled.View`
  background-color: ${({ theme }) => theme.COLORS.GRAY_500};

  height: 24px;
  width: 1px;
`;

export const CommentsAndLikesCount = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_100};
    font-size: ${theme.FONT_SIZE.SUBTITLE}px;
    font-weight: ${theme.FONT_WEIGHT.REGULAR};
  `};
`;

export const LikeButton = styled(AntDesign).attrs(({ theme }) => ({
  size: 20,
  color: theme.COLORS.GRAY_100
}))``;

export const Button = styled(TouchableOpacity).attrs(() => ({
  activeOpacity: 0.7
}))`
  height: 25px;
  width: 25px;

  justify-content: center;
  align-items: center;
`;