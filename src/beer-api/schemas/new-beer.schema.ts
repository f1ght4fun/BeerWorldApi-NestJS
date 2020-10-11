export const newBeerSchema = {
    type: 'object',
    additionalProperties: false,
    required: ['name', 'beerType', 'rating'],
    properties: {
        name: {
            type: 'string'
        },
        beerType: {
            type: 'string',
            enum: ['ALE', 'DUNKEL', 'LAGER', 'STOUT']
        },
        rating: {
            anyOf: [
                { type: "null" },
                { type: "number", minimum: 0, maximum: 5 }
            ]
        }
    }
}
