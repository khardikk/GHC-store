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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
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
      description: 'Other images of the product.',
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
            },
            {
              name: 'variantImages',
              title: 'Variant Images',
              type: 'array',
              of: [{ type: 'image', options: { hotspot: true } }],
              description: 'Images for this color variant.',
            },
          ],
        },
      ],
      description: 'Define different color options for the product.',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'originalPrice',
      title: 'Original Price',
      type: 'number',
      validation: Rule => Rule.required()
    },
    {
      name: 'currentPrice',
      title: 'Current Price',
      type: 'number',
      validation: Rule => Rule.required()
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
      description: 'Order in which product appears within its category'
    }
  ]
}

