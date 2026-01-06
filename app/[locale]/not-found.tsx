import { getTranslations } from "next-intl/server";

export default async function NotFoundPage() {
  const _t = await getTranslations("NotFoundPage");

  return (
    <div className="flex min-h-screen items-center justify-center bg-spa-cream/30">
      <div className="text-center">
        <h1 className="mb-4 font-bold text-6xl text-forest-green">404</h1>
        <p className="text-charcoal/70 text-xl">Page not found</p>
      </div>
    </div>
  );
}
