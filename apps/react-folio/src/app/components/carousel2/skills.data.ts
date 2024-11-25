export type SkillCopy = {
  title?: string;
  button?: string;
}
export type Skill = {
  poster: string;
  name: string;
  url: string;
  icon?: string;
  iconClass?: string;
  copy?: SkillCopy;
};

const defaultCopy: SkillCopy = {
  title: 'Best video title ever1',
  button: 'Watch now1',
};

export const skills: Skill[] = [
  {
    poster: '/img/posters/angular.png',
    name: 'Angular',
    copy: defaultCopy,
    icon: '/img/logos/angular.webp',
    url: 'https://angular.io/',
  },
  {
    poster: '/img/posters/react.png',
    name: 'React',
    copy: defaultCopy,
    icon: '/img/logos/react.webp',
    url: 'https://reactjs.org/',
    iconClass: 'w-[60%]',
  },
  {
    poster: '/img/posters/stripe.png',
    name: 'Stripe API',
    copy: defaultCopy,
    icon: '/img/logos/stripe.png',
    url: 'https://stripe.com/docs/api',
  },
  {
    poster: '/img/posters/nodejs.png',
    name: 'NodeJS',
    copy: defaultCopy,
    icon: '/img/logos/nodejs.png',
    url: 'https://nodejs.org/',
  },
  {
    poster: '/img/posters/mongo.png',
    name: 'MongoDB',
    copy: defaultCopy,
    icon: '/img/logos/mongo.webp',
    url: 'https://www.mongodb.com/',
  },
  {
    poster: '/img/posters/ts.png',
    name: 'TypeScript',
    copy: defaultCopy,
    icon: '/img/logos/ts.png',
    url: 'https://www.typescriptlang.org/',
  },
  {
    poster: '/img/posters/amazon.png',
    name: 'Amazon Selling Partner API',
    copy: defaultCopy,
    icon: '/img/logos/amazon.png',
    url: 'https://developer-docs.amazon.com/sp-api',
  },
  {
    poster: '/img/posters/msbc.jpg',
    name: 'Microsoft Business Central',
    copy: defaultCopy,
    icon: '/img/logos/msbc.png',
    iconClass: 'w-[80%]',
    url: 'https://dynamics.microsoft.com/en-us/business-central/',
  },
  {
    poster: '/img/posters/shopify.jpg',
    name: 'Shopify',
    copy: defaultCopy,
    icon: '/img/logos/shopify.png',
    url: 'https://www.shopify.com/',
  },
  {
    poster: '/img/posters/js.jpg',
    name: 'JavaScript',
    copy: defaultCopy,
    icon: '/img/logos/js.webp',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  {
    poster: '/img/posters/py.jpg',
    name: 'Python',
    copy: defaultCopy,
    icon: '/img/logos/py.png',
    url: 'https://www.python.org/',
    iconClass: 'w-[80%] mt-2',
  },
  {
    poster: '/img/posters/firebase.jpg',
    name: 'Firebase',
    copy: defaultCopy,
    icon: '/img/logos/firebase.webp',
    url: 'https://firebase.google.com/',
  },
  {
    poster: '/img/posters/nx.jpg',
    name: 'NX Monorepos',
    copy: defaultCopy,
    icon: '/img/logos/nx.png',
    url: 'https://nx.dev/',
  },
  {
    poster: '/img/posters/azure.jpg',
    name: 'Azure',
    copy: defaultCopy,
    icon: '/img/logos/azure.png',
    url: 'https://azure.microsoft.com/',
  },
  {
    poster: '/img/posters/monday.webp',
    name: 'Monday.com App Development',
    copy: defaultCopy,
    icon: '/img/logos/monday.webp',
    url: 'https://azure.microsoft.com/',
  },
];

const shuffleAndCheckConsecutive = (skills: any[]): any[] => {
  let shuffledSkills = skills;
  let hasConsecutiveDuplicates = true;

  const hasConsecutiveDuplicatesFn = (shuffledSkills: any[]): boolean => {
    return shuffledSkills.some((item, index) => {
      return index > 0 && item === shuffledSkills[index - 1];
    });
  };

  while (hasConsecutiveDuplicates) {
    shuffledSkills = skills
      .sort(() => Math.random() - 0.5)
      .concat(skills.sort(() => Math.random() - 0.5))
      .concat(skills.sort(() => Math.random() - 0.5));

    hasConsecutiveDuplicates = hasConsecutiveDuplicatesFn(shuffledSkills);
  }

  return shuffledSkills;
};

export const randomSkillsSet1 = shuffleAndCheckConsecutive(skills);

export const randomSkillsSet2 = shuffleAndCheckConsecutive(skills).sort(() => Math.random() - 0.5);
