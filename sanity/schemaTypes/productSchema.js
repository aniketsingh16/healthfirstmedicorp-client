// import { defineField, defineType } from 'sanity'

// export const allProductsType  = defineType({
//   name: 'allProducts',
//   title: 'All Products',
//   type: 'document',
//   fields: [
//     defineField({
//       name: 'id',
//       title: 'Id',
//       type: 'string',
//     }),
//     defineField({
//       name: 'item',
//       title: 'Item',
//       type: 'string',
//     }),
//     defineField({
//       name: 'slug',
//       title: 'Slug',
//       type: 'slug',
//       options: {
//         source: 'name',
//         maxLength: 90,
//       },
//     }),
//     defineField({
//       name: 'company',
//       title: 'Company',
//       type: 'string',
//     }),
//     defineField({
//       name: 'imageurl',
//       title: 'imageURL',
//       type: 'image',
//       options: {
//         hotspot: true,
//       },
//     }),
//     defineField({
//       name: 'images',
//       title: 'Product Images',
//       type: 'array',
//       of: [{ type: 'image' }],
//     }),
//     defineField({
//       name: 'bulletDescription',
//       title: 'Bullets Description',
//       type: 'array',
//       of: [{ type: 'string' }],
//     }),
//     defineField({
//       name: 'description',
//       title: 'Description',
//       type: 'text',
//     }),
//     defineField({
//       name: 'category',
//       title: 'Product Category',
//       type: 'reference',
//       to: [{ type: 'category' }],
//     }),
//     defineField({
//       name: 'price',
//       title: 'Price',
//       type: 'number',
//     }),
//     defineField({
//       name: 'rating',
//       title: 'Rating',
//       type: 'number',
//     }),
//     defineField({
//       name: 'stock',
//       title: 'stock',
//       type: 'number',
//     }),
//     defineField({
//       name: 'instock',
//       title: 'Instock',
//       type: 'boolean',
//     }),
//     defineField({
//       name: 'featured',
//       title: 'Featured',
//       type: 'boolean',
//     }),
//   ],
// })

import { defineField, defineType } from 'sanity'

export const allProductsType = defineType({
  name: 'allProducts',
  title: 'All Products',
  type: 'document',
  fields: [
    defineField({
      name: 'productID',
      title: 'Product ID',
      type: 'string',
    }),
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name', // must match the actual field name
        maxLength: 90,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Product Company',
      type: 'string',
    }),
    defineField({
      name: 'imageurl',
      title: 'imageURL',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [{ type: 'image' }],
    }),
    defineField({
      name: 'bulletDescription',
      title: 'Bullets Description',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'category',
      title: 'Product Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'sellingPrice',
      title: 'Selling Price / Discounted Price',
      type: 'number',
      validation: Rule => Rule.required().positive().precision(2),
    }),
    defineField({
      name: 'mrp',
      title: 'MRP (Maximum Retail Price)',
      type: 'number',
      validation: Rule => Rule.positive().greaterThan(Rule.valueOfField('sellingPrice')),
    }),
    defineField({
      name: 'rating',
      title: 'Product Rating',
      type: 'number',
      validation: Rule => Rule.min(1).max(5).integer(),
    }),
    defineField({
      name: 'stock',
      title: 'stock',
      type: 'number',
    }),
    defineField({
      name: 'instock',
      title: 'Stock / Out-of-Stock',
      type: 'boolean',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
    }),
    defineField({
      name: 'additionalInformation',
      title: 'Additional Information',
      description: 'Flat facts like Brand, GTIN, SKU',
      type: 'array',
      of: [
        defineField({
          name: 'infoItem',
          title: 'Info Item',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
          },
        }),
      ],
    }),
  ],
})