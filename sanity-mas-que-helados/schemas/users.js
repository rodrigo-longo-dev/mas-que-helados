export default {
    name: 'users',
    title: 'Usuarios',
    type: 'document',
    fields: [
        {
            name: 'firebaseId',
            title: 'Id Firebase',
            type: 'string',
        },
        {
            name: 'fullName',
            title: 'Nombre Completo',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'fullName',
                maxLength: 90
            }
        },
        {
            name: 'comercialName',
            title: 'Nombre Comercial',
            type: 'string'
        },
        {
            name: 'phoneNumber',
            title: 'Número de teléfono',
            type: 'string'
        },
        {
            name: 'contact',
            title: 'Persona de contacto',
            type: 'string'
        },
        {
            name: 'direction',
            title: 'Dirección',
            type: 'object',
            fields: [
                { name: 'street', type: 'string', title: 'Calle'},
                { name: 'poblation', type: 'string', title: 'Población'},
                { name: 'city', type: 'string', title: 'Ciudad'},
                { name: 'postalCode', type: 'string', title: 'Código Postal'},
            ]
        },
        {
            name: 'email',
            title: 'Correo electrónico',
            type: 'string'
        },
        {
            name: 'dni',
            title: 'CIF / DNI',
            type: 'string'
        },
        {
            name: 'deliveryTime',
            title: 'Horario de entrega',
            type: 'string'
        },
    ]
    
}