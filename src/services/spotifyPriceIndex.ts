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
        const arr = regions.get(country.region)!
        // In the data there are some countries repeated, so we need to check if the country is already in the array
        if (!arr.countries.some(c => c.internationalName === country.internationalName)) {
            arr.countries.push(country)
        }
    })
    return regions
}

export const getAverageSpotifyPriceByRegions = async (): Promise<Map<string, number>> => {
    const data = await getSpotifyPriceIndexDividedByRegions()
    const averages = new Map<string, number>()
    data.forEach((region, key) => {
        const sum = region.countries.reduce((acc, curr) => acc + curr.convertedPrice, 0)
        averages.set(key, sum / region.countries.length)
    })
    return averages
}