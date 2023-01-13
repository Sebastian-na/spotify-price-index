import { getSpotifyPriceIndexDividedByRegions } from "../../services/spotifyPriceIndex";
import { LoaderFunction, json } from "react-router-dom"

export type LoaderData = {
    data: Awaited<ReturnType<typeof getSpotifyPriceIndexDividedByRegions>>
}

export const loader: LoaderFunction = async () => {
    const data = await getSpotifyPriceIndexDividedByRegions();
    return { data }
}