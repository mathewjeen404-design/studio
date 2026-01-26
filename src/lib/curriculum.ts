
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
  {
    level: 6,
    title: 'Top Row: T Y',
    description: 'Practice the T and Y keys.',
    keys: ['t', 'y'],
    practiceText: 'stay true; try that style; they say it is sturdy; a jury has your letter; the fire is hot',
  },
  {
    level: 7,
    title: 'Top Row: W O',
    description: 'Master the W and O keys.',
    keys: ['w', 'o'],
    practiceText: 'we work downtown; how do you follow; two old brown cows; show your work for now',
  },
  {
    level: 8,
    title: 'Top Row: Q P',
    description: 'Learn the final top row keys, Q and P.',
    keys: ['q', 'p'],
    practiceText: 'a pair of pewter plates; quick people popped up; a quiet pet; a popular quote',
  },
  {
    level: 9,
    title: 'Top Row Mastery',
    description: 'Practice all top row keys together.',
    keys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    practiceText: 'we are proud to write quality papers; you type with power; we quit the quiet group',
  },
  {
    level: 10,
    title: 'Bottom Row: V M',
    description: 'Start learning the bottom row with V and M.',
    keys: ['v', 'm'],
    practiceText: 'a very impressive movie; my view is amazing; we have more visitors; move the vase for me',
  },
  {
    level: 11,
    title: 'Bottom Row: B N',
    description: 'Continue with the B and N keys.',
    keys: ['b', 'n'],
    practiceText: 'a number of new brown bags; a big brown bear and a black bug; a banana is an absolute bonus',
  },
  {
    level: 12,
    title: 'Bottom Row: C and Comma',
    description: 'Learn the C key and the comma.',
    keys: ['c', ','],
    practiceText: 'come, see the cats; a classic car, which is cool; i can see, of course, the clouds',
  },
  {
    level: 13,
    title: 'Bottom Row: X and Period',
    description: 'Practice the X key and the period.',
    keys: ['x', '.'],
    practiceText: 'the expert fixed the box. next, explain the complex text. fix it now. that is excellent.',
  },
  {
    level: 14,
    title: 'Bottom Row: Z and Slash',
    description: 'Learn the final bottom row keys, Z and slash.',
    keys: ['z', '/'],
    practiceText: 'a lazy zebra. a dozen fuzzy lizards. a http://a.b/c/z. a dizzying puzzle.',
  },
  {
    level: 15,
    title: 'Bottom Row Mastery',
    description: 'Practice all bottom row keys together.',
    keys: ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
    practiceText: 'a very lazy man vexed a black dog. can you explain the maze? yes, but it is complex.',
  },
  {
    level: 16,
    title: 'Shift Keys & Capitalization',
    description: 'Master using the Shift keys for capitalization.',
    keys: ['ShiftLeft', 'ShiftRight'],
    practiceText: 'The Quick Brown Fox. Jumps Over The Lazy Dog. My Name Is TypeVerse. Hello World. Please Visit London.',
  },
  {
    level: 17,
    title: 'All Keys Mastery',
    description: 'Practice all letters and basic punctuation together.',
    keys: [], // All keys are expected
    practiceText: 'Pack my box with five dozen liquor jugs. The five boxing wizards jump quickly. How vexingly quick daft zebras jump.',
  },
  {
    level: 18,
    title: 'Numbers Row',
    description: 'Practice typing the number row (0-9).',
    keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    practiceText: 'call 123-456-7890. order 10 pizzas, 20 sodas, 30 wings. flight 45 leaving at 6:00, gate 7. my lucky numbers are 8, 9, 1, 2, 3.',
  },
  {
    level: 19,
    title: 'Common Symbols',
    description: 'Practice common symbols and punctuation.',
    keys: ['-', '=', '[', ']', '\\', ';', '\'', ',', '.', '/'],
    practiceText: 'the file is at c:\\temp\\file.txt; it\'s a test. the result: [pass]. we need semi-colons, commas, and periods.',
  },
  {
    level: 20,
    title: 'Shifted Symbols (Top Row)',
    description: 'Practice symbols that require the shift key.',
    keys: ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'],
    practiceText: 'email me at user@example.com! the total is $50.00. that is 100% correct. use #hashtags & *asterisks*. we (the team) agree.',
  },
  {
    level: 21,
    title: 'Tricky Words Practice',
    description: 'Practice words that are commonly misspelled or tricky to type.',
    keys: [],
    practiceText: 'accommodate miscellaneous occurrence. rhythm and conscience. definite separate privilege. liaison and weird. receive the weirdest liaison.',
  },
  {
    level: 22,
    title: 'Speed Challenge (40 WPM Target)',
    description: 'A longer text to build up your typing speed and endurance. Aim for at least 40 WPM.',
    keys: [],
    practiceText: 'the journey of a thousand miles begins with a single step. success is not final, failure is not fatal: it is the courage to continue that counts. believe you can and you are halfway there.',
  },
  {
    level: 23,
    title: 'Speed Challenge (50 WPM Target)',
    description: 'Increase your stamina with this medium-length text. Aim for at least 50 WPM.',
    keys: [],
    practiceText: 'in the middle of difficulty lies opportunity. the only way to do great work is to love what you do. if you have not found it yet, keep looking. do not settle. as with all matters of the heart, you will know when you find it.',
  },
  {
    level: 24,
    title: 'Speed Challenge (60 WPM Target)',
    description: 'A more complex text to push your speed. Focus on rhythm and accuracy. Aim for 60 WPM.',
    keys: [],
    practiceText: 'the future belongs to those who believe in the beauty of their dreams. our greatest glory is not in never falling, but in rising every time we fall. what you get by achieving your goals is not as important as what you become by achieving your goals.',
  },
  {
    level: 25,
    title: 'Speed Challenge (75+ WPM Target)',
    description: 'A difficult text with complex sentences and punctuation. Aim for 75 WPM or more.',
    keys: [],
    practiceText: 'to be yourself in a world that is constantly trying to make you something else is the greatest accomplishment. it is not the mountain we conquer, but ourselves. you must be the change you wish to see in the world. be who you are and say what you feel, because those who mind don\'t matter and those who matter don\'t mind.',
  },
];
