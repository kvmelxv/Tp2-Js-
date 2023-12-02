import { afficheDetail, viderDetailSection } from "./App.js";

export default class Router {

    constructor(el) {

        this._el = el;
        this._elsTache = this._el.querySelectorAll('[data-js-tache]');
        this._elsBtnDetail = this._el.querySelectorAll('[data-js-action="afficher"]');
        this._detailSection = this._el.querySelector('[data-js-detail]');
        this._detailInfo = this._el.querySelector('[data-js-detail-info]');


        this._routes = [
            ['taches/:id', afficheDetail]
        ];

        this._path = location.pathname;

        this.init();
    }

    /**
     * initialise les comportements
     */

    init(){

        /**
        * gestion au chargement de la page 
        */

        this.gereHashbang();


        /**
        * gestion suite a l'evenement du click
        */

        for (let i = 0, l = this._elsBtnDetail.length; i < l; i++) {
            this._elsBtnDetail[i].addEventListener('click', function(e){
                
                let click = e.target,
                    parentAvecDataset = click.closest('[data-js-tache]'),
                    id = parentAvecDataset.dataset.jsTache;

                if (id) {
    
                    window.location = `#!/taches/${id}`;
                }
                
            }.bind(this))
        }


        /**
         * gestion a l'evenement du hashchange
         */

        window.addEventListener('hashchange', function(){
           this.gereHashbang();
        }.bind(this));
    }


    gereHashbang(){

        let hash = window.location.hash.slice(2),
            isRoute = false;

        if (hash.endsWith('/')) hash = hash.slice(0, -1);

        for (let i = 0, l = this._routes.length; i < l; i++){

            let route = this._routes[i][0],
                isId = false;

            if (route.indexOf(':') > -1) {
                route = route.substring(0, route.indexOf('/:'));
                isId = true
            }

            if (hash.indexOf(route) > -1) {

                let hashInArray = hash.split(route);

                if (hashInArray[1]) {
                    if (isId) {
                        let id = hashInArray[1].slice(1);
                        this._routes[i][1](id);
                        isRoute = true;
                    }
                } else {
                    if (hash === this._routes[i][0]) {
                        this._routes[i][1]();
                        isRoute = true;
                    }
                }
            }
        }

        if (!isRoute) {
            
            //console.log('Aucune route trouvée. Vider la section détail et nettoyer l\'URL.');

            //viderDetailSection(this._detailInfo);
            
            //history.replaceState(null, null, this._path);
        }
    }
}