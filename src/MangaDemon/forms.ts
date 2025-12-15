import type {
    SearchRequest,
    TagSection,
} from '@paperback/types';

import type { SearchDetails } from './models';

export function buildSearchRequest(metadata: SearchDetails): SearchRequest {
    const tags: TagSection[] = [];

    // Genre filter
    const genreTags = metadata.genres.map(id => ({ id, label: id }));
    if (genreTags.length > 0) {
        tags.push({
            id: 'genre',
            label: 'Genres',
            tags: genreTags,
        });
    }

    // Status filter
    if (metadata.status && metadata.status !== 'all') {
        tags.push({
            id: 'status',
            label: 'Status',
            tags: [{ id: metadata.status, label: metadata.status }],
        });
    }

    // Sort filter
    if (metadata.orderby) {
        tags.push({
            id: 'orderby',
            label: 'Order By',
            tags: [{ id: metadata.orderby, label: metadata.orderby }],
        });
    }

    return {
        title: '',
        parameters: {},
        tags,
    };
}

export function getGenreTags(): TagSection {
    return {
        id: 'genre',
        label: 'Genres',
        tags: [
            { id: 'action', label: 'Action' },
            { id: 'adventure', label: 'Adventure' },
            { id: 'comedy', label: 'Comedy' },
            { id: 'drama', label: 'Drama' },
            { id: 'fantasy', label: 'Fantasy' },
            { id: 'horror', label: 'Horror' },
            { id: 'mystery', label: 'Mystery' },
            { id: 'psychological', label: 'Psychological' },
            { id: 'romance', label: 'Romance' },
            { id: 'sci-fi', label: 'Sci-Fi' },
            { id: 'slice-of-life', label: 'Slice of Life' },
            { id: 'supernatural', label: 'Supernatural' },
            { id: 'thriller', label: 'Thriller' },
        ],
    };
}

export function getStatusTags(): TagSection {
    return {
        id: 'status',
        label: 'Status',
        tags: [
            { id: 'all', label: 'All' },
            { id: 'ongoing', label: 'Ongoing' },
            { id: 'completed', label: 'Completed' },
        ],
    };
}

export function getSortTags(): TagSection {
    return {
        id: 'orderby',
        label: 'Order By',
        tags: [
            { id: 'VIEWS DESC', label: 'Most Views' },
            { id: 'NAME ASC', label: 'A-Z' },
            { id: 'NAME DESC', label: 'Z-A' },
            { id: 'UPDATED DESC', label: 'Recently Updated' },
        ],
    };
}
