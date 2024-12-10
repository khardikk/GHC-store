export default {
    name: 'order',
    title: 'Orders',
    type: 'document',
    fields: [
      {
        name: 'razorpayOrderId',
        title: 'Razorpay Order ID',
        type: 'string',
      },
      {
        name: 'razorpayPaymentId',
        title: 'Razorpay Payment ID',
        type: 'string',
      },
      {
        name: 'customerName',
        title: 'Customer Name',
        type: 'string',
      },
      {
        name: 'customerPhone',
        title: 'Customer Phone',
        type: 'string',
      },
      {
        name: 'items',
        title: 'Order Items',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'productId',
                title: 'Product ID',
                type: 'string'
              },
              {
                name: 'title',
                title: 'Product Title',
                type: 'string'
              },
              {
                name: 'quantity',
                title: 'Quantity',
                type: 'number'
              },
              {
                name: 'variantId',
                title: 'Variant ID',
                type: 'string'
              },
              {
                name: 'selectedSize',
                title: 'Selected Size',
                type: 'string'
              }
            ]
          }
        ]
      },
      {
        name: 'totalAmount',
        title: 'Total Amount',
        type: 'number',
      },
      {
        name: 'savings',
        title: 'Total Savings',
        type: 'number',
      },
      {
        name: 'paymentStatus',
        title: 'Payment Status',
        type: 'string',
        options: {
          list: ['pending', 'success', 'failed']
        }
      },
      {
        name: 'orderDate',
        title: 'Order Date',
        type: 'datetime',
      }
    ]
  }