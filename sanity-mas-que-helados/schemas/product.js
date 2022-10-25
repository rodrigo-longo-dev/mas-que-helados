export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{ type: 'image' }],
            options: {
                hotspot: true
            }
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: Rules => Rules.required()
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 90
            },
            validation: Rules => Rules.required()
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number'
        },
        {
            name: 'units',
            title: 'Units',
            type: 'number'
        },
        {
            title: 'Ficha Técnica',
            name: 'fichaTecnica',
            type: 'file',
            fields: [
                {
                    name: 'description',
                    type: 'string',
                    title: 'Description'
                }
            ]
        },
        {
            name: 'details',
            title: 'Details',
            type: 'string'
        },
        {
            name: 'subcategory',
            title: 'Subategory',
            type: 'reference',
            description: 'A que subcategoría pertenece este producto',
            to: [{ type: 'subcategory' }],
            validation: Rules => Rules.required()
        }
    ]

}