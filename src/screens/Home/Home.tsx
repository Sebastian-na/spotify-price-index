import { useNavigate } from "react-router-dom"
import Button from "../../components/Button"
import classes from "./Home.module.css"
import { motion } from "framer-motion"
import { fadeInOut } from "../../consts/fadeInOutAnimation"

const Home = () => {

    const navigate = useNavigate()

    return (
        <motion.div variants={fadeInOut} initial='initial' animate='animate' exit='exit'>
            <div className={classes.container}>
                <img src='https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg' />
                <h1>Spotify Price Index</h1>
                <h2>Compare Spotify subscription costs in different countries</h2>
                <Button onClick={() => navigate("/index")}>
                    Compare Prices Now
                </Button>
            </div>
        </motion.div>
    )
}

export default Home