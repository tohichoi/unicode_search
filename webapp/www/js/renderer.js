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
        this.params = null;
        this.url_params = {};
    }

    clear_children(pa) {
        for (let c of pa.children) {
            this.msnry.remove(c);
        }
    }

    show_popup(elm, html) {
        const prev_html = `${elm.innerHTML}`;
        elm.setAttribute('data-prev-html', prev_html);
        elm.innerHTML = html;
        setTimeout((prev_html) => {
            elm.innerHTML = elm.getAttribute('data-prev-html');
            elm.removeAttribute('data-prev-html');
        }, 3000);
    }
    
    add_item(pa, item, msnry) {
        let item_text_value = null;
        if (item.text == ' ')
            item_text_value = '&nbsp;';
        else
            item_text_value = item.text;
        
        let template = `
            <div class="card grid-item mx-0" id="id_card_${item.code}" data-grid-item="true">
                <div class="card-body" 
                    data-bs-toggle="popover" 
                    data-bs-placement="top"
                    data-bs-title="Infomration"
                    data-bs-content="Copied to clipboard!">
                    <h1 class="card-title text-center unicode" style="font-weight:900">${item_text_value}</h1>
                    <div class="card-text text-center">
                        <small class="text-muted text-center">${item.name}</small><br>
                        <small class="text-muted text-center">${item.code}</small>
                    </div>
                </div>
            </div>
        `;
        const tmpl = document.createElement('template');
        tmpl.innerHTML = template;
        const child = tmpl.content.firstElementChild;
        child.tooltip = new bootstrap.Popover(child);
        child.onclick = (event) => {
            const ch = event.target.innerText;
            navigator.clipboard.writeText(ch);
            let c = event.target.parentElement.parentElement;
            if (c.hasAttribute('data-grid-item')) {
                const search_info = document.getElementById(this.params.elements.search_info);
                this.show_popup(search_info, `<span class="badge bg-secondary">${ch}</span> copied to clipboard`);
            }
        }
        pa.appendChild(child);
        this.msnry.appended(child);
        this.msnry.layout();
    }
    
    
    load_data(url_params) {
        // create with django restframework
        // https://www.django-rest-framework.org/api-guide/authentication/#tokenauthentication
        let username = 'admin'
        let password = 'admin'
        let token = '0fac0bc102d6a61365c4d697472d93d7ffecddd1'
        let pa = document.getElementById("id_search_result_container");
        let api_address = window.localStorage.getItem(this.params.storage.api_address);
        
        const headers = new Headers({
            'Authorization': `Token ${token}`
        });
        
        const search_params = (url_params) ? (new URLSearchParams(url_params)).toString() : '';
        const fetchPromise = fetch(`${api_address}/unicode/?` + search_params, {headers: headers});
        
        fetchPromise
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            const search_info = document.getElementById(this.params.elements.search_info);
            search_info.innerHTML = `Matched <b>${data.count}</b> code(s)`;
            this.clear_children(pa);
            for (let item of data.results) {
                this.add_item(pa, item);
            }

            let pg = document.getElementById('id_pagination');
            let pg_items = pg.querySelectorAll('.page-item');
            let prev = pg_items[0];
            let next = pg_items[pg_items.length - 1];

            // previous
            if (data.links.previous) {
                prev.classList.remove('disabled');
                let url_params = { ...this.url_params }
                let sp = new URL(data.links.previous).searchParams;
                if (sp.has('page'))
                    url_params.page = sp.get('page');
                prev.querySelector('.page-link').onclick = (event) => { this.load_data(url_params); };
            } else {
                prev.classList.add('disabled');
            }

            // next
            if (data.links.next) {
                next.classList.remove('disabled');
                let url_params = { ...this.url_params }
                let sp = new URL(data.links.next).searchParams;
                if (sp.has('page'))
                    url_params.page = sp.get('page');
                next.querySelector('.page-link').onclick = (event) => { this.load_data(url_params); };
            } else {
                next.classList.add('disabled');
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });
            document.getElementById(this.params.elements.search_text).focus();
        })
        .catch((error) => {
            let msg = `${error}` + `${window.localStorage.getItem(this.params.storage.api_address)}`;  
            window.alert(msg);
            console.error(msg);
        });
    }

    search() {
        let q = document.getElementById(this.params.elements.search_text).value;
        this.url_params = {
            'search': q.trim(),
            'page': 1
        };
        this.load_data(this.url_params);
    }
    
    init(params) {
        this.params = params;
        let elm = document.getElementById(this.params.elements.result_view);
        this.msnry = new Masonry( elm, {
            // options
            itemSelector: '.grid-item',
            columnWidth: '.card',
            fitWidth: true,
            containerStyle: { position: 'relative' }
        });
        
        let last_input_time = performance.now();
        let search_text_elm = document.getElementById(this.params.elements.search_text);
        let prev_text = '';

        search_text_elm.onkeyup = (event) => {
            let curr_input_time = performance.now();
            // console.log(`${(curr_input_time - last_input_time) / 1000.}`);
            if (event.key === "Enter") {
                this.search();
            }
            else if ((curr_input_time - last_input_time) / 1000. > 1) {
                if (prev_text != event.target.value) {
                    setTimeout((timer_event) => {
                        this.search();
                    }, 1000);
                }
            } 
            last_input_time = curr_input_time;
            prev_text = event.target.value; 
        }

        search_text_elm.focus();
    }
}

export { Renderer };
    
export default Renderer;
    
// Renderer.load_data();

// export default renderer;
