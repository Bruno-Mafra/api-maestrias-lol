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
        <div className='CardContainer'>
            <h2 className='CardTitle'>{championInfo.name}</h2>
            <div className='ImgContainer'>
                <img src={`${championImgLink}${championInfo.id}_0.jpg`} alt={'Imagem'} />
            </div>
            <div className='CardInfo'>
                <p><strong>Nível de Mestria:</strong> {maestryLevel}</p>
                <p><strong>Pontos de Maestria:</strong> {championPoints}</p>
            </div>
            <Link to={'/' + championInfo.id}>
                <span className='link'></span>
            </Link>
        </div>
    )
};

export default Card;
