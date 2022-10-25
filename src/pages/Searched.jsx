import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

function Searched() {
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    let [searching, setSearching] = useState([false]);
    let params = useParams();

    const getSearched = async (name) => {
        setSearching(true)
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`);
        const recipes = await data.json();
        setSearchedRecipes(recipes.results)
        setSearching(false)
    }

    useEffect(() => {
        getSearched(params.search);
    },[params.search])


    return (
        <Grid>
            {searchedRecipes.map((item) => {
                return(
                    <Card key={item.id}>
                        <Link to={'/recipe/' + item.id}>
                            <img src={item.image} alt={item.title} />
                            <h4>{item.title}</h4>
                        </Link>
                    </Card>
                )
            })}
            { !searchedRecipes.length && !searching && (
                <p style={{ fontSize: "1.5rem" }}>No exact matches found with <span style={{ fontWeight: "bold" }}>"{params.search}"</span></p>
            ) }
        </Grid>
    )
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    grid-gap: 3rem;
`

const Card = styled.div`
    transition: 0.2s;
    &:hover{
        transform: scale(0.95);
    }
    img{
        width: 100%;
        border-radius: 2rem;
    }
    a{
        text-decoration: none;
    }
    h4{
        text-align: center;
        padding: 1rem;
    }
`

export default Searched