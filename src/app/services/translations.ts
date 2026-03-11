export interface Texts {
  nav: { home: string; photos: string; myInvitation: string; gallery: string };
  splash: {
    tagline: string; subtitle: string; enter: string;
    passwordPlaceholder: string; wrongPassword: string; hint: string;
  };
  hero: { pretitle: string; date: string; location: string; ctaButton: string };
  countdown: { label: string; days: string; hours: string; minutes: string; seconds: string; subtitle: string };
  info: {
    eyebrow: string; title: string; subtitle: string;
    date: { label: string; main: string; sub: string };
    time: { label: string; main: string; sub: string };
    place: { label: string; main: string; sub: string };
  };
  gallery: { eyebrow: string; title: string; subtitle: string };
  planning: {
    eyebrow: string; title: string; subtitle: string;
    items: { time: string; event: string; description: string }[];
  };
  location: {
    eyebrow: string; title: string; subtitle: string;
    address: { label: string; text: string };
    car: { label: string; text: string };
    train: { label: string; text: string };
    mapsButton: string;
  };
  mediaCta: { title: string; text: string; button: string };
  footer: { love: string };
  media: {
    heroTitle: string; heroText: string; backLink: string;
    step1: { title: string; text: string };
    step2: { title: string; text: string };
    step3: { title: string; text: string };
    uploadTitle: string;
    dropZone: { title: string; titleActive: string; subtitle: string };
    queueHeader: string; doneText: string;
    submitBtn: string; submitting: string; submitNote: string;
    galleryEyebrow: string; galleryTitle: string; galleryText: string;
    comingSoonTitle: string; comingSoonText: string;
  };
  inv: {
    loading: string;
    pretitle: string;
    date: string;
    place: string;
    welcomeText: string;
    sectionTitle: string;
    commentsLabel: string;
    commentsPlaceholder: string;
    companionsTitle: string;
    companionNameLabel: string;
    companionNamePlaceholder: string;
    companionCommentsLabel: string;
    companionCommentsPlaceholder: string;
    companionAttending: string;
    companionNotAttending: string;
    noCompanions: string;
    errorSave: string;
    successMsg: string;
    confirmBtn: string;
    saving: string;
    closeBtn: string;
    footerMsg: string;
  };
  galeria: {
    heroTitle: string;
    heroText: string;
    backLink: string;
    loading: string;
    emptyTitle: string;
    emptyText: string;
    emptyBtn: string;
    photoCount: string;
  };
  adminInv: {
    title: string;
    loading: string;
    statInvitations: string;
    statConfirmed: string;
    statPending: string;
    statPersons: string;
    filterAll: string;
    filterConfirmed: string;
    filterPending: string;
    badgeConfirmed: string;
    badgePending: string;
    companions: string;
    companionPending: string;
    companionAbsent: string;
    empty: string;
    withCompanions: string;
    withoutCompanions: string;
  };
  adminFotos: {
    title: string;
    loading: string;
    statTotal: string;
    statApproved: string;
    statPending: string;
    approve: string;
    hide: string;
    visible: string;
    hidden: string;
    empty: string;
    delete: string;
    deleteConfirm: string;
    deleteYes: string;
    deleteNo: string;
  };
}

