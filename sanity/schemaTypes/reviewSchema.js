import {defineField, defineType} from 'sanity'

export const reviewType = defineType({
  name: 'reviews',
  title: 'Customer Reviews',
  type: 'document',

  fields: [
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'rating',
    },
    prepare({title, subtitle}) {
      return {
        title,
        subtitle: subtitle ? `${subtitle} ★` : 'No rating',
      }
    },
  },
})