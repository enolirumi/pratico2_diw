
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
    getById: async (id, reqInit) => {

        console.log(id);

        const data = await fetch(`${reqUrl}/3/movie/${id}?language=pt-BR`, reqInit)
            .then(res => res.json())
            .then(json => {
                return json
            })

        return data
    }
}

window.addEventListener("load", async (ev) => {
    const params = new URLSearchParams(window.location.search);
    const idfilme = params.get("idfilme")

    const filme = await requisicoes.getById(idfilme, reqInit)
    console.log(filme);

    document.querySelector(".card").innerHTML = `
        <h2>${filme.title}</h2>
            <img src="http://image.tmdb.org/t/p/w500${filme.poster_path}" alt="">
        <p>${filme.overview}</p>
    `

})

document.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        document.querySelector("header").classList.add("scrolled")
    } else {
        document.querySelector("header").classList.remove("scrolled")
    }
})