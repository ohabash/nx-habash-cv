
const Skills = ({skills}: {skills: string[]}) => {
  return (
    <>
    <ul className="flex flex-wrap">
      {skills.map((skill, index) => (
        <li key={index}>
          <Skill skill={skill} index={index} />
        </li>
      ))}
    </ul>
    </>
  );
}

export const Skill = ({skill, index}:{skill: string, index: number}) => {
  return (
    <p
      className="bg-gray-100 text-gray-700 rounded-full py-1 px-2 mr-2 mb-2 text-xs font-bold color-red-500 hover:bg-gray-800 cursor-pointer hover:text-white"
    >
      {skill}
    </p>
  );
}

export default Skills
