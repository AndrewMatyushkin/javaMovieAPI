const searchForm = document.querySelector('#search-form'),
movie = document.querySelector('#movies');

function apiSearch(event){
    event.preventDefault();
    const searchText = document.querySelector('#searchText').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=bd95dfa0a6b2b293b7cada91930b6833&language=ru&query=' + searchText;
    requestApi('GET', server);
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(method, url){
    const request = new XMLHttpRequest();
    request.open(method, url);
    request.send();

    request.addEventListener('readystatechange', () =>{
        if (request.readyState !== 4) return;
        if (request.status !== 200){
            console.log('error: ' + request.status);
            return;
        }

        const output = JSON.parse(request.responseText);
        console.log('output: ', output);
        let inner = '';
        output.results.forEach(function (item, i, array){
            let nameItem = item.name || item.title,
            dateItem = item.first_air_date || item.release_date,
            imgItem = item.poster_path,
            descriptionItem = item.overview;
            inner += `<div class="col-12 nameItem">${nameItem} <span class="dateItem">(Дата выхода: ${dateItem})</span></div>
            <div class="descriptionItem">${item.overview}</div>
            <img src="https://image.tmdb.org/t/p/original${item.poster_path}" class="imgItem">`;
        });

        movie.innerHTML = inner;
        console.log('request: ', request);
    });
}