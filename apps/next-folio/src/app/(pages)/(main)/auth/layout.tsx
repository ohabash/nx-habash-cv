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
        className="flex flex-row items-center justify-center align-middle h-screen  pt-14"
        id="SignUp"
      >
        <Container className="">
          <div className="columns is-gapless fadeInUp animated d8 max-h relative">
            <div className="column is-6 sticky_ top-24_ self-start">
              <AuthAside />
            </div>
            <div className="column is-6 my-24_ self-center">
              {/* <div className="level-right"> <AuthNav/> </div> */}
              <div className="-mt-12_ pl-[3vw] h-full flex flex-row justify-center items-center_ fadeInUp animated d8">
                <div className="inner w-full">{children}</div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
