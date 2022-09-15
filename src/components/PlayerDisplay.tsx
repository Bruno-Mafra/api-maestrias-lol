import React from 'react'
import './PlayerDisplay.css'

type PlayerDisplayProps = {
  summonerName: string;
  summonerLevel: number;
  summonerIconId: number;
}

const iconLink = 'https://ddragon.leagueoflegends.com/cdn/12.17.1/img/profileicon/'

const PlayerDisplay: React.FC<PlayerDisplayProps> = ({ summonerName, summonerLevel, summonerIconId }) => {
  return (
    <div className='PDContainer'>
      <div 
        className='PDImgContainer'
        style={{backgroundImage:`url(${iconLink}${summonerIconId}.png)`}}>
      </div>
      <img className='PDImg' src={`${iconLink}${summonerIconId}.png`}/>
      <p className='Info summonerName'><strong>Invocador: </strong>{summonerName}</p>
      <p className='Info level'><strong>Nível: </strong> {summonerLevel}</p>
    </div>
  )
}

export default PlayerDisplay
