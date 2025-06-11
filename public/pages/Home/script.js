
const reqUrl = "https://api.themoviedb.org"

const reqHeaders = new Headers({
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjM4OWY1ZTNmZWZmYmQ2YmJjYjAxYmM3Y2IyNjkyMyIsIm5iZiI6MTY1NTkxOTU2NC43NjE5OTk4LCJzdWIiOiI2MmIzNTNjYzM4NzY1MTA1ZWJkNzQ0ZTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7N_VRoTr3BKnzD25OITjHqDaxFf9IfRH6UlwS1b9EqY"
})

const reqInit = {
    method: "GET",
    headers: reqHeaders,
    mode: "cors",
    cache: "no-cache"
}

const requisicoes = {
    movieDiscover: async (page = 1, genre = "") => {
        const data = await fetch(`${reqUrl}/3/discover/movie?page=${page}&language=pt-BR&${genre != "" ? `genre=${genre}` : ""}`, reqInit)
            .then(res => res.json())
            .then(json => {
                return json
            })

        return data
    },
    genres: async () => {
        const data = await fetch(`${reqUrl}/3/genre/movie/list`, reqInit)
            .then(res => res.json())
            .then(json => {
                return json
            })

        return data
    },
}

randInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min)) + min
}

const init = async () => {
    const moviesData = await requisicoes.movieDiscover(randInt(1, 10))

    console.log(moviesData);
    


    const highlightImg = document.querySelector("#highlightImg");
    const highlightTitle = document.querySelector("#highlightTitle");
    const movieHighlightIndex = randInt(0, 19)
    highlightImg.src = `http://image.tmdb.org/t/p/w1920${moviesData.results[movieHighlightIndex].backdrop_path}`
    highlightTitle.innerHTML = `${moviesData.results[movieHighlightIndex].title}`
    document.querySelector(".movie-infos .buttons .info").href = `../Descricao?idfilme=${moviesData.results[movieHighlightIndex].id}`

    let genres = await requisicoes.genres()
    genres = genres.genres

    const main = document.querySelector("main")

    genres.forEach(async (e, i) => {
        
        main.innerHTML += `
        <div class="row-list">
        <span class="genre-title">${e.name}</span>
            <div class="movies-caroussel-container">
                <div class="movies-caroussel-content" data-identifyer="${i}">
                
                </div>
            </div>
        </div>
        `



        requisicoes.movieDiscover(i + 1, e.id).then((data) => {
            
            
            data.results.forEach((el) => {
                const carousselContent = document.querySelector(`[data-identifyer="${i}"]`)

                carousselContent.innerHTML += `
                    <div class="movie">
                        <img src="http://image.tmdb.org/t/p/w500${el.backdrop_path}" alt="">
                        <a href="../Descricao?idfilme=${el.id}">
                            <div class="movie-info-container">
                                <span class="movie-title">${el.title}</span>
                                <p class="movie-resume">${el.overview}</p>
                            </div>
                        </a>
                    </div>
                `
            })
            console.log(data);
            
        })


    })

    document.querySelector(".open-menu-mobile").addEventListener("click", (ev) => {
        
        ev.target.classList.toggle("open")
        document.querySelector("header").classList.toggle("open")
    })


    document.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            document.querySelector("header").classList.add("scrolled")
        } else {
            document.querySelector("header").classList.remove("scrolled")
        }
    })
}

window.addEventListener("load", () => {
    init()
})
