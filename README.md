# Vendyx.dev

A functional and scalable minimal e-commerce admin that can be adjusted to any user's requirement.

## Why choose Vendyx?

We know there are so many other options for e-commerce platform, so why choose us?

🎨 **Admin ui focused on simplicity:** Vendyx offers a unique and simple administration interface, inspired by the elegance and functionality of Shopify.

🟢 **Production ready:** Vendyx offers production ready integrations for payments, storage and shipments to you just pick up the ones you want and start selling.

📦 **Your product:** Self host, fork, built on top of it, vendyx is a open source solution for your next e-commerce platform

## Roadmap
> [!NOTE]
> **Vendyx is in development. Check marks indicate completed MVP sections; more features will be added.**

- [x] Inventory management
  - Products
  - Assets upload
- [x] Order management (order states, shipping and payment methods, cancel)
  - States (modifying, payment method added, complete, etc.)
  - Payment and shipping methods
  - Cancel
- [x] Shop API 
  - products
  - orders (cart)
- [ ] Extensible by code 🚧
  - asset storage provider
  - api options
  - strategies
  - payment methods
  - shipping methods
  - plugins
  - ui-extensions

## Tech stack

- [Typerom](https://typeorm.io/) and [Postresql](https://postgresql.org/) for database management
- [Typescript](https://www.typescriptlang.org/) as the main language
- [Nestjs](https://nestjs.com/) as backend framework
- [React](https://react.dev/) as frontend framework
- [Lerna](https://lerna.js.org/) for monorepo management

## Setup

1. Clone this repo
2. `yarn`
