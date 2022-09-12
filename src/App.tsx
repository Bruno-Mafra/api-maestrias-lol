import Home from './pages/Home'
import ChampionInfoPage from './pages/ChampionInfoPage'

import { BrowserRouter as Router, Routes as Switch, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route element={<Home/>} path='/'/>
        <Route element={<ChampionInfoPage/>} path='/:id'/>
      </Switch>
    </Router>
  )
};

export default App
