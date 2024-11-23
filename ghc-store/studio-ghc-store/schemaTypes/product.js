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

