import styled, { css } from "styled-components/native";
import { Feather } from '@expo/vector-icons';
import { View } from "react-native";

export type HeaderStyleProps = {
  backgroundColor?: boolean
}

export const Container = styled(View)<HeaderStyleProps>`
  height: 72px;
  
  background-color: ${({ theme, backgroundColor }) => backgroundColor ? theme.COLORS.PRIMARY_4 : 'transparent'};

  flex-direction: row;
  align-items: center;

  padding: 12px;
`;

export const BackButton = styled.TouchableOpacity`
  height: 48px;
  width: 48px;

  justify-content: center;
  align-items: center;
`;

export const Icon = styled(Feather).attrs(({ theme }) => ({
  color: theme.COLORS.GRAY_100,
  size: 24
}))``;

export const Title = styled.Text`
  flex: 1;

  text-align: center;
  margin-right: 48px;

  ${({ theme }) => css`
    color: ${theme.COLORS.TEXT};
    font-size: ${theme.FONT_SIZE.TITLE_4}px;
    font-weight: ${theme.FONT_WEIGHT.BOLD};
  `}; 
`;