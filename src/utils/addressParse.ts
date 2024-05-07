import { reverseGeocodeAsync } from "expo-location";

interface addressParseInput {
  latitude: number
  longitude: number
}

interface addressParseReturn {
  formatedAddress: string
}

export async function addressParse({latitude, longitude}: addressParseInput): Promise<addressParseReturn> {
  const address = await reverseGeocodeAsync({
    latitude,
    longitude,
  });

  console.log(address[0].formattedAddress)

  const formatedAddress = `${address[0].street}, ${address[0].streetNumber} - ${address[0].district}, ${address[0].region}`

  return {
    formatedAddress
  }
}