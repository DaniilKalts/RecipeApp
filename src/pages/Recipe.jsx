import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState('instructions');

  const fetchedDetails = async () => {
    const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
    const detailData = await data.json();

    setDetails(detailData);
    console.log(detailData)
  }

  useEffect(() => {
    fetchedDetails();
  },[params.name])

  return (
    <DetailWrapper>
      <div style={{ maxWidth: "34rem" }}>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <Button className={ activeTab === 'instructions' ? 'active' : '' } onClick={() => setActiveTab("instructions")}>Instructions</Button>
        <Button className={ activeTab === 'ingredients' ? 'active' : '' } onClick={() => setActiveTab("ingredients")}>Ingredients</Button>
        {activeTab === 'instructions' && (
          <div>
            <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
            <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
          </div>
        )}
        {activeTab === 'ingredients' && (
          <ul>
            {details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
  margin-top: 8rem;
  margin-bottom: 5rem;
  display: flex;

  @media screen and (max-width: 1400px){
    flex-direction: column;
  }

  @media screen and (max-width: 768px){
    margin-top: 5rem;
    img{
      width: 100%;
    }
  }

  @media screen and (max-width: 575px){
    h3, li {
      font-size: 1.25rem;
    }
  }

  .active{
    background: linear-gradient(35deg, #494949, #313131);
    color: #fff;
  }

  h2{
    margin-bottom: 2rem;
  }

  li{
    font-size: 1.2rem;
    line-height: 2.5rem;
  }

  ul{
    margin-top: 2rem;
  }
`

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: #fff;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
  cursor: pointer;
  @media screen and (max-width: 475px){
    margin-right: 0;
  }
  @media screen and (max-width: 375px){
    width: 100%;
  }
`
const Info = styled.div`
  margin-left: 10rem;
  @media screen and (max-width: 1400px){
    margin-top: 3rem;
    margin-left: 0rem;
  }
`

export default Recipe