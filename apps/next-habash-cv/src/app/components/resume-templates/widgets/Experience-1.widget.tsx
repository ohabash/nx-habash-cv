import { ITheme } from "../../../services/themer.service";
import { truncate } from "../../../utils/functions";
import Skills from "../../Skills";
import { Title } from "../resume-1/Resume-1";

type Experience = {
  title: string;
  short_title?: string;
  company: string;
  date: string;
  time: string;
  description: string;
  skills: string[];
};
const data: Experience[] = [
  {
    title: 'Fullstack Engineer',
    short_title: 'Fullstack Engineer',
    company: 'Fornida',
    date: '2020 - Present',
    time: '5y',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et felis ut erat bibendum aliquam. Nullam sit amet magna auctor, vestibulum ligula a, ultricies sapien. Nullam sit amet magna auctor, vestibulum ligula a, ultricies sapien.',
    skills: ['Angular', 'Node.js', 'TypeScript', 'MongoDB', 'NestJs'],
  },
  {
    title: 'Software Developer',
    company: 'JOMA Tech',
    date: '2018 - 2020',
    time: '2y',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et felis ut erat bibendum aliquam. Nullam sit amet magna auctor, vestibulum ligula a, ultricies sapien. Nullam sit amet magna auctor, vestibulum ligula a, ultricies sapien.',
    skills: ['Angular', 'Node.js', 'TypeScript', 'GraphQL', 'Express'],
  },
  {
    title: 'Frontend Developer',
    company: 'SUCCESS Partners',
    date: '2017 - 2018',
    time: '4y',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et felis ut erat bibendum aliquam. Nullam sit amet magna auctor, vestibulum ligula a, ultricies sapien. Nullam sit amet magna auctor, vestibulum ligula a, ultricies sapien.',
    skills: ['PHP', 'BigCommerce', 'Javascript', 'NodeJs', 'SQL'],
  },
];

interface Props {
  theme: ITheme;
}

const Experience1 = ({ theme }: Props) => {
  return (
    <div className="">
      <Title>Experience</Title>
      <div className="mt-5">
        {data.map((item, index) => (
          <div
            key={index}
            className="item border-b border-gray-300 pb-2 mb-5 block last:border-b-0 last:mb-0"
          >
            <div className="columns">
              <div className="column is-3">
                <p
                  className=" whitespace-nowrap px-2 font-bold rounded-sm text-center"
                  style={theme.sec.accent1}
                >
                  {item.time}
                </p>
              </div>
              <div className="column p-0">
                <h6>{item.short_title || item.title}</h6>
                <p>{item.company}</p>
                {/* <p>{truncate(item.description, 50)}</p> */}
              </div>
            </div>
            <Skills skills={item.skills} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience1;