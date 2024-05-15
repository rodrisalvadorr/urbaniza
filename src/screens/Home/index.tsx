import { useEffect, useRef, useState } from 'react';
import {
	CenterButton,
	CenterIcon,
	Container,
	FilterButton,
	FilterIcon,
	FilterMenu,
	FilterMenuItem,
	FilterMenuText,
	FilterRemoveButton,
	FilterRemoveButtonText,
	Map,
} from './styles';
import MapView, { Marker, LatLng, Callout } from 'react-native-maps';

import marker from '../../assets/marker.png';

import {
	requestForegroundPermissionsAsync,
	getCurrentPositionAsync,
	LocationObject,
	watchPositionAsync,
	LocationAccuracy,
	reverseGeocodeAsync,
} from 'expo-location';
import { CalloutBubble } from '../../components/CalloutBubble';
import { FlatList } from 'react-native';
import { ProblemIcon } from '../../components/ProblemIcon';
import { BackgroundColorProps } from '../../components/ProblemIcon/styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Pin } from '../../components/Pin';
import { mapStyle } from './mapStyle';

type MarkerProps = {
	latitude: number;
	longitude: number;
	problem: string;
	description: string;
	createdAt: string;
};

type FilterProps = {
	color: BackgroundColorProps;
	name: string;
	description: string;
};

export function Home() {
	const [markers, setMarkers] = useState<MarkerProps[]>([]);
	const [markedSpot, setMarkedSpot] = useState<LatLng | null>(null);
	const [address, setAddress] = useState<string>('');
	const [location, setLocation] = useState<LocationObject | null>(null);

	const [filterVisibility, setFilterVisibility] = useState(false);

	const mapRef = useRef<MapView>(null);

	const navigation = useNavigation();

	const route = useRoute();
	const routeMarker = route.params as MarkerProps;

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

	useEffect(() => {
		requestLocationPermission();
	}, []);

	// useEffect(() => {
	// 	watchPositionAsync(
	// 		{
	// 			accuracy: LocationAccuracy.Highest,
	// 			timeInterval: 1000,
	// 			distanceInterval: 1,
	// 		},
	// 		response => {
	// 			setLocation(response);
	// 			mapRef.current?.animateCamera({
	// 				center: response.coords,
	// 			});
	// 		}
	// 	);
	// }, []);

	useEffect(() => {
		if (routeMarker) {
			setMarkers(prevState => [...prevState, routeMarker]);
			console.log(markers);
		}

		setMarkedSpot(null);
	}, [route.params]);

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
									latitude: item.latitude,
									longitude: item.longitude,
								}}
								name='hole_pin'
							/>
						))}
				</Map>
			)}

			<CenterButton onPress={handleCenterLocation}>
				<CenterIcon name='gps-fixed' />
			</CenterButton>

			{!filterVisibility ? (
				<FilterButton onPress={() => setFilterVisibility(true)}>
					<FilterIcon name='filter-alt' />
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
		</Container>
	);
}
