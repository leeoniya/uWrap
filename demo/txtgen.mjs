// utils -> helper.ts
const randint = (min = 0, max = 1e6) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
const randfloat = () => {
    return randint(1, 999) / 1000;
};
const rand = (a) => {
    let w;
    while (!w) {
        w = a[randint(0, a.length - 1)];
    }
    return w;
};
const pickLastPunc = () => {
    const a = ".......!?!?;...".split("");
    return rand(a);
};
const pluralize = (word) => {
    if (word.endsWith("s")) {
        return word;
    }
    if (word.match(/(ss|ish|ch|x|us)$/)) {
        word += "e";
    }
    else if (word.endsWith("y") && !vowels.includes(word.charAt(word.length - 2))) {
        word = word.slice(0, word.length - 1);
        word += "ie";
    }
    return word + "s";
};
const normalize = (word) => {
    let a = "a";
    if (word.match(/^(a|e|heir|herb|hour|i|o)/)) {
        a = "an";
    }
    return `${a} ${word}`;
};

// utils -> sample.ts
let _nouns = [
    "alligator",
    "ant",
    "bear",
    "bee",
    "bird",
    "camel",
    "cat",
    "cheetah",
    "chicken",
    "chimpanzee",
    "cow",
    "crocodile",
    "deer",
    "dog",
    "dolphin",
    "duck",
    "eagle",
    "elephant",
    "fish",
    "fly",
    "fox",
    "frog",
    "giraffe",
    "goat",
    "goldfish",
    "hamster",
    "hippopotamus",
    "horse",
    "kangaroo",
    "kitten",
    "lion",
    "lobster",
    "monkey",
    "octopus",
    "owl",
    "panda",
    "pig",
    "puppy",
    "rabbit",
    "rat",
    "scorpion",
    "seal",
    "shark",
    "sheep",
    "snail",
    "snake",
    "spider",
    "squirrel",
    "tiger",
    "turtle",
    "wolf",
    "zebra",
    "apple",
    "apricot",
    "banana",
    "blackberry",
    "blueberry",
    "cherry",
    "cranberry",
    "currant",
    "fig",
    "grape",
    "grapefruit",
    "grapes",
    "kiwi",
    "kumquat",
    "lemon",
    "lime",
    "melon",
    "nectarine",
    "orange",
    "peach",
    "pear",
    "persimmon",
    "pineapple",
    "plum",
    "pomegranate",
    "prune",
    "raspberry",
    "strawberry",
    "tangerine",
    "watermelon",
];
let adjectives = [
    "adaptable",
    "adventurous",
    "affable",
    "affectionate",
    "agreeable",
    "alert",
    "alluring",
    "ambitious",
    "ambitious",
    "amiable",
    "amicable",
    "amused",
    "amusing",
    "boundless",
    "brave",
    "brave",
    "bright",
    "bright",
    "broad-minded",
    "calm",
    "calm",
    "capable",
    "careful",
    "charming",
    "charming",
    "cheerful",
    "coherent",
    "comfortable",
    "communicative",
    "compassionate",
    "confident",
    "conscientious",
    "considerate",
    "convivial",
    "cooperative",
    "courageous",
    "courageous",
    "courteous",
    "creative",
    "credible",
    "cultured",
    "dashing",
    "dazzling",
    "debonair",
    "decisive",
    "decisive",
    "decorous",
    "delightful",
    "detailed",
    "determined",
    "determined",
    "diligent",
    "diligent",
    "diplomatic",
    "discreet",
    "discreet",
    "dynamic",
    "dynamic",
    "eager",
    "easygoing",
    "efficient",
    "elated",
    "eminent",
    "emotional",
    "enchanting",
    "encouraging",
    "endurable",
    "energetic",
    "energetic",
    "entertaining",
    "enthusiastic",
    "enthusiastic",
    "excellent",
    "excited",
    "exclusive",
    "exuberant",
    "exuberant",
    "fabulous",
    "fair",
    "fair-minded",
    "faithful",
    "faithful",
    "fantastic",
    "fearless",
    "fearless",
    "fine",
    "forceful",
    "frank",
    "frank",
    "friendly",
    "friendly",
    "funny",
    "funny",
    "generous",
    "generous",
    "gentle",
    "gentle",
    "glorious",
    "good",
    "good",
    "gregarious",
    "happy",
    "hard-working",
    "harmonious",
    "helpful",
    "helpful",
    "hilarious",
    "honest",
    "honorable",
    "humorous",
    "imaginative",
    "impartial",
    "impartial",
    "independent",
    "industrious",
    "instinctive",
    "intellectual",
    "intelligent",
    "intuitive",
    "inventive",
    "jolly",
    "joyous",
    "kind",
    "kind",
    "kind-hearted",
    "knowledgeable",
    "level",
    "likeable",
    "lively",
    "lovely",
    "loving",
    "loving",
    "loyal",
    "lucky",
    "mature",
    "modern",
    "modest",
    "neat",
    "nice",
    "nice",
    "obedient",
    "optimistic",
    "painstaking",
    "passionate",
    "patient",
    "peaceful",
    "perfect",
    "persistent",
    "philosophical",
    "pioneering",
    "placid",
    "placid",
    "plausible",
    "pleasant",
    "plucky",
    "plucky",
    "polite",
    "powerful",
    "practical",
    "pro-active",
    "productive",
    "protective",
    "proud",
    "punctual",
    "quick-witted",
    "quiet",
    "quiet",
    "rational",
    "receptive",
    "reflective",
    "reliable",
    "relieved",
    "reserved",
    "resolute",
    "resourceful",
    "responsible",
    "rhetorical",
    "righteous",
    "romantic",
    "romantic",
    "sedate",
    "seemly",
    "selective",
    "self-assured",
    "self-confident",
    "self-disciplined",
    "sensible",
    "sensitive",
    "sensitive",
    "shrewd",
    "shy",
    "silly",
    "sincere",
    "sincere",
    "skillful",
    "smiling",
    "sociable",
    "splendid",
    "steadfast",
    "stimulating",
    "straightforward",
    "successful",
    "succinct",
    "sympathetic",
    "talented",
    "thoughtful",
    "thoughtful",
    "thrifty",
    "tidy",
    "tough",
    "tough",
    "trustworthy",
    "unassuming",
    "unbiased",
    "understanding",
    "unusual",
    "upbeat",
    "versatile",
    "vigorous",
    "vivacious",
    "warm",
    "warmhearted",
    "willing",
    "willing",
    "wise",
    "witty",
    "witty",
    "wonderful",
];
const vowels = [
    "a",
    "e",
    "i",
    "o",
    "u",
    "y",
];
const noun = () => rand(_nouns);
const a_noun = () => normalize(rand(_nouns));
const nouns = () => pluralize(rand(_nouns));
const adjective = () => rand(adjectives);
const an_adjective = () => normalize(rand(adjectives));
let sentenceTemplates = [
    () => `however, ${nouns()} have begun to rent ${nouns()} over the past few months, specifically for ${nouns()} associated with their ${nouns()}`,
    () => `the ${noun()} is ${a_noun()}`,
    () => `${a_noun()} is ${an_adjective()} ${noun()}`,
    () => `the first ${adjective()} ${noun()} is, in its own way, ${a_noun()}`,
    () => `their ${noun()} was, in this moment, ${an_adjective()} ${noun()}`,
    () => `${a_noun()} is ${a_noun()} from the right perspective`,
    () => `the literature would have us believe that ${an_adjective()} ${noun()} is not but ${a_noun()}`,
    () => `${an_adjective()} ${noun()} is ${a_noun()} of the mind`,
    () => `the ${adjective()} ${noun()} reveals itself as ${an_adjective()} ${noun()} to those who look`,
    () => `authors often misinterpret the ${noun()} as ${an_adjective()} ${noun()}, when in actuality it feels more like ${an_adjective()} ${noun()}`,
    () => `we can assume that any instance of ${a_noun()} can be construed as ${an_adjective()} ${noun()}`,
    () => `they were lost without the ${adjective()} ${noun()} that composed their ${noun()}`,
    () => `the ${adjective()} ${noun()} comes from ${an_adjective()} ${noun()}`,
    () => `${a_noun()} can hardly be considered ${an_adjective()} ${noun()} without also being ${a_noun()}`,
    () => `few can name ${an_adjective()} ${noun()} that isn't ${an_adjective()} ${noun()}`,
    () => `some posit the ${adjective()} ${noun()} to be less than ${adjective()}`,
    () => `${a_noun()} of the ${noun()} is assumed to be ${an_adjective()} ${noun()}`,
    () => `${a_noun()} sees ${a_noun()} as ${an_adjective()} ${noun()}`,
    () => `the ${noun()} of ${a_noun()} becomes ${an_adjective()} ${noun()}`,
    () => `${a_noun()} is ${a_noun()}'s ${noun()}`,
    () => `${a_noun()} is the ${noun()} of ${a_noun()}`,
    () => `${an_adjective()} ${noun()}'s ${noun()} comes with it the thought that the ${adjective()} ${noun()} is ${a_noun()}`,
    () => `${nouns()} are ${adjective()} ${nouns()}`,
    () => `${adjective()} ${nouns()} show us how ${nouns()} can be ${nouns()}`,
    () => `before ${nouns()}, ${nouns()} were only ${nouns()}`,
    () => `those ${nouns()} are nothing more than ${nouns()}`,
    () => `some ${adjective()} ${nouns()} are thought of simply as ${nouns()}`,
    () => `one cannot separate ${nouns()} from ${adjective()} ${nouns()}`,
    () => `the ${nouns()} could be said to resemble ${adjective()} ${nouns()}`,
    () => `${an_adjective()} ${noun()} without ${nouns()} is truly a ${noun()} of ${adjective()} ${nouns()}`,
];
const phrases = [
    "to be more specific, ",
    "in recent years, ",
    "however, ",
    "by the way",
    "of course, ",
    "some assert that ",
    "if this was somewhat unclear, ",
    "unfortunately, that is wrong; on the contrary, ",
    "it's very tricky, if not impossible, ",
    "this could be, or perhaps ",
    "this is not to discredit the idea that ",
    "we know that ",
    "it's an undeniable fact, really; ",
    "framed in a different way, ",
    "what we don't know for sure is whether or not ",
    "as far as we can estimate, ",
    "as far as he is concerned, ",
    "the zeitgeist contends that ",
    "though we assume the latter, ",
    "far from the truth, ",
    "extending this logic, ",
    "nowhere is it disputed that ",
    "in modern times ",
    "in ancient times ",
    "recent controversy aside, ",
    "washing and polishing the car,",
    "having been a gymnast, ",
    "after a long day at school and work, ",
    "waking to the buzz of the alarm clock, ",
    "draped neatly on a hanger, ",
    "shouting with happiness, ",
];

