import { useState } from 'react';
import './Card.css'

interface CardProps {
    maestryLevel: number;
    idChampion: number;
    championPoints: number;
    championInfo: championInfoProps[];
};

interface championInfoProps {
    key: number;
    name: string; 
    id: number;
  }

const championImgLink = 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/'

const Card: React.FC<CardProps> = ({ championInfo, maestryLevel, idChampion, championPoints}) => {

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