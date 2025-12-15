import { ContentRating, type SourceInfo, SourceIntents } from '@paperback/types';

export default {
    version: '0.0.2',
    name: 'MangaDemon',
    icon: 'icon.png',
    author: 'KinsoExtension',
    authorWebsite: 'https://github.com/kinso',
    description: 'Extension for MangaDemon (demonicscans.org)',
    language: 'multi',
    contentRating: ContentRating.MATURE,
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
