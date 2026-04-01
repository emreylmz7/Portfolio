import { Container } from "@/components/layout/container";
import { SocialLinks } from "@/components/shared/social-links";
import { siteConfig } from "@/data/site-config";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      <Container className="py-10">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div>
            <p className="text-sm font-medium">
              {siteConfig.name.split(" ")[1]}
              <span className="text-primary">.</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Building scalable software solutions.
            </p>
          </div>
          <SocialLinks iconSize={18} />
        </div>
        <div className="mt-8 border-t border-border/30 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
