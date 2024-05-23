import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const Container = styled(SafeAreaView)`
  flex: 1;

  background-color: ${({ theme }) => theme.COLORS.PRIMARY_1};
`;

export const Header = styled.View`
  width: 100%;
  height: 130px;

  background-color: ${({ theme }) => theme.COLORS.PRIMARY_5};
`;