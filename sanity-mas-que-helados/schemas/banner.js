export default {
    name: 'banner',
    title: 'Banner',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            description: 'añade una imagen .png que no tenga fondo',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'buttonText',
            title: 'ButtonText',
            description: 'Texto del botón que te lleva a la página',
            type: 'string',
        },
        {
            name: 'product',
            title: 'Product',
            description: 'URL de la siguiente página',
            type: 'string',
        },
        {
            name: 'desc',
            title: 'Desc',
            type: 'string',
        },
        {
            name: 'smallText',
            title: 'SmallText',
            type: 'string',
        },
        {
            name: 'midText',
            title: 'MidText',
            type: 'string',
        },
        {
            name: 'largeText1',
            title: 'LargeText1',
            type: 'string',
        },
        {
            name: 'largeText2',
            title: 'LargeText2',
            type: 'string',
        },
        {
            name: 'discount',
            title: 'Discount',
            type: 'string',
        },
        {
            name: 'saleTime',
            title: 'SaleTime',
            type: 'string',
        },
        {
            name: 'headerBackgroundColor',
            title: 'Header Background Color',
            type: 'string',
            description: 'Color de fondo para el header'
        },
        {
            name: 'headerPrimaryColor',
            title: 'Header Primary Color',
            type: 'string',
            description: 'Color Primario para el header (texto y botón)'
        },
        {
            name: 'footerBackgroundColor',
            title: 'Footer Background Color',
            type: 'string',
            description: 'Color de fondo para el footer'
        },
        {
            name: 'footerPrimaryColor',
            title: 'Footer Primary Color',
            type: 'string',
            description: 'Color Primario para el footer (texto y botón)'
        },
    ],
  };