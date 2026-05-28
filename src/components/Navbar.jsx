import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();

  const navLinks = [
    { href: '/', label: 'Գլխավոր' },
    { href: '/questions', label: 'Հարցեր' },
    { href: '/participants', label: 'Մասնակիցներ' },
    { href: '/results', label: 'Արդյունքներ' },
  ];

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link href="/" className="navbar-brand">
          Online Surveys
        </Link>
        <div className="navbar-links">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${router.pathname === link.href ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
