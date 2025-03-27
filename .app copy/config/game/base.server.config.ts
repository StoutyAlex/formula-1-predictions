export enum DriverNumber {
  // Red Bull Racing
  MAX_VERSTAPPEN = 33,
  LIAM_LAWSON = 30,
  // Mercedes-AMG Petronas Formula One Team
  KIMI_ANTONELLI = 12,
  GEORGE_RUSSELL = 63,
  // Scuderia Ferrari
  LEWIS_HAMILTON = 44,
  CHARLES_LECLERC = 16,
  // McLaren F1 Team
  LANDO_NORRIS = 4,
  OSCAR_PIASTRI = 31,
  // Alpine F1 Team
  JACK_DOOHAN = 7,
  PIERRE_GASLY = 10,
  // Aston Martin Cognizant Formula One Team
  LANCE_STROLL = 18,
  FERNANDO_ALONSO = 14,
  // Haas F1 Team
  ESTEBAN_OCON = 31,
  OLIVER_BEARMAN = 87,
  // Kick / Audi
  GABREIL_BORTOLETO = 5,
  NICO_HULKENBERG = 27,
  // Racing Bulls / VCARB
  YUKI_TSUNODA = 22,
  ISACK_HADJAR = 6,
  // Williams
  CARLOS_SAINZ = 55,
  ALEX_ALBON = 23,
}

export const baseGameConfig = {
  supportedDrivers: [
    DriverNumber.MAX_VERSTAPPEN,
    DriverNumber.LIAM_LAWSON,
    DriverNumber.KIMI_ANTONELLI,
    DriverNumber.GEORGE_RUSSELL,
    DriverNumber.LEWIS_HAMILTON,
    DriverNumber.CHARLES_LECLERC,
    DriverNumber.LANDO_NORRIS,
    DriverNumber.OSCAR_PIASTRI,
    DriverNumber.JACK_DOOHAN,
    DriverNumber.PIERRE_GASLY,
    DriverNumber.LANCE_STROLL,
    DriverNumber.FERNANDO_ALONSO,
    DriverNumber.ESTEBAN_OCON,
    DriverNumber.OLIVER_BEARMAN,
    DriverNumber.GABREIL_BORTOLETO,
    DriverNumber.NICO_HULKENBERG,
    DriverNumber.YUKI_TSUNODA,
    DriverNumber.ISACK_HADJAR,
    DriverNumber.CARLOS_SAINZ,
    DriverNumber.ALEX_ALBON,
  ] as const,
  supportedSeasons: ['2025'] as const,
} as const;
