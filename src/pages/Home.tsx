import React from 'react'
import { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom';

import BuscarPlayer from '../components/BuscarPlayer'
import PlayerDisplay from '../components/PlayerDisplay'
import Loading from '../components/Loading'
import Card from '../components/Card'

import logo from '../imgs/homeThumb.webp';
import './Home.css'

const championsInfoLink = 'https://ddragon.leagueoflegends.com/cdn/12.17.1/data/pt_BR/champion.json'
const apiKey = 'RGAPI-e618d991-f357-409e-8787-bbed2c5dd05f'
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
  window.history.replaceState({}, '') // reseta o estado se a pagina for atualizada
  
  const [allMasteries, setAllMasteries] = useState<allMasteriesProps[]>([])
  const [championsInfo, setChampionsInfo] = useState<championsInfoProps[]>([])
  const [playerInfo, setPlayerInfo] = useState<playerInfoProps>({id: "", name: "", summonerLevel: 0, profileIconId: 0})
  const [playerNickname, setPlayerNickname] = useState<string>()
  const [notFound, setNotFound] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const location = useLocation()

  const getPlayerEncryptedId = async () => {
    try {
      const res = await fetch(`${lolLink}summoner/v4/summoners/by-name/${playerNickname}?api_key=${apiKey}`)
      const data = await res.json()
      setPlayerInfo(data)
      setNotFound(false)
      window.sessionStorage.setItem('playerInfo', JSON.stringify(data));
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
      window.sessionStorage.setItem('playerMasteryInfo', JSON.stringify([...data]));
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
    window.localStorage.setItem('championsInfo', JSON.stringify(Object.values(data.data)));
  }

  useEffect(() => {
    if (playerInfo.id && playerNickname) { // assim só faz a requisição quando vem do input
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
    if(location.state === 'fromChampion') { //verifica se acabou de sair da outra pagina
      setPlayerInfo(JSON.parse(window.sessionStorage.getItem('playerInfo') || '{}'))
      setAllMasteries(JSON.parse(window.sessionStorage.getItem('playerMasteryInfo') || '{}'))
    }

    if (window.localStorage.getItem('championsInfo') === null)
      getChampionsInfo()
    else
      setChampionsInfo(JSON.parse(window.localStorage.getItem('championsInfo')!))
  }, [])

  return (
    <div className="Home">
      <div className='logoContainer'>
        <img className='logo' src={logo}></img>
      </div>
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
