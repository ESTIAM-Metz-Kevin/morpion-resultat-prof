window.onload = () => { // fonction fléchée anonyme = fonction anonyme mais en syntaxe moderne (ES6)

    const game = new Game(
        new Player("Goku"),
        new Player("Saitama")
    )

    const board = new GameBoard("#board")
    const detail = new GameDetail("#game_details")

    game.onPlayerTurn = player => {
        board.score = player.score
        detail.updatePlayerTurn(player)
    }
    game.onPlayerAction = board.addScore.bind(board)
    game.onPlayerWin = detail.updatePlayerVictory.bind(detail)
    board.onCellChoosed = game.playerAction.bind(game)

    // Lancement d'une partie
    const launchButton = document.getElementById("launchGameButton")
    launchButton.addEventListener("click", game.start.bind(game))
    launchButton.addEventListener("click", board.clear.bind(board))
    launchButton.addEventListener("click", detail.clear.bind(detail))
}