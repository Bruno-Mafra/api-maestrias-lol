import { useEffect, useState } from 'react'

import BuscarPlayer from './components/BuscarPlayer'
import PlayerDisplay from './components/PlayerDisplay'
import Loading from './components/Loading'
import Card from './components/Card'

import './App.css'

const apiKey = 'RGAPI-bd70ef96-3206-4c91-be77-87105ce31a71'
const lolLink = 'https://br1.api.riotgames.com/lol/'

type allMasteriesProps = {
  championId: number
  championLevel: number 
  championPoints: number
}

type playerInfoProps = {
  id: string
  name: string
  summonerLevel: number
  profileIconId: number
}

function App() {
  const [allMasteries, setAllMasteries] = useState<allMasteriesProps[]>([])
  const [playerInfo, setPlayerInfo] = useState<playerInfoProps>({id: "", name: "", summonerLevel: 0, profileIconId: 0})
  const [playerNickname, setPlayerNickname] = useState<string>()
  const [notFound, setNotFound] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const getPlayerEncryptedId = async () => {
    try {
      const res = await fetch(`${lolLink}summoner/v4/summoners/by-name/${playerNickname}?api_key=${apiKey}`)
      const data = await res.json()
      setPlayerInfo(data)
      setNotFound(false)
    } catch (e) {
      setPlayerInfo({id: "", name: '', summonerLevel: 0, profileIconId: 0})
      setAllMasteries([])
      setLoading(false)
      console.error(e)
      setNotFound(true)
    }
  }

  const getAllMasteries = async () => {
    try {
      const res = await fetch(`${lolLink}champion-mastery/v4/champion-masteries/by-summoner/${playerInfo.id}?api_key=${apiKey}`)
      const data = await res.json()
      setAllMasteries([...data])
      setLoading(false)
      setNotFound(false)
    } catch (e) {
      setLoading(false)
      setNotFound(true)
      console.error(e)
    }
  }
  
  useEffect(() => {
    if (playerInfo.id) {
    getAllMasteries()
    }
  }, [playerInfo])

  useEffect(() => {
    if (playerNickname) {
      getPlayerEncryptedId()
      setLoading(true)
    }
  }, [playerNickname])

  return (
    <div className="App">
      <h1>PLAYER MAESTRY LEVELLLLLLLLLL</h1>
      <BuscarPlayer setNickname={setPlayerNickname} />
      <span className={notFound ? undefined : 'NotFound'}>Esse nome de invocador não foi encontrado!</span>
      {loading ? <Loading/> :
        <div>
          {playerInfo.id &&
            <div>
              <h2>SUMMONER'S INFO</h2> 
              <PlayerDisplay
                summonerName={playerInfo.name}
                summonerLevel={playerInfo.summonerLevel}
                summonerIconId={playerInfo.profileIconId} />
              <h2>MAESTRY RANK</h2>
              <div className="CardTable">
                {allMasteries.map((mastery, i) =>
                  <Card
                    key={i}
                    idChampion={mastery.championId}
                    maestryLevel={mastery.championLevel}
                    championPoints={mastery.championPoints} />)
                }
              </div>
            </div>
          }
        </div>
      }

    </div>
  )
};

export default App
