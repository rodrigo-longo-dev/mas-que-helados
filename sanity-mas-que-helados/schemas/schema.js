// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import product from './product'
import banner from './banner'
import category from './category'
import subcategory from './subcategory'
import users from './users'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([product, banner, category, subcategory, users]),
})
