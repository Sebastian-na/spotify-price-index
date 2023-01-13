import axios from "axios"

const URL = "https://raw.githubusercontent.com/matiassingers/spotify-pricing/master/data/countries.json"

export const getSpotifyPriceIndex = async () => {
    const response = await axios.get(URL)
    return response.data
}