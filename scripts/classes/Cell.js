class Cell {
    constructor(element, x, y) {
        this.is_empty = element.children.length === 0
        this.x = parseInt(x, 10) // parseInt pour être sûr d'avoir un entier en base10, ça m'évite des erreurs si je considère faire des manipulations sur un entier alors que je pourrais avoir un type "string"
        this.y = parseInt(y, 10)
    }
}