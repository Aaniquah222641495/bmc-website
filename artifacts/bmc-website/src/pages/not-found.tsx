import { Link } from "wouter";
import { Seo } from "@/components/seo";
import { PageHeader } from "@/components/page-shell";

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="The page you're looking for has been moved or no longer exists — head back to the Beginners Madrasah Classes homepage to find your next class."
        path="/404"
        noIndex
      />
      <PageHeader
        title="404"
        intro="The page you are looking for has been moved or no longer exists."
        mark={<img src="/assets/mascot-figures.webp" alt="" width={789} height={437} className="mx-auto h-auto w-56 sm:w-72" />}
      >
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="bmc-btn bmc-btn-light">
            Back to home
          </Link>
          <Link href="/programmes" className="bmc-btn bmc-btn-soft">
            Find your class
          </Link>
        </div>
      </PageHeader>
    </>
  );
}
