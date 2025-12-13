import {
    DiscoverSectionType,
} from "@paperback/types";
import type {
    DiscoverSection,
    DiscoverSectionItem,
    DiscoverSectionProviding,
    PagedResults,
} from "@paperback/types";
import { discoverSectionsAndSearchQuery } from "../../GraphQL/DiscoverSectionsAndSearch";
import type { DiscoverSectionsAndSearchVariables } from "../../GraphQL/DiscoverSectionsAndSearch";
import type { CountryCode, MediaSort } from "../../GraphQL/General";
import { getItems } from "../helper";

export class DiscoverSectionImplementation implements DiscoverSectionProviding {
    async getDiscoverSections(): Promise<DiscoverSection[]> {
        const trending_now: DiscoverSection = {
            id: "trending-now",
            title: "Trending Now",
            type: DiscoverSectionType.featured,
        };

        const all_time_popular: DiscoverSection = {
            id: "all-time-popular",
            title: "All Time Popular",
            type: DiscoverSectionType.prominentCarousel,
        };

        const popular_manga: DiscoverSection = {
            id: "popular-manga",
            title: "Popular Manga",
            type: DiscoverSectionType.simpleCarousel,
        };

        const popular_manhwa: DiscoverSection = {
            id: "popular-manhwa",
            title: "Popular Manhwa",
            type: DiscoverSectionType.simpleCarousel,
        };

        const top_100_manga: DiscoverSection = {
            id: "top-100-manga",
            title: "Top 100 Manga",
            type: DiscoverSectionType.prominentCarousel,
        };

        return [
            trending_now,
            all_time_popular,
            popular_manga,
            popular_manhwa,
            top_100_manga,
        ];
    }

    async getDiscoverSectionItems(
        section: DiscoverSection,
        metadata: number | undefined,
    ): Promise<PagedResults<DiscoverSectionItem>> {
        let sort: string;

        let countryOfOrigin: string | undefined;
        switch (section.id) {
            case "trending-now":
                sort = MediaSort.TRENDING_DESC.id;
                break;
            case "all-time-popular":
                sort = MediaSort.POPULARITY_DESC.id;
                break;
            case "popular-manga":
                sort = MediaSort.POPULARITY_DESC.id;
                countryOfOrigin = CountryCode.JP.id;
                break;
            case "popular-manhwa":
                sort = MediaSort.POPULARITY_DESC.id;
                countryOfOrigin = CountryCode.KR.id;
                break;
            case "top-100-manga":
                sort = MediaSort.SCORE_DESC.id;
                break;
        }

        const variables: DiscoverSectionsAndSearchVariables = {
            page: metadata ?? 1,
            sort: sort!,
            countryOfOrigin: countryOfOrigin,
        };

        return getItems<DiscoverSectionItem>(
            discoverSectionsAndSearchQuery,
            variables,
            false,
            metadata,
        );
    }
}
