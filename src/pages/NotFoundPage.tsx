import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | pushkar patel</title>
        <meta name="description" content="Page not found" />
      </Helmet>

      <section className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h1 className="font-semibold text-6xl mb-4 tracking-tighter">404</h1>
        <p className="text-muted-foreground mb-8">This page could not be found.</p>
        <Link to="/" className="text-primary hover:underline">
          Go back home
        </Link>
      </section>
    </>
  );
}
