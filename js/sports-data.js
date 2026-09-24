/**
 * DELTA RUGBY CLUB - DATA MODEL
 * Datos oficiales y estructurados de deportes, horarios, divisiones y fixtures
 */

const DELTA_DATA = {
  clubInfo: {
    name: "Delta Rugby Club",
    shortName: "Delta RC",
    nickname: "Los Yacarés",
    foundedYear: 2009,
    foundationDate: "19 de noviembre de 2009",
    union: "URBA (Unión de Rugby de Buenos Aires)",
    hockeyAssociation: "AAHBA (Asociación Amateur de Hockey de Buenos Aires)",
    motto: "Amistad • Humildad • Compromiso • Respeto",
    address: "Olivares 168 (esq. Camino de los Remeros y Ruta 27), Rincón de Milberg, Tigre, Bs. As.",
    googleMapsUrl: "https://maps.google.com/?q=Delta+Rugby+Club+Rincon+de+Milberg",
    email: "secretaria@deltarugbyclub.com",
    whatsapp: "+54 9 11 4050-3320",
    phone: "(011) 4731-8900",
    instagram: "@deltarugbyclub",
    instagramUrl: "https://www.instagram.com/deltarugbyclub/"
  },

  nextMatch: {
    competition: "Torneo Oficial URBA - Primera División",
    round: "Fecha 16",
    status: "PRÓXIMO PARTIDO",
    dateText: "Sábado 26 de Septiembre - 15:30 hs",
    dateISO: "2026-09-26T15:30:00-03:00",
    homeTeam: "Delta Rugby Club",
    homeShort: "DELTA",
    homeScore: "-",
    homeLogo: "assets/logo_delta_pro_badge.svg",
    awayTeam: "San Patricio",
    awayShort: "SAN PATRICIO",
    awayScore: "-",
    awayLogo: "assets/escudos/sanpatricio.png",
    venue: "Cancha 1 - Sede Rincón de Milberg",
    isHome: true,
    intermediaTime: "13:45 hs",
    preTime: "12:00 hs",
    liveStreamAvailable: true
  },

  recentResults: [
    {
      competition: "URBA Primera",
      round: "Fecha 15",
      home: "Mariano Moreno",
      homeLogo: "assets/escudos/marianomoreno.png",
      homeScore: 21,
      away: "Delta Rugby Club",
      awayLogo: "assets/logo_delta_pro_badge.svg",
      awayScore: 28,
      result: "Victoria Yacaré (+4 pts)",
      date: "19 Sep 2026",
      isAwayDelta: true
    },
    {
      competition: "URBA Primera",
      round: "Fecha 14",
      home: "Delta Rugby Club",
      homeLogo: "assets/logo_delta_pro_badge.svg",
      homeScore: 31,
      away: "Banco Nación",
      awayLogo: "assets/escudos/banconacion.png",
      awayScore: 24,
      result: "Victoria en Rincón de Milberg",
      date: "12 Sep 2026",
      isHomeDelta: true
    },
    {
      competition: "Hockey Damas AAHBA",
      round: "Fecha 18",
      home: "Delta RC (Tira A)",
      homeLogo: "assets/logo_delta_pro_badge.svg",
      homeScore: 3,
      away: "Pucará",
      awayLogo: "assets/logo_delta_pro_badge.svg",
      awayScore: 1,
      result: "Victoria en Sintético",
      date: "19 Sep 2026",
      isHomeDelta: true
    }
  ],

  urbaDivisionClubs: [
    { name: "Argentino", logo: "assets/escudos/argentino.png" },
    { name: "Banco Nación", logo: "assets/escudos/banconacion.png" },
    { name: "C.U. de Quilmes", logo: "assets/escudos/cudequilmes.png" },
    { name: "Delta Rugby Club", logo: "assets/logo_delta_pro_badge.svg", isDelta: true },
    { name: "Don Bosco", logo: "assets/escudos/donbosco.png" },
    { name: "Italiano", logo: "assets/escudos/italiano.png" },
    { name: "Liceo Militar", logo: "assets/escudos/liceomilitar.png" },
    { name: "Liceo Naval", logo: "assets/escudos/liceonaval.png" },
    { name: "Manuel Belgrano", logo: "assets/escudos/manuelbelgrano.png" },
    { name: "Mariano Moreno", logo: "assets/escudos/marianomoreno.png" },
    { name: "Monte Grande", logo: "assets/escudos/montegrande.png" },
    { name: "San Martín", logo: "assets/escudos/sanmartin.png" },
    { name: "San Patricio", logo: "assets/escudos/sanpatricio.png" },
    { name: "Vicentinos", logo: "assets/escudos/vicentinos.png" }
  ],

  rugbyDivisions: [
    {
      id: "plantel-superior",
      name: "Plantel Superior",
      subtitle: "Primera, Intermedia, Pre A y Pre B",
      description: "El corazón competitivo de Los Yacarés en los certámenes de la URBA. Un plantel comprometido con el juego dinámico y el ADN del club.",
      coaches: ["Mariano Romanini (Head Coach)", "Federico Ruiz (Entrenador de Backs)", "Gastón Pardo (Entrenador de Forwards)"],
      schedule: [
        { day: "Martes", time: "20:30 a 22:30 hs", location: "Cancha 1 y Gimnasio" },
        { day: "Jueves", time: "20:30 a 22:30 hs", location: "Cancha 1 y Video Anexo" },
        { day: "Sábados", time: "12:00 a 18:00 hs", location: "Jornada Oficial URBA" }
      ],
      captain: "Ignacio Lucero",
      manager: "Hernán Morales",
      ageRange: "19 años en adelante"
    },
    {
      id: "juveniles",
      name: "Rugby Juveniles",
      subtitle: "M19, M17, M16 y M15",
      description: "Etapa formativa de alto nivel donde se consolidan la técnica, la táctica colectiva y los valores de camaradería y respeto.",
      subcategories: [
        { cat: "M19 (Clases 2007/2006)", days: "Mar y Jue 19:30 a 21:00 hs", matchDay: "Domingos 13:00 hs" },
        { cat: "M17 (Clase 2008)", days: "Mar y Jue 19:30 a 21:00 hs", matchDay: "Domingos 11:30 hs" },
        { cat: "M16 (Clase 2009)", days: "Mar y Jue 19:00 a 20:30 hs", matchDay: "Domingos 10:00 hs" },
        { cat: "M15 (Clase 2010)", days: "Mar y Jue 19:00 a 20:30 hs", matchDay: "Domingos 09:30 hs" }
      ],
      coaches: ["Nicolás Gómez (Coordinador Juveniles)", "Staff interdisciplinario con preparadores físicos especializados"],
      ageRange: "15 a 19 años"
    },
    {
      id: "infantiles",
      name: "Rugby Infantil & Escuelita",
      subtitle: "M6 a M14",
      description: "El espacio familiar donde nace la pasión. Rugby sin presión competitiva, enfocado en la diversión, la motricidad, el compañerismo y el tercer tiempo.",
      subcategories: [
        { cat: "M6 a M9 (Escuelita)", days: "Sábados 10:00 a 11:30 hs", focus: "Juegos, destreza y aprendizaje lúdico" },
        { cat: "M10 a M12", days: "Miércoles 18:30 hs y Sábados 10:00 hs", focus: "Fundamentos, tackle seguro y pases" },
        { cat: "M13 y M14", days: "Miércoles 19:00 hs y Sábados 10:00 hs", focus: "Iniciación al rugby de 15 jugadores" }
      ],
      coaches: ["Coordinación General: Juan Pablo Martínez + Más de 40 entrenadores y padres colaboradores"],
      ageRange: "6 a 14 años"
    },
    {
      id: "classic",
      name: "Yacaré Classic & Veteranos",
      subtitle: "+35 años",
      description: "El rugby como excusa para mantener encendida la amistad, compartir viajes, giras y el tradicional tercer tiempo que nos define.",
      schedule: [
        { day: "Miércoles", time: "20:30 hs", location: "Cancha 2 + Tercer Tiempo" },
        { day: "Giras y Encuentros", time: "Según calendario mensual", location: "Diversas sedes" }
      ],
      ageRange: "Mayores de 35 años"
    },
    {
      id: "femenino",
      name: "Rugby Femenino",
      subtitle: "Plantel Superior y Juveniles",
      description: "Crecimiento constante en la modalidad Seven y Ten, compitiendo en el circuito de la URBA con dedicación y enorme espíritu de equipo.",
      schedule: [
        { day: "Lunes y Miércoles", time: "19:30 a 21:00 hs", location: "Cancha 2" }
      ],
      ageRange: "14 años en adelante"
    }
  ],

  hockeyDivisions: [
    {
      id: "hockey-tira-a",
      name: "Hockey Tira A (Línea Competitiva)",
      subtitle: "Primera, Intermedia, Quinta, Sexta y Séptima",
      description: "Nuestra línea insignia en el torneo oficial de la AAHBA. Cancha de césped sintético de última generación y cuerpo técnico de elite.",
      coaches: ["Diego Álvarez (Coordinador y DT Primera)", "Mariana Costa (PF Primera e Intermedia)"],
      schedule: [
        { day: "Martes y Jueves", time: "19:30 a 22:00 hs", location: "Cancha Sintética Oficial" },
        { day: "Sábados", time: "09:00 a 18:00 hs", location: "Jornadas Oficiales AAHBA" }
      ]
    },
    {
      id: "hockey-tira-b",
      name: "Hockey Tira B (Proyección)",
      subtitle: "Primera, Intermedia y Juveniles",
      description: "Espacio de consolidación competitiva con gran volumen de juego, formación táctica continua y sentido de pertenencia.",
      coaches: ["Esteban Morales (DT)", "Camila Ferraro (Entrenadora)"],
      schedule: [
        { day: "Miércoles y Viernes", time: "19:00 a 21:30 hs", location: "Cancha Sintética Oficial" },
        { day: "Sábados", time: "Tarde", location: "Torneo Oficial" }
      ]
    },
    {
      id: "hockey-menores",
      name: "Hockey Infantil & Escuelita",
      subtitle: "Octava, Novena y Décima División",
      description: "Iniciación deportiva para niñas y niños desde los 5 años. Técnicas básicas de stick y bocha, valores y mucha diversión.",
      schedule: [
        { day: "Martes y Jueves", time: "17:45 a 19:15 hs", location: "Cancha Sintética" },
        { day: "Sábados", time: "09:00 a 11:00 hs", location: "Encuentros y Amistosos" }
      ]
    },
    {
      id: "hockey-cuarta",
      name: "Hockey Cuarta Cat (+35)",
      subtitle: "Mamis & Veteranas",
      description: "Competición, recreación y amistad para socias mayores de 35 años que aman el deporte y la vida de club.",
      schedule: [
        { day: "Lunes y Miércoles", time: "20:00 a 21:30 hs", location: "Cancha Sintética" }
      ]
    }
  ],

  latestNews: [
    {
      id: 1,
      title: "Gran triunfo del Plantel Superior ante San Fernando en una fecha clave",
      category: "Rugby Superior",
      date: "20 de Septiembre, 2026",
      summary: "Los Yacarés mostraron solidez defensiva y contundencia en las formaciones fijas para traerse 4 puntos vitales en el torneo de la URBA.",
      image: "https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&w=800&q=80",
      readTime: "3 min de lectura"
    },
    {
      id: 2,
      title: "Obras en el club: Inauguración del nuevo sistema lumínico LED en Cancha 2",
      category: "Institucional",
      date: "14 de Septiembre, 2026",
      summary: "Completamos la reconversión a iluminación LED de alta potencia para optimizar los entrenamientos nocturnos de juveniles y hockey.",
      image: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80",
      readTime: "2 min de lectura"
    },
    {
      id: 3,
      title: "Inscripción abierta para la Gira Nacional M17 a Mendoza 2026",
      category: "Juveniles",
      date: "08 de Septiembre, 2026",
      summary: "La camada 2008 prepara su tradicional viaje de fin de año. Información sobre cronograma, costos, autorizaciones y fichas médicas.",
      image: "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=800&q=80",
      readTime: "4 min de lectura"
    }
  ],

  sponsors: [
    { name: "Banco Macro", tier: "Main Sponsor", logoText: "BANCO MACRO" },
    { name: "Gilbert Rugby", tier: "Official Ball & Kit", logoText: "GILBERT" },
    { name: "OSDE", tier: "Healthcare Partner", logoText: "OSDE" },
    { name: "Tigre Municipio", tier: "Apoyo Institucional", logoText: "MUNICIPIO DE TIGRE" },
    { name: "Zurich", tier: "Official Sponsor", logoText: "ZURICH" },
    { name: "Gatorade", tier: "Hidratación Oficial", logoText: "GATORADE" }
  ],

  membershipPlans: [
    {
      category: "Rugby / Hockey Activo (Mayor)",
      price: "$28.500",
      period: "mensual",
      features: ["Entrenamientos y competencia oficial", "Acceso libre a gimnasio de musculación", "Seguro médico deportivo URBA / AAHBA", "Tercer tiempo y vida social"]
    },
    {
      category: "Rugby Juvenil (M15 a M19)",
      price: "$24.000",
      period: "mensual",
      features: ["Entrenamientos con preparador físico", "Indumentaria de entrenamiento incluida en kit", "Seguro deportivo y médico", "Participación en giras institucionales"]
    },
    {
      category: "Infantiles / Escuelita (M6 a M14)",
      price: "$19.500",
      period: "mensual",
      features: ["Iniciación lúdica y formativa", "Tercer tiempo incluido en todas las fechas", "Seguro URBA / AAHBA", "Encuentros interclubes y clínicas"]
    },
    {
      category: "Socio Protector / Familiar",
      price: "$14.000",
      period: "mensual",
      features: ["Uso de quinchos y parrillas", "Descuento en boutique oficial", "Descuento por grupo familiar (2do hijo 20%, 3ero 50%)", "Acceso prioritario a eventos sociales"]
    }
  ]
};

// Export to window
if (typeof window !== 'undefined') {
  window.DELTA_DATA = DELTA_DATA;
}
