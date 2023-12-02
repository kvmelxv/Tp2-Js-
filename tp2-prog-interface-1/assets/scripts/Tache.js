
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
            if (e.target.dataset.jsAction == 'supprimer') this.supprimeTache();
        }.bind(this));
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