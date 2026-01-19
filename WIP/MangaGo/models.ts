export interface Metadata {
  page?: number;
}

export interface Genre {
  id: string;
  label: string;
}

export const Genres: Genre[] = [
  { id: "action", label: "Action" },
  { id: "adventure", label: "Adventure" },
  { id: "comedy", label: "Comedy" },
  { id: "drama", label: "Drama" },
  { id: "fantasy", label: "Fantasy" },
  { id: "historical", label: "Historical" },
  { id: "horror", label: "Horror" },
  { id: "isekai", label: "Isekai" },
  { id: "josei", label: "Josei" },
  { id: "martial-arts", label: "Martial Arts" },
  { id: "mature", label: "Mature" },
  { id: "mecha", label: "Mecha" },
  { id: "mystery", label: "Mystery" },
  { id: "psychological", label: "Psychological" },
  { id: "romance", label: "Romance" },
  { id: "school-life", label: "School Life" },
  { id: "sci-fi", label: "Sci-Fi" },
  { id: "seinen", label: "Seinen" },
  { id: "shoujo", label: "Shoujo" },
  { id: "shounen", label: "Shounen" },
  { id: "slice-of-life", label: "Slice of Life" },
  { id: "sports", label: "Sports" },
  { id: "supernatural", label: "Supernatural" },
  { id: "tragedy", label: "Tragedy" },
  { id: "webtoons", label: "Webtoons" },
];
