import { Validation } from './Validation.js';
import { Tache } from './Tache.js';
import  Router  from './Router.js';

export class Formulaire {

    constructor(el) {
        this._el = el;
        this._elInputTache = this._el.tache;
        this._elInputDescription = this._el.description;
        this._elsInputImportance = this._el.querySelectorAll('input[name="importance"]');
        this._elBouton = this._el.querySelector('[data-js-btn]'); 
        
        this._elTaches = document.querySelector('[data-js-taches]');
        this._elTemplateTache = document.querySelector('[data-template-tache]');

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
     * Ajoute la tâche a la BD et l'afficher dans le DOM.
     */
    ajouteTache() {

        let elCheckedImportance = this._el.querySelector('input[name="importance"]:checked');

        if (this._elInputTache.value != '' && elCheckedImportance != 0) {

            let data = {
                action: 'ajouteTache',
                tache: this._elInputTache.value,
                description: this._elInputDescription.value,
                importance: elCheckedImportance ? elCheckedImportance.value : null
            }

            this._oOptions.body = JSON.stringify(data);

            this.appelFetch()
                .then(function(id){

                    data.id = id.result;

                    let elCloneTemplateTache = this._elTemplateTache.cloneNode(true);

                    for (const cle in data) {

                        let regex = new RegExp('{{' + cle + '}}', 'g');

                        elCloneTemplateTache.innerHTML = elCloneTemplateTache.innerHTML.replace(regex, data[cle]);
                     
                    }

                    let elNouvTache = document.importNode(elCloneTemplateTache.content, true);

                    elNouvTache.querySelector('[data-js-tache]').dataset.jsTache = data.id;

                    this._elTaches.append(elNouvTache);

                    new Tache(this._elTaches.lastElementChild);
                    new Router();

                }.bind(this))
                .catch(function(err) {
                    console.log(`Il y a eu un problème avec l'opération fetch: ${err.message}`);
                })
        }

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