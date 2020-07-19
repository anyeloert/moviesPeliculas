const logOut = document.querySelector('.nav__div__log_out_button')//boton cerrar sesion
const searchButton = document.querySelector('.movie__button')// boton buscar
const searchButtonNav = document.querySelector('.nav__div__search__button')// boton buscar
const favoritebutton = document.querySelector('.nav__div__favorites_button')//boton favoritos

//variable page de la request a la api de omdb
let page = 1
//resultado de la consulta a la api
let queryResult = ''


//redireccionamiento del boton favoritos
favoritebutton.addEventListener('click', () => location.href='/favorites.html')


//logica para el boton de cerrar sesion
logOut.addEventListener('click', () => {
    localStorage.removeItem('login')
    location.href='/index.html'
})

//logica para hacer peticion a la API de OMDB
const handleClickSearchButton = async inputValue  =>  {
    console.log(page);
    
    const urlSearch = `https://www.omdbapi.com/?s=${inputValue}&apikey=1d0b1392&plot=full&page=${page}`
    const searchResult = await axios.get(urlSearch)
    page +=1
    return searchResult 
    
}
// advertencia al dejar el campo buscar vacio
const ShowEmptyWarning = () => {   
    const warningInputEmpty =  document.querySelector('.warning__input_empty')
    warningInputEmpty.style.visibility = 'visible'
    setTimeout(() => {
        warningInputEmpty.style.visibility = 'hidden'
    }, 3000);
}

//Elimina la barra de busqueda para dar paso a los resultados y hace aparecer la barra de busqueda en el nav

const removeSearchBar = (inputValue) => {
    const barSerchNav = document.querySelector('.nav__div__search')
    const barSerchNavInmput = document.querySelector('.nav__div__search__input')
    if (document.querySelector('.movie')){

        document.querySelector('.movie').style.display = 'none'
    }
    barSerchNav.style.visibility = 'visible'    
    barSerchNavInmput.setAttribute('value', inputValue)
}

//Accion de los botones Buscar
const SearchButtonAction =async classTextArea => {
    
    if(page !== 1) page = 1
    const inputValue = document.querySelector(`.${classTextArea}`).value 
    if (inputValue === ''){
        ShowEmptyWarning()
        return
    }   
    localStorage.setItem('inputValue',inputValue)
    removeSearchBar(inputValue)
    queryResult =await handleClickSearchButton(inputValue)
    //muestra avertencia de que no encontro peliculas con tu busqueda
    if(queryResult.data.Response === 'False'){
        document.querySelector('.no_movies_found').style.visibility = 'visible'
        return
    }
    gridSearchedMovies(queryResult)
    findPageEnd()
}

//buscador principal
if (searchButton){

    searchButton.addEventListener('click', () => {
        SearchButtonAction('movie__input')
    })
}

//buscador del navbar
searchButtonNav.addEventListener('click', () => {
    const gridMoviesResult = document.querySelectorAll('.gridMoviesResult') 
    console.log(gridMoviesResult);
    const noMoviesFound = document.querySelector('.no_movies_found').style
    if (document.querySelector('.no_favorites')){

        let nofavoritesWarning = document.querySelector('.no_favorites').style
        if (nofavoritesWarning.display !== 'none') nofavoritesWarning.display ='none'
    }
    for (const gridmovie of gridMoviesResult){

        body.removeChild(gridmovie)
    }
    
    if (noMoviesFound.visibility === 'visible' ) noMoviesFound.visibility ='hidden'
    
    
        

    SearchButtonAction('nav__div__search__input')  
    //aparece el boton de favoritos si esta oculto
    document.querySelector('.nav__div__favorites_button').style.display = 'block'
})

//codigo que detecta el fin de pagina y carga mas elementos
const findPageEnd = () => {
    window.addEventListener('scroll',async () => {
        if(window.scrollY + window.innerHeight === body.clientHeight){  
            console.log(page);      
            queryResult =await handleClickSearchButton(localStorage.getItem('inputValue'))
            if(queryResult.data.Response === 'False'){
                const noMoreMovies = document.createElement('div')
                noMoreMovies.classList.add('no_movies_found')
                noMoreMovies.style.display = 'block'
                noMoreMovies.innerHTML = 'No more Movies'
                body.appendChild(noMoreMovies)
                return
            }
            gridSearchedMovies(queryResult)
    
        }
    
    })
}


