export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'baseSlug',
      title: 'Base Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'baseColor',
      title: 'Base Color',
      type: 'object',
      fields: [
        {
          name: 'colorName',
          title: 'Color Name',
          type: 'string',
          validation: Rule => Rule.required(),
        },
        {
          name: 'colorHex',
          title: 'Color Hex Code',
          type: 'string',
          description: 'Hex code for the base color (e.g., #000000 for black).',
          validation: Rule => Rule.required(),
        }
      ],
      description: 'Color information for the base product.',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'additionalImages',
      title: 'Additional Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Additional images for the base product.',
    },
    {
      name: 'variants',
      title: 'Variants (Colors)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'variantId',
              title: 'Variant ID',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'variantTitle',
              title: 'Variant Title',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'colorName',
              title: 'Color Name',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'colorHex',
              title: 'Color Hex Code',
              type: 'string',
              description: 'Hex code for the color (e.g., #ffffff for white).',
              validation: Rule => Rule.required(),
            },
            {
              name: 'variantSlug',
              title: 'Variant Slug',
              type: 'slug',
              options: {
                source: (doc, context) => {
                  const selectedParent = context.parent
                  return `${selectedParent.variantTitle}`
                },
                maxLength: 96
              },
              validation: Rule => Rule.required(),
            },
            {
              name: 'variantImages',
              title: 'Variant Images',
              type: 'array',
              of: [{ type: 'image', options: { hotspot: true } }],
              description: 'Images specific to this color variant.',
            },
            {
              name: 'price',
              title: 'Variant Price',
              type: 'object',
              fields: [
                {
                  name: 'original',
                  title: 'Original Price',
                  type: 'number',
                },
                {
                  name: 'current',
                  title: 'Current Price',
                  type: 'number',
                }
              ]
            }
          ],
        },
      ],
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'defaultPrice',
      title: 'Default Price',
      type: 'object',
      fields: [
        {
          name: 'original',
          title: 'Original Price',
          type: 'number',
          validation: Rule => Rule.required()
        },
        {
          name: 'current',
          title: 'Current Price',
          type: 'number',
          validation: Rule => Rule.required()
        }
      ]
    },
    {
      name: 'showAddToCart',
      title: 'Show Add to Cart',
      type: 'boolean',
      defaultValue: false
    },
    {
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
    }
  ]
}