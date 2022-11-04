// const information = document.getElementById('info');

// information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

// const func = async () => {
//     const response = await window.versions.ping()
//     console.log(response) // prints out 'pong'
// }

// func();
// import { Renderer } from 'tabulator-tables';
// import { Masonry } from '../lib/masonry.pkgd.min.js'


class Renderer {
    constructor() {
        this.msnry = null;
        this.cls = this;
    }

    add_item(pa, item, msnry) {
        let item_text_value = null;
        if (item.text == ' ')
            item_text_value = '&nbsp;';
        else
            item_text_value = item.text;
        
        let template = `
            <div class="card grid-item mx-0">
                <div class="card-body">
                    <h1 class="card-title text-center" style="font-weight:900">${item_text_value}</h1>
                    <div class="card-text">
                        <h5 class="text-muted text-center">${item.name}</h4>
                        <h6 class="text-muted text-center">${item.code}</h6>
                    </div>
                </div>
            </div>
        `;
        const tmpl = document.createElement('template');
        tmpl.innerHTML = template;
        const child = tmpl.content.firstElementChild;
        // const child = tmpl.content.firstChild;
        pa.appendChild(child);
        this.msnry.appended(child);
        this.msnry.layout();
    }
    
    
	load_data() {
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
            for (let item of data.results) {
                this.add_item(pa, item);
            }
        })
        .catch((error) => {
            console.error(`${error}`);
        });
    }
    
    
	init() {
        let elm = document.getElementById('id_search_result_container');
        this.msnry = new Masonry( elm, {
            // options
            itemSelector: '.grid-item',
            // columnWidth: 100
          });
    }
}

export { Renderer };
    
export default Renderer;
    
// Renderer.load_data();

// export default renderer;
