import { type ReactNode, Suspense, lazy, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import {
  Redirect,
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

// Home loads eagerly since it's the most common entry point.
import Home from '@/pages/home';

// Every other route is code-split so visitors only download the page they land on.
const About = lazy(() => import('@/pages/about'));
const Programmes = lazy(() => import('@/pages/programmes'));
const WomensClasses = lazy(() => import('@/pages/classes/womens-classes'));
const InPersonWorkshops = lazy(() => import('@/pages/classes/in-person-workshops'));
const QuranClasses = lazy(() => import('@/pages/classes/quran-classes'));
const HifdhClasses = lazy(() => import('@/pages/classes/hifdh-classes'));
const ChildrensClasses = lazy(() => import('@/pages/classes/childrens-classes'));
const Workshops = lazy(() => import('@/pages/classes/workshops'));
const Faq = lazy(() => import('@/pages/faq'));
const Testimonials = lazy(() => import('@/pages/testimonials'));
const Contact = lazy(() => import('@/pages/contact'));
const NotFound = lazy(() => import('@/pages/not-found'));

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [location]);
  return null;
}

function RouteFallback() {
  return (
    <div className="flex items-center justify-center py-40">
      <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
    </div>
  );
}

function Router() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <ScrollToTop />
      <Nav />
      <main className="flex-1">
        <RoutedErrorBoundary>
          <Suspense fallback={<RouteFallback />}>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/programmes" component={Programmes} />
              <Route path="/programmes/womens-classes" component={WomensClasses} />
              <Route path="/programmes/in-person-workshops" component={InPersonWorkshops} />
              {/* Old URL, kept working for anyone with a bookmarked/shared link. */}
              <Route path="/programmes/revert-classes">
                <Redirect to="/programmes/in-person-workshops" />
              </Route>
              <Route path="/programmes/quran-classes" component={QuranClasses} />
              <Route path="/programmes/hifdh-classes" component={HifdhClasses} />
              <Route path="/programmes/childrens-classes" component={ChildrensClasses} />
              <Route path="/programmes/workshops" component={Workshops} />
              <Route path="/faq" component={Faq} />
              <Route path="/testimonials" component={Testimonials} />
              <Route path="/contact" component={Contact} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </RoutedErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
