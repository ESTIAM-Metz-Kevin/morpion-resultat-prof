class GameDetail {
    constructor(detail_selector) {
        this.detail = document.querySelector(detail_selector)
        this.playerTurn = this.detail.querySelector("#player_name")
        this.playerVictory = this.detail.querySelector("#player_victory_name")
    }

    clear() {
        this.playerVictory.innerHTML = ""
    }

    updatePlayerTurn(player) {
        this.playerTurn.innerHTML = player.name
    }

    updatePlayerVictory(player) {
        this.playerVictory.innerHTML = player.name
    }
}