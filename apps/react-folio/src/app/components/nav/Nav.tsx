import { navItems } from '../../app.routes';
import { NavLink } from 'react-router-dom';
import './nav.scss';

export function Nav() {
  return (
    <div id="navigation" role="navigation">
      <ul className="level">
        {navItems.map((item, index) => (
          <li className="[&:not(:last-child)]:mr-5" key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}