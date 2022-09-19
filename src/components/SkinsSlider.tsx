import "../../node_modules/slick-carousel/slick/slick.css"
import "../../node_modules/slick-carousel/slick/slick-theme.css"
import './SkinsSlider.css'

import Slider from 'react-slick'

const championImgLink = 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/'

type SkinsSliderProps = {
  skins: skin[]
  slug: string
}

type skin = {
  name: string
  chromas: false
  num: number
}

const SkinsSlider: React.FC<SkinsSliderProps> = ({ skins, slug }) => {

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: false
  };

  return (
    <div className='sliderDiv'>
      <Slider className='slider' {...settings}>
        {skins.map((skin, i) =>
          <div key={i} className='skins'>
            <img className="skinImg" src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${slug}_${skin.num}.jpg`} alt={skin.name}/>
            <span className="skinName">{skin.name === 'default' ? 'Skin Base' : skin.name}</span>
          </div>)
        }
      </Slider>
    </div>
  )
}

export default SkinsSlider