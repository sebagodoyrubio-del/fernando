export type PedigreeNode = {
  name: string;
  sire?: PedigreeNode;
  dam?: PedigreeNode;
};

export type HorseMedia = {
  images: string[];
  videos: string[];
};

export type Horse = {
  id: string;
  name: string;
  reg: string;
  birthDate: string;
  workStatus: string;
  height: string;
  lot?: string;
  description?: string;
  pedigree?: {
    sire?: PedigreeNode;
    dam?: PedigreeNode;
  };
  media?: HorseMedia;
};

export type ContactPayload = {
  horseId?: string;
  horseName?: string;
  fullName: string;
  email: string;
  phone?: string;
  message: string;
};
