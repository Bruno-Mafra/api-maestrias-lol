import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import './ChampionInfoCard.css'

type ChampionInfoCardProps = {
  championsInfo: championInfoProps[];
}

interface championInfoProps {
  name: string; 
  id: string;
  title: string;
  blurb: string;
}

const ChampionInfoCard: React.FC<ChampionInfoCardProps> = ({championsInfo}) => {

  const [championInfo, setChampionInfo] = useState<championInfoProps>({name: '', id: '', title: '', blurb: ''})

  const params = useParams()

  useEffect(() => {
    for (var i = 0; i < championsInfo.length; i++) {
      if (championsInfo[i].id == params.id)
          setChampionInfo(championsInfo[i]);
    }
  }, [championsInfo])

  return (
    <div>
      <p>{championInfo.name}</p>
      <p>{championInfo.title}</p>
      <p>{championInfo.blurb}</p>
    </div>
  )
}

export default ChampionInfoCard;