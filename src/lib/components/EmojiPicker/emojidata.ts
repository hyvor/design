
// https://emojibase.dev/docs/datasets/#compact-format

export interface CompactEmoji {
    annotation: string;
    group: number;
    hexcode: string;
    order: number;
    shortcodes: string[];
    tags: string[];
    unicode: string;
    skins: {
        annotation: string;
        group: number;
        hexcode: string;
        order: number;
        shortcodes: string[];
        unicode: string;
    }[];
}

export interface EmojiGroup {
    name: string;
    emojis: CompactEmoji[];
}


let emojis: CompactEmoji[] = [];

const groups = [
    'Smileys & Emotion',
    'People & Body',
    'Components', // removed
    'Animals & Nature',
    'Food & Drink',
    'Travel & Places',
    'Activities',
    'Objects',
    'Symbols',
    'Flags'
]

// check if the emoji is a ZWJ (Zero Width Joiner) sequence
// when I tested on MacOS, ZWJs were shown as separate emojis
function isZWJEmoji(emoji: string) {
    return emoji.includes('\u200D');
}

export async function loadEmojis(): Promise<EmojiGroup[]> {

    const data = await import('emojibase-data/en/compact.json');

    const emojiData = data.default as unknown as CompactEmoji[];
    emojis = emojiData.filter(emoji => emoji.group !== undefined);

    const groupedEmojis: EmojiGroup[] = groups.map(group => ({
        name: group,
        emojis: emojis.filter(emoji => emoji.group === groups.indexOf(group) && !isZWJEmoji(emoji.unicode))
    }));

    // remove components
    groupedEmojis.splice(2, 1);

    return groupedEmojis;

}