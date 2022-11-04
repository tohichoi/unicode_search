// const information = document.getElementById('info');

// information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

// const func = async () => {
//     const response = await window.versions.ping()
//     console.log(response) // prints out 'pong'
// }

// func();
// import { Masonry } from './masonry-layout'


function add_item(pa, item) {
    let template = `
        <div class="card grid-item">
            <div class="card-body">
                <h1 class="card-title text-center">${item.text}</h1>
                <div class="card-text">
                    <h4 class="text-muted">${item.name}</h4>
                    <h6 class="text-muted">${item.code}</h6>
                </div>
            </div>
        </div>
    `;
    const tmpl = document.createElement('template');
    tmpl.innerHTML = template;
    pa.appendChild(tmpl.content.firstElementChild);
}

function load_data() {
    let username = 'admin'
    let password = '1234'
    let token = '60d12cff2778e668d5f9d3d5537869bc43878c0b'
    let pa = document.getElementById("id_search_result_container");
    
    const headers = new Headers({
        'Authorization': `Token ${token}`
    });
    
    const fetchPromise = fetch('http://127.0.0.1:8000/unicode/', {headers: headers});
    
    fetchPromise
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.statusText}`);
        }
        return response.json();
    })
    .then((data) => {
        const search_info = document.getElementById('id_search_info');
        search_info.innerText = `Data count : ${data.count}`;
        for (item of data.results) {
            add_item(pa, item);
        }
    })
    .catch((error) => {
        console.error(`Could not get products: ${error}`);
    });
}

function init_masonry() {
    let elm = document.getElementById('id_search_result_container');
    var msnry = new Masonry( elm, {
        // options
        itemSelector: '.grid-item',
        // columnWidth: 100
      });
}
  
init_masonry();

load_data();