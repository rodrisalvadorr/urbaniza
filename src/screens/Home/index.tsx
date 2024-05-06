import { useEffect, useRef, useState } from 'react';
import { CenterButton, CenterIcon, Container, FilterButton, FilterIcon, FilterMenu, FilterMenuIcon, FilterMenuItem, FilterMenuText, Map } from './styles';
import MapView, { Marker, LatLng, Callout } from 'react-native-maps';

import marker from '../../assets/marker.png';

import {
	requestForegroundPermissionsAsync,
	requestBackgroundPermissionsAsync,
	getCurrentPositionAsync,
	LocationObject,
	watchPositionAsync,
	LocationAccuracy,
	getLastKnownPositionAsync,
} from 'expo-location';
import { CalloutBubble } from '../../components/CalloutBubble';
import { FlatList } from 'react-native';

type FilterProps = {
	icon: string
	name: string
}

export function Home() {
	const [markers, setMarkers] = useState<LatLng[]>([]);
	const [markedSpot, setMarkedSpot] = useState<LatLng | null>(null);
	const [location, setLocation] = useState<LocationObject | null>(null);

	const [filterVisibility, setFilterVisibility] = useState(false);
	const [filter, setFilter] = useState<FilterProps[]>([]);

	const mapRef = useRef<MapView>(null);

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

	function handleMarkSpot(coordinates: LatLng | null) {
		setMarkedSpot(coordinates);
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
								<CalloutBubble
									address='Avenida Nossa Senhora do Loreto'
									city='São Paulo'
								/>
							</Callout>
						</Marker>
					)}
				</Map>
			)}

			<CenterButton onPress={handleCenterLocation}>
				<CenterIcon name='gps-fixed' />
			</CenterButton>
			
			{ !filterVisibility ?
				<FilterButton onPress={() => setFilterVisibility(false)}>
					<FilterIcon name='filter-alt' />
				</FilterButton>
				:
				<FilterMenu>
					<FlatList 
						data={filter}
						keyExtractor={item => item.name}
						renderItem={({ item }) => (
							<FilterMenuItem >
								<FilterMenuIcon src={require(`../../assets/${item.icon}.svg`)} />
								<FilterMenuText >
									{item.name}
								</FilterMenuText>
							</FilterMenuItem>
						)}
					/>
				</FilterMenu>
			}

		</Container>
	);
}
