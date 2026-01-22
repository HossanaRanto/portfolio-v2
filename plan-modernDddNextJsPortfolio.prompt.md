## Plan: Modern DDD Next.js Portfolio with Admin & Supabase

This plan upgrades your portfolio to a scalable Domain-Driven Design architecture using Next.js 16, Supabase, and Tailwind CSS v4. usage. We will implement a secure Admin interface for content management and use Framer Motion for high-fidelity animations (liquid/glass effects).

### Steps
1.  **Project Setup & Architecture**: Install `framer-motion`, `embla-carousel-react`, `next-themes`, `@supabase/ssr` and scaffold the DDD folder structure (`domain`, `infrastructure`, `presentation`).
2.  **Domain & Infrastructure**: Define TypeScript interfaces (`IProjectRepository`), Entities, and implement the Supabase client and concrete repositories.
3.  **Application Layer**: Create Server Actions (Use Cases) for data fetching (public) and CRUD operations (admin) to ensure type safety and security.
4.  **Presentation & Theming**: Configure standard layouts, dark/light mode with `next-themes`, and build the "Glassmorphism" UI components.
5.  **Admin Dashboard**: Build a protected `/admin` route with forms to manage Projects, Experiences, and Messages, including Image uploads.
6.  **Public Pages**: Develop the Landing, Projects, and Contact pages with fluent animations and liquid effects.

### Further Considerations
1.  **Supabase Auth**: We will need to set up Supabase Auth for the Admin login. Do you have your Supabase project URL and Keys ready?
2.  **Image Strategy**: We will use Supabase Storage buckets for project images.
3.  **Data Seeding**: Do you want to try an automated migration of your old data, or will you manually input it via the new Admin panel?
