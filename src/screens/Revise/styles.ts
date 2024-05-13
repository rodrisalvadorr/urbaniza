import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";

export const Container = styled(SafeAreaView)`
  flex: 1;

  background-color: ${({ theme }) => theme.COLORS.PRIMARY_1};
`;

export const Form = styled.View`
  flex: 1;

  margin: 29px 37px;
`;

export const FormItem = styled.View`
  gap: 8px;

  margin-bottom: 30px;
`;

export const FormTitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.TEXT};
    font-size: ${theme.FONT_SIZE.BODY}px;
    font-weight: ${theme.FONT_WEIGHT.BOLD};
  `};
`;

export const FormSubtitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.TEXT};
    font-size: ${theme.FONT_SIZE.SUBTITLE}px;
    font-weight: ${theme.FONT_WEIGHT.REGULAR};
  `};
`;

export const Photo = styled.TouchableOpacity`
  height: 120px;
  background-color: ${({ theme}) => theme.COLORS.PRIMARY_5};

  border-radius: 12px;

  padding: 9px 15px;
  margin: 10px 54px 67px;

  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const FormSmallSubtitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_200};
    font-size: ${theme.FONT_SIZE.SMALL_TEXT_1}px;
    font-weight: ${theme.FONT_WEIGHT.REGULAR};
  `};
`;

export const Buttons = styled.View`
  flex-direction: row;

  gap: 16px;

  justify-content: center;
  align-items: space-between;
`;