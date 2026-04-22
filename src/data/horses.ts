import type { Horse } from "@/lib/horses";

export const horses: Horse[] = [
  {
    id: "bochincher o".replace(/\s+/g, "").toLowerCase(),
    name: "BOCHINCHERO",
    reg: "209496",
    birthDate: "2009-11-11",
    workStatus: "Potro corriendo",
    height: "1,37",
    lot: "121",
    description:
      "Potro corriendo, grandes campañas 2 veces completo en los clasificatorios con muy buenas actuaciones, gran velocidad, sangre alternativa de primera línea, totalmente sano.",
    pedigree: {
      sire: {
        name: "Boche",
        sire: { name: "Quintral", sire: { name: "Goloso" }, dam: { name: "Criollita" } },
        dam: { name: "Pataguina", sire: { name: "Taponazo" }, dam: { name: "Chequennera" } },
      },
      dam: {
        name: "Siempre Viva",
        sire: { name: "Andariego", sire: { name: "Cafetal" }, dam: { name: "Fiestera" } },
        dam: { name: "Retona", sire: { name: "Retono" }, dam: { name: "Siempre Viva" } },
      },
    },
    media: {
      images: [],
      videos: [],
    },
  },
  {
    id: "la-estrella",
    name: "LA ESTRELLA",
    reg: "301112",
    birthDate: "2014-09-04",
    workStatus: "Mansa de paseo",
    height: "1,41",
    description: "Mansa, segura para familia y paseos. Muy buen temperamento.",
    pedigree: {
      sire: { name: "Relámpago" },
      dam: { name: "Campesina" },
    },
    media: {
      images: [],
      videos: [],
    },
  },
  {
    id: "gran-campeon",
    name: "GRAN CAMPEÓN",
    reg: "288010",
    birthDate: "2012-02-18",
    workStatus: "En trabajo",
    height: "1,39",
    description: "En trabajo, buena disposición y mansedumbre. Ideal para rodeo.",
    pedigree: {
      sire: { name: "Troyano" },
      dam: { name: "Lunera" },
    },
    media: {
      images: [],
      videos: [],
    },
  },
  {
    id: "morena",
    name: "MORENA",
    reg: "322900",
    birthDate: "2016-12-01",
    workStatus: "Yegua de cría",
    height: "1,40",
    description: "Excelente línea materna. Muy buena estructura.",
    pedigree: {
      sire: { name: "Corazón" },
      dam: { name: "Canelita" },
    },
    media: {
      images: [],
      videos: [],
    },
  },
  {
    id: "norteño",
    name: "NORTEÑO",
    reg: "355001",
    birthDate: "2018-06-22",
    workStatus: "Potro iniciando",
    height: "1,38",
    description: "Potro iniciando, rápido aprendizaje. Buenas patas.",
    pedigree: {
      sire: { name: "Viajero" },
      dam: { name: "Bravía" },
    },
    media: {
      images: [],
      videos: [],
    },
  },
  {
    id: "lucero",
    name: "LUCERO",
    reg: "340778",
    birthDate: "2017-03-10",
    workStatus: "En trabajo",
    height: "1,42",
    description: "Caballo de trabajo con mucha energía y buen fondo.",
    pedigree: {
      sire: { name: "Brillante" },
      dam: { name: "Niebla" },
    },
    media: {
      images: [],
      videos: [],
    },
  },
];
