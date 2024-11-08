import { ITheme } from "../../../services/themer.service";
import { Title } from "../resume-1/Resume-1";

const data = [
  {
    degree: 'Associates of Science in Computer Science',
    institution: 'Tarrant County College',
    graduated: '2011',
    gpa: '3.8',
  },
  {
    institution: 'Rose State College',
    degree: 'FAA Private Pilots License (VFR/IFR)',
    graduated: '2009',
  },
];

interface Props {
  theme: ITheme;
}

const Education2 = ({theme}:Props ) => {
  return (
    <div className="">
      <Title>Education</Title>
      {data.map((education, index) => (
        <div
          key={index}
          className="border-b border-gray-300 pb-4 last:border-b-0 columns last:mb-0"
        >
          <div className="column">
            <h6>{education.degree}</h6>
            <p className="">{education.institution}</p>
            {education.gpa && <p className="">GPA: {education.gpa}</p>}
          </div>
          <div className="column is-3">
            <p
              className="-ml-3 whitespace-nowrap px-2 font-bold rounded-sm text-center"
              style={theme.sec.accent1}
            >{education.graduated}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Education2;
