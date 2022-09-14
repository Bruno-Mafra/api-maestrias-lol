import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useNavigate } from 'react-router-dom';

import './ChampionInfoPage.css'

interface championInfoProps {
  name: string; 
  id: string;
  title: string;
  lore: string;
}

const ChampionInfoPage: React.FC<{}> = () => {

  const [championInfo, setChampionInfo] = useState<championInfoProps>({name: '', id: '', title: '', lore: ''})

  const navigate = useNavigate();
  const slug: string = useParams().id || ''

  const getChampionInfo = async () => {
    const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/12.16.1/data/pt_BR/champion/${slug}.json`)
    const data = await res.json()
    setChampionInfo(data.data[slug])
    window.sessionStorage.setItem(`${slug}Info`, JSON.stringify(data.data[slug]));
  }

  useEffect(() => {
    if (window.sessionStorage.getItem(`${slug}Info`) === null)
    getChampionInfo()
    else
    setChampionInfo(JSON.parse(window.sessionStorage.getItem(`${slug}Info`)!))
  }, [])

  return (
    <div>
      <div className="backButton">
        <button onClick={() => navigate("/", { state: 'fromChampion' })}>
          Voltar para a Home
        </button>
      </div>
      <p>{championInfo.name}</p>
      <p>{championInfo.title}</p>
      <p>{championInfo.lore}</p>
    </div>
  )
}

export default ChampionInfoPage;