// utils -> lorem.ts
const WordDict = "a ac accumsan adipiscing aenean aliqua aliquam aliquet amet arcu at auctor augue bibendum blandit commodo condimentum consectetur consequat convallis cras cum curabitur cursus dapibus diam dictum dictumst dignissim dis do dolor dolore donec dui duis egestas eget eiusmod elementum elit enim erat eros est et etiam eu euismod facilisis faucibus felis fermentum feugiat fringilla gravida habitant habitasse hac hendrerit iaculis id imperdiet in incididunt integer ipsum justo labore lacinia lacus laoreet lectus leo libero lobortis lorem magna magnis massa mattis mauris mi molestie montes morbi mus nam nascetur natoque nec neque netus nibh nisi nisl non nulla nullam nunc odio orci ornare parturient pellentesque penatibus pharetra phasellus placerat platea porta porttitor praesent pretium proin pulvinar purus quam quis quisque ridiculus risus sagittis scelerisque sed sem semper senectus sit sociis sodales sollicitudin suscipit suspendisse tellus tempor tempus tincidunt tortor tristique turpis ullamcorper ultrices ultricies urna ut varius vel velit venenatis vestibulum vitae viverra volutpat"
    .split(" ");
const WordDictSize = WordDict.length;
/**
 * Generate a lorem ipsum
 *
 * @param min Minimal words count, default 2
 * @param max Maximum words count, default 24
 * @returns A sentence
 */
