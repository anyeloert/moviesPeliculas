//hace que no aparezca el boton favoritos al cargar la pagina favoritos

favoritebutton.style.display = 'none'
//Hace que aparezca la barra de busqueda del nav
const navSearch = document.querySelector('.nav__div__search')
navSearch.style.visibility = 'visible'



//grid de los favoritos
const gridSearchedMoviesFavorites =  userFavorites => {
    const gridMoviesResult = document.createElement('div')
    gridMoviesResult.classList.add('gridMoviesResult') 

    userFavorites.forEach(async favoriteId => {
        //hacer consulta de pelicula por ID
        const movie =await queryById(favoriteId)
        gridMoviesResult.appendChild( await gridMoviesFavoritesOrSearched('favorite', movie))
    })
    body.appendChild(gridMoviesResult)
}




//Al cargar la pagina favoritos muestra los favoritos del usuario o avisa que aun no tiene
window.addEventListener('load', () => {
    userFavorites === null
        ?userFavorites = []
        : null

    userFavorites.length === 0 || userFavorites === null
    ? document.querySelector('.no_favorites').style.display = 'block'
    : gridSearchedMoviesFavorites(userFavorites)
})
