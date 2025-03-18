# 🛍️ Next.js 15 E-Commerce Blog (with Contentful & GraphQL)

Welcome to the **Next.js 15 E-Commerce Blog**! 🚀 This project is a **fully dynamic** e-commerce blog that integrates **Contentful CMS** for content management, **GraphQL** for data fetching, and **Prisma** with MongoDB for structured data management.

## 🌟 Key Features

- **Next.js 15 App Router** for efficient frontend & backend handling.
- **Contentful CMS** integration for blog management.
- **GraphQL API** (Contentful Storefront) for fast, scalable queries.
- **Prisma ORM** for seamless database interactions.
- **Iron Session & bcrypt** for authentication.
- **Dynamic blog listing & detail pages**.
- **SEO-friendly architecture**.
- **Responsive TailwindCSS UI** for a modern, clean look.

## 🏗️ Tech Stack

| Technology     | Purpose                       |
|---------------|-------------------------------|
| **Next.js 15** | Server-side rendering & routing |
| **TypeScript** | Type safety & scalability     |
| **GraphQL**    | API query language            |
| **Contentful** | Headless CMS for blog data    |
| **Prisma**     | ORM for MongoDB               |
| **Iron Session** | Secure user authentication |
| **TailwindCSS** | Responsive UI styling        |
| **Apollo Client** | GraphQL client for fetching data |

## 📂 Folder Structure

```
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/
│   │   ├── blog/          # Blog listing & detail pages
│   │   ├── api/           # API routes (Next.js App Router)
│   ├── lib/
│   │   ├── contentfulGraphQL.ts  # Contentful GraphQL client
│   │   ├── prisma.ts             # Prisma client
│   ├── data/
│   ├── shared/
│   ├── styles/
└── .env.local              # Environment variables (ignored in Git)
```

## ⚡ Project Flow

### 1️⃣ Fetching Blog Data from Contentful
- Uses Apollo Client to query **Contentful GraphQL API**.
- Fetches **title, brief, cover image, tag, slug, and full blog content** dynamically.

### 2️⃣ Displaying Blog List
- `SectionBlogs.tsx` fetches all blog posts.
- Blogs are **filtered by category** (e.g., Style, Fitting, General).
- Renders `BlogCard.tsx` for each blog post.

### 3️⃣ Rendering Blog Detail Page
- Uses `SingleBlogPage.tsx` to fetch **a single blog post** via `slug`.
- Displays **title, image, date, and content sections**.
- Uses `SectionBlogBody.tsx` to format **detailed content dynamically**.

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

### 2️⃣ Install Dependencies
```sh
yarn install  # or npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env.local` file and add:
```env
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_access_token
```

### 4️⃣ Run the Development Server
```sh
yarn dev  # or npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the project running.

## 🔌 API Integration (Contentful GraphQL)

### Fetch All Blogs
```graphql
query GetBlogs {
  blogPostCollection {
    items {
      title
      brief
      date
      coverImage { url }
      tag
      slug
    }
  }
}
```

### Fetch Single Blog
```graphql
query GetBlog($slug: String!) {
  blogPostCollection(where: { slug: $slug }, limit: 1) {
    items {
      title
      brief
      coverImage { url }
      blogData
      slug
    }
  }
}
```

## 💡 Plus Points

✅ **Headless CMS (Contentful) for easy content updates**.
✅ **GraphQL for optimized, scalable data fetching**.
✅ **TypeScript for type safety**.
✅ **SEO & performance-focused architecture**.
✅ **Modern UI with TailwindCSS**.
✅ **Scalable & extendable Next.js structure**.

## 🤝 Contributing

Want to improve this project? Feel free to submit PRs!

### Steps to Contribute:
1. **Fork the repository**.
2. **Create a new branch**: `git checkout -b feature-branch`
3. **Make your changes** and commit: `git commit -m 'Add new feature'`
4. **Push to your fork** and submit a PR.

## 📜 License
This project is licensed under the MIT License.

---

### 🌟 Enjoy building with Next.js, Contentful & GraphQL! 🚀

