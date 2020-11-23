class Score {
    static get TYPE() {
        return {
            CROSS: 'cross',
            CIRCLE: 'circle'
        }
    }

    constructor(type) {
        this.type = type
    }
}