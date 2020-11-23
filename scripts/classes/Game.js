class Game {
    
    isStarted = false
    isFinished = false
    playerTurn

    // Callbacks
    onPlayerTurn = function() {} // Quand c'est le tour d'un joueur
    onPlayerAction = function() {} // Quand l'action du joueur est valide
    onPlayerWin = function() {} // Quand un joueur a gagné

    constructor(player1, player2) {
        this.player1 = player1
        this.player2 = player2

        this.player1.score = new CircleScore()
        this.player2.score = new CrossScore()
    }

    start() {
        console.log("[Game.start] Let's play tic tac toe between:", this.player1, this.player2)

        this.isStarted = true
        this.isFinished = false
        this.morpion = new Morpion()

        this.playerTurn = Math.random() >= 0.5 ? this.player1 : this.player2
        this.onPlayerTurn(this.playerTurn)

        console.log("[Game.start] Turn of:", this.playerTurn)
    }

    canPlay() {
        return this.isStarted && !this.isFinished
    }

    switchPlayerTurn() {
        this.playerTurn = this.playerTurn == this.player1 ? this.player2 : this.player1
        console.log("[Game.switchPlayerTurn] Turn of:", this.playerTurn)
    }

    playerAction(cell) { // Instance de la classe Cell
        if (!this.canPlay() || !cell.is_empty) return

        this.onPlayerAction(cell)

        const matrix_value = this.mapMatrixValueFromScore(this.playerTurn.score)
        
        this.morpion.matrix[cell.x][cell.y] = matrix_value
        console.log("[Game.playerAction] Update matrix", matrix_value, this.morpion.matrix)
        
        if (this.morpion.isResolved(matrix_value)) {
            console.log("[Game.playerAction] Player has win ✨🎉🎊", this.playerTurn)
            this.isFinished = true
            this.onPlayerWin(this.playerTurn)
            return
        }
        
        this.switchPlayerTurn()
        this.onPlayerTurn(this.playerTurn)
    }

    mapMatrixValueFromScore(score) {
        switch (score.type) {
            case Score.TYPE.CROSS:
                return 1
            case Score.TYPE.CIRCLE:
                return 2
        }

        return 0
    }
}