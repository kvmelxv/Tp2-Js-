import { aTaches } from './aTaches.js'
import { Tache } from './Tache.js';


export class App {

    constructor() {

        this._elTaches = document.querySelector('[data-js-taches]');

    }

    /**
     * Construit, injecte et lance les comportements de chaque nouvelle tâche
     * @param {Int} index 
     */
    injecteTache(index) {

        let dom =  `<div data-js-tache=${index}>
                        <p>
                            <span>
                                <small>Tâche : </small>${aTaches[index].tache}
                            </span>
                            -
                            <span>
                                <small>Importance : </small>${aTaches[index].importance}
                            </span>
                            <span data-js-actions>
                                <button data-js-action="afficher">Afficher le détail</button>
                                <button data-js-action="supprimer">Supprimer</button>
                            </span>
                        </p>
                    </div>`;

        this._elTaches.insertAdjacentHTML('beforeend', dom);

        new Tache(this._elTaches.lastElementChild);
    }
}