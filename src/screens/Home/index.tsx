import { useEffect, useRef, useState } from 'react';
import {
	CenterButton,
	Container,
	FilterButton,
	FilterMenu,
	FilterMenuItem,
	FilterMenuText,
	FilterRemoveButton,
	FilterRemoveButtonText,
	Icon,
	LogOutButton,
	Map,
} from './styles';
import MapView, { Marker, LatLng, Callout } from 'react-native-maps';

import marker from '../../assets/marker.png';

import {
	requestForegroundPermissionsAsync,
	getCurrentPositionAsync,
	LocationObject,
	reverseGeocodeAsync,
} from 'expo-location';
import { CalloutBubble } from '../../components/CalloutBubble';
import { Alert, FlatList } from 'react-native';
import { ProblemIcon } from '../../components/ProblemIcon';
import { BackgroundColorProps } from '../../components/ProblemIcon/styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Pin } from '../../components/Pin';
import { mapStyle } from './mapStyle';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import { MarkerDTO } from '../../dtos/MarkerDTO';

type FilterProps = {
	color: BackgroundColorProps;
	name: string;
	description: string;
};

export function Home() {
	const [markers, setMarkers] = useState<MarkerDTO[]>([]);
	const [markedSpot, setMarkedSpot] = useState<LatLng | null>(null);
	const [address, setAddress] = useState<string>('');
	const [location, setLocation] = useState<LocationObject | null>(null);

	const route = useRoute();

	const { logOut } = useAuth();

	const [filterVisibility, setFilterVisibility] = useState(false);

	const mapRef = useRef<MapView>(null);

	const navigation = useNavigation();

	const filter: FilterProps[] = [
		{
			color: 'BROWN',
			name: 'waste_water',
			description: 'Entupimento de esgoto',
		},
		{ color: 'BLACK', name: 'lightning', description: 'Falta de iluminação' },
		{ color: 'GREEN', name: 'tree', description: 'Queda de árvore' },
		{ color: 'YELLOW', name: 'hole', description: 'Buraco na rua' },
	];

	async function requestLocationPermission() {
		const { granted } = await requestForegroundPermissionsAsync();

		if (granted) {
			const currentLocation = await getCurrentPositionAsync();
			setLocation(currentLocation);
		}
	}

	async function fetchMarkers() {
		try {
			const response = await api.get('/occurrences');

			if (response.data) {
				setMarkers(response.data.occurrences);
			}
		} catch (error) {
			Alert.alert(
				'Erro no servidor',
				'Não foi possível carregar os marcadores'
			);
		}
	}

	useEffect(() => {
		requestLocationPermission();
	}, []);

	useEffect(() => {
		fetchMarkers();
	});

	async function handleCenterLocation() {
		const currentLocation = await getCurrentPositionAsync();

		mapRef.current?.animateCamera({
			center: currentLocation.coords,
		});
	}

	async function handleMarkSpot(coordinate: LatLng) {
		setMarkedSpot(coordinate);

		const address = await reverseGeocodeAsync({
			latitude: coordinate.latitude,
			longitude: coordinate.longitude,
		});

		const { formattedAddress } = address[0];

		setAddress(formattedAddress ?? '');
	}

	function handlePublish({ latitude, longitude }: LatLng) {
		navigation.navigate('publish', { latitude, longitude });

		setMarkedSpot(null);
	}

	async function handleLogOut() {
		await logOut();
	}

	return (
		<Container>
			{location && (
				<Map
					ref={mapRef}
					moveOnMarkerPress
					onPress={() => setMarkedSpot(null)}
					onLongPress={({ nativeEvent }) =>
						handleMarkSpot(nativeEvent.coordinate)
					}
					initialRegion={{
						latitude: location.coords.latitude,
						longitude: location.coords.longitude,
						latitudeDelta: 0.005,
						longitudeDelta: 0.005,
					}}
					customMapStyle={mapStyle}
				>
					{markedSpot && (
						<Marker
							image={marker}
							coordinate={{
								latitude: markedSpot.latitude,
								longitude: markedSpot.longitude,
							}}
						>
							<Callout
								tooltip
								onPress={() => handlePublish(markedSpot)}
							>
								<CalloutBubble address={address} />
							</Callout>
						</Marker>
					)}

					{markers &&
						markers.map(item => (
							<Pin
								coordinate={{
									latitude: Number(item.latitude),
									longitude: Number(item.longitude),
								}}
								name='hole_pin'
							/>
						))}
				</Map>
			)}

			<CenterButton onPress={handleCenterLocation}>
				<Icon name='gps-fixed' />
			</CenterButton>

			{!filterVisibility ? (
				<FilterButton onPress={() => setFilterVisibility(true)}>
					<Icon name='filter-alt' />
				</FilterButton>
			) : (
				<FilterMenu>
					<FlatList
						data={filter}
						keyExtractor={item => item.name}
						renderItem={({ item }) => (
							<FilterMenuItem>
								<ProblemIcon
									backgroundColor={item.color}
									name={item.name}
								/>
								<FilterMenuText>{item.description}</FilterMenuText>
							</FilterMenuItem>
						)}
					/>
					<FilterRemoveButton onPress={() => setFilterVisibility(false)}>
						<FilterRemoveButtonText>Remover Filtro</FilterRemoveButtonText>
					</FilterRemoveButton>
				</FilterMenu>
			)}

			<LogOutButton onPress={handleLogOut}>
				<Icon
					name='logout'
					style={{ transform: [{ scaleX: -1 }] }}
				/>
			</LogOutButton>
		</Container>
	);
}
