import {defineField, defineType} from 'sanity'

export const postTable = defineType({
  name: 'postTable',
  title: 'Tabela',
  type: 'object',
  fields: [
    defineField({
      name: 'caption',
      title: 'Legenda',
      type: 'string',
    }),
    defineField({
      name: 'rows',
      title: 'Linhas',
      type: 'array',
      validation: (Rule) => Rule.min(1),
      of: [
        defineField({
          name: 'tableRow',
          title: 'Linha',
          type: 'object',
          fields: [
            defineField({
              name: 'cells',
              title: 'Celulas',
              type: 'array',
              validation: (Rule) => Rule.min(1),
              of: [
                defineField({
                  name: 'cell',
                  title: 'Celula',
                  type: 'text',
                  rows: 2,
                }),
              ],
            }),
          ],
          preview: {
            select: {
              cells: 'cells',
            },
            prepare({cells}: {cells?: string[]}) {
              return {
                title: cells?.filter(Boolean).join(' | ') || 'Linha vazia',
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      rows: 'rows',
      caption: 'caption',
    },
    prepare({rows, caption}: {rows?: unknown[]; caption?: string}) {
      return {
        title: caption || 'Tabela',
        subtitle: `${rows?.length ?? 0} linhas`,
      }
    },
  },
})
