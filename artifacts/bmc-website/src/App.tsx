import { type ReactNode, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

// Pages
import Home from '@/pages/home';
import About from '@/pages/about';
import Programmes from '@/pages/programmes';
import WomensClasses from '@/pages/classes/womens-classes';
import RevertClasses from '@/pages/classes/revert-classes';
import QuranClasses from '@/pages/classes/quran-classes';
import HifdhClasses from '@/pages/classes/hifdh-classes';
import ChildrensClasses from '@/pages/classes/childrens-classes';
import Workshops from '@/pages/classes/workshops';
import Faq from '@/pages/faq';
import Contact from '@/pages/contact';

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [location]);
  return null;
}

function Router() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <ScrollToTop />
      <Nav />
      <main className="flex-1">
        <RoutedErrorBoundary>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/programmes" component={Programmes} />
            <Route path="/programmes/womens-classes" component={WomensClasses} />
            <Route path="/programmes/revert-classes" component={RevertClasses} />
            <Route path="/programmes/quran-classes" component={QuranClasses} />
            <Route path="/programmes/hifdh-classes" component={HifdhClasses} />
            <Route path="/programmes/childrens-classes" component={ChildrensClasses} />
            <Route path="/programmes/workshops" component={Workshops} />
            <Route path="/faq" component={Faq} />
            <Route path="/contact" component={Contact} />
            <Route component={NotFound} />
          </Switch>
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
