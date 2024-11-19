export type ItemCopy = {
  title?: string;
  button?: string;
}
export type Item = {
  poster: string;
  name: string;
  url: string;
  icon?: string;
  iconClass?: string;
  copy?: ItemCopy;
};

const defaultCopy: ItemCopy = {
  title: 'Best video title ever1',
  button: 'Watch now1',
};

export const items: Item[] = [
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
];

const shuffleAndCheckConsecutive = (items: any[]): any[] => {
  let shuffledItems = items;
  let hasConsecutiveDuplicates = true;

  const hasConsecutiveDuplicatesFn = (shuffledItems: any[]): boolean => {
    return shuffledItems.some((item, index) => {
      return index > 0 && item === shuffledItems[index - 1];
    });
  };

  while (hasConsecutiveDuplicates) {
    shuffledItems = items
      .sort(() => Math.random() - 0.5)
      .concat(items.sort(() => Math.random() - 0.5))
      .concat(items.sort(() => Math.random() - 0.5));

    hasConsecutiveDuplicates = hasConsecutiveDuplicatesFn(shuffledItems);
  }

  return shuffledItems;
};

export const randomItemsSet1 = shuffleAndCheckConsecutive(items);

export const randomItemsSet2 = shuffleAndCheckConsecutive(items).sort(() => Math.random() - 0.5);
