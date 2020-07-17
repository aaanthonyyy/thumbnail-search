let searchBtn = document.querySelector('#search-btn');
let imgResults = document.querySelector('#img-results');
let searchBar = document.querySelector('#search');
let pagination = document.querySelector('#pagination')

let category = '';
let totalResults;
let totalPages = 0;

let page = 1;

let resW = "500"
let resH = ""

function nextPage() {
	if (searchBar.value) {
		page++
		searchPhotos();
	}
}

function prevPage() {
	if (page > 1 && searchBar.value) {
		page--
		searchPhotos();
	}
}

async function searchPhotos() {
	query = searchBar.value;
	category = query;
	urlUnsplash = "https://api.unsplash.com/search/photos?page=" + page + "&per_page=30&query=" + query +
		"&client_id=BfA9_xPqsWwU2Nfvb5yeh_WJdxRf4_HQKDI44eM-Xwg&orientation=landscape";

	urlPexels = "https://api.pexels.com/v1/search?query=" + query + "&page=" + page + "&per_page=30"


	imgResults.innerHTML = '';

	let unsplashResults = 0;
	let pexelResults = 0;

	fetch(urlUnsplash)
		.then((response) => {
			return response.json()
		})
		.then((data) => {
			console.log(data);
			unsplashResults = data.total;
			unsplashPages = data.total_pages;

			if (data.reslts == 0) document.querySelector('#num-results').textContent = 'Images found: ' + 0;
			else {
				data.results.forEach(imageJson => {
					// image = `<img src = "${imageJson.urls.small}" class="img-thumbnail" onclick="downloadPhoto(this)">`
					image = `<img src = "${imageJson.urls.small}" class="img-thumbnail" 
		  									onclick="downloadPhoto('${imageJson.urls.full}', '${imageJson.id}')">`
					imgResults.insertAdjacentHTML("beforeend", image)
				})
			}
		})

	pagination.innerHTML =
		`<ul class="pagination text-center mx-auto">
			<li class="page-item"><a class="page-link" onclick="prevPage()">Previous</a></li>
			<li class="page-item"><a class="page-link" onclick="nextPage()">Next</a></li>
	 	</ul>`

	fetch(urlPexels, {
		method: 'GET',
		headers: {
			authorization: "563492ad6f91700001000001be28925d2473490cba62628e8328d6fc"
		}
	})
		.then((response) => {
			return response.json()
		})
		.then((data) => {
			console.log(data);

			pexelResults = data.total_results;

			data.photos.forEach(photo => {
				image = `<img src = "${photo.src.medium}" class="img-thumbnail" 
			 onclick="downloadPhoto('${photo.src.original}', '${photo.id}')">`
				imgResults.insertAdjacentHTML("beforeend", image)

			});
		})
		.then(() => {
			if (unsplashResults | pexelResults) {

				totalResults = (isNaN(unsplashResults) ? 0 : +unsplashResults) + (isNaN(pexelResults) ? 0 : +pexelResults);

				document.querySelector('#num-results').textContent = 'Images found: ' + totalResults + ' 😀 | Page '
					+ page + ' of ' + unsplashPages;
			} else {
				document.querySelector('#num-results').textContent = 'No images on that 😢'
				unsplashPages = 0;
			}
		});
}

function downloadPhoto(url, id) {
	let imgPath = url + "?&w=500&fit=crop";
	console.log(imgPath);

	let filename = category + '-' + id + '-500.jpg';
	saveAs(imgPath, filename);
}

function pressEnter() {
	if (event.key === 'Enter')
		searchPhotos();
}