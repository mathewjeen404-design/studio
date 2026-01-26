export type Level = {
  level: number;
  title: string;
  description: string;
  keys: string[];
  practiceText: string;
};

export const LEVELS: Level[] = [
  {
    level: 1,
    title: 'Home Row: ASDF JKL;',
    description: 'Learn the basic home row keys.',
    keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
    practiceText: 'asdf jkl; a fad a sad lad; a sad fall; a flask; ask a lad; fall fall; sad sad; a lad;',
  },
  {
    level: 2,
    title: 'Home Row: G H',
    description: 'Introduce the G and H keys.',
    keys: ['g', 'h'],
    practiceText: 'a gas; a sash; has a glad hand; a hash; a flag; flash a gas lamp; had a flash',
  },
  {
    level: 3,
    title: 'Home Row Mastery',
    description: 'Practice all home row keys together.',
    keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
    practiceText: 'a sad lass has a sash; a lad has a flag; a fall day; glad dads; a fad; ask a sad lad',
  },
  {
    level: 4,
    title: 'Top Row: E R',
    description: 'Learn the E and R keys.',
    keys: ['e', 'r'],
    practiceText: 'here are the fields; free shares; rare jade; see a red sled; her last dress; hear her',
  },
  {
    level: 5,
    title: 'Top Row: U I',
    description: 'Learn the U and I keys.',
    keys: ['u', 'i'],
    practiceText: 'fluid issue; i see a fluid leak; juries issue a ruling; a dull dish; his fur is his shield',
  },
];
