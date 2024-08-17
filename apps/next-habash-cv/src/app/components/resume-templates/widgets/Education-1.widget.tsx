
const data = [
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University of Example',
    year: '2020',
  },
  {
    degree: 'Master of Science in Software Engineering',
    institution: 'Example Institute of Technology',
    year: '2022',
  },
];

const Education1 = () => {
  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Education</h3>
      <ul className="space-y-4">
        {data.map((education, index) => (
          <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold">{education.degree}</h4>
            <p className="text-gray-700">{education.institution}</p>
            <p className="text-gray-500">{education.year}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Education1
