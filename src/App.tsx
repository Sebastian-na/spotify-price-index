import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './screens/Home/Home'
import SpotifyIndex from './screens/SpotifyIndex/SpotifyIndex'

const App = () => {
    const location = useLocation()
    return (
        <Routes key={location.pathname} location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/index" element={<SpotifyIndex />} />
        </Routes>
    )
}

export default App