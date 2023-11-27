import { App } from './App.js';
import { aTaches } from './aTaches.js';
import { Validation } from './Validation.js'

export class Formulaire {

    constructor(el) {
        this._el = el;
        this._elInputTache = this._el.tache;
        this._elInputDescription = this._el.description;
        this._elsInputImportance = this._el.querySelectorAll('input[name="importance"]');
        this._elBouton = this._el.querySelector('[data-js-btn]'); 
        
        this._elTaches = document.querySelector('[data-js-taches]');

        this._oOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        };

        this._requete = new Request('requetes/requetesAsync.php');

        this.init();
    }


    /**
     * Initialise les comportements
     */
    init() {
        this._elBouton.addEventListener('click', function(e) {
            e.preventDefault();

            /* Si valide */
            const validation = new Validation(this._el);

            let estValide = validation.valideFormulaire();
            if (estValide) {
                this.ajouteTache();
                this._el.reset();
            }
        }.bind(this));
    }


    /**
     * Ajoute la tâche au tableau aTaches et appelle la méthode pour injecter la nouvelle tâche
     */
    ajouteTache() {

        let elCheckedImportance = this._el.querySelector('input[name="importance"]:checked');

        if (this._elInputTache.value != '' && this._elInputDescription.value != '' && elCheckedImportance != 0) {

            let data = {
                action: 'ajouteTache',
                tache: this._elInputTache.value,
                description: this._elInputDescription.value,
                importance: elCheckedImportance ? elCheckedImportance.value : null
            }

            this._oOptions.body = JSON.stringify(data);

            this.appelFetch()
                .then(function(data){
                    //console.log(data)
                })
                .catch(function(err) {
                    console.log(`Il y a eu un problème avec l'opération fetch: ${err.message}`);
                })
        }

        // Injecte la tâche
        //const app = new App();
        //app.injecteTache(aTaches.length - 1);
    }


    /**
     * Retourne la promesse de la fonction asynchrone
     * @returns 
     */
    async appelFetch() {
        try {
            let response = await fetch(this._requete, this._oOptions);
            if (response.ok) return response.json();
            else throw new Error('La réponse n\'est pas OK');

        } catch (err) {
            return err.message;
        }
	};
}