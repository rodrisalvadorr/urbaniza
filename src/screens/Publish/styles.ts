import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";

export const Container = styled(SafeAreaView)`
  flex: 1;

  background-color: ${({ theme }) => theme.COLORS.PRIMARY_1};
`;

export const Form = styled.View`
  flex: 1;
  
  margin: 46px 32px 30px;

  gap: 45px;
`;

export const FormItem = styled.View`
  gap: 12px;
`;

export const FormItemTitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.TEXT};
    font-size: ${theme.FONT_SIZE.SUBTITLE}px;
    font-weight: ${theme.FONT_WEIGHT.REGULAR};
  `};
`;

export const ProblemItem = styled.TouchableOpacity`
  width: 100%;

  height: 37px;
  background-color: ${({ theme}) => theme.COLORS.PRIMARY_5};

  border-radius: 12px;

  padding: 0 15px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ProblemItemText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_100};
    font-size: ${theme.FONT_SIZE.BODY}px;
    font-weight: ${theme.FONT_WEIGHT.REGULAR};
  `};
`;

export const ProblemModal = styled.View`
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_5};
  
  border-radius: 8px;
`;

export const ProblemModalItem = styled.TouchableOpacity`
  height: 52px;
  width: 100%;

  justify-content: center;
  padding: 0 12px;
`;

export const ProblemModalItemTitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_100};
    font-size: ${theme.FONT_SIZE.BODY}px;
    font-weight: ${theme.FONT_WEIGHT.REGULAR};
  `};
`;

export const ImageSelectButton = styled.TouchableOpacity`
  width: 80%;

  height: 120px;
  background-color: ${({ theme}) => theme.COLORS.PRIMARY_5};

  border-radius: 12px;

  padding: 9px 15px;

  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const ImageContainer = styled.View`
  width: 45px;
  height: 45px;

  justify-content: center;
  align-items: center;

  border-radius: 999px;

  background-color: ${({ theme}) => theme.COLORS.GRAY_800};
`;