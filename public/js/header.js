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