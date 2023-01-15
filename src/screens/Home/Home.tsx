import { useNavigate } from "react-router-dom"
import Button from "../../components/Button"
import classes from "./Home.module.css"
import { motion } from "framer-motion"
import { fadeInOut } from "../../consts/fadeInOutAnimation"
import Typography from "../../components/Typography/Typography"

const Home = () => {

    const navigate = useNavigate()

    return (
        <motion.div variants={fadeInOut} initial='initial' animate='animate' exit='exit'>
            <div className={classes.container}>
                <img src='https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg' />
                <Typography variant='h1' animated center size="clamp(2rem, 6vw, 3.75rem)">Spotify Price Index</Typography>
                <Typography component='h2' variant='subheading1' animated center size="clamp(1rem, 4vw, 1.25rem)">Compare Spotify subscription costs in different countries</Typography>
                <Button onClick={() => navigate("/index")}>
                    Compare Prices Now
                </Button>
            </div>
        </motion.div>
    )
}

export default Home