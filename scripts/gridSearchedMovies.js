let body = document.querySelector('.body')
const userPassword = JSON.parse(localStorage.getItem('login'))
let userFavorites = JSON.parse(localStorage.getItem(userPassword));


//Permite agregar el vaue del boton añadir a favoritos dinamicamente
const favoriteButtonValue = (favoriteOrSearched, movie) => {
    if (favoriteOrSearched === 'searched'){
        if (userFavorites === null || userFavorites.includes(movie.imdbID) === false){            
           return 'Añadir a Favoritos'
        }else if (userFavorites.includes(movie.imdbID)){
            return 'Quitar de favoritos'
        }  
    }else return 'Quitar de favoritos'
}

//Metodo para las acciones de los botones añadir favoritos
const buttonsFavoritesAction = (favoriteOrSearched, favotiteButton, movie, containerMovie) => {
    if (favoriteOrSearched === 'searched'){
        favotiteButton.addEventListener('click', () => { 
            if (favotiteButton.getAttribute('value') === 'Add to favorites'){
                if (userFavorites === null){
                    userFavorites = [movie.imdbID]  
                }  else{
                    userFavorites.push(movie.imdbID)
                }
                localStorage.setItem(userPassword, JSON.stringify(userFavorites))
                favotiteButton.setAttribute('value', 'Remove from favorites')
            }else{
                userFavorites = userFavorites.filter(favorite => favorite !== movie.imdbID)
                localStorage.setItem(userPassword, JSON.stringify(userFavorites))
                favotiteButton.setAttribute('value', 'Remove from favorites')
            }
            
        })
    }else{
        favotiteButton.addEventListener('click', () => { 
            userFavorites = userFavorites.filter(favorite => favorite !== movie.imdbID)
            localStorage.setItem(userPassword, JSON.stringify(userFavorites))
            containerMovie.remove() 
            // si no quedan favoritos muestra aviso
            if(userFavorites.length === 0){
                document.querySelector('.no_favorites').style.display = 'block'
            }       
        })
    }
}

// Query para la busqueda de informacion de una pelicula en particular a partir de su id
const queryById = async movieId => {

    const urlSearch = `https://www.omdbapi.com/?i=${movieId}&apikey=1d0b1392&plot=full`
    const movieQuery = await axios.get(urlSearch)
    return movieQuery.data
}



//metodo que crea el elemento donde se mostrara la informacion de la pelicula seleccionada

const getInformationMovie =async movieId => {
    const movie = await queryById(movieId)
    const informationMovie = document.createElement('div')
    informationMovie.classList.add('gridMoviesResult__div__info')
    const title = document.createElement('h1')
    title.classList.add('gridMoviesResult__div__info__title')
    title.innerHTML = movie.Title    
    const yearContent = document.createElement('div')
    yearContent.classList.add('gridMoviesResult__div__info__main')
    const spanYear = document.createElement('span')
    spanYear.classList.add('gridMoviesResult__div__info__span')
    spanYear.innerHTML = "Year: "
    const spanYearContent = document.createElement('span')
    spanYearContent.classList.add('gridMoviesResult__div__info__span__content')
    spanYearContent.innerHTML = movie.Year
    const genresContent = document.createElement('div')
    genresContent.classList.add('gridMoviesResult__div__info__main')
    const spanGenres = document.createElement('span')
    spanGenres.classList.add('gridMoviesResult__div__info__span')
    spanGenres.innerHTML = "Genres: "
    const spanGenresContent = document.createElement('span')
    spanGenresContent.classList.add('gridMoviesResult__div__info__span__content')

    spanGenresContent.innerHTML = movie.Genre
    const sinopsysContent = document.createElement('div')
    sinopsysContent.classList.add('gridMoviesResult__div__info__main')

    const spanSinopsys = document.createElement('span')
    spanSinopsys.classList.add('gridMoviesResult__div__info__span')
    spanSinopsys.innerHTML = "Sinopsys: "
    const spanSinopsysContent = document.createElement('span')
    spanSinopsysContent.classList.add('gridMoviesResult__div__info__span__content')

    spanSinopsysContent.innerHTML = movie.Plot    
    const castingContent = document.createElement('div')
    castingContent.classList.add('gridMoviesResult__div__info__main')

    const spanCasting = document.createElement('span')
    spanCasting.classList.add('gridMoviesResult__div__info__span')
    spanCasting.innerHTML = "Casting: "
    const spanCastingContent = document.createElement('span')
    spanCastingContent.classList.add('gridMoviesResult__div__info__span__content')
    spanCastingContent.innerHTML = movie.Actors

    yearContent.appendChild(spanYear)
    yearContent.appendChild(spanYearContent)
    genresContent.appendChild(spanGenres)
    genresContent.appendChild(spanGenresContent)
    sinopsysContent.appendChild(spanSinopsys)
    sinopsysContent.appendChild(spanSinopsysContent)

    castingContent.appendChild(spanCasting)
    castingContent.appendChild(spanCastingContent)
    informationMovie.appendChild(title)
    informationMovie.appendChild(yearContent)
    informationMovie.appendChild(genresContent)
    informationMovie.appendChild(sinopsysContent)
    informationMovie.appendChild(castingContent)
    return informationMovie
}


