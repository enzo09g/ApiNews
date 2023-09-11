const apiSearch = 'https://newsapi.org/v2/everything?'
let apiGetTitulares = 'https://newsapi.org/v2/everything?q=Apple&from=2023-09-11&sortBy=popularity&apiKey=3398d19f321f444291e4d3756cac53bf'

let key = '3398d19f321f444291e4d3756cac53bf'

function traerNoticias(busqueda, fecha, filtro) {

    let url = apiSearch + busqueda + fecha + filtro + key;
    console.log(url)
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            mostrarNoticias(data.articles)
        })
}

function mostrarNoticias(info) {
    let contenedor = document.getElementById('contenedor-noticias');
    contenedor.innerHTML = '';

    for(let i = 1; i < info.length; i+=2){
        let fecha1 = new Date(info[i].publishedAt)
        let nuevaFecha1 = fecha1.getUTCDate() + '/' + fecha1.getUTCMonth() + '/' + fecha1.getUTCFullYear();
        let fecha2 = new Date(info[i+1].publishedAt)
        let nuevaFecha2 = fecha2.getUTCDate() + '/' + fecha2.getUTCMonth() + '/' + fecha2.getUTCFullYear();

        contenedor.innerHTML += `
        <section class="light">
        <div class="container py-2">
            <div class="h1 text-center text-dark" id="pageHeaderTitle"></div>
    
            <article class="postcard light blue">
                <a class="postcard__img_link">
                    <img class="pointer postcard__img" src="${info[i].urlToImage}" alt="Image Title" />
                </a>
                <div class="postcard__text t-dark">
                    <h1 class="pointer postcard__title blue"><a>${info[i].title}</a></h1>
                    <div class="postcard__subtitle small">
                        <time datetime="2020-05-25 12:00:00">
                            <i class="fas fa-calendar-alt mr-2"></i>${nuevaFecha1}
                        </time>
                    </div>
                    <div class="postcard__bar"></div>
                    <div class="postcard__preview-txt">${info[i].description}</div>
                    <ul class="postcard__tagbox">
                        <li class="tag__item play blue">
                            <a href=${info[i].url}><i class="fas fa-play mr-2"></i>Ver Noticia</a>
                        </li>
                    </ul>
                </div>

            </article>
            <article class="postcard light red">
			    <a class="postcard__img_link">
				    <img class="pointer postcard__img" src=${info[i+1].urlToImage} alt="Image Title" />	
			    </a>
			    <div class="postcard__text t-dark">
				    <h1 class="pointer postcard__title red"><a>${info[i+1].title}</a></h1>
				    <div class="postcard__subtitle small">
					    <time datetime="2020-05-25 12:00:00">
						    <i class="fas fa-calendar-alt mr-2"></i>${nuevaFecha2}
					    </time>
				    </div>
				    <div class="postcard__bar"></div>
				    <div class="postcard__preview-txt">${info[i+1].description}</div>
				    <ul class="postcard__tagbox">
					    <li class="tag__item play red">
						    <a href=${info[i+1].url}><i class="fas fa-play mr-2"></i>Ver Noticia</a>
					    </li>
				    </ul>
			    </div>
		    </article>
        </div>
        </section>
        `
    }


}


document.addEventListener('DOMContentLoaded', () => {
    let btnBuscar = document.getElementById('boton');
    btnBuscar.addEventListener('click', () => {
        let busqueda = 'q=' + document.getElementById('buscador').value;
        let fecha = '&from=' + document.getElementById('fecha').value || '&from=';
        let filtro = '&sortBy=' + document.getElementById('filtro').value + '&apiKey=';
        traerNoticias(busqueda, fecha, filtro)
    })
})


