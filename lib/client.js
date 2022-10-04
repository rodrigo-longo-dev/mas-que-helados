import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
    projectId:'sriu7xjj',
    dataset: 'production',
    apiVersion: '2022-09-22',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
})

const builder = imageUrlBuilder(client)

export const urlFor = source => builder.image(source)

let urlBase = 'https://cdn.sanity.io/files/sriu7xjj/production/'
export const fileUrl = asset => {
    const hashFile = asset._ref.split('-')[1]
    const FINAL_PATH = `${urlBase}${hashFile}.pdf`
    return FINAL_PATH
}