//metodo que muestra y oculta la info de una pelicula

const showHideInfo = (informationMovie) => {
    informationMovie.style.display === 'block'
        ? informationMovie.style.display = 'none'
        : informationMovie.style.display = 'block'
}

// metodo que crea la maqueta para presentar un grupo de peliculas
const gridMoviesFavoritesOrSearched = async (favoriteOrSearched, movie) => {
    const containerMovie = document.createElement('div')
    containerMovie.classList.add('gridMoviesResult__div')
    const containerA = document.createElement('div')    
    containerA.classList.add('gridMoviesResult__div__container') 
    const containerMovieLink = document.createElement('div')
    containerMovieLink.classList.add('gridMoviesResult__div__a') 
    
   

    const img = document.createElement('img')        
    img.setAttribute('src', movie.Poster)
    img.classList.add('gridMoviesResult__div__a__img')
    const titleImage = document.createElement('p')
    titleImage.innerHTML = `${movie.Title} (${movie.Year})`
    titleImage.classList.add('gridMoviesResult__div__a__p')
    const favotiteButton = document.createElement('input')
    favotiteButton.setAttribute('type', 'button')

    favotiteButton.classList.add('gridMoviesResult__div__a__button')

    
    //agrega 'añadir a favoritos' o 'quitar de favoritos' a los botones de manera dinamica
    favotiteButton.setAttribute('value', favoriteButtonValue(favoriteOrSearched, movie))    
    

    // crea el elemento donde se mostrara la informacion de la pelicula seleccionada
    const informationMovie = await getInformationMovie(movie.imdbID)

    //Mostrar y ocultar informacion de la pelicula al hacer click
    containerMovieLink.addEventListener('click', () => showHideInfo(informationMovie))
    
    
    containerMovieLink.appendChild(img)
    containerMovieLink.appendChild(titleImage)
    containerA.appendChild(containerMovieLink)
    containerA.appendChild(favotiteButton)
    containerMovie.appendChild(containerA)
    containerMovie.appendChild(informationMovie)

    //accion de los botones añadir favoritos
    buttonsFavoritesAction(favoriteOrSearched, favotiteButton, movie, containerMovie)       
    return containerMovie
}


//metodo que crea la visualizacion de las miniaturas de las peliculas resultantes de la busqueda

const gridSearchedMovies = async queryResult => {
    const gridMoviesResult = document.createElement('div')
    gridMoviesResult.classList.add('gridMoviesResult') 
    const moviesData = queryResult.data.Search 
    console.log(moviesData);
    // crear toda la maqueta de las peliculas de la busqueda
    moviesData.forEach( async movie => gridMoviesResult.appendChild( await gridMoviesFavoritesOrSearched('searched', movie, gridMoviesResult)))
    body.appendChild(gridMoviesResult)
}




