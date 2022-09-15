import './Card.css'

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface CardProps {
    maestryLevel: number;
    idChampion: number;
    championPoints: number;
    championsInfo: championInfoProps[];
};

interface championInfoProps {
    key: number;
    name: string; 
    id: string;
  }

const championImgLink = 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/'

const Card: React.FC<CardProps> = ({ championsInfo, maestryLevel, idChampion, championPoints}) => {

    const [championInfo, setChampionInfo] = useState<championInfoProps>({key:0, name:'', id:''})

    const getChampionInfo = () => {
        for (var i = 0; i < championsInfo.length; i++) {
            if (championsInfo[i].key == idChampion) {
                setChampionInfo(championsInfo[i])
                break
            }
        }
    }

    useEffect(() => {
        getChampionInfo()
    }, [])

    return (
        <div className='cardContainer'>   
            <img className='backImg' src={`${championImgLink}${championInfo.id}_0.jpg`}/>
            <h2 className='cardTitle'>{championInfo.name}</h2>
            <div className='cardInfo'>
                <p><strong>Nível de Maestria:</strong> {maestryLevel}</p>
                <p><strong>Pontos de Maestria:</strong> {championPoints}</p>
            </div>
            <Link to={'/' + championInfo.id}>
                <span className='link'></span>
            </Link>
        </div>
    )
};

export default Card;
