import React from 'react'
import './PlayerDisplay.css'

type PlayerDisplayProps = {
  summonerName: string;
  summonerLevel: number;
  summonerIconId: number;
}

const iconLink = 'https://ddragon.leagueoflegends.com/cdn/12.16.1/img/profileicon/'

const PlayerDisplay: React.FC<PlayerDisplayProps> = ({ summonerName, summonerLevel, summonerIconId }) => {
  return (
    <div className='PDContainer'>
      <div className='PDImgContainer'>
        <img className='PDImg' src={`${iconLink}${summonerIconId}.png`}/>
      </div>
      <div className='Info'>
        <p> <strong>Nome de invocador:</strong> {summonerName}</p>
        <p><strong>Nível:</strong> {summonerLevel}</p>
      </div>
    </div>
  )
}

export default PlayerDisplay
