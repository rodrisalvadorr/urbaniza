import { Text } from 'react-native';
import { Container, Form } from './styles';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';

export function Publish() {
	return (
		<Container>
			<Header
				title='Publicar'
				backgroundColor
			/>

			<Form>
				<Input />
			</Form>
		</Container>
	);
}
