
import Movie from "../../js/contollers/Movie.js";

const addMovieForm = document.querySelector("#movies-form")

const updateMovies = async () => {
    const movies = await Movie.getAll()

    const moviesContainer = document.querySelector(".custom-movies-container")

    moviesContainer.innerHTML = ""

    movies.data.forEach(e => {
        moviesContainer.innerHTML += `
            <div class="card-custom-movie" data-movie-id="${e.id}">
                <img src="${e.card}"/>
            </div>
        `
    });

    document.querySelectorAll(`.card-custom-movie`).forEach(async e => {
        e.addEventListener("click", async (ev) => {
            const id = ev.target.dataset.movieId

            const movieData = await Movie.getById(id)

            addMovieForm.idMovie.value = movieData.id
            addMovieForm.titleMovie.value = movieData.title
            addMovieForm.descriptionMovie.value = movieData.description
            addMovieForm.bannerMovie.value = movieData.banner
            addMovieForm.cardMovie.value = movieData.card

            document.querySelector("#movies-form #delete-btn").disabled = false
            document.querySelector("#movies-form #add-btn").innerHTML = "Editar"
            document.querySelector("#movies-form #add-btn").classList.add("edit-btn")
        })
    })

}

document.querySelector("#movies-form #delete-btn").addEventListener("click", (ev) => {
    const id = addMovieForm.idMovie.value

    Movie.delete(id)
})

document.querySelector("#movies-form #reset-btn").addEventListener("click", ev => {
    document.querySelector("#movies-form #add-btn").innerHTML = "Adicionar"
    document.querySelector("#movies-form #add-btn").classList.remove("edit-btn")
    document.querySelector("#movies-form #delete-btn").disabled = true
})

addMovieForm.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const form = ev.target
    const data = {
        title: form.titleMovie.value,
        overview: form.descriptionMovie.value,
        poster_path: form.bannerMovie.value,
        backdrop_path: form.cardMovie.value
    }

    if (!form.idMovie.value) {
        await Movie.add(data)
    } else {
        await Movie.edit(form.idMovie.value, data)
    }

    await updateMovies()

})

await updateMovies()