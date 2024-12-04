import { AuthAside } from '@/components/auth/AuthAside';
import './auth.layout.scss';
import { Container } from '@components/layout/Container';

export const metadata = {
  title: 'Omar Habash',
  description: 'Omar Habash - Full Stack Developer',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="AuthLayout _h-[300vh] relative">
      <div
        className=" sticky top-0 flex flex-row items-center justify-center align-middle h-screen overflow-clip_"
        id="SignUp"
      >
        <Container className="mt-8">
          <div className="columns is-gapless">
            <div className="column w-1/2 ">
              <AuthAside />
            </div>
            <div className="column w-1/2 ">
              {/* <div className="level-right"> <AuthNav/> </div> */}
              <div className="-mt-12_ pl-[10vw] h-full flex flex-row justify-center items-center">
                <div className="inner">{children}</div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
