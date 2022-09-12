import React from 'react'
import { useEffect, useState } from 'react'

import BuscarPlayer from '../components/BuscarPlayer'
import PlayerDisplay from '../components/PlayerDisplay'
import Loading from '../components/Loading'
import Card from '../components/Card'

import './Home.css'

const championsInfoLink = 'https://ddragon.leagueoflegends.com/cdn/12.16.1/data/pt_BR/champion.json'
const apiKey = 'RGAPI-ecd11e2e-e66c-427b-a360-de9541fc5df4'
const lolLink = 'https://br1.api.riotgames.com/lol/'

type playerInfoProps = {
  id: string
  name: string
  summonerLevel: number
  profileIconId: number
}

type allMasteriesProps = {
  championId: number
  championLevel: number 
  championPoints: number
}

interface championsInfoProps {
  key: number;
  name: string; 
  id: string;
}

const Home: React.FC<{}> = () => {
  const [allMasteries, setAllMasteries] = useState<allMasteriesProps[]>([])
  const [championsInfo, setChampionsInfo] = useState<championsInfoProps[]>([])
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
  
  const getChampionsInfo = async () => {
    const res = await fetch(`${championsInfoLink}`)
    const data = await res.json()
    setChampionsInfo(Object.values(data.data))
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

  useEffect(() => {
    getChampionsInfo()
  }, [])

  return (
    <div className="Home">
      <h1>PLAYER MAESTRY LEVEL</h1>
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
                      championsInfo={championsInfo}
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

export default Home
