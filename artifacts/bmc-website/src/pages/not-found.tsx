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
      >
        <Link href="/" className="bmc-btn bmc-btn-primary">
          Return Home
        </Link>
      </PageHeader>
    </>
  );
}
