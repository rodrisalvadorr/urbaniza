import { useRoute } from '@react-navigation/native';
import { Container, Header } from './styles';
import { api } from '../../services/api';
import { useEffect } from 'react';
import { Alert } from 'react-native';

type RouteParams = {
	id: string;
};

export function OccurrenceDetails() {
	const route = useRoute();
	const { id } = route.params as RouteParams;

	useEffect(() => {
		fetchOccurrenceDetails();
	}, []);

	async function fetchOccurrenceDetails() {
		try {
			const response = await api.get(`/occurrences/${id}`);

			if (response.data) {
				console.log(response.data);
			}
		} catch (error) {
			Alert.alert(
				'Erro',
				'Não foi possível obter as informações da ocorrência'
			);
		}
	}

	return (
		<Container>
			<Header></Header>
		</Container>
	);
}
