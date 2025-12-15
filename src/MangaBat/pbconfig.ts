import { ContentRating, type SourceInfo, SourceIntents } from '@paperback/types';

export default {
    version: '0.0.1',
    name: 'MangaBat',
    icon: 'icon.png',
    author: 'KinsoExtension',
    authorWebsite: 'https://github.com/kinso',
    description: 'Extension for MangaBat (mangabats.com)',
    language: 'multi',
    contentRating: ContentRating.EVERYONE,
    websiteBaseURL: 'https://www.mangabats.com',
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
