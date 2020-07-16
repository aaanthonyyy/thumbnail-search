let searchBtn = document.querySelector('#search-btn');
let imgResults = document.querySelector('#img-results');
let searchBar = document.querySelector('#search');
// img = document.querySelector('#image')
let category = '';


// --- PEXELS API  IN PROGRESS ---
let pexelsID = "563492ad6f91700001000001be28925d2473490cba62628e8328d6fc";
/////////////////////////////////////////////////////////////////////////

let page = 1;

function nextPage() {
  page++
  searchPhotos();
}

function prevPage() {
  if (page > 1)
    page--
  searchPhotos();
}

function searchPhotos() {
  query = searchBar.value;
  category = query;
  url = "https://api.unsplash.com/search/photos?page=" + page + "&per_page=30&query=" + query +
    "&client_id=BfA9_xPqsWwU2Nfvb5yeh_WJdxRf4_HQKDI44eM-Xwg&orientation=landscape";

  imgResults.innerHTML = '';

  fetch(url)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log(data);
      document.querySelector('#num-results').textContent = 'Images found: ' + data.total +
        ' | Page ' + page + ' of ' + data.total_pages;

      data.results.forEach(imageJson => {
        // image = `<img src = "${imageJson.urls.small}" class="img-thumbnail" onclick="downloadPhoto(this)">`
        image = `<img src = "${imageJson.urls.small}" class="img-thumbnail" 
        onclick="downloadPhoto('${imageJson.urls.full}', '${imageJson.id}')">`
        imgResults.insertAdjacentHTML("beforeend", image)
      });

    })
}

function downloadPhoto(url, id) {
  // let imgPath = img.getAttribute('src') + "&w=192&h=108&fit=crop";
  let imgPath = url + "&w=500&fit=crop";

  let filename = category + '-' + id + '-500.jpg';

  saveAs(imgPath, filename);
}

function pressEnter() {
  if (event.key === 'Enter') {
    searchPhotos();
  } else {
    console.log('not true');

  }
}