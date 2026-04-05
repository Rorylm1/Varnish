export type MetTag = {
  term: string;
  AAT_URL?: string;
  Wikidata_URL?: string;
};

export type MetConstituent = {
  constituentID: number;
  role: string;
  name: string;
  constituentULAN_URL?: string;
  constituentWikidata_URL?: string;
  gender?: string;
};

export type MetSearchResponse = {
  total: number;
  objectIDs: number[] | null;
};

export type MetObject = {
  objectID: number;
  isHighlight: boolean;
  accessionNumber: string;
  accessionYear: string;
  isPublicDomain: boolean;
  primaryImage: string;
  primaryImageSmall: string;
  additionalImages: string[];
  constituents?: MetConstituent[];
  department: string;
  objectName: string;
  title: string;
  culture: string;
  period: string;
  dynasty: string;
  reign: string;
  portfolio: string;
  artistRole: string;
  artistPrefix: string;
  artistDisplayName: string;
  artistDisplayBio: string;
  artistSuffix: string;
  artistAlphaSort: string;
  artistNationality: string;
  artistBeginDate: string;
  artistEndDate: string;
  artistGender: string;
  artistWikidata_URL: string;
  artistULAN_URL: string;
  objectDate: string;
  objectBeginDate: number;
  objectEndDate: number;
  medium: string;
  dimensions: string;
  creditLine: string;
  geographyType: string;
  city: string;
  state: string;
  county: string;
  country: string;
  region: string;
  subregion: string;
  locale: string;
  locus: string;
  excavation: string;
  river: string;
  classification: string;
  rightsAndReproduction: string;
  linkResource: string;
  metadataDate: string;
  repository: string;
  objectURL: string;
  tags?: MetTag[];
  objectWikidata_URL: string;
  isTimelineWork: boolean;
  GalleryNumber: string;
};
