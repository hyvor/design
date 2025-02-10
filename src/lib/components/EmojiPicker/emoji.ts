

// https://emojibase.dev/api/emojibase/interface/CompactEmoji
interface Emoji {
    group?: number;
    hexcode: string,
    label: string,
    order?: number,
    shortcodes?: string[],
    skins?: Emoji[]
    tags?: string[],
    unicode: string
}

export async function getData(): Promise<Emoji[]> {

    const url = 'https://cdn.jsdelivr.net/npm/emojibase-data@16.0.2/en/compact.json';

    const response = await fetch(url);
    const data = await response.json();

    return data;

}