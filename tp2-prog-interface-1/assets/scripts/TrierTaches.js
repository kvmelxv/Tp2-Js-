import { App } from './App.js';
import { aTaches } from './aTaches.js';

export class TrierTaches {
    constructor(el) {
        this._el = el;
        this._elTaches = document.querySelector('[data-js-taches]');

        this.init();
    }


    /**
     * Initialise les comportements
     */
    init() {
        this._el.addEventListener('click', function(e) {
            let ordre = e.target.dataset.jsTrier;
                this.trieTaches(ordre);
        }.bind(this));
    }


    /**
     * Réordonne le tableau aTaches et appelle la méthode pour injecter les tâches mises à jour
     * @param {String} propriete 
     */
    trieTaches(propriete) {
        aTaches.sort(function(a, b) {
            if (a[propriete] < b[propriete]) { return -1; }
            if (a[propriete] > b[propriete]) { return 1; }
            return 0;
        });
        
        // Réinjecte les tâches dans l'ordre
        this._elTaches.innerHTML = '';
        for (let i = 0, l = aTaches.length; i < l; i++) {
            this.injecteTache(i);
        }
    }
}