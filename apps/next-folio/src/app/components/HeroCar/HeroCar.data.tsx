export type HeroItemCopy = {
  title?: string;
  button?: string;
}
export type HeroItem = {
  poster: string;
  name: string;
  desc: string;
  url: string;
  icon?: string;
  iconClass?: string;
  copy?: HeroItemCopy;
  pinned: boolean;
};

const defaultCopy: HeroItemCopy = {
  title: 'Best video title ever1',
  button: 'Watch now1',
};

export const heroItem: HeroItem = {
  poster: '/img/hero_poster.webp',
  name: 'OpenAI',
  desc: 'Experience with OpenAI API for building intelligent applications that leverage natural language processing and machine learning.',
  copy: defaultCopy,
  icon: '/img/logos/openai.png',
  url: 'https://beta.openai.com/docs/',
  pinned: true,
};
