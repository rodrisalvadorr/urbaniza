import { useCallback, useEffect, useRef, useState } from 'react';
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
import { Alert, FlatList, PermissionsAndroid } from 'react-native';
import { ProblemIcon } from '../../components/ProblemIcon';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Pin } from '../../components/Pin';
import { mapStyle } from './mapStyle';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import { MarkerDTO } from '../../dtos/MarkerDTO';
import { Loading } from '../../components/Loading';

type FilterProps = {
	type: number;
	description: string;
};

export function Home() {
	const [isLoading, setIsLoading] = useState(true);

	const [markers, setMarkers] = useState<MarkerDTO[]>([]);
	const [markersList, setMarkersList] = useState<MarkerDTO[]>([]);
	const [selectedFilter, setSelectedFilter] = useState(0);

	const [markedSpot, setMarkedSpot] = useState<LatLng | null>(null);
	const [address, setAddress] = useState<string>('');
	const [location, setLocation] = useState<LocationObject | null>(null);

	const { logOut } = useAuth();

	const [filterVisibility, setFilterVisibility] = useState(false);

	const mapRef = useRef<MapView>(null);

	const navigation = useNavigation();

	const filter: FilterProps[] = [
		{ type: 1, description: 'Buraco na rua' },
		{ type: 2, description: 'Falta de iluminação' },
		{ type: 3, description: 'Queda de árvore' },
		{
			type: 4,
			description: 'Entupimento de esgoto',
		},
	];

	useEffect(() => {
		requestLocationPermission();
	}, []);

	useFocusEffect(
		useCallback(() => {
			fetchMarkers();
		}, [])
	);

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
				setMarkersList(response.data.occurrences);
			}

			setIsLoading(false);
		} catch (error) {
			Alert.alert(
				'Erro no servidor',
				'Não foi possível carregar os marcadores'
			);
		}
	}

	async function handleCenterLocation() {
		const currentLocation = await getCurrentPositionAsync();

		mapRef.current?.animateCamera({
			center: currentLocation.coords,
			zoom: 17.5,
			pitch: 0,
			heading: 0,
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

	function handleFilterMarkers(problem: number) {
		setSelectedFilter(problem);
		setFilterVisibility(false);

		if (problem === 0) {
			setMarkersList(markers);
		} else {
			const filteredList = markers.filter(item => item.problem_id === problem);

			setMarkersList(filteredList);
		}
	}

	function handleDeselect() {
		if (filterVisibility) {
			setFilterVisibility(false);
		} else {
			setMarkedSpot(null);
		}
	}

	if (isLoading && !location) {
		return <Loading />;
	}

	return (
		<Container>
			{location && (
				<>
					<Map
						ref={mapRef}
						onMapReady={() => {
							PermissionsAndroid.request(
								PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
							);
						}}
						moveOnMarkerPress
						onPress={() => handleDeselect()}
						onLongPress={({ nativeEvent }) =>
							handleMarkSpot(nativeEvent.coordinate)
						}
						initialRegion={{
							latitude: location.coords.latitude,
							longitude: location.coords.longitude,
							latitudeDelta: 0.005,
							longitudeDelta: 0.005,
						}}
						showsUserLocation={true}
						showsCompass={false}
						showsMyLocationButton={false}
						toolbarEnabled={false}
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

						{markersList &&
							markersList.map(item => (
								<Pin
									key={item.id}
									coordinate={{
										latitude: Number(item.latitude),
										longitude: Number(item.longitude),
									}}
									type={item.problem_id}
									onPress={() =>
										navigation.navigate('occurrenceDetails', { id: item.id })
									}
								/>
							))}
					</Map>

					<CenterButton onPress={handleCenterLocation}>
						<Icon name='gps-fixed' />
					</CenterButton>

					{!filterVisibility ? (
						<FilterButton onPress={() => setFilterVisibility(true)}>
							{selectedFilter === 0 ? (
								<Icon name='filter-alt' />
							) : (
								<ProblemIcon
									type={selectedFilter}
									style={{ width: 40, height: 40 }}
								/>
							)}
						</FilterButton>
					) : (
						<FilterMenu>
							<FlatList
								data={filter}
								keyExtractor={item => item.description}
								renderItem={({ item }) => (
									<FilterMenuItem
										onPress={() => handleFilterMarkers(item.type)}
									>
										<ProblemIcon
											type={item.type}
											style={{ width: 40, height: 40 }}
										/>
										<FilterMenuText>{item.description}</FilterMenuText>
									</FilterMenuItem>
								)}
							/>
							<FilterRemoveButton onPress={() => handleFilterMarkers(0)}>
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
				</>
			)}
		</Container>
	);
}
