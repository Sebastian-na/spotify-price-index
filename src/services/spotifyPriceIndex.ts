import axios from "axios"
import CountryData from "../interfaces/CountryData";
import RegionData from "../interfaces/RegionData";
const URL = "https://raw.githubusercontent.com/matiassingers/spotify-pricing/master/data/countries.json"

export const getSpotifyPriceIndex = async (): Promise<CountryData[]> => {
    const response = await axios.get(URL)
    return response.data
}

export const getSpotifyPriceIndexDividedByRegions = async (): Promise<Map<string, RegionData>> => {
    const data = await getSpotifyPriceIndex()
    const regions = new Map<string, RegionData>()
    data.forEach(country => {
        if (!regions.has(country.region)) {
            regions.set(country.region, {
                name: country.region,
                countries: []
            })
        }
        regions.get(country.region)!.countries.push(country)
    })

    return regions
}