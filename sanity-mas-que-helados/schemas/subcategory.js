export default {
    name: 'subcategory',
    title: 'Subategory',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true
            }
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 90
            }
        },
        {
            name: 'category',
            title: 'Category',
            type: 'reference',
            description: 'A que categoría pertenece esta subcategoría',
            to: [{ type: 'category' }],
            validation: Rules => Rules.required()
        }
    ]
    
}