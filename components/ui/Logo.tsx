import LinkWithCursor from './LinkWithCursor';

export const Logo = () => (
  <LinkWithCursor href="/" className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-foreground transition-colors hover:text-primary" aria-label="Represent+ Home">
    Represent<span className="text-primary">.</span>+
  </LinkWithCursor>
); 