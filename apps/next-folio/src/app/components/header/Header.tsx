import { InterviewMeTrigger } from '../interview-me/InterviewMe';
import { Container } from '../layout/Container';
import { Tooltip } from '@ui/Tooltip';
import './header.scss';

export function Header() {
  return (
    <>
      <header className="bg-darker h-[--header-1-height] flex flex-col justify-center z-20 relative">
        <Container className="w-full">
          <div className="level">{/* <Nav /> */}</div>
        </Container>
      </header>
      <header className="header sticky top-0 z-20 blurrr h-[--header-2-height]_ flex flex-col justify-center">
        <Container className="w-full">
          <div className="level">
            <div className="level-left">
              <h2>OH</h2>
            </div>
            <div className="level-right">
              {/* <div className="flex flex-row items-center justify-center mb-10 w-full">
                <Tooltip
                  // className="_absolute relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  items={[
                    {
                      id: 3,
                      name: 'item.name',
                      designation: 'Data Scientist',
                      image: '/img/logos/angular.webp',
                    },
                  ]}
                />
              </div> */}
              <InterviewMeTrigger className="text-sm my-3 py-1 pl-4 pr-1"></InterviewMeTrigger>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
}
