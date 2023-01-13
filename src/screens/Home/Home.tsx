import { useNavigate } from "react-router-dom"
import Button from "../../components/Button/Button"
import classes from "./Home.module.css"

const Home = () => {

    const navigate = useNavigate()

    return (
        <div className={classes.container}>
            <img src='https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg' />
            <h1>Spotify Index Price</h1>
            <h2>Compare Spotify subscription costs in different countries</h2>
            <Button onClick={() => navigate("/index")}>
                Compare Prices Now
            </Button>
        </div>
    )
}

export default Home