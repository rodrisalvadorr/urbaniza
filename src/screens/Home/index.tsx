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
	requestBackgroundPermissionsAsync,
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
import { addressParse } from '../../utils/addressParse';

type FilterProps = {
	color: BackgroundColorProps;
	name: string;
};

export function Home() {
	const [markers, setMarkers] = useState<LatLng[]>([]);
	const [markedSpot, setMarkedSpot] = useState<LatLng | null>(null);
	const [address, setAddress] = useState<string>('');
	const [location, setLocation] = useState<LocationObject | null>(null);

	const [filterVisibility, setFilterVisibility] = useState(false);
	const mapRef = useRef<MapView>(null);

	const filter: FilterProps[] = [
		{ color: 'BROWN', name: 'Entupimento de esgoto' },
		{ color: 'BLACK', name: 'Falta de iluminação' },
		{ color: 'GREEN', name: 'Queda de árvore' },
		{ color: 'YELLOW', name: 'Buraco na rua' },
	];

	async function requestLocationPermission() {
		const { granted } = await requestForegroundPermissionsAsync();

		if (granted) {
			const { granted } = await requestBackgroundPermissionsAsync();

			if (granted) {
				const currentLocation = await getCurrentPositionAsync();
				setLocation(currentLocation);
			}
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

	async function handleCenterLocation() {
		const currentLocation = await getCurrentPositionAsync();

		mapRef.current?.animateCamera({
			center: currentLocation.coords,
		});
	}

	async function handleMarkSpot(coordinate: LatLng) {
		setMarkedSpot(coordinate);

		const { formatedAddress } = await addressParse({
			latitude: coordinate.latitude,
			longitude: coordinate.longitude,
		});

		setAddress(formatedAddress);
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
				>
					{markedSpot && (
						<Marker
							image={marker}
							coordinate={{
								latitude: markedSpot.latitude,
								longitude: markedSpot.longitude,
							}}
						>
							<Callout tooltip>
								<CalloutBubble address={address} />
							</Callout>
						</Marker>
					)}
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
									name='info'
								/>
								<FilterMenuText>{item.name}</FilterMenuText>
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
