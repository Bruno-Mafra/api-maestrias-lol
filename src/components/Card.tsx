import { useState, useEffect } from 'react';
import './Card.css'

interface CardProps {
    maestryLevel: number;
    idChampion: number;
    championPoints: number;
};

interface championInfoProps {
    key: number;
    name: string; 
    id: number;
}

const championInfoLink = 'http://ddragon.leagueoflegends.com/cdn/12.16.1/data/pt_BR/champion.json'
const championImgLink = 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/'

const Card: React.FC<CardProps> = ({ maestryLevel, idChampion, championPoints}) => {
    const [championInfo, setChampionInfo] = useState<championInfoProps[]>([])

    const getChampionInfo = async () => {
        const res = await fetch(`${championInfoLink}`)
        const data = await res.json()
        setChampionInfo(Object.values(data.data))
    }

    const getChampionName = (idChampion: number) => {
        for (var i = 0; i < championInfo.length; i++) {
            if (championInfo[i].key == idChampion)
                return championInfo[i].name;
        }
        return 'Desconhecido*';
    }

    const getChampionImg = (idChampion: number) => {
        for (var i = 0; i < championInfo.length; i++) {
            if (championInfo[i].key == idChampion)
                return `${championImgLink}${championInfo[i].id}_0.jpg`;
        }
        return '';
    }

    useEffect(() => {
        getChampionInfo()
    }, [])

    return (
        <div className='CardContainer'>
            <h2 className='CardTitle'>{getChampionName(idChampion)}</h2>
            <div className='ImgContainer'>
                <img src={getChampionImg(idChampion)} alt={'Imagem'} />
            </div>
            <div className='CardInfo'>
                <p><strong>Nível de Mestria:</strong> {maestryLevel}</p>
                <p><strong>Pontos de Maestria:</strong> {championPoints}</p>
            </div>
        </div>
    )
};

export default Card;