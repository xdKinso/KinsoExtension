import { ContentRating, type SourceInfo, SourceIntents } from '@paperback/types';

export default {
    version: '0.0.1',
    name: 'MangaDemon',
    icon: 'icon.png',
    author: 'KinsoExtension',
    authorWebsite: 'https://github.com/kinso',
    description: 'Extension for MangaDemon (demonicscans.org)',
    language: 'multi',
    contentRating: ContentRating.MATURE,
    websiteBaseURL: 'https://demonicscans.org',
    capabilities: [
        SourceIntents.MANGA_CHAPTERS,
        SourceIntents.HOMEPAGE_SECTIONS,
        SourceIntents.MANGA_SEARCH,
    ],
    badges: [],
    developers: [
        {
            name: 'Kinso',
            github: 'https://github.com/xdKinso',
        }
    ],
} satisfies SourceInfo;