export const ca: Texts = {
  nav: { home: 'Inici', photos: 'Fotos', myInvitation: 'La meva invitació', gallery: 'Galeria' },
  splash: {
    tagline: 'Més que un casament',
    subtitle: 'La historia d\'amor de',
    enter: 'Entrar',
    passwordPlaceholder: 'Contrasenya...',
    wrongPassword: 'Contrasenya incorrecta, torna-ho a intentar!',
    hint: 'Pista: és un tubercle molt popular 🥔',
  },
  hero: {
    pretitle: 'Us convidem a celebrar el nostre casament',
    date: '2 · Octubre · 2026',
    location: 'Masia Ca N\'Illa · La Garriga',
    ctaButton: 'Més informació',
  },
  countdown: {
    label: 'Falten...',
    days: 'dies', hours: 'hores', minutes: 'minuts', seconds: 'segons',
    subtitle: 'per al dia més especial de les nostres vides',
  },
  info: {
    eyebrow: 'La celebració', title: 'Detalls del dia',
    subtitle: 'Tot el que necessites saber per acompanyar-nos en aquest moment tan especial',
    date: { label: 'Data', main: 'Divendres, 2 d\'octubre', sub: '2026' },
    time: { label: 'Hora', main: '17:30 Convocatòria', sub: '18:00 Cerimònia' },
    place: { label: 'Lloc', main: 'Masia Ca N\'Illa', sub: 'La Garriga, Barcelona' },
  },
  gallery: {
    eyebrow: 'La nostra historia', title: 'Moments nostres',
    subtitle: 'Alguns dels moments que ens han portat fins aquí',
  },
  planning: {
    eyebrow: 'El programa', title: 'Planning del dia',
    subtitle: 'Així serà la nostra jornada. Prometem que serà un dia per recordar!',
    items: [
      { time: '17:30', event: 'Convocatòria', description: 'Us esperem amb els braços oberts. Veniu preparats per a una tarda inoblidable.' },
      { time: '18:00', event: 'Cerimònia', description: 'El moment que tant hem esperat. La Judit i l\'Héctor es diuen el "Sí, vull".' },
      { time: '19:00', event: 'Còctel', description: 'Begudes, aperitius i els primers brindis sota el sol de La Garriga.' },
      { time: '20:30', event: 'Banquet', description: 'Un sopar especial per celebrar junts aquest dia tan especial.' },
      { time: 'Nit', event: 'Festa & Ball', description: 'A ballar i celebrar fins que ens ho prohibeixin! La nit és nostra.' },
    ],
  },
  location: {
    eyebrow: 'Com arribar', title: 'La Masia',
    subtitle: 'La Masia Ca N\'Illa es troba al cor de La Garriga, envoltada de natura i encant',
    address: { label: 'Adreça', text: 'Masia Ca N\'Illa\nLa Garriga, Barcelona' },
    car: { label: 'En cotxe', text: 'Autopista AP-7, sortida La Garriga. Accés indicat des del poble.' },
    train: { label: 'En tren', text: 'Línia R3 (Rodalies) des de Barcelona Passeig de Gràcia fins a La Garriga.' },
    mapsButton: 'Veure a Google Maps',
  },
  mediaCta: {
    title: 'Comparteix les teves fotos',
    text: 'Volem veure el dia des dels vostres ulls. Puja les teves fotos i vídeos, i uns dies després nosaltres compartirem tots els records amb vosaltres.',
    button: 'Pujar fotos',
  },
  footer: { love: 'Fet amb amor per al dia més especial' },
  media: {
    heroTitle: 'Els vostres moments',
    heroText: 'Cada foto explica una historia. Comparteix els teus millors moments del dia i en uns dies rebreu totes les fotos del reportatge complet.',
    backLink: 'Tornar a l\'inici',
    step1: { title: 'Puja les teves fotos', text: 'Arrossega o selecciona les teves imatges i vídeos del dia' },
    step2: { title: 'Nosaltres les revisem', text: 'La Judit i l\'Héctor recopilaran tots els records' },
    step3: { title: 'Àlbum compartit', text: 'En uns dies rebreu l\'àlbum complet amb totes les fotos' },
    uploadTitle: 'Pujar fotos',
    dropZone: { title: 'Arrossega les teves fotos aquí', titleActive: 'Deixa\'ls aquí!', subtitle: 'o fes clic per seleccionar-les' },
    queueHeader: 'Arxius', doneText: 'pujats correctament',
    submitBtn: 'Enviar fotos als nuvis', submitting: 'Pujant arxius...',
    submitNote: '* La pujada real s\'activarà quan el back-end estigui llest. Per ara es simula el procés.',
    galleryEyebrow: 'L\'àlbum del dia', galleryTitle: 'Moments compartits',
    galleryText: 'Aquí apareixeran les fotos que aneu pujant. Uns dies després de la boda, els nuvis pujaran el reportatge complet.',
    comingSoonTitle: 'Properament',
    comingSoonText: 'Les fotos apareixeran aquí després de la boda.\nTorneu a l\'octubre!',
  },
  inv: {
    loading: 'Carregant la teva invitació...',
    pretitle: 'Teniu el plaer de ser convidats a la boda de',
    date: 'Divendres, 2 d\'Octubre de 2026',
    place: 'Masia Ca N\'Illa · La Garriga',
    welcomeText: 'Ens fa molta il·lusió poder comptar amb tu en el nostre gran dia. Si us plau, confirma la teva assistència i la dels teus acompanyants, i indica\'ns si tens alguna al·lèrgia o necessitat especial.',
    sectionTitle: 'Confirma la teva assistència',
    commentsLabel: 'Al·lèrgies o comentaris',
    commentsPlaceholder: 'Cap al·lèrgia',
    companionsTitle: 'Acompanyants',
    companionNameLabel: 'Nom',
    companionNamePlaceholder: 'Nom de l\'acompanyant',
    companionCommentsLabel: 'Al·lèrgies o comentaris',
    companionCommentsPlaceholder: 'Cap al·lèrgia',
    companionAttending: 'Assistirà',
    companionNotAttending: 'No assistirà',
    noCompanions: 'Sense acompanyants',
    errorSave: 'Error al guardar. Torna-ho a intentar.',
    successMsg: 'Guardat correctament! Ens veiem el 2 d\'octubre.',
    confirmBtn: 'Confirmar assistència',
    saving: 'Guardant...',
    closeBtn: 'Tancar',
    footerMsg: 'L\'amor ens uneix i ens fa forts',
  },
  galeria: {
    heroTitle: 'La nostra galeria',
    heroText: 'Tots els moments que heu compartit amb nosaltres',
    backLink: 'Tornar a l\'inici',
    loading: 'Carregant galeria...',
    emptyTitle: 'Aviat arribarà la màgia',
    emptyText: 'Les fotos apareixeran aquí un cop aprovades. Comparteix els teus moments a la secció de Fotos!',
    emptyBtn: 'Pujar fotos',
    photoCount: 'fotos',
  },
  adminInv: {
    title: 'Convidats',
    loading: 'Carregant convidats...',
    statInvitations: 'Invitacions',
    statConfirmed: 'Confirmats',
    statPending: 'Pendents',
    statPersons: 'Persones',
    filterAll: 'Tots',
    filterConfirmed: 'Confirmats',
    filterPending: 'Pendents',
    badgeConfirmed: 'Confirmat',
    badgePending: 'Pendent',
    companions: 'Acompanyants',
    companionPending: 'acompanyant(s) — pendent de confirmar',
    companionAbsent: 'No assistirà',
    empty: 'Cap convidat en aquesta categoria',
    withCompanions: 'Amb acompanyants',
    withoutCompanions: 'Sense acompanyants',
  },
  adminFotos: {
    title: 'Fotos',
    loading: 'Carregant fotos...',
    statTotal: 'Total',
    statApproved: 'Aprovades',
    statPending: 'Pendents',
    approve: 'Aprovar',
    hide: 'Ocultar',
    visible: 'Visible',
    hidden: 'Oculta',
    empty: 'Encara no hi ha fotos pujades',
    delete: 'Eliminar',
    deleteConfirm: 'Segur que vols eliminar-la?',
    deleteYes: 'Sí, eliminar',
    deleteNo: 'Cancel·lar',
  },
};

