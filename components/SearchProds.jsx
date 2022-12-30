import React, { useEffect, useState } from 'react'
import { client, urlFor } from '../lib/client'
import { AiOutlineClose } from 'react-icons/ai'
import { useRouter } from 'next/router'

const SearchProds = ({ close }) => {
    const router = useRouter()
    const [prods, setProds] = useState()
    const [prodsFiltered, setProdsFiltered] = useState()
    const getProds = async () => {
        const query = `*[_type == "product"]`
        const products = await client.fetch(query)
        setProds(products)
    }
    const handleSearch = (text) => {
        if (prods) {
            if (text === '') {
                setProdsFiltered()
            } else {
                const filtered = prods.filter(prod => prod.name.toLowerCase().includes(text))
                if (filtered.length > 0) {
                    setProdsFiltered(filtered.slice(0, 20))
                } else {
                    setProdsFiltered()
                }
            }
        }
    }
    const handleClick = async (product) => {
        close()
        const querySub = `*[_type == "subcategory" && _id == "${product.subcategory._ref}"]`
        const subcategory = await client.fetch(querySub)
        const queryCat = `*[_type == "category" && _id == "${subcategory[0].category._ref}"]`
        const category = await client.fetch(queryCat)
        const catURL = category[0].slug.current
        const subCatURL = subcategory[0].slug.current
        const prodURL = product.slug.current
        router.push(`/subcategories/${catURL}/${subCatURL}/${prodURL}/`)
    }
    useEffect(() => {
        getProds()
    }, [])
    return (
        <div className="popUp-container">
            <div className="close" onClick={close}><AiOutlineClose /></div>
            <div className="popUp-box">
                <input type="text" className="input" placeholder="Busca un producto" onChange={e => handleSearch(e.target.value.toLowerCase())} />
                <div className="popUp-results">
                    {prodsFiltered ? prodsFiltered.map(p => <>
                        <div onClick={() => handleClick(p)} className="result-box">
                            <img src={urlFor(p.image[0])} alt={p.name} />
                            <p>{p.name}</p>
                        </div>
                    </>) : <p>No hemos encontrado resultados</p>}
                </div>
            </div>
        </div>
    )
}

export default SearchProds
