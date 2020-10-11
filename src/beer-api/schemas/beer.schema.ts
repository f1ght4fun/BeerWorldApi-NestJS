export const beerSchema = {
    type: 'object',
    additionalProperties: false,
    required: ['id', 'name', 'beerType'],
    properties: {
        id: {
            type: 'string'
        },
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
