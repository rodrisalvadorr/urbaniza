import { useTheme } from 'styled-components/native';
import { Container } from './styles';

export function Input() {
	const theme = useTheme()

	return <Container placeholderTextColor={theme.COLORS.GRAY_400} />;
}
