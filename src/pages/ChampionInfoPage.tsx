import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useNavigate } from 'react-router-dom';

import SkinsSlider from "../components/SkinsSlider";

import './ChampionInfoPage.css'

interface championInfoProps {
  name: string; 
  id: string;
  title: string;
  lore: string;
  tags: string[];
  skins: skin[];
}
interface skin {
  name: string
  chromas: false
  num: number
}

const ChampionInfoPage: React.FC<{}> = () => {

  const [championInfo, setChampionInfo] = useState<championInfoProps>({name: '', id: '', title: ' ', lore: '', tags: [], skins: []})

  const navigate = useNavigate();
  const slug: string = useParams().id || ''

  const getChampionInfo = async () => {
    const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/12.17.1/data/pt_BR/champion/${slug}.json`)
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
      <div className="buttonDiv Top">
        <button className="backButton Top" onClick={() => navigate("/", { state: 'fromChampion' })}>
          Voltar para a Home
        </button>
      </div>
      <div className="infoContainer">
        <h1 className="name">{championInfo.name}</h1>
        <h2 className="title">{`${championInfo.title[0].toUpperCase()}${championInfo.title.slice(1)}`}</h2>
      </div>
      <SkinsSlider slug={slug} skins={championInfo.skins}/>
      <div className="infoContainer infoBaixo">
        <h3 className="bio">{'Biografia'}</h3>
        <p className="lore">{championInfo.lore}</p>
        <h4 className="tags">{'Classe: ' + championInfo.tags[0]}</h4>
      </div>
      <div className="buttonDiv Bottom">
        <button className="backButton Bottom" onClick={() => navigate("/", { state: 'fromChampion' })}>
          Voltar para a Home
        </button>
      </div>
    </div>
  )
}

export default ChampionInfoPage;