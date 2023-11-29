
export class Tache {
    constructor(el) {
        this._el = el;
        this._id = this._el.dataset.jsTache;
        this._elActions = this._el.querySelector('[data-js-actions]');
        this._elTaches = this._el.closest('[data-js-taches]');
        this._elTacheDetail = document.querySelector('[data-js-detail-info]');

        this._elTemplateDetail = document.querySelector('[data-template-detail]');

        this.init();
    }


    /**
     * Initialise les comportements
     */
    init() {

        this._elActions.addEventListener('click', function(e) {
            if (e.target.dataset.jsAction == 'afficher') this.afficheDetail();
            else if (e.target.dataset.jsAction == 'supprimer') this.supprimeTache();
        }.bind(this));
    }


    /**
     * Affiche le détail d'une tâche
     */
    afficheDetail(){


        if (this._id !== 0){

            let data = {
                action: 'getTache',
                id: this._id
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
                else throw new Error ("la reponse n'est pas ok.");
              })
              .then(function(data){

                this._elTacheDetail.innerHTML = '';

                let elCloneTemplateDetail = this._elTemplateDetail.cloneNode(true);

                for (const cle in data) {

                    let regex = new RegExp('{{' + cle + '}}', 'g');

                    if (cle === 'description' && data[cle] === '') {
                        data[cle] = "Aucune description disponible. ";
                    }

                    elCloneTemplateDetail.innerHTML = elCloneTemplateDetail.innerHTML.replace(regex, data[cle]);

                }

                let elNouvDetail = document.importNode(elCloneTemplateDetail.content, true);

                this._elTacheDetail.append(elNouvDetail);
                
              }.bind(this))
              .catch(function(err){
                console.log(err.message);
              })

        }

    }


    /**
     * Supprime la tâche du DOM et de la BD.
     */
    supprimeTache() {

        if (this._id !== 0) {

            let data = {
                action: 'supprimeTache',
                id: this._id
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
                if (data.success) {
                    this._el.remove();
                } else {
                    console.error('Erreur lors de la suppression de la tâche:', data.error);
                }
              }.bind(this))
              .catch(function(err){
                console.log(err.message)
              })

        }
    }
}

//export const { afficheDetail } = new Tache();