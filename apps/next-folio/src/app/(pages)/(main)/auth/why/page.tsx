import { SignUpActions, SignUpSubHeaderCopy } from "@components/auth/SignUpActions";
import { DownArrows } from '@components/DownArrows';

const Page = () => {
  const headerCopy = 'Why Sign In?';
  const sections = [
    <>
      <div className="block">
        <h1 className="text-[3.25rem] font-normal">{headerCopy}</h1>
        <p className="f text-left">
          To ensure the security of my portfolio and maintain control over how
          my contact information and resume are shared, I kindly ask you to log
          in.
        </p>
      </div>
    </>,
    <>
      <p className="text-accent1 font-semibold">Protecting My Work</p>
      <p className="f">
        My portfolio represents years of effort in software development and
        design. Logging in helps keep this information secure and ensures it's
        accessed by professionals like you.
      </p>
    </>,
    <>
      <p className="text-accent1 font-semibold">Respecting Your Privacy</p>
      <p className="f">
        Logging in is simple and safe. I only request a few basic details, and
        your information will never be shared or used for spam.
      </p>
    </>,
    <>
      <p className="text-accent1 font-semibold">Better Engagement</p>
      <p className="f">
        By logging in, you'll get a tailored experience and easy access to
        everything you need to know about my skills, experience, and
        availability.
      </p>
    </>,
    <>
      <div className="ops mt-[2vh] flex_ w-full">
        <h2>Sign Up</h2>
        <p className="f mb-10">
          <SignUpSubHeaderCopy />
        </p>
        <SignUpActions />
      </div>
    </>,
  ];
  const lastSecIndex = sections.length - 1;
  return (
    <>
      <div className="ops mt-[2vh]_ flex_">
        <div className="snap-y snap-mandatory h-[80vh] overflow-scroll ">
          {sections.map((section, i) => {
            return (
              <section key={i} className="snap-center h-[80vh] flex items-center justify-center align-middle relative">
                <div className="itms">
                  {section}
                  {i!=lastSecIndex && <DownArrows className="absolute bottom-[9vh] w-full left-0 text-center" />}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Page
