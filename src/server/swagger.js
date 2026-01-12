const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PhucChau Pharma API',
      version: '1.0.0',
      description: 'API Documentation for PhucChau Pharma E-commerce System',
      contact: {
        name: 'API Support',
        email: 'support@phucchaupharma.com'
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3001}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token for admin authentication'
        },
      },
      schemas: {
        Product: {
          type: 'object',
          properties: {
            product_id: { type: 'integer' },
            product_name: { type: 'string' },
            description: { type: 'string' },
            price: { type: 'number' },
            stock_quantity: { type: 'integer' },
            category: { type: 'string', description: 'Loại sản phẩm (Vitamin, Thực phẩm bổ sung, ...)' },
            unit: { type: 'string', description: 'Đơn vị tính (Hộp, Chai, Viên, Gói, ...)' },
            image_url: { type: 'string' },
          },
        },
        CartItem: {
          type: 'object',
          properties: {
            product_id: { type: 'integer' },
            quantity: { type: 'integer' },
          },
        },
        Order: {
          type: 'object',
          properties: {
            order_id: { type: 'integer' },
            customer_name: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' },
            address: { type: 'string' },
            total_amount: { type: 'number' },
            status: { type: 'string' },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            error: { type: 'string' },
          },
        },
      },
    },
    tags: [
      { name: 'Products', description: 'Product management endpoints' },
      { name: 'Cart', description: 'Shopping cart endpoints' },
      { name: 'Order', description: 'Order management endpoints' },
      { name: 'Admin', description: 'Admin panel endpoints (requires authentication)' },
    ],
    paths: {
      '/': {
        get: {
          tags: ['General'],
          summary: 'Home page',
          description: 'Get home page message',
          responses: {
            200: {
              description: 'Success',
              content: {
                'text/plain': {
                  schema: { type: 'string', example: 'Trang chủ' }
                }
              }
            },
          },
        },
      },
      '/products/hot': {
        get: {
          tags: ['Products'],
          summary: 'Get hot products',
          description: 'Retrieve a list of hot/featured products',
          responses: {
            200: {
              description: 'List of hot products',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Product' }
                  }
                }
              }
            },
            500: {
              description: 'Server error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' }
                }
              }
            },
          },
        },
      },
      '/products/random': {
        get: {
          tags: ['Products'],
          summary: 'Get random products',
          description: 'Retrieve a list of random products',
          responses: {
            200: {
              description: 'List of random products',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Product' }
                  }
                }
              }
            },
          },
        },
      },
      '/products/filter': {
        get: {
          tags: ['Products'],
          summary: 'Filter products',
          description: 'Get filtered products based on query parameters',
          parameters: [
            {
              name: 'category',
              in: 'query',
              description: 'Category ID',
              schema: { type: 'integer' }
            },
            {
              name: 'category',
              in: 'query',
              description: 'Category name (Vitamin, Thực phẩm bổ sung, ...)',
              schema: { type: 'string' }
            },
            {
              name: 'minPrice',
              in: 'query',
              description: 'Minimum price',
              schema: { type: 'number' }
            },
            {
              name: 'maxPrice',
              in: 'query',
              description: 'Maximum price',
              schema: { type: 'number' }
            },
          ],
          responses: {
            200: {
              description: 'Filtered products',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Product' }
                  }
                }
              }
            },
          },
        },
      },
      '/products/{name}': {
        get: {
          tags: ['Products'],
          summary: 'Get product by name',
          description: 'Retrieve product details by product name',
          parameters: [
            {
              name: 'name',
              in: 'path',
              required: true,
              description: 'Product name',
              schema: { type: 'string' }
            },
          ],
          responses: {
            200: {
              description: 'Product details',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Product' }
                }
              }
            },
            404: {
              description: 'Product not found',
            },
          },
        },
      },
      '/cart': {
        get: {
          tags: ['Cart'],
          summary: 'Get cart items',
          description: 'Retrieve all items in the shopping cart',
          responses: {
            200: {
              description: 'Cart items',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/CartItem' }
                  }
                }
              }
            },
          },
        },
      },
      '/cart/getcartcount': {
        get: {
          tags: ['Cart'],
          summary: 'Get cart count',
          description: 'Get the number of items in cart',
          responses: {
            200: {
              description: 'Cart count',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      count: { type: 'integer' }
                    }
                  }
                }
              }
            },
          },
        },
      },
      '/cart/addtocart': {
        post: {
          tags: ['Cart'],
          summary: 'Add product to cart',
          description: 'Add a product to the shopping cart',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['product_id', 'quantity'],
                  properties: {
                    product_id: { type: 'integer' },
                    quantity: { type: 'integer', minimum: 1 }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Product added to cart successfully',
            },
            400: {
              description: 'Bad request',
            },
          },
        },
      },
      '/cart/updateProductCart': {
        post: {
          tags: ['Cart'],
          summary: 'Update cart item quantity',
          description: 'Update the quantity of a product in cart',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['product_id', 'quantity'],
                  properties: {
                    product_id: { type: 'integer' },
                    quantity: { type: 'integer' }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Cart updated successfully',
            },
          },
        },
      },
      '/cart/removeProductCart': {
        post: {
          tags: ['Cart'],
          summary: 'Remove product from cart',
          description: 'Remove a specific product from the cart',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['product_id'],
                  properties: {
                    product_id: { type: 'integer' }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Product removed from cart',
            },
          },
        },
      },
      '/cart/clearProductCart': {
        post: {
          tags: ['Cart'],
          summary: 'Clear cart',
          description: 'Remove all items from the cart',
          responses: {
            200: {
              description: 'Cart cleared successfully',
            },
          },
        },
      },
      '/order': {
        post: {
          tags: ['Order'],
          summary: 'Create order',
          description: 'Create a new order',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['customer_name', 'email', 'phone', 'address', 'items'],
                  properties: {
                    customer_name: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    phone: { type: 'string' },
                    address: { type: 'string' },
                    items: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          product_id: { type: 'integer' },
                          quantity: { type: 'integer' },
                          price: { type: 'number' }
                        }
                      }
                    },
                    note: { type: 'string' }
                  }
                }
              }
            }
          },
          responses: {
            201: {
              description: 'Order created successfully',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Order' }
                }
              }
            },
            400: {
              description: 'Invalid order data',
            },
          },
        },
      },
      '/admin/login': {
        post: {
          tags: ['Admin'],
          summary: 'Admin login',
          description: 'Authenticate admin user and receive JWT token',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['username', 'password'],
                  properties: {
                    username: { type: 'string' },
                    password: { type: 'string', format: 'password' }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Login successful',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      token: { type: 'string', description: 'JWT token' },
                      user: {
                        type: 'object',
                        properties: {
                          id: { type: 'integer' },
                          username: { type: 'string' },
                          role: { type: 'string' }
                        }
                      }
                    }
                  }
                }
              }
            },
            401: {
              description: 'Invalid credentials',
            },
          },
        },
      },
      '/admin/addProduct': {
        post: {
          tags: ['Admin'],
          summary: 'Add new product',
          description: 'Add a new product (admin only)',
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Product' }
              }
            }
          },
          responses: {
            201: {
              description: 'Product created successfully',
            },
            401: {
              description: 'Unauthorized',
            },
            403: {
              description: 'Forbidden',
            },
          },
        },
      },
      '/admin/getOrder/{page}': {
        get: {
          tags: ['Admin'],
          summary: 'Get orders (paginated)',
          description: 'Retrieve orders with pagination (admin only)',
          security: [{ BearerAuth: [] }],
          parameters: [
            {
              name: 'page',
              in: 'path',
              required: true,
              description: 'Page number',
              schema: { type: 'integer', minimum: 1 }
            },
          ],
          responses: {
            200: {
              description: 'List of orders',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      orders: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Order' }
                      },
                      totalPages: { type: 'integer' },
                      currentPage: { type: 'integer' }
                    }
                  }
                }
              }
            },
            401: {
              description: 'Unauthorized',
            },
          },
        },
      },
      '/admin/getCustomer/{page}': {
        get: {
          tags: ['Admin'],
          summary: 'Get customers (paginated)',
          description: 'Retrieve customers with pagination (admin only)',
          security: [{ BearerAuth: [] }],
          parameters: [
            {
              name: 'page',
              in: 'path',
              required: true,
              description: 'Page number',
              schema: { type: 'integer', minimum: 1 }
            },
          ],
          responses: {
            200: {
              description: 'List of customers',
            },
            401: {
              description: 'Unauthorized',
            },
          },
        },
      },
      '/admin/gettotalrevenue': {
        get: {
          tags: ['Admin'],
          summary: 'Get overview data',
          description: 'Get total revenue and overview statistics (admin only)',
          security: [{ BearerAuth: [] }],
          responses: {
            200: {
              description: 'Overview statistics',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      totalRevenue: { type: 'number' },
                      totalOrders: { type: 'integer' },
                      totalCustomers: { type: 'integer' },
                      totalProducts: { type: 'integer' }
                    }
                  }
                }
              }
            },
            401: {
              description: 'Unauthorized',
            },
          },
        },
      },
      '/admin/getAdminProducts/{page}': {
        get: {
          tags: ['Admin'],
          summary: 'Get products (paginated)',
          description: 'Retrieve products with pagination (admin only)',
          security: [{ BearerAuth: [] }],
          parameters: [
            {
              name: 'page',
              in: 'path',
              required: true,
              description: 'Page number',
              schema: { type: 'integer', minimum: 1 }
            },
          ],
          responses: {
            200: {
              description: 'List of products',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      products: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Product' }
                      },
                      totalPages: { type: 'integer' },
                      currentPage: { type: 'integer' }
                    }
                  }
                }
              }
            },
            401: {
              description: 'Unauthorized',
            },
          },
        },
      },
      '/admin/putAdminProduct': {
        put: {
          tags: ['Admin'],
          summary: 'Update product',
          description: 'Update an existing product (admin only)',
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Product' }
              }
            }
          },
          responses: {
            200: {
              description: 'Product updated successfully',
            },
            401: {
              description: 'Unauthorized',
            },
            404: {
              description: 'Product not found',
            },
          },
        },
      },
      '/admin/delete/{product_id}': {
        delete: {
          tags: ['Admin'],
          summary: 'Delete product',
          description: 'Delete a product by ID (admin only)',
          security: [{ BearerAuth: [] }],
          parameters: [
            {
              name: 'product_id',
              in: 'path',
              required: true,
              description: 'Product ID',
              schema: { type: 'integer' }
            },
          ],
          responses: {
            200: {
              description: 'Product deleted successfully',
            },
            401: {
              description: 'Unauthorized',
            },
            404: {
              description: 'Product not found',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js', './Controllers/**/*.js'], // Paths to files with annotations
};

module.exports = swaggerOptions;
