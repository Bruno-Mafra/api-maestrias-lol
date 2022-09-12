import './Card.css'

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

const championImgLink = 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/'

const Card: React.FC<CardProps> = ({ championsInfo, maestryLevel, idChampion, championPoints}) => {

    const getChampionName = (idChampion: number) => {
        for (var i = 0; i < championsInfo.length; i++) {
            if (championsInfo[i].key == idChampion)
                return championsInfo[i].name;
        }
        return 'Desconhecido*';
    }

    const getChampionId = (idChampion: number) => {
        for (var i = 0; i < championsInfo.length; i++) {
            if (championsInfo[i].key == idChampion)
                return championsInfo[i].id;
        }
        return '';
    }

    return (
        <div className='CardContainer'>
            <h2 className='CardTitle'>{getChampionName(idChampion)}</h2>
            <div className='ImgContainer'>
                <img src={`${championImgLink}${getChampionId(idChampion)}_0.jpg`} alt={'Imagem'} />
            </div>
            <div className='CardInfo'>
                <p><strong>Nível de Mestria:</strong> {maestryLevel}</p>
                <p><strong>Pontos de Maestria:</strong> {championPoints}</p>
            </div>
            <Link to={'/' + getChampionId(idChampion)}>
                <span className='link'></span>
            </Link>
        </div>
    )
};

export default Card;

//melhorar a questão do uso do for que esta sendo realizado duas vezes com o getChampionId, tem que ficar armazenado a info em algum canto