class GameBoard {

    score // valeur par défaut: undefined. undefined est un type comme null, string, int, etc... c'est quand une variable ne contient "rien" (dans la majorité des langages ça serait null)

    onCellChoosed = function() {} // Closure (callback) quand une cellule a été choisie

    constructor(board_selector) {
        this.board = document.querySelector(board_selector)
        console.log("[GameBoard.constructor] Initialize board onto:", this.board)

        this.attachEvents()
    }

    clear() {
        /**
         * ?. = chainage optionnel, ça m'évite d'écrire une condition if pour vérifier si children[0] existe et d'alourdir la lecture. C'est une question d'éthique de le faire ou non selon la philosophie des développeur...
         * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/Optional_chaining
         */
        Array.from(this.board.children).forEach(cell => cell.children[0]?.remove())
        console.log("[GameBoard.clear] Clear board")
    }

    addScore(cell) {
        if (this.score === undefined) return
        console.log("[GameBoard.addScore]", this.score, cell)
        
        let scoreNode = document.createElement('span')
        scoreNode.classList.add(this.score.type)

        this.board.querySelector(`[data-coordinates="${cell.x},${cell.y}"]`).appendChild(scoreNode)
    }

    attachEvents() {
        /**
         * Array.from me permet juste d'utiliser la méthode forEach sur un HTMLCollection qui lui ne me permet pas de le faire. J'aurais pu boucler directement avec un for
         * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/from
         * 
         * @see https://developer.mozilla.org/fr/docs/Web/API/EventTarget/addEventListener.
         * 
         * Le context this à l'intérieur d'un callback d'un event, se réfère à l'élément HTML et plus à l'instance de la classe. Il y a donc un trick à faire avec .bind()... Les joies de javascript ;-) 
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
         */
        Array.from(this.board.children).forEach(cell => cell.addEventListener('click', this.onCellClick.bind(this))) // Fonction fléchée anonyme (ES6)
    }

    onCellClick(e) { // e est un event qui est passé en paramètre via l'appel à onclick d'un élément HTML, c'est le navigateur qui gère cet appel
        const cell = e.target.dataset.coordinates === undefined ? e.target.parentNode : e.target // Quand on a une croix ou un rond, le target est l'élément enfant et non plus son parent /!\
        let x, y

        /**
         * ES6 : affectation par décomposition
         * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/Affecter_par_d%C3%A9composition
         */
        [x, y] = cell.dataset.coordinates.split(",")

        console.log("[GameBoard.onCellClick]", cell, x, y)

        this.onCellChoosed(new Cell(cell, x, y))
    }
}