import logo from "@/assets/logo.png";

const Footer = () => (
  <footer id="contact" className="py-16 px-6 border-t border-border">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <img src={logo} alt="Rolll Agency" className="h-14 md:h-16" />
          <p className="font-body text-foreground/50 text-sm max-w-xs text-center md:text-left">
            Yaratıcı tasarım ve dijital çözümlerle başarıyı birlikte inşa ediyoruz.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-4">
          <a
            href="https://www.instagram.com/rolllagency/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border hover:border-primary/40 text-foreground/70 hover:text-primary transition-all duration-300 font-body text-sm"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            @rolllagency
          </a>
          <p className="font-body text-foreground/30 text-xs">© 2026 Rolll Agency. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
