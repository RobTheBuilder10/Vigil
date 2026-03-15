import { BibleVerse } from '../types';

// Sample KJV verses for demonstration - in production these would come from a full Bible API/database
export const sampleVerses: Record<string, BibleVerse[]> = {
  'Joshua-1': [
    { book: 'Joshua', chapter: 1, verse: 1, text: 'Now after the death of Moses the servant of the LORD it came to pass, that the LORD spake unto Joshua the son of Nun, Moses\' minister, saying,', translation: 'KJV' },
    { book: 'Joshua', chapter: 1, verse: 2, text: 'Moses my servant is dead; now therefore arise, go over this Jordan, thou, and all this people, unto the land which I do give to them, even to the children of Israel.', translation: 'KJV' },
    { book: 'Joshua', chapter: 1, verse: 3, text: 'Every place that the sole of your foot shall tread upon, that have I given unto you, as I said unto Moses.', translation: 'KJV' },
    { book: 'Joshua', chapter: 1, verse: 4, text: 'From the wilderness and this Lebanon even unto the great river, the river Euphrates, all the land of the Hittites, and unto the great sea toward the going down of the sun, shall be your coast.', translation: 'KJV' },
    { book: 'Joshua', chapter: 1, verse: 5, text: 'There shall not any man be able to stand before thee all the days of thy life: as I was with Moses, so I will be with thee: I will not fail thee, nor forsake thee.', translation: 'KJV' },
    { book: 'Joshua', chapter: 1, verse: 6, text: 'Be strong and of a good courage: for unto this people shalt thou divide for an inheritance the land, which I sware unto their fathers to give them.', translation: 'KJV' },
    { book: 'Joshua', chapter: 1, verse: 7, text: 'Only be thou strong and very courageous, that thou mayest observe to do according to all the law, which Moses my servant commanded thee: turn not from it to the right hand or to the left, that thou mayest prosper whithersoever thou goest.', translation: 'KJV' },
    { book: 'Joshua', chapter: 1, verse: 8, text: 'This book of the law shall not depart out of thy mouth; but thou shalt meditate therein day and night, that thou mayest observe to do according to all that is written therein: for then thou shalt make thy way prosperous, and then thou shalt have good success.', translation: 'KJV' },
    { book: 'Joshua', chapter: 1, verse: 9, text: 'Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.', translation: 'KJV' },
  ],
  'Psalms-23': [
    { book: 'Psalms', chapter: 23, verse: 1, text: 'The LORD is my shepherd; I shall not want.', translation: 'KJV' },
    { book: 'Psalms', chapter: 23, verse: 2, text: 'He maketh me to lie down in green pastures: he leadeth me beside the still waters.', translation: 'KJV' },
    { book: 'Psalms', chapter: 23, verse: 3, text: 'He restoreth my soul: he leadeth me in the paths of righteousness for his name\'s sake.', translation: 'KJV' },
    { book: 'Psalms', chapter: 23, verse: 4, text: 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.', translation: 'KJV' },
    { book: 'Psalms', chapter: 23, verse: 5, text: 'Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.', translation: 'KJV' },
    { book: 'Psalms', chapter: 23, verse: 6, text: 'Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever.', translation: 'KJV' },
  ],
  'Proverbs-1': [
    { book: 'Proverbs', chapter: 1, verse: 1, text: 'The proverbs of Solomon the son of David, king of Israel;', translation: 'KJV' },
    { book: 'Proverbs', chapter: 1, verse: 2, text: 'To know wisdom and instruction; to perceive the words of understanding;', translation: 'KJV' },
    { book: 'Proverbs', chapter: 1, verse: 3, text: 'To receive the instruction of wisdom, justice, and judgment, and equity;', translation: 'KJV' },
    { book: 'Proverbs', chapter: 1, verse: 4, text: 'To give subtilty to the simple, to the young man knowledge and discretion.', translation: 'KJV' },
    { book: 'Proverbs', chapter: 1, verse: 5, text: 'A wise man will hear, and will increase learning; and a man of understanding shall attain unto wise counsels:', translation: 'KJV' },
    { book: 'Proverbs', chapter: 1, verse: 6, text: 'To understand a proverb, and the interpretation; the words of the wise, and their dark sayings.', translation: 'KJV' },
    { book: 'Proverbs', chapter: 1, verse: 7, text: 'The fear of the LORD is the beginning of knowledge: but fools despise wisdom and instruction.', translation: 'KJV' },
  ],
  'Ephesians-6': [
    { book: 'Ephesians', chapter: 6, verse: 10, text: 'Finally, my brethren, be strong in the Lord, and in the power of his might.', translation: 'KJV' },
    { book: 'Ephesians', chapter: 6, verse: 11, text: 'Put on the whole armour of God, that ye may be able to stand against the wiles of the devil.', translation: 'KJV' },
    { book: 'Ephesians', chapter: 6, verse: 12, text: 'For we wrestle not against flesh and blood, but against principalities, against powers, against the rulers of the darkness of this world, against spiritual wickedness in high places.', translation: 'KJV' },
    { book: 'Ephesians', chapter: 6, verse: 13, text: 'Wherefore take unto you the whole armour of God, that ye may be able to withstand in the evil day, and having done all, to stand.', translation: 'KJV' },
    { book: 'Ephesians', chapter: 6, verse: 14, text: 'Stand therefore, having your loins girt about with truth, and having on the breastplate of righteousness;', translation: 'KJV' },
    { book: 'Ephesians', chapter: 6, verse: 15, text: 'And your feet shod with the preparation of the gospel of peace;', translation: 'KJV' },
    { book: 'Ephesians', chapter: 6, verse: 16, text: 'Above all, taking the shield of faith, wherewith ye shall be able to quench all the fiery darts of the wicked.', translation: 'KJV' },
    { book: 'Ephesians', chapter: 6, verse: 17, text: 'And take the helmet of salvation, and the sword of the Spirit, which is the word of God:', translation: 'KJV' },
    { book: 'Ephesians', chapter: 6, verse: 18, text: 'Praying always with all prayer and supplication in the Spirit, and watching thereunto with all perseverance and supplication for all saints;', translation: 'KJV' },
  ],
  'Romans-8': [
    { book: 'Romans', chapter: 8, verse: 28, text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.', translation: 'KJV' },
    { book: 'Romans', chapter: 8, verse: 31, text: 'What shall we then say to these things? If God be for us, who can be against us?', translation: 'KJV' },
    { book: 'Romans', chapter: 8, verse: 37, text: 'Nay, in all these things we are more than conquerors through him that loved us.', translation: 'KJV' },
    { book: 'Romans', chapter: 8, verse: 38, text: 'For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come,', translation: 'KJV' },
    { book: 'Romans', chapter: 8, verse: 39, text: 'Nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord.', translation: 'KJV' },
  ],
};

// Power verses for Battle Mode and Arsenal defaults
export const powerVerses: BibleVerse[] = [
  { book: 'Joshua', chapter: 1, verse: 9, text: 'Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.', translation: 'KJV' },
  { book: 'Isaiah', chapter: 41, verse: 10, text: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.', translation: 'KJV' },
  { book: 'Philippians', chapter: 4, verse: 13, text: 'I can do all things through Christ which strengtheneth me.', translation: 'KJV' },
  { book: 'Psalms', chapter: 23, verse: 4, text: 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.', translation: 'KJV' },
  { book: '2 Timothy', chapter: 1, verse: 7, text: 'For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.', translation: 'KJV' },
  { book: 'Romans', chapter: 8, verse: 31, text: 'What shall we then say to these things? If God be for us, who can be against us?', translation: 'KJV' },
  { book: 'Ephesians', chapter: 6, verse: 11, text: 'Put on the whole armour of God, that ye may be able to stand against the wiles of the devil.', translation: 'KJV' },
  { book: 'Psalms', chapter: 18, verse: 2, text: 'The LORD is my rock, and my fortress, and my deliverer; my God, my strength, in whom I will trust; my buckler, and the horn of my salvation, and my high tower.', translation: 'KJV' },
  { book: 'Proverbs', chapter: 3, verse: 5, text: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding.', translation: 'KJV' },
  { book: 'Isaiah', chapter: 40, verse: 31, text: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.', translation: 'KJV' },
  { book: 'Deuteronomy', chapter: 31, verse: 6, text: 'Be strong and of a good courage, fear not, nor be afraid of them: for the LORD thy God, he it is that doth go with thee; he will not fail thee, nor forsake thee.', translation: 'KJV' },
  { book: '1 Corinthians', chapter: 16, verse: 13, text: 'Watch ye, stand fast in the faith, quit you like men, be strong.', translation: 'KJV' },
  { book: 'Psalms', chapter: 27, verse: 1, text: 'The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?', translation: 'KJV' },
  { book: 'Romans', chapter: 12, verse: 2, text: 'And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.', translation: 'KJV' },
  { book: 'James', chapter: 1, verse: 12, text: 'Blessed is the man that endureth temptation: for when he is tried, he shall receive the crown of life, which the Lord hath promised to them that love him.', translation: 'KJV' },
];

// Daily briefings data
export const dailyBriefings: Record<string, Omit<import('../types').DailyBriefing, 'id' | 'completed'>> = {
  'default': {
    date: new Date().toISOString().split('T')[0],
    verse: {
      book: 'Joshua',
      chapter: 1,
      verse: 9,
      text: 'Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.',
      translation: 'KJV',
    },
    interpretation: 'God doesn\'t suggest courage — He commands it. This isn\'t a gentle encouragement. It\'s a direct order from the Commander of the universe. Courage isn\'t the absence of fear. It\'s choosing to stand when everything in you wants to retreat. God told Joshua this before one of the hardest assignments of his life. He\'s telling you the same thing today. Whatever you\'re facing — step forward. He goes with you.',
    missionForToday: 'Identify the one thing you\'ve been avoiding out of fear or discomfort. Face it today. Take the first step. Don\'t wait until you feel ready — move now.',
    prayer: 'Lord, I confess my hesitation. I confess the moments I chose comfort over obedience. Today I choose courage. Strengthen my hands and steady my heart. I will not be dismayed because You are with me. Amen.',
  },
};

// Battle mode categories with relevant verses
export const battleCategories = [
  {
    id: 'anxiety',
    name: 'Anxiety',
    icon: 'shield-outline',
    verses: [
      powerVerses[0], // Joshua 1:9
      powerVerses[1], // Isaiah 41:10
      powerVerses[4], // 2 Timothy 1:7
      powerVerses[8], // Proverbs 3:5
    ],
    prayers: [
      'Lord, I release my anxiety to You. You are sovereign over my situation. Calm my mind and steady my heart. I trust in Your plan.',
      'Father, where my mind races, bring Your peace. Where my heart fears, bring Your presence. I cast every care upon You because You care for me.',
    ],
  },
  {
    id: 'temptation',
    name: 'Temptation',
    icon: 'flame-outline',
    verses: [
      powerVerses[6], // Ephesians 6:11
      powerVerses[13], // Romans 12:2
      powerVerses[14], // James 1:12
      powerVerses[11], // 1 Corinthians 16:13
    ],
    prayers: [
      'God, I am under attack. I know this temptation is not from You. Give me the strength to resist. Help me flee from this moment and run toward You.',
      'Lord, my flesh is weak but Your Spirit is strong in me. I choose obedience over indulgence. I choose discipline over desire. Strengthen my resolve.',
    ],
  },
  {
    id: 'anger',
    name: 'Anger',
    icon: 'thunderstorm-outline',
    verses: [
      powerVerses[2], // Philippians 4:13
      powerVerses[3], // Psalms 23:4
      powerVerses[7], // Psalms 18:2
    ],
    prayers: [
      'Father, I bring my anger before You. Help me to be slow to anger and quick to listen. Replace my fury with Your peace and my frustration with Your patience.',
      'Lord, I feel a fire burning in me that is not righteous. Cool my spirit. Guard my words. Let me not sin in my anger but instead turn to You for refuge.',
    ],
  },
  {
    id: 'fear',
    name: 'Fear',
    icon: 'eye-outline',
    verses: [
      powerVerses[0], // Joshua 1:9
      powerVerses[1], // Isaiah 41:10
      powerVerses[4], // 2 Timothy 1:7
      powerVerses[12], // Psalms 27:1
      powerVerses[10], // Deuteronomy 31:6
    ],
    prayers: [
      'God, I will not be afraid. You are my shield and my fortress. No weapon formed against me shall prosper. I stand firm in Your promises.',
      'Lord, fear is trying to paralyze me. But You have not given me a spirit of fear. I claim power, love, and a sound mind. I will move forward because You go before me.',
    ],
  },
];

// Missions data
export const missionsData = [
  {
    id: 'discipline-30',
    title: '30 Day Discipline Mission',
    description: 'Build an unbreakable daily discipline through consistent Scripture, prayer, and action.',
    duration: 30 as const,
    category: 'discipline',
    badge: 'Iron Shield',
    isPremium: false,
  },
  {
    id: 'proverbs-30',
    title: '30 Day Proverbs Mission',
    description: 'One chapter of Proverbs per day. Build wisdom that cuts through confusion.',
    duration: 30 as const,
    category: 'wisdom',
    badge: 'Wisdom Crown',
    isPremium: false,
  },
  {
    id: 'reset-7',
    title: '7 Day Spiritual Reset',
    description: 'When life has pulled you off course, this mission brings you back to center.',
    duration: 7 as const,
    category: 'reset',
    badge: 'Watchman\'s Star',
    isPremium: false,
  },
  {
    id: 'prayer-14',
    title: '14 Day Prayer Challenge',
    description: 'Deepen your prayer life through structured daily intercession and listening.',
    duration: 14 as const,
    category: 'prayer',
    badge: 'Bronze Cross',
    isPremium: false,
  },
  {
    id: 'armor-7',
    title: '7 Day Armor of God',
    description: 'Study each piece of the full armor of God. Prepare for spiritual battle.',
    duration: 7 as const,
    category: 'battle',
    badge: 'Full Armor',
    isPremium: true,
  },
  {
    id: 'leadership-14',
    title: '14 Day Leadership Mission',
    description: 'Study the leaders of Scripture. Learn to lead with conviction and humility.',
    duration: 14 as const,
    category: 'leadership',
    badge: 'Commander\'s Shield',
    isPremium: true,
  },
];