export const es: Texts = {
  nav: { home: 'Inicio', photos: 'Fotos', myInvitation: 'Mi invitación', gallery: 'Galería' },
  splash: {
    tagline: 'Más que una boda',
    subtitle: 'La historia de amor de',
    enter: 'Entrar',
    passwordPlaceholder: 'Contraseña...',
    wrongPassword: '¡Contraseña incorrecta, inténtalo de nuevo!',
    hint: 'Pista: es un tubérculo muy popular 🥔',
  },
  hero: {
    pretitle: 'Os invitamos a celebrar nuestra boda',
    date: '2 · Octubre · 2026',
    location: 'Masia Ca N\'Illa · La Garriga',
    ctaButton: 'Más información',
  },
  countdown: {
    label: 'Faltan...',
    days: 'días', hours: 'horas', minutes: 'minutos', seconds: 'segundos',
    subtitle: 'para el día más especial de nuestras vidas',
  },
  info: {
    eyebrow: 'La celebración', title: 'Detalles del día',
    subtitle: 'Todo lo que necesitas saber para acompañarnos en este momento tan especial',
    date: { label: 'Fecha', main: 'Viernes, 2 de octubre', sub: '2026' },
    time: { label: 'Hora', main: '17:30 Convocatoria', sub: '18:00 Ceremonia' },
    place: { label: 'Lugar', main: 'Masia Ca N\'Illa', sub: 'La Garriga, Barcelona' },
  },
  gallery: {
    eyebrow: 'Nuestra historia', title: 'Momentos nuestros',
    subtitle: 'Algunos de los momentos que nos han traído hasta aquí',
  },
  planning: {
    eyebrow: 'El programa', title: 'Planning del día',
    subtitle: '¡Así será nuestra jornada. Prometemos que será un día para recordar!',
    items: [
      { time: '17:30', event: 'Convocatoria', description: 'Os esperamos con los brazos abiertos. Venid preparados para una tarde inolvidable.' },
      { time: '18:00', event: 'Ceremonia', description: 'El momento que tanto hemos esperado. Judit y Héctor se dan el "Sí, quiero".' },
      { time: '19:00', event: 'Cóctel', description: 'Bebidas, aperitivos y los primeros brindis bajo el sol de La Garriga.' },
      { time: '20:30', event: 'Banquete', description: 'Una cena especial para celebrar juntos este día tan especial.' },
      { time: 'Noche', event: 'Fiesta & Baile', description: '¡A bailar y celebrar hasta que nos lo prohíban! La noche es nuestra.' },
    ],
  },
  location: {
    eyebrow: 'Cómo llegar', title: 'La Masia',
    subtitle: 'La Masia Ca N\'Illa se encuentra en el corazón de La Garriga, rodeada de naturaleza y encanto',
    address: { label: 'Dirección', text: 'Masia Ca N\'Illa\nLa Garriga, Barcelona' },
    car: { label: 'En coche', text: 'Autopista AP-7, salida La Garriga. Acceso indicado desde el pueblo.' },
    train: { label: 'En tren', text: 'Línea R3 (Rodalies) desde Barcelona Passeig de Gràcia hasta La Garriga.' },
    mapsButton: 'Ver en Google Maps',
  },
  mediaCta: {
    title: 'Comparte tus fotos',
    text: 'Queremos ver el día desde vuestros ojos. Sube tus fotos y vídeos, y unos días después nosotros compartiremos todos los recuerdos con vosotros.',
    button: 'Subir fotos',
  },
  footer: { love: 'Hecho con amor para el día más especial' },
  media: {
    heroTitle: 'Vuestros momentos',
    heroText: 'Cada foto cuenta una historia. Comparte tus mejores momentos del día y en unos días recibiréis todas las fotos del reportaje completo.',
    backLink: 'Volver al inicio',
    step1: { title: 'Sube tus fotos', text: 'Arrastra o selecciona tus imágenes y vídeos del día' },
    step2: { title: 'Nosotros las revisamos', text: 'Judit y Héctor recopilarán todos los recuerdos' },
    step3: { title: 'Álbum compartido', text: 'En unos días recibiréis el álbum completo con todas las fotos' },
    uploadTitle: 'Subir fotos',
    dropZone: { title: 'Arrastra tus fotos aquí', titleActive: '¡Suéltalas aquí!', subtitle: 'o haz clic para seleccionarlas' },
    queueHeader: 'Archivos', doneText: 'subidos correctamente',
    submitBtn: 'Enviar fotos a los novios', submitting: 'Subiendo archivos...',
    submitNote: '* La subida real se activará cuando el back-end esté listo. Por ahora se simula el proceso.',
    galleryEyebrow: 'El álbum del día', galleryTitle: 'Momentos compartidos',
    galleryText: 'Aquí aparecerán las fotos que vayáis subiendo. Unos días después de la boda, los novios subirán el reportaje completo.',
    comingSoonTitle: 'Próximamente',
    comingSoonText: 'Las fotos aparecerán aquí después de la boda.\n¡Volved en octubre!',
  },
  inv: {
    loading: 'Cargando tu invitación...',
    pretitle: 'Tenéis el placer de ser invitados a la boda de',
    date: 'Viernes, 2 de Octubre de 2026',
    place: 'Masia Ca N\'Illa · La Garriga',
    welcomeText: 'Nos hace mucha ilusión poder contar contigo en nuestro gran día. Por favor, confirma tu asistencia y la de tus acompañantes, e indícanos si tienes alguna alergia o necesidad especial.',
    sectionTitle: 'Confirma tu asistencia',
    commentsLabel: 'Alergias o comentarios',
    commentsPlaceholder: 'Ninguna alergia',
    companionsTitle: 'Acompañantes',
    companionNameLabel: 'Nombre',
    companionNamePlaceholder: 'Nombre del acompañante',
    companionCommentsLabel: 'Alergias o comentarios',
    companionCommentsPlaceholder: 'Ninguna alergia',
    companionAttending: 'Asistirá',
    companionNotAttending: 'No asistirá',
    noCompanions: 'Sin acompañantes',
    errorSave: 'Error al guardar. Inténtalo de nuevo.',
    successMsg: '¡Guardado correctamente! Nos vemos el 2 de octubre.',
    confirmBtn: 'Confirmar asistencia',
    saving: 'Guardando...',
    closeBtn: 'Cerrar',
    footerMsg: 'El amor nos une y nos hace fuertes',
  },
  galeria: {
    heroTitle: 'Nuestra galería',
    heroText: 'Todos los momentos que habéis compartido con nosotros',
    backLink: 'Volver al inicio',
    loading: 'Cargando galería...',
    emptyTitle: 'Pronto llegará la magia',
    emptyText: 'Las fotos aparecerán aquí una vez aprobadas. ¡Comparte tus momentos en la sección de Fotos!',
    emptyBtn: 'Subir fotos',
    photoCount: 'fotos',
  },
  adminInv: {
    title: 'Invitados',
    loading: 'Cargando invitados...',
    statInvitations: 'Invitaciones',
    statConfirmed: 'Confirmados',
    statPending: 'Pendientes',
    statPersons: 'Personas',
    filterAll: 'Todos',
    filterConfirmed: 'Confirmados',
    filterPending: 'Pendientes',
    badgeConfirmed: 'Confirmado',
    badgePending: 'Pendiente',
    companions: 'Acompañantes',
    companionPending: 'acompañante(s) — pendiente de confirmar',
    companionAbsent: 'No asistirá',
    empty: 'Ningún invitado en esta categoría',
    withCompanions: 'Con acompañantes',
    withoutCompanions: 'Sin acompañantes',
  },
  adminFotos: {
    title: 'Fotos',
    loading: 'Cargando fotos...',
    statTotal: 'Total',
    statApproved: 'Aprobadas',
    statPending: 'Pendientes',
    approve: 'Aprobar',
    hide: 'Ocultar',
    visible: 'Visible',
    hidden: 'Oculta',
    empty: 'Todavía no hay fotos subidas',
    delete: 'Eliminar',
    deleteConfirm: '¿Seguro que quieres eliminarla?',
    deleteYes: 'Sí, eliminar',
    deleteNo: 'Cancelar',
  },
};
