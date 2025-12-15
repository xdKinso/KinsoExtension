import { ContentRating, type SourceInfo, SourceIntents } from '@paperback/types';

export default {
    version: '0.0.2',
    name: 'MangaBat',
    icon: 'icon.png',
    author: 'KinsoExtension',
    authorWebsite: 'https://github.com/kinso',
    description: 'Extension for MangaBat (mangabats.com)',
    language: 'multi',
    contentRating: ContentRating.EVERYONE,
    capabilities: [
        SourceIntents.MANGA_CHAPTERS,
        SourceIntents.SEARCH_RESULTS_PROVIDING,
    ],
    badges: [],
    developers: [
        {
            name: 'Kinso',
            github: 'https://github.com/xdKinso',
        }
    ],
} satisfies SourceInfo;
