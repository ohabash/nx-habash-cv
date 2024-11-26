import Link from 'next/link';
import { useRouter } from 'next/router';
import './nav.scss';
import { navItems } from '../../app.routes';

export function Nav() {
  const router = useRouter();

  return (
    <div id="navigation" role="navigation">
      <ul className="level">
        {navItems.map((item, index) => (
          <li className="[&:not(:last-child)]:mr-5" key={index}>
            <Link href={item.path}>
              <a className={router.pathname === item.path ? 'active' : ''}>
                {item.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
