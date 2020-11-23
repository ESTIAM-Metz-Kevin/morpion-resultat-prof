class Morpion {

    constructor() {
        /**
         * Dans l'idée, la taille de la matrice pourrait devenir dynamique ici...
         * Taille par défaut à 3*3 pour ce projet
         */
        this.matrix = [[0,0,0], [0,0,0], [0,0,0]]
    }

    /**
     * On regarde si value apparaît autant de fois que la taille du tableau
     * - Pour chaque ligne
     * - Pour chaque colonne
     * - Sur la diagonale principale / diagonale secondaire
     */
    isResolved(value) {
        const size = this.matrix.length
        let i, j

        // Per line
        /**
         * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/reduce
         */
        for (i = 0; i < size; i++)
            if (this.matrix[i].reduce((occurence, n) => n === value ? occurence + 1 : occurence, 0) === size)
                return true

        // Per column
        for (j = 0; j < size; j++) {
            let occurence = 0

            for (i = 0; i < size; i++)
                if (this.matrix[i][j] === value)
                    occurence++

            if (occurence === size) return true
        }

        // Diagonals
        let occurenceFirstDiagonal = 0
        let occurenceSecondaryDiagonal = 0
        for (i = 0; i < size; i++) {
            for (j = 0; j < size; j++) {
                if (this.matrix[i][j] !== value) continue
                if (i === j) occurenceFirstDiagonal++
                if (i + j === size - 1) occurenceSecondaryDiagonal++
            }
        }

        if (occurenceFirstDiagonal === size || occurenceSecondaryDiagonal === size) return true

        return false
    }
}