const generate = (min = 2, max = 24) => {
    const size = randint(min, max);
    const words = [];
    while (words.length < size) {
        const r = randint(0, WordDictSize);
        const w = WordDict[r];
        if (w && !words.includes(w)) {
            words.push(w);
        }
    }
    return words.join(" ");
};

// mod.ts
const randomStartingPhrase = () => {
    if (randfloat() < 0.33) {
        return rand(phrases);
    }
    return "";
};
const makeSentenceFromTemplate = () => {
    return rand(sentenceTemplates)();
};
/**
 * Generate a sentence with or without starting phrase
 *
 * @param ignoreStartingPhrase. Set to true to add a short phrase at the begining
 * @returns A sentence
 */
const sentence = (ignoreStartingPhrase = false) => {
    const phrase = ignoreStartingPhrase ? "" : randomStartingPhrase();
    let s = phrase + makeSentenceFromTemplate();
    s = s.charAt(0).toUpperCase() + s.slice(1);
    s += pickLastPunc();
    return s;
};
/**
 * Generate a paragraph with given sentence count
 *
 * @param len Sentence count, 3 to 15
 * @returns A paragraph
 */
const paragraph = (len = 0) => {
    if (!len) {
        len = randint(3, 10);
    }
    const t = Math.min(len, 15);
    const a = [];
    while (a.length < t) {
        const s = sentence();
        a.push(s);
    }
    return a.join(" ");
};
/**
 * Generate an article with given paragraph count
 *
 * @param len Paragraph count, 3 to 15
 * @returns An article
 */
const article = (len = 0) => {
    if (!len) {
        len = randint(3, 10);
    }
    const t = Math.min(len, 15);
    const a = [];
    while (a.length < t) {
        const s = paragraph();
        a.push(s);
    }
    return a.join("\n\n");
};

export { article, generate as lorem, paragraph, sentence };
