import { Container } from '../layout/Container';
import './header.scss';

export function Header() {
  return (
    <>
      <header className="bg-darker h-[--header-1-height] flex flex-col justify-center z-20 relative">
        <Container className="w-full">
          <div className="level">
            {/* <Nav /> */}
          </div>
        </Container>
      </header>
      <header className="header sticky top-0 z-20 blurrr h-[--header-2-height] flex flex-col justify-center">
        <Container className="w-full">
          <div className="level">
            <div className="level-left">
              <h2>OH</h2>
            </div>
            <div className="level-right">
              <button className="button">Call Me</button>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
}
