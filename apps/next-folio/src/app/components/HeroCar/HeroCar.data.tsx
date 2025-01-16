export type SkillCopy = {
  title?: string;
  button?: string;
}
export type Skill = {
  poster: string;
  name: string;
  desc: string;
  url: string;
  icon?: string;
  iconClass?: string;
  copy?: SkillCopy;
  pinned: boolean;
};

const defaultCopy: SkillCopy = {
  title: 'Best video title ever1',
  button: 'Watch now1',
};

export const heroItems: Skill[] = [
  {
    poster: '/img/posters/openai.webp',
    name: 'OpenAI',
    desc: 'Experience with OpenAI API for building intelligent applications that leverage natural language processing and machine learning.',
    copy: defaultCopy,
    icon: '/img/logos/openai.png',
    url: 'https://beta.openai.com/docs/',
    pinned: true,
  }
];
