export type ItemCopy = {
  title?: string;
  button?: string;
}
export type Item = {
  poster: string;
  name: string;
  copy?: ItemCopy;
};

const defaultCopy: ItemCopy = {
  title: 'Best video title ever1',
  button: 'Watch now1',
};

export const items = [
  { 
    poster: '/img/posters/airplane.webp', 
    name: 'Airplane',
    copy: defaultCopy
  },
  {
    poster: '/img/posters/family-man.webp',
    name: 'Family man',
    copy: defaultCopy
  },
  {
    poster: '/img/posters/laboratory.webp',
    name: 'Laboratory',
    copy: defaultCopy
  },
  { 
    poster: '/img/posters/napoleon.webp', 
    name: 'Napoleon',
    copy: defaultCopy
  },
  {
    poster: '/img/posters/person-in-darkness.webp',
    name: 'Person in Darkness',
    copy: defaultCopy
  },
  {
    poster: '/img/posters/scary-building.webp',
    name: 'Scary Building',
    copy: defaultCopy
  },
  { 
    poster: '/img/posters/stars.webp', 
    name: 'Stars',
    copy: defaultCopy
  },
  { 
    poster: '/img/posters/airplane.webp', 
    name: 'Airplane',
    copy: defaultCopy
  },
  {
    poster: '/img/posters/family-man.webp',
    name: 'Family man',
    copy: defaultCopy
  },
  {
    poster: '/img/posters/laboratory.webp',
    name: 'Laboratory',
    copy: defaultCopy
  },
  { 
    poster: '/img/posters/napoleon.webp', 
    name: 'Napoleon',
    copy: defaultCopy
  },
  {
    poster: '/img/posters/person-in-darkness.webp',
    name: 'Person in Darkness',
    copy: defaultCopy
  },
  {
    poster: '/img/posters/scary-building.webp',
    name: 'Scary Building',
    copy: defaultCopy
  },
  { 
    poster: '/img/posters/stars.webp', 
    name: 'Stars',
    copy: defaultCopy
  }
];

export const randomItemsSet1 = items
  .sort(() => Math.random() - 0.5)
  .concat(items.sort(() => Math.random() - 0.5))
  .concat(items.sort(() => Math.random() - 0.5));

export const randomItemsSet2 = items
  .sort(() => Math.random() - 0.5)
  .concat(items.sort(() => Math.random() - 0.5))
  .concat(items.sort(() => Math.random() - 0.5))
  .sort(() => Math.random() - 0.5);
