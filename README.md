This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http.localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** [bcryptjs](https://www.npmjs.com/package/bcryptjs), [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Email:** [Nodemailer](https://nodemailer.com/), [React Email](https://react.email/)
- **Validation:** [Zod](https://zod.dev/)

## API Routes

### Authentication

- `POST /api/auth/login`: User login
- `GET /api/auth/logout`: User logout
- `POST /api/auth/reset-password`: Reset user password
- `POST /api/auth/send-email`: Send email for password reset
- `POST /api/auth/signup`: User signup

### Content Management

- `POST /api/content/add-content`: Add new content
- `POST /api/content/create-link`: Create a shareable link for content
- `DELETE /api/content/delete-content`: Delete content
- `GET /api/content/get-content-link`: Get content from a shareable link
- `GET /api/content/get-contents`: Get all contents for a user
- `GET /api/content/get-single`: Get a single content item
- `GET /api/content/get-tags`: Get all tags for a user
- `PUT /api/content/update-content/[contentId]`: Update a specific content item

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
