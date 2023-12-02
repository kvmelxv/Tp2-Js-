
export class App {

    constructor() {

        this._elTemplateTache = document.querySelector('[data-template-tache]');
        this._elTacheDetail = document.querySelector('[data-js-detail-info]');
        this._elTemplateDetail = document.querySelector('[data-template-detail]');
        this._eldetailSection = document.querySelector(`[data-js-detail]`);
        this._elTache = document.querySelector('[data-js-tache]');

        this.afficheDetail = this.afficheDetail.bind(this);

    }

    /**
     * Affiche le détail d'une tâche
     */
    afficheDetail(id){

        if (id !== 0){

            let data = {
                action: 'getTache',
                id: id
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

                // Faire défiler la fenêtre vers la section détail avec un effet fluide
                if (this._eldetailSection) {
                    this._eldetailSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                } 
              }.bind(this))
              .catch(function(err){
                console.log(err.message);
              })
        }
    }

    
    viderDetailSection() {
    
        // Supprimer le contenu de la section détail
        //this._elTacheDetail.innerHTML = '';

        // Masquer la section détail
        //this._detailSection.classList.remove('detail--ouvert');
    }
}

export const { afficheDetail, viderDetailSection } = new App;