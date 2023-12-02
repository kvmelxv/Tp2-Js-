//import { App } from './App.js';
//import { Tache } from './Tache.js';

export class TrierTaches {
    constructor(el) {
        this._el = el;
        this._btnTache = this._el.querySelector('[data-js-trier="tache"]');
        this._btnImportance = this._el.querySelector('[data-js-trier="importance"]');
        this._elSectionTache = document.querySelector('.to-do-list');
        this._elsTache = this._elSectionTache.querySelectorAll('[data-js-tache]');
        this._elTemplateTache = document.querySelector('[data-template-tache]');
        this._elTaches = document.querySelector('[data-js-taches]');

        //this._elsTaches = document.querySelector('[data-js-tache]');
        //console.log(this._elsTaches)

        this.init();
    }


    init() {

        this._btnTache.addEventListener('click', function(){
            this.trierTachesAlpha();

        }.bind(this));

        this._btnImportance.addEventListener('click', function(){
            this.trierTachesParImp();
        }.bind(this))
    }


    trierTachesAlpha(){
        
        let data = {
            action: 'trierParOrdreAlphabetique',
        }

        let oOption = {

            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch('requetes/requetesAsync.php', oOption)
          .then(function(response){
            if (response.ok) return response.json();
            else throw new Error ("la reponse n'est pas ok.")
          })
          .then(function(data){

            this._elTaches.innerHTML = '';

            for (let i = 0, l = data.length; i < l; i++){
                let obj = data[i];

                let elCloneTemplateTache = this._elTemplateTache.cloneNode(true);

                for (const cle in obj) {
                
                   let regex = new RegExp('{{' + cle + '}}', 'g');

                   elCloneTemplateTache.innerHTML = elCloneTemplateTache.innerHTML.replace(regex, obj[cle]);
                }

                let elNouvTache = document.importNode(elCloneTemplateTache.content, true);

                this._elTaches.append(elNouvTache); 

                //console.log(this._elTaches)
                //new Tache(this._elTaches.lastElementChild);

            }
           }.bind(this))
           .catch(function(err) {
            console.log(`Il y a eu un problème avec l'opération fetch: ${err.message}`);
           })
    }


    trierTachesParImp(){
        
        let data = {
            action: 'trierParImportance',
        }

        let oOption = {

            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch('requetes/requetesAsync.php', oOption)
          .then(function(response){
            if (response.ok) return response.json();
            else throw new Error ("la reponse n'est pas ok.")
          })
          .then(function(data){

            this._elTaches.innerHTML = '';

            for (let i = 0, l = data.length; i < l; i++){
                let obj = data[i];

                let elCloneTemplateTache = this._elTemplateTache.cloneNode(true);

                for (const cle in obj) {
                
                   let regex = new RegExp('{{' + cle + '}}', 'g');

                   elCloneTemplateTache.innerHTML = elCloneTemplateTache.innerHTML.replace(regex, obj[cle]);
                }

                let elNouvTache = document.importNode(elCloneTemplateTache.content, true);

                this._elTaches.append(elNouvTache);
            }

           }.bind(this))
           .catch(function(err) {
            console.log(`Il y a eu un problème avec l'opération fetch: ${err.message}`);
           })
    }

}