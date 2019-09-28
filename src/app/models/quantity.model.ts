export class Quantity {
    constructor(public amount: number, public unity: Unity) {
    }
}

export enum Unity {
    GRAMME = "g",
    KILOGRAMME = "kg",
    CSOUPE = "c. à soupe",
    CCAFE = "c. à café",
    MILLILITRE = "mL",
    CENTILILTRE = "cL",
    LITRE = "L",
    PIECE = "pièce(s)"
}