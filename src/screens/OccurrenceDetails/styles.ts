import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';

export const Container = styled(SafeAreaView)`
  flex: 1;

  background-color: ${({ theme }) => theme.COLORS.PRIMARY_1};
`;

export const Icon = styled(Ionicons).attrs(({ theme }) => ({
  size: 20,
  color: theme.COLORS.GRAY_100
}))``;

export const Body = styled.View`
  flex: 1;
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