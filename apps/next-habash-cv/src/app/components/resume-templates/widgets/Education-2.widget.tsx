const data = [
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University of Example',
    year: '2020',
    gpa: '3.8'
  },
  {
    degree: 'Master of Science in Software Engineering',
    institution: 'Example Institute of Technology',
    year: '2022',
  },
];

const Education2 = () => {
  return (
    <div className="p-4">
      <h3 className="text-[#cd5f5a] mb-3">Education</h3>
      <ul className="space-y-6">
        {data.map((education, index) => (
          <li
            key={index}
            className="border-b border-gray-300 pb-4 last:border-b-0"
          >
            <p className="">{education.year}</p>
            <h6>{education.degree}</h6>
            <p className="">{education.institution}</p>
            {education.gpa && (
              <p className="">GPA: {education.gpa}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Education2;
