const api_key="93ee165ca933b62fc633532dbab44632";
const url_base="https://api.themoviedb.org/3/movie/";
const dire = "https://image.tmdb.org/t/p/original";
const img_src="https://image.tmdb.org/t/p/w500/";
currentPage=1;
const popular =`${url_base}popular?api_key=${api_key}&page=${currentPage}`
const topRated = `${url_base}top_rated?api_key=${api_key}&page=${currentPage}`
const upcoming = `${url_base}upcoming?api_key=${api_key}&page=${currentPage}`
const nowPlaying =`${url_base}now_playing?api_key=${api_key}&page=${currentPage}`
 

const keyPress = event => {
    if(event.code === "Enter"){
        search()
    }
}
const create = (movies,container) =>{
    movies.forEach(({title,poster_path, id})=>{
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href="#";
    a.onclick = () => createModal(id)
    const image = document.createElement("img");
    const titles = document.createElement("p");
    li.id=id;
    li.classList.add("movies-item");
    titles.innerText=title;
    titles.classList.add("title");
    titles.onclick = () => createModal(id)
    image.src=`${img_src}${poster_path}`;
    image.classList.add("movie-img");
    li.appendChild(a);
    a.appendChild(image)
    li.appendChild(titles);
container.appendChild(li);
})
} 
const elements = (movies,container,category) =>{
    movies.forEach(({title,poster_path, id})=>{
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href="#";
    a.onclick = () => createModal(id)
    const image = document.createElement("img");
    const titles = document.createElement("p");
    li.id=id;
    li.classList.add("results-li");
    titles.innerText=title;
    titles.classList.add("title");
    titles.onclick = () => createModal(id)
    image.src=`${img_src}${poster_path}`;
    image.classList.add("movie-img");
    a.appendChild(image);
    li.appendChild(a)
    li.appendChild(titles);
container.appendChild(li);

})

} 
const clear  = () => {
    const bann = document.getElementById("banner")
    bann.classList.add("hide")
    const wrapper = document.getElementById("wrapper")
    wrapper.classList.add("hide")
    const total = document.getElementById("total")
    total.classList.remove("hide")

}
const searchIcon = () => {
    search();
}

const search = () => {
    clear();
    const search = document.getElementById("search")
    const wanted = search.value
    let currentPage = 1;
    let h2 = document.getElementById("total-h2")
    h2.innerText="Search Results"
    h2.classList.add("title-section")
    let span = document.getElementById("total-span")
    span.innerText = "Results"
    const prom = fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${wanted}&page=${currentPage}`);
    prom.then(res => res.json())
        .then(res => elements(res.results,container))
        const container = document.getElementById("total-results")
        container.innerHTML=""
        prom.catch (error => {
            let li_error = document.createElement("li")
            li_error.innerText=("We are sorry! this movie is not in our database! We will try to add it very soon!")
            ul.appendChild(li_error)
        
        })
        
        
    }

const popularfive = () => {
         fetch(`${popular}`)
           .then(res => res.json())
           .then(res => create(res.results.filter((e,i)=>i<5),container))
        const container = document.getElementById("movies-list-1")
        container.innerHTML=""
}
const topfive = () => {
        fetch(`${topRated}`)
           .then(res => res.json())
           .then(res => create(res.results.filter((e,i)=>i<5),container))
        const container = document.getElementById("movies-list-2")
        container.innerHTML=""
}
const upcomingfive = () => {
        fetch(`${upcoming}`)
           .then(res => res.json())
           .then(res => create(res.results.filter((e,i)=>i<5),container))
        const container = document.getElementById("movies-list-3")
        container.innerHTML=""
}
const nowfive = () => {
        fetch(`${nowPlaying}`)
           .then(res => res.json())
           .then(res => create(res.results.filter((e,i)=>i<5),container))
        const container = document.getElementById("movies-list-4")
        container.innerHTML=""
}



const selectCategory = (category) => {
    clear();
    fetch (`https://api.themoviedb.org/3/movie/${category}?api_key=${api_key}`)
        .then(res=>res.json())
        .then(res=>elements(res.results,container))
    let currentPage = 1;
    let h2 = document.getElementById("total-h2")
    h2.innerText="Search Results"
    h2.classList.add("title-section")
    let span = document.getElementById("total-span")
    span.innerText = `Results`
    const container = document.getElementById("total-results")
    container.innerHTML=""
    const btn = document.getElementById("more")
    btn.onclick = () => more(category);
}

const more= (category) => {
    currentPage++;
    fetch (`https://api.themoviedb.org/3/movie/${category}?api_key=${api_key}&page=${currentPage} `)
        .then(res=>res.json())
        .then(res=>elements(res.results,container))
    
    const container = document.getElementById("total-results")
    
    
}


const createModal = e =>{
    const movieId = e;

    fetch (`${url_base}${movieId}?api_key=${api_key}`)
        .then(res => res.json())
        .then(movie => { 
            const div = document.createElement('div');
            const styles = () => div.classList.add('modal');
            const genres = movie.genres.map(e=>e.name).join(', ')
            styles();
             div.innerHTML = `
            <div class="spinner"></div>
            <div class="contentModal hide">
            <div class="modal-header" style="background-image: url(${dire}${movie.backdrop_path})"></div>
            <div class="modal-info"></div>
            <div class="content-modal-info">
                <div class="modalPoster">
                    <img src="${dire}${movie.poster_path}"/>
                </div>
                <div class="modal-movie-info">
                    <h4>${movie.title}</h4>
                    <p>${movie.tagline}</p>
                    <div class="more-info">
                        <span>${movie.overview}</span>
                        <h5>genre</h5>
                        <p>${genres}</p>
                        <h5> release date</h5>
                        <p>${movie.release_date}</p>
                    </div>

                </div>
            </div>
            <div class="close" onclick= "closeModal()">
            <i class="fas fa-times-circle"></i>
            </div>
            </div>`
           
            const deleteScroll = () => {
                let content = document.getElementById("content")
                content.classList.add('hide-scroll');
            }
            

            deleteScroll();
            const body = document.getElementById("body")
            body.appendChild(div);


        const openModal = document.querySelector('.contentModal');


        const loadModal = () =>{

            const spinner = document.querySelector ('.spinner');
            const closeSpinner = () => {
                setTimeout(() => spinner.classList.add('hide'), 300);
                
            }
            const showModal = () => {
                setTimeout(() => openModal.classList.remove('hide'), 300);
            }

            closeSpinner()
            
            showModal()

        }
        
        openModal.addEventListener('load', loadModal());

        })

};

const closeModal = () =>{
    const printModal = document.querySelector('.modal');
    printModal.remove();

    const returnScroll = () => content.classList.remove('hide-scroll');
    returnScroll();
    
    
}
          
const home = () => {
    const total = document.getElementById("total")
    total.classList.add("hide")
        popularfive();
        topfive();
        upcomingfive();
        nowfive();
}   
    
    
    



     

  