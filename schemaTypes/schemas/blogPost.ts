import {defineField, defineType} from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'postTitle',
      title: 'Título do Post',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'postTitle', 
        maxLength: 96, 
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'postDescription',
      title: 'Descrição do Post',
      type: 'string',
    }),
    defineField({
      name: 'postDate',
      title: 'Data do Post',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'postCategory',
      title: 'Categoria de post',
      type: 'string',
    }),
    defineField({
      name: 'authorName',
      title: 'Nome do Autor',
      type: 'string',
    }),
    defineField({
      name: 'authorImage',
      title: 'Foto do Autor',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'readingTime',
      title: 'Tempo de Leitura (minutos)',
      type: 'number',
    }),
    defineField({
      name: 'thumbnailImage',
      title: 'Thumbnail',
      type: 'image',
      options: {hotspot: true},
    }),

    defineField({
      name: 'references',
      title: 'Referências',
      type: 'array',
      of: [{type: 'block'}],
    }),

    defineField({
      name: 'postContent',
      title: 'Conteúdo do Post',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {hotspot: true},
        },
        {
          type: 'code',
          title: 'Código',
          options: {
            withFilename: true,
            highlightedLines: true, 
            language: 'javascript',
          },
        },
      ],
    }),
  ],
})
