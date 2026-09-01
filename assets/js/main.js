/* =========================================================
   1CELL HEALTH — interactions (v6 · best-in-class)
   ========================================================= */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var money = function (n) { return "$" + n.toLocaleString("en-US"); };

  /* =======================================================
     i18n — EN captured from DOM, ES dictionary
     ======================================================= */
  var ES = {
    "top.ship": "Envío en cadena de frío a todo el mundo — gratis desde",
    "top.clin": "Para clínicos →",
    "nav.products": "Productos", "nav.standard": "Estándar", "nav.process": "Proceso", "nav.faq": "FAQ", "nav.clin": "Para clínicos",
    "hero.eyebrow": "Fundada en 2026 · México y Estados Unidos",
    "hero.title": "Regeneración, diseñada con precisión.",
    "hero.lead": "Un solo estándar para la medicina regenerativa — células madre mesenquimales, exosomas, células NK y Muse, péptidos. Cada lote caracterizado, documentado, y entregado sin salir jamás de 2–8 °C.",
    "hero.cta1": "Ver productos <span class=\"arr\">→</span>", "hero.cta2": "Para clínicos",
    "hero.t2": "COA por lote", "hero.t3": "Cadena de frío 2–8 °C", "hero.range": "en rango", "hero.coa": "COA por lote",
    "hero.s1n": "≥ 95%", "hero.s1l": "Viabilidad, cada lote",
    "hero.s2n": "2–8 °C", "hero.s2l": "Cadena de frío ininterrumpida",
    "hero.s3n": "100%", "hero.s3l": "Lotes con COA",
    "hero.s4n": "24/7", "hero.s4l": "Equipo médico disponible",
    "stmt.text": "Entregamos un portafolio caracterizado, documentado y sostenible. Sin promesas — solo evidencia, desde la recepción hasta tu puerta.",
    "stmt.a": "Un estándar. Cada lote.",
    "app.kicker": "La forma 1CELL", "app.title": "Nunca recibes solo un vial.",
    "app.sub": "Cada pedido de 1CELL llega como un régimen completo — el producto, un protocolo clínico escrito y un equipo médico real que guía cada paso. Ciencia avanzada, sin automedicación.",
    "app.1t": "El producto", "app.1p": "Un biológico caracterizado y en cadena de frío — péptidos, terapias IV, exosomas y nutracéuticos, cada uno liberado contra un Certificado de Análisis.",
    "app.2t": "Un protocolo clínico", "app.2p": "Dosis, vía, tiempos y alertas de seguridad — escrito según tus objetivos, para no dejar nada al azar.",
    "app.3t": "Un equipo médico", "app.3p": "Clínicos reales guían la aplicación y el seguimiento — una llamada de introducción y una línea directa, de la primera dosis a los resultados.",
    "app.result": "Producto <b>+</b> protocolo <b>+</b> guía médica <b>=</b> resultados en los que confiar.",
    "prod.kicker": "El catálogo", "prod.title": "Curado por familia biológica.",
    "prod.sub": "Terapias celulares para la práctica clínica, y péptidos y nutracéuticos para la longevidad diaria — cada referencia caracterizada y protegida en cadena de frío.",
    "prod.all": "Todo", "prod.cell": "Terapias celulares", "prod.direct": "Compra directa", "prod.search": "Buscar productos…",
    "prod.qv": "Vista rápida", "prod.req": "Bajo pedido", "prod.request": "Solicitar →", "prod.add": "Añadir<span class=\"arr\">→</span>",
    "prod.help": "¿No sabes por dónde empezar?", "prod.helpsub": "Nuestro equipo médico crea un protocolo según tus objetivos.", "prod.helpcta": "Habla con un clínico <span>→</span>",
    "prod.empty": "Ningún producto coincide con tu búsqueda.",
    "scrub.kicker": "Producto insignia", "scrub.title": "El sérum,<br>diseñado como un biológico.", "scrub.buy": "Añadir al carrito →",
    "scrub.1t": "Activos de exosomas", "scrub.1p": "Factores de señalización que le dicen a la piel que se renueve.",
    "scrub.2t": "Péptido de cobre GHK-Cu", "scrub.2p": "Firmeza, tono y reparación visible.",
    "scrub.3t": "Viable, 2–8 °C", "scrub.3p": "Cadena de frío desde nuestro laboratorio hasta tu puerta.",
    "std.kicker": "Por qué 1CELL", "std.title": "El estándar, en cada vial.",
    "std.sub": "Nada se envía sin documentación, un plan clínico y un registro de temperatura validado.",
    "std.p1t": "Biología trazable", "std.p1p": "Fabricación cGMP, caracterización por citometría de flujo y un COA de terceros archivado para cada lote.",
    "std.p2t": "Cadena de frío ininterrumpida", "std.p2p": "2–8 °C de cultivo a clínica, con un registrador digital en cada envío. Los lotes fuera de rango se rechazan.",
    "std.p3t": "Guía médica real", "std.p3p": "Un protocolo clínico acompaña cada pedido, y un equipo médico guía la aplicación y el seguimiento.",
    "std.m1": "Familias biológicas", "std.m2": "COA por lote", "std.m3": "Soporte médico", "std.m4": "Cadena de frío",
    "proc.kicker": "Cadena de custodia", "proc.title": "De cultivo<br>a clínica.",
    "proc.sub": "Cuatro etapas, cada una documentada y con temperatura controlada. Desplázate para seguir un lote.",
    "proc.1t": "Cultivo", "proc.1p": "Fabricación cGMP en condiciones controladas y auditadas.",
    "proc.2t": "Caracterización", "proc.2p": "Perfil por citometría de flujo y viabilidad reportada, por lote.",
    "proc.3t": "Envío a 2–8 °C", "proc.3p": "Cadena de frío validada con un registrador digital en cada caja.",
    "proc.4t": "Aplicación y seguimiento", "proc.4p": "Un equipo médico dedicado guía el uso y el post-cuidado.",
    "cc.range": "en rango", "cc.kicker": "Logística", "cc.title": "Nunca fuera de<br>2–8 °C.",
    "cc.sub": "Cada envío lleva un registrador digital de temperatura, monitoreado 24/7. Las lecturas fuera de rango rechazan el lote automáticamente — así la biología que pides es la que recibes.",
    "cc.k1": "Rango", "cc.k2": "Monitoreo", "cc.k3": "Registrador", "cc.v3": "Por caja",
    "faq.kicker": "Bueno saberlo", "faq.title": "Preguntas,<br>respondidas.",
    "faq.q1": "¿Qué incluye cada producto?", "faq.a1": "Cada lote se envía con un Certificado de Análisis de terceros, caracterización por citometría de flujo y un protocolo clínico con dosis, vía y seguimiento. Las terapias celulares también incluyen la viabilidad reportada del lote.",
    "faq.q2": "¿Cómo se garantiza la cadena de frío?", "faq.a2": "Cada paquete se envía en un contenedor térmico calificado con geles refrigerantes y material de cambio de fase. Un registrador de datos dentro del paquete registra la temperatura cada minuto y se entrega con el producto para trazabilidad clínica.",
    "faq.q3": "¿Quién puede pedir productos profesionales?", "faq.a3": "Las terapias celulares y exosomas están disponibles para médicos y clínicas con licencia. El acceso profesional se concede tras verificar la licencia — normalmente en 24 horas — y desbloquea precios institucionales y protocolos clínicos.",
    "faq.q4": "¿Pueden comprar particulares?", "faq.a4": "Sí. Péptidos, nutracéuticos y cosméticos están disponibles para compra directa y se envían en cadena de frío con protocolo incluido. Consulta a un clínico cualificado antes de usar.",
    "pro.kicker": "Acceso profesional", "pro.title": "Únete a la red médica de 1CELL.",
    "pro.sub": "Validación de licencia, precios institucionales y soporte científico dedicado. Un solo estándar.",
    "pro.ph": "Tu email profesional", "pro.btn": "Solicitar acceso", "pro.fine": "Verificación de licencia en 24 h · Evidencia por lote, sin ruido.",
    "foot.news": "Recibe evidencia por lote, sin ruido.", "foot.ph": "Correo electrónico", "foot.sub": "Suscribirse",
    "foot.tag": "Biológicos regenerativos de grado clínico con trazabilidad por lote y guía médica real.",
    "foot.contactinfo": "contacto@1cellhealth.com · Lun–Vie 9:00–18:00 (CT)",
    "foot.science": "Ciencia", "foot.company": "Empresa", "foot.contact": "Contacto", "foot.legal": "Legal",
    "cart.title": "Tu carrito", "cart.empty": "Aún nada aquí — tu régimen empieza en el catálogo.", "cart.browse": "Ver productos",
    "cart.subtotal": "Subtotal", "cart.ship": "Envío en cadena de frío calculado al finalizar.", "cart.checkout": "Finalizar compra",
    "co.s1": "Datos", "co.s2": "Revisar", "co.s3": "Listo", "co.detailsh": "Datos de envío",
    "co.demo": "Checkout de demostración — no se cobra ni se envía nada.",
    "co.name": "Nombre completo", "co.email": "Email", "co.addr": "Dirección", "co.city": "Ciudad", "co.country": "País",
    "co.toreview": "Continuar a revisión", "co.reviewh": "Revisa tu pedido", "co.shiprow": "Envío en cadena de frío", "co.free": "Gratis",
    "co.back": "Atrás", "co.place": "Realizar pedido", "co.doneh": "Pedido realizado",
    "co.donep": "Gracias — esto fue una demostración, no se cobró nada. Normalmente recibirías una confirmación por email.", "co.finish": "Seguir explorando",
    "page.about": "Nosotros", "page.privacy": "Privacidad", "page.terms": "Términos", "page.compliance": "Cumplimiento",
    "ap.kicker": "Fundada en 2026 · México y Estados Unidos",
    "ap.h1": "Un estándar para la <em>medicina regenerativa.</em>",
    "ap.hs1": "Fundada", "ap.hs2": "COA por lote", "ap.hs3": "Cadena de frío 2–8 °C", "ap.hs4": "Equipo médico",
    "ap.story1": "Cada lote liberado contra un Certificado de Análisis de terceros.",
    "ap.story2": "Un protocolo clínico escrito en cada pedido — dosis, vía y seguridad.",
    "ap.story3": "Un equipo médico disponible, desde la primera dosis hasta el seguimiento.",
    "ap.promise": "Sin promesas. Solo evidencia — y un clínico a tu lado.",
    "ap.promisep": "No vendemos esperanza. Entregamos biológicos caracterizados, los datos detrás de ellos y la guía médica para usarlos bien.",
    "ap.foundkicker": "Fundada y dirigida por", "ap.foundtitle": "Un equipo pequeño, un solo estándar.",
    "ap.lead": "1CELL Health nació en 2026 para unir la ciencia regenerativa más nueva con las clínicas y personas que la necesitan — péptidos, exosomas y terapias avanzadas, entregadas con un protocolo clínico y guía médica real. Nunca automedicación.",
    "ap.storykicker": "Por qué empezamos", "ap.storytitle": "Ciencia nueva, segura de usar.",
    "ap.storyp": "La medicina regenerativa avanza más rápido de lo que la mayoría puede seguir con seguridad. 1CELL Health nació en 2026 para cerrar esa brecha — llevando péptidos, exosomas y terapias avanzadas a clínicas e individuos con la ciencia documentada detrás de cada lote, y un equipo médico que guía su uso. Para que los tratamientos más nuevos se apliquen con un protocolo, no por cuenta propia.",
    "ap.valkicker": "Lo que sostenemos", "ap.valtitle": "Cuatro principios, sin excepciones.",
    "ap.v1t": "Rigor científico", "ap.v1p": "Cada decisión se basa en datos verificables.",
    "ap.v2t": "Trazabilidad total", "ap.v2p": "Cada vial con COA e historial por lote.",
    "ap.v3t": "Acompañamiento real", "ap.v3p": "Un equipo médico detrás de cada envío.",
    "ap.v4t": "Ética compasiva", "ap.v4p": "Sin promesas médicas — solo evidencia y cuidado.",
    "ap.tlkicker": "Nuestro recorrido", "ap.tltitle": "De un estándar a tres países.",
    "ap.tl1t": "Se funda 1CELL Health", "ap.tl1p": "Fundada bajo el principio de establecer un estándar para la medicina regenerativa.",
    "ap.tl2t": "Trazabilidad de extremo a extremo", "ap.tl2p": "Se forma alianza con Apheresis Tech y Regene para trazabilidad de extremo a extremo.",
    "ap.tl3t": "Se establece el laboratorio cGMP", "ap.tl3p": "El Certificado de Análisis por lote se vuelve práctica estándar para cada línea de producto.",
    "ap.tl4t": "Expansión regional", "ap.tl4p": "Expansión por México, Estados Unidos y Latinoamérica.",
    "ap.teamkicker": "Liderazgo médico", "ap.teamtitle": "El equipo detrás del estándar.",
    "ap.p1role": "Cofundador · Dirección general",
    "ap.p2role": "Medicina regenerativa · Dirección médica",
    "ap.p3role": "Inmunología clínica · Asesor",
    "prod.viewall": "Ver el catálogo completo <span>→</span>", "prod.viewallbtn": "Ver las 7 familias biológicas <span class=\"arr\">→</span>",
    "std.viewall": "Leer el estándar completo <span>→</span>", "proc.viewall": "Ver el proceso completo <span>→</span>", "faq.viewall": "Ver todas las preguntas <span>→</span>",
    "crumb.home": "Inicio",
    "pp.h1": "Cada familia biológica, diseñada y documentada.",
    "pp.lead": "Terapias celulares para la práctica clínica, y péptidos y nutracéuticos para la longevidad diaria — cada referencia caracterizada por un laboratorio independiente, liberada contra especificación, y entregada en una cadena de frío ininterrumpida de 2–8 °C.",
    "pp.tierskicker": "Cómo funciona el acceso", "pp.tierstitle": "Dos niveles, un mismo estándar.",
    "pp.tierssub": "Cada producto se fabrica y documenta bajo el mismo estándar. El acceso depende de qué es, no de quién compra.",
    "pp.tier1t": "Profesional (bajo pedido)", "pp.tier1p": "Las terapias celulares — células madre, exosomas, células NK, células Muse — requieren una licencia médica verificada. Solicita acceso abajo; la verificación se completa típicamente en 24 horas y desbloquea precios institucionales y protocolos clínicos.",
    "pp.tier2t": "Compra directa", "pp.tier2p": "Péptidos, nutracéuticos y cosméticos se envían directamente a particulares — sin necesidad de licencia. Cada pedido incluye igualmente un Certificado de Análisis y un protocolo de uso, y se envía en la misma cadena de frío validada.",
    "sp.h1": "El estándar, en cada vial.",
    "sp.lead": "Nada se envía sin documentación, un plan clínico y un registro de temperatura validado. Esta página explica exactamente cómo — desde la sala limpia hasta el Certificado de Análisis en tu bandeja de entrada.",
    "sp.p4t": "Verificado independientemente", "sp.p4p": "Cada lote es probado por un laboratorio externo, no solo liberado por control de calidad interno. El resultado se envía con el producto, no solo bajo pedido.",
    "sp.testkicker": "Control de calidad", "sp.testtitle": "Un estándar. Cada lote.", "sp.testsub": "Cinco puntos de control, en orden, antes de que un solo vial sea liberado para envío.",
    "sp.test0t": "Recepción", "sp.test0p": "El material de origen se registra, inspecciona y coteja contra su documentación de cadena de origen antes de entrar al laboratorio.",
    "sp.test1t": "Citometría", "sp.test1p": "La citometría de flujo confirma el perfil de marcadores de superficie que define cada tipo celular — y descarta contaminación cruzada entre lotes.",
    "sp.test2t": "Control de calidad", "sp.test2p": "Viabilidad, esterilidad y endotoxinas se prueban frente a límites farmacopeicos — los productos celulares se someten a un umbral de viabilidad ≥ 95%.",
    "sp.test3t": "Liberación con COA", "sp.test3p": "Se emite un Certificado de Análisis firmado por lote, documentando cada resultado anterior antes de que el lote se autorice para envío.",
    "sp.test4t": "Cadena de frío", "sp.test4p": "El lote liberado entra en empaque validado a 2–8 °C con un registrador digital — y nunca sale de ese rango hasta llegar a ti.",
    "sp.coakicker": "Documentación", "sp.coatitle": "Qué incluye un Certificado de Análisis.",
    "sp.coasub": "Un COA es un registro independiente y firmado — no una hoja de marketing. Cada envío de 1CELL incluye uno, vinculado a un número de lote específico.",
    "sp.coalabel": "CERTIFICADO DE ANÁLISIS", "sp.coaf1": "Marcadores de identidad", "sp.coaf2": "Viabilidad", "sp.coaf3": "Esterilidad",
    "sp.coaf4": "Endotoxinas", "sp.coaf4v": "&lt; 0.5 UE/mL", "sp.coaf5": "Liberado", "sp.pass": "Aprobado",
    "pcp.h1": "Un estándar. Cada lote.",
    "pcp.lead": "Seis puntos de control, cada uno documentado y con temperatura controlada — el camino completo que recorre un lote desde la recepción hasta tu puerta.",
    "pcp.s1t": "Recepción", "pcp.s1p": "El material de origen se registra, inspecciona y coteja contra su documentación de cadena de origen antes de entrar al cultivo cGMP — operadores cualificados, monitoreo ambiental, y un registro de lote completo para cada corrida.",
    "pcp.s1l1": "— Tejido obtenido éticamente, con cadena de origen totalmente documentada",
    "pcp.s1l2": "— Monitoreo ambiental durante todo el ciclo de cultivo",
    "pcp.s1l3": "— Registro de lote archivado para cada corrida de expansión",
    "pcp.s2t": "Citometría", "pcp.s2p": "Cada lote se perfila por citometría de flujo multicolor frente a los marcadores de identidad y pureza que definen su tipo celular — el mismo panel que se incluye en tu Certificado de Análisis.",
    "pcp.s2l1": "— Panel de identidad y pureza por citometría de flujo, por lote",
    "pcp.s2l2": "— NTA y ELISA de tetraspaninas para vesículas extracelulares",
    "pcp.s2l3": "— Resultados verificados cruzadamente antes de pasar a control de calidad",
    "pcp.s3t": "Control de calidad", "pcp.s3p": "Viabilidad, esterilidad y niveles de endotoxinas se prueban frente a límites farmacopeicos. Los productos celulares se someten a un umbral de viabilidad ≥ 95% antes de avanzar.",
    "pcp.s3l1": "— Ensayo de viabilidad, umbral ≥ 95% para productos celulares",
    "pcp.s3l2": "— Cribado de esterilidad y endotoxinas frente a límites farmacopeicos",
    "pcp.s3l3": "— Verificación por HPLC / espectrometría de masas para péptidos",
    "pcp.s4t": "Liberación con COA", "pcp.s4p": "Se emite un Certificado de Análisis firmado por lote, documentando cada resultado de identidad, viabilidad, esterilidad y potencia antes de que el lote se autorice para envío.",
    "pcp.s4l1": "— Certificado de Análisis firmado, específico por lote",
    "pcp.s4l2": "— Descargable desde una cuenta profesional aprobada",
    "pcp.s4l3": "— Ningún lote se envía sin un COA firmado y completo",
    "pcp.s5t": "Cadena de frío", "pcp.s5p": "Cada paquete se envía en un contenedor térmico calificado con geles refrigerantes y material de cambio de fase. Un registrador de datos dentro del paquete registra la temperatura cada minuto — sin excepciones.",
    "pcp.s5l1": "— Contenedor térmico calificado, geles refrigerantes y material de cambio de fase",
    "pcp.s5l2": "— El registrador de datos registra la temperatura cada minuto y se entrega con el producto",
    "pcp.s5l3": "— Rutas prioritarias, 24–48 h en EE.UU., México y grandes ciudades de LATAM",
    "pcp.s6t": "Aplicación y seguimiento", "pcp.s6p": "Para terapias celulares, nuestro propio equipo médico realiza o guía la aplicación en clínica. Un protocolo escrito, una llamada de introducción y un seguimiento estructurado están incluidos — nunca solo una caja en la puerta.",
    "pcp.s6l1": "— Protocolo clínico en PDF con dosis, vía y alertas de seguridad",
    "pcp.s6l2": "— Llamada de introducción y línea médica directa durante todo el protocolo",
    "pcp.s6l3": "— Aplicación en clínica por nuestro equipo médico cuando el protocolo lo requiere",
    "fp.h1": "Preguntas, respondidas.",
    "fp.lead": "Todo lo que nos preguntan antes de un pedido — agrupado por tema. ¿Sigues con dudas? Un clínico de nuestro equipo puede ayudarte directamente.",
    "fp.cat1": "General", "fp.cat2": "Terapias celulares y acceso profesional", "fp.cat3": "Cadena de frío y envío", "fp.cat4": "Péptidos y compra directa", "fp.cat5": "Seguridad y regulación",
    "fp.q1": "¿Qué es 1CELL Health?", "fp.a1": "1CELL Health fabrica y distribuye biológicos regenerativos de grado clínico — células madre mesenquimales, exosomas, células NK, células Muse, péptidos, nutracéuticos y cosméticos. Cada producto se fabrica bajo cGMP, se prueba independientemente, y se libera con un Certificado de Análisis. Un estándar, cada lote.",
    "fp.q5": "¿Cuál es la diferencia entre productos abiertos y terapias celulares restringidas?", "fp.a5": "Los productos abiertos (péptidos, nutracéuticos, cosméticos) se pueden comprar directamente. Las terapias celulares (células madre, exosomas, NK, Muse) están reservadas para profesionales de la salud verificados e incluyen siempre acompañamiento médico y protocolo escrito.",
    "fp.q3": "¿Qué es un Certificado de Análisis (COA) y cómo lo solicito?", "fp.a3": "El COA documenta viabilidad, conteo celular, pureza y pruebas de esterilidad para cada lote. Se entrega automáticamente con cada envío y también se puede descargar desde una cuenta profesional aprobada.",
    "fp.q4": "¿Cómo abro una cuenta profesional y cuánto tarda la aprobación?", "fp.a4": "Solicita una cuenta en la sección de Acceso profesional con tu licencia, especialidad y práctica. Nuestro equipo verifica manualmente la información dentro de 24 horas hábiles. Al aprobarse desbloqueas precios institucionales, fichas técnicas completas y descarga de COA.",
    "fp.q6": "¿Qué incluye el acompañamiento médico para terapias celulares?", "fp.a6": "Cada terapia celular incluye un protocolo clínico en PDF, una llamada de introducción con nuestro equipo médico, soporte durante la aplicación, y seguimiento.",
    "fp.q10": "¿Cómo funciona el envío y cuánto tarda?", "fp.a10": "Enviamos por rutas prioritarias en 24–48h dentro de EE.UU., México y las principales ciudades de LATAM. Cada envío usa empaque validado de cadena de frío y llega con rastreo, sello de seguridad inviolable y un registro completo de temperatura.",
    "fp.q9": "¿Aceptan devoluciones?", "fp.a9": "Debido a que son productos sensibles a la temperatura, no aceptamos devoluciones una vez roto el sello de seguridad. Si detectas un incidente logístico o el registrador de datos muestra una desviación, contáctanos dentro de las 24h y reemplazaremos el producto sin costo.",
    "fp.q7": "¿Los péptidos se venden para uso abierto?", "fp.a7": "Los péptidos se venden con fines de investigación y estilo de vida. Su uso es responsabilidad de cada individuo o profesional. Ofrecemos soporte informativo 24/7, pero esto no es una indicación médica ni reemplaza la consulta profesional.",
    "fp.q5b": "¿Cómo debo almacenar los péptidos al recibirlos?", "fp.a5b": "Mantén los viales refrigerados a 2–8 °C. Las instrucciones de reconstitución y almacenamiento específicas de cada péptido se incluyen en el protocolo del envío — síguelas exactamente para preservar la potencia.",
    "fp.q8": "¿Cómo funcionan los pagos y la facturación?", "fp.a8": "Aceptamos transferencia bancaria y tarjeta de crédito, y — para cuentas institucionales — crédito a 15 días tras verificación. Emitimos facturas fiscales (CFDI 4.0 para México, facturas estándar en otros países) usando los datos registrados en tu cuenta profesional.",
    "fp.cat6": "Pagos y facturación",
    "fp.q6a": "¿Estos productos están aprobados por la FDA?", "fp.a6a": "Estas declaraciones no han sido evaluadas por una agencia regulatoria. Las terapias celulares y exosomas se proporcionan para uso profesional donde lo permita la ley aplicable. Este sitio es informativo y no constituye asesoría médica — consulta a un clínico cualificado.",
    "fp.q6b": "¿Cómo se obtiene el tejido?", "fp.a6b": "Todo el tejido de origen se obtiene con consentimiento informado del donante a través de proveedores acreditados y auditados, con documentación completa de cadena de origen conservada para cada lote.",
    "fp.q6c": "¿Cómo reporto un evento adverso o problema de calidad?", "fp.a6c": "Contacta a nuestro equipo médico de inmediato en contacto@1cellhealth.com con el número de lote de tu Certificado de Análisis. Los eventos de calidad se investigan y, cuando corresponde, se reportan según la regulación aplicable."
  };

  var i18nEls = $$("[data-i18n]"), i18nPh = $$("[data-i18n-ph]");
  i18nEls.forEach(function (el) { el._en = el.innerHTML; });
  i18nPh.forEach(function (el) { el._enph = el.getAttribute("placeholder") || ""; });

  function splitWords(el) {
    var text = el.textContent, parts = text.split(/(\s+)/), n = 0;
    el.innerHTML = "";
    parts.forEach(function (w) {
      if (w === "") return;
      if (/^\s+$/.test(w)) { el.appendChild(document.createTextNode(" ")); return; }
      var sl = document.createElement("span"); sl.className = "sl";
      var sw = document.createElement("span"); sw.className = "sw"; sw.style.setProperty("--n", n++); sw.textContent = w;
      sl.appendChild(sw); el.appendChild(sl);
    });
  }
  function splitBlock(el) { el.innerHTML = '<span class="sline"><span class="sinner">' + el.innerHTML + "</span></span>"; }

  var LS_LANG = "1cell_lang", LS_CART = "1cell_cart";
  var currentLang = "en";
  try { currentLang = localStorage.getItem(LS_LANG) || "en"; } catch (e) {}
  function applyLang(lang) {
    currentLang = lang;
    try { localStorage.setItem(LS_LANG, lang); } catch (e) {}
    document.documentElement.setAttribute("lang", lang);
    i18nEls.forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      el.innerHTML = lang === "es" && ES[k] != null ? ES[k] : el._en;
    });
    i18nPh.forEach(function (el) {
      var k = el.getAttribute("data-i18n-ph");
      el.setAttribute("placeholder", lang === "es" && ES[k] != null ? ES[k] : el._enph);
    });
    // re-split the effects that share i18n
    $$("[data-split]").forEach(function (el) { splitWords(el); if (heroRevealed) el.classList.add("in"); });
    $$("[data-split-lines]").forEach(function (el) { splitBlock(el); });
    $$(".langtoggle b").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-lang") === lang); });
    renderCart();
  }

  /* language toggle */
  var langToggle = $("#langToggle");
  if (langToggle) langToggle.addEventListener("click", function () { applyLang(currentLang === "en" ? "es" : "en"); });

  /* =======================================================
     Preloader
     ======================================================= */
  var heroRevealed = false;
  var pre = $("#preloader"), plBar = $("#plBar"), plPct = $("#plPct");
  document.body.classList.add("loading");
  function revealHero() {
    heroRevealed = true;
    var t = $(".hero__title"); if (t) t.classList.add("in");
    $$(".hero [data-reveal], .hero [data-reveal-fade]").forEach(function (el) { el.classList.add("in"); });
  }
  function finishPreload() {
    if (pre) pre.classList.add("done");
    document.body.classList.remove("loading");
    revealHero();
  }
  if (reduce || !pre) {
    finishPreload();
  } else {
    var p = 0, started = performance.now(), done = false;
    (function step(now) {
      var elapsed = now - started;
      p = Math.min(100, Math.round((elapsed / 1200) * 100));
      if (plBar) plBar.style.width = p + "%";
      if (plPct) plPct.textContent = p;
      if (p < 100) requestAnimationFrame(step);
      else if (!done) { done = true; setTimeout(finishPreload, 220); }
    })(started);
    // safety
    setTimeout(function () { if (!done) { done = true; finishPreload(); } }, 2600);
  }

  /* =======================================================
     Header / drawer / back-to-top
     ======================================================= */
  var header = $("#header"), toTop = $("#toTop");
  function onScroll() {
    var y = window.scrollY || 0;
    if (header) header.classList.toggle("is-scrolled", y > 6);
    if (toTop) toTop.classList.toggle("show", y > 720);
    scrubUpdate();
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  var burger = $("#burger"), drawer = $("#drawer");
  if (burger && drawer) {
    burger.addEventListener("click", function () {
      var open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!open)); drawer.hidden = open;
    });
    drawer.addEventListener("click", function (e) { if (e.target.closest("a")) { burger.setAttribute("aria-expanded", "false"); drawer.hidden = true; } });
  }

  /* =======================================================
     Reveal + counters
     ======================================================= */
  var revealSel = "[data-reveal],[data-reveal-fade],[data-split-lines]";
  if (reduce || !("IntersectionObserver" in window)) {
    $$(revealSel).forEach(function (el) { el.classList.add("in"); });
  } else {
    var ro = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) {
          var d = parseInt(en.target.getAttribute("data-delay") || "0", 10);
          if (d) en.target.style.setProperty("--d", d / 1000 + "s");
          en.target.classList.add("in"); ro.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    $$(revealSel).forEach(function (el) { if (!el.closest(".hero")) ro.observe(el); });
    // safety net: force-reveal anything the observer hasn't caught yet (covers
    // environments where IO callbacks are delayed or skipped for above-the-fold content)
    setTimeout(function () { $$(revealSel).forEach(function (el) { el.classList.add("in"); }); }, 1200);
  }

  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count")), sfx = el.getAttribute("data-suffix") || "";
    if (reduce) { el.textContent = target + sfx; return; }
    var dur = 1500, start = performance.now();
    (function tick(now) {
      var t = Math.min((now - start) / dur, 1), e = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * e) + sfx;
      if (t < 1) requestAnimationFrame(tick);
    })(start);
  }
  if ("IntersectionObserver" in window) {
    var co = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { animateCount(en.target); co.unobserve(en.target); } }); }, { threshold: 0.6 });
    $$("[data-count]").forEach(function (el) { co.observe(el); });
  } else $$("[data-count]").forEach(animateCount);

  /* =======================================================
     Products: filter + search
     ======================================================= */
  var cards = $$(".card"), gridEmpty = $("#gridEmpty");
  var activeFilter = "all", query = "";
  function applyCatalog() {
    var shown = 0;
    cards.forEach(function (c) {
      if (c.classList.contains("card--help")) { c.classList.toggle("is-hidden", activeFilter === "direct" || query !== ""); return; }
      var okCat = activeFilter === "all" || c.getAttribute("data-cat") === activeFilter;
      var okQ = query === "" || (c.getAttribute("data-name") + " " + c.getAttribute("data-cat-label") + " " + c.getAttribute("data-spec")).toLowerCase().indexOf(query) > -1;
      var show = okCat && okQ; c.classList.toggle("is-hidden", !show); if (show) shown++;
    });
    if (gridEmpty) gridEmpty.hidden = shown > 0;
  }
  $$(".filter").forEach(function (btn) {
    btn.addEventListener("click", function () {
      $$(".filter").forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active"); activeFilter = btn.getAttribute("data-filter"); applyCatalog();
    });
  });
  var searchInput = $("#searchInput");
  if (searchInput) searchInput.addEventListener("input", function () { query = this.value.trim().toLowerCase(); applyCatalog(); });

  /* command-palette search — static catalog index, works identically on every page */
  var searchModal = $("#searchModal"), searchModalInput = $("#searchModalInput"), searchResults = $("#searchResults");
  var products = [
    { id: "msc", name: "Mesenchymal Stem Cells", cat: "Cellular therapy", img: "assets/img/product-stemcell.jpg", pro: true },
    { id: "exo", name: "Exosomes · Secretome", cat: "Extracellular vesicles", img: "assets/img/product-exosome.jpg", pro: true },
    { id: "nk", name: "Natural Killer (NK)", cat: "Immunotherapy", img: "assets/img/product-nk.jpg", pro: true },
    { id: "muse", name: "Muse Cells", cat: "Pluripotent", img: "assets/img/product-muse.jpg", pro: true },
    { id: "pep", name: "Peptide Line", cat: "Peptides", img: "assets/img/product-peptides.jpg", price: "89", pro: false },
    { id: "omega", name: "Omega 3 Premium", cat: "Nutraceuticals", img: "assets/img/product-nutra.jpg", price: "39", pro: false },
    { id: "serum", name: "1CELL Facial Serum", cat: "Skin", img: "assets/img/product-cosmetic.jpg", price: "89", pro: false }
  ];

  var prodInfo = {
    msc: {
      en: { desc: "Multipotent mesenchymal stem cells with differentiation and paracrine modulation capacity, expanded under cGMP culture with controlled passages. Characterized by multicolor flow cytometry: CD73+ CD90+ CD105+ (identity), CD34− CD45− (purity). Viability ≥ 95%, verified by 7-AAD / Trypan blue. Available in 50M, 100M and 200M presentations.", includes: ["Third-party Certificate of Analysis", "Flow-cytometry characterization report", "Clinical application protocol", "Digital cold-chain temperature log"], use: "Tissue repair, anti-inflammatory therapy, regenerative orthopedics, aesthetic medicine." },
      es: { desc: "Células madre mesenquimales multipotentes con capacidad de diferenciación y modulación paracrina, expandidas bajo cultivo cGMP con pases controlados. Caracterizadas por citometría de flujo multicolor: CD73+ CD90+ CD105+ (identidad), CD34− CD45− (pureza). Viabilidad ≥ 95%, verificada por 7-AAD / Trypan blue. Disponibles en presentaciones de 50M, 100M y 200M.", includes: ["Certificado de Análisis de terceros", "Informe de citometría de flujo", "Protocolo clínico de aplicación", "Registro digital de temperatura"], use: "Reparación tisular, terapia antiinflamatoria, ortopedia regenerativa, medicina estética." }
    },
    exo: {
      en: { desc: "Extracellular vesicles of 30–150 nm carrying proteins, lipids and regulatory RNA, purified by tangential-flow ultrafiltration to minimize protein contamination. 10¹⁰–10¹² particles per vial, confirmed CD9+ CD63+ CD81+. Quantified by Nano-Tracking Analysis (NTA) and tetraspanin ELISA.", includes: ["Third-party Certificate of Analysis", "NTA particle analysis report", "Tetraspanin (CD9/CD63/CD81) profiling", "Clinical protocol"], use: "Paracrine signaling therapy, tissue regeneration, wound healing." },
      es: { desc: "Vesículas extracelulares de 30–150 nm que transportan proteínas, lípidos y ARN regulador, purificadas por ultrafiltración de flujo tangencial para minimizar la contaminación proteica. 10¹⁰–10¹² partículas por vial, confirmadas CD9+ CD63+ CD81+. Cuantificadas por Análisis de Rastreo de Nanopartículas (NTA) y ELISA de tetraspaninas.", includes: ["Certificado de Análisis de terceros", "Informe de análisis NTA", "Perfil de tetraspaninas (CD9/CD63/CD81)", "Protocolo clínico"], use: "Señalización paracrina, regeneración tisular, cicatrización." }
    },
    nk: {
      en: { desc: "CD56+ CD3− Natural Killer cell populations with a validated cytotoxic profile, purity ≥ 90%. Functional cytotoxic activity confirmed per lot, with an optional HLA/KIR panel for matched applications. Delivered in an infusion-ready formulation.", includes: ["Third-party Certificate of Analysis", "CD56+/CD3− purity report", "Functional cytotoxicity assay", "Clinical protocol"], use: "Immune support, oncological research, adoptive cell transfer." },
      es: { desc: "Poblaciones de células Natural Killer CD56+ CD3− con perfil citotóxico validado, pureza ≥ 90%. Actividad citotóxica funcional confirmada por lote, con panel HLA/KIR opcional para aplicaciones compatibles. Entregadas en formulación lista para infusión.", includes: ["Certificado de Análisis de terceros", "Informe de pureza CD56+/CD3−", "Ensayo funcional de citotoxicidad", "Protocolo clínico"], use: "Soporte inmune, investigación oncológica, transferencia celular adoptiva." }
    },
    muse: {
      en: { desc: "SSEA-3+ Muse cell subpopulation with trilineage differentiation capacity and directed homing to injured tissue. Low tumorigenicity reported in the literature. Standardized per-dose presentation for consistent, repeatable application.", includes: ["Third-party Certificate of Analysis", "SSEA-3+ expression report", "Differentiation assay", "Clinical protocol"], use: "Tissue repair, organ regeneration research, stress-induced injury recovery." },
      es: { desc: "Subpoblación de células Muse SSEA-3+ con capacidad de diferenciación trilinaje y migración dirigida a tejido dañado. Baja tumorigenicidad reportada en la literatura. Presentación estandarizada por dosis para una aplicación consistente y repetible.", includes: ["Certificado de Análisis de terceros", "Informe de expresión SSEA-3+", "Ensayo de diferenciación", "Protocolo clínico"], use: "Reparación tisular, regeneración orgánica, recuperación de lesiones." }
    },
    pep: {
      en: { desc: "High-purity synthetic peptides for targeted signaling — BPC-157, TB-500, GHK-Cu and Ipamorelin. HPLC purity ≥ 98%, verified by mass spectrometry. Endotoxins < 0.25 EU/mg, pharmaceutical-grade sterile fill. Cold-chain shipped.", includes: ["HPLC purity certificate", "Mass-spectrometry verification", "Reconstitution and storage guide", "Usage protocol"], use: "Tissue repair, wound healing, skin rejuvenation, joint health." },
      es: { desc: "Péptidos sintéticos de alta pureza para señalización dirigida — BPC-157, TB-500, GHK-Cu e Ipamorelin. Pureza HPLC ≥ 98%, verificada por espectrometría de masas. Endotoxinas < 0.25 EU/mg, llenado estéril de grado farmacéutico. Envío en cadena de frío.", includes: ["Certificado de pureza HPLC", "Verificación por espectrometría de masas", "Guía de reconstitución y almacenamiento", "Protocolo de uso"], use: "Reparación tisular, cicatrización, rejuvenecimiento, salud articular." }
    },
    omega: {
      en: { desc: "High-purity EPA/DHA in re-esterified triglyceride (rTG) form for superior absorption. Molecular distillation removes heavy metals and contaminants. Third-party tested for purity and potency, same standard applied to every 1CELL biologic.", includes: ["Third-party purity and potency certificate", "Usage guide"], use: "Cardiovascular health, anti-inflammatory support, cognitive function." },
      es: { desc: "EPA/DHA de alta pureza en forma de triglicéridos re-esterificados (rTG) para una absorción superior. Destilación molecular que elimina metales pesados y contaminantes. Probado por terceros para pureza y potencia, el mismo estándar aplicado a cada biológico 1CELL.", includes: ["Certificado de pureza y potencia", "Guía de uso"], use: "Salud cardiovascular, soporte antiinflamatorio, función cognitiva." }
    },
    serum: {
      en: { desc: "1CELL Facial Serum — professional-use dermal regeneration combining exosome-derived signaling actives with GHK-Cu copper peptide. Signaling factors tell skin to renew while GHK-Cu supports firmness, tone and visible repair. Kept viable at 2–8 °C.", includes: ["Certificate of Analysis", "Usage and storage protocol"], use: "Anti-aging, skin firmness, tone correction, post-procedure recovery." },
      es: { desc: "Suero Facial 1CELL — regeneración dérmica de uso profesional que combina activos de señalización derivados de exosomas con péptido de cobre GHK-Cu. Los factores de señalización renuevan la piel mientras GHK-Cu aporta firmeza, tono y reparación visible. Viable a 2–8 °C.", includes: ["Certificado de Análisis", "Protocolo de uso y almacenamiento"], use: "Anti-envejecimiento, firmeza, corrección de tono, recuperación post-procedimiento." }
    }
  };
  function renderSearch(q) {
    if (!searchResults) return;
    q = (q || "").trim().toLowerCase();
    var list = q === "" ? products : products.filter(function (p) { return (p.name + " " + p.cat).toLowerCase().indexOf(q) > -1; });
    if (!list.length) { searchResults.innerHTML = '<div class="searchmodal__empty">' + (currentLang === "es" ? "Sin resultados" : "No results") + "</div>"; return; }
    searchResults.innerHTML = list.map(function (p) {
      return '<button class="sres" data-goto="' + p.id + '"><img src="' + p.img + '" alt=""/><span><span class="sres__n">' + p.name + '</span><br><span class="sres__c">' + p.cat + '</span></span><span class="sres__p">' + (p.pro ? (currentLang === "es" ? "Bajo pedido" : "By request") : money(+p.price)) + "</span></button>";
    }).join("");
  }
  function openSearch() { if (!searchModal) return; searchModal.classList.add("open"); searchModal.setAttribute("aria-hidden", "false"); document.body.classList.add("no-scroll"); renderSearch(""); setTimeout(function () { searchModalInput && searchModalInput.focus(); }, 60); }
  function closeSearch() { if (!searchModal) return; searchModal.classList.remove("open"); searchModal.setAttribute("aria-hidden", "true"); document.body.classList.remove("no-scroll"); }
  if ($("#searchOpen")) $("#searchOpen").addEventListener("click", openSearch);
  if ($("#searchClose")) $("#searchClose").addEventListener("click", closeSearch);
  if (searchModalInput) searchModalInput.addEventListener("input", function () { renderSearch(this.value); });
  if (searchModal) searchModal.addEventListener("click", function (e) {
    if (e.target === searchModal) return closeSearch();
    var b = e.target.closest("[data-goto]"); if (!b) return;
    closeSearch();
    var card = $('.card[data-id="' + b.getAttribute("data-goto") + '"]');
    if (card) {
      card.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
      card.style.outline = "2px solid var(--green)"; card.style.outlineOffset = "3px"; setTimeout(function () { card.style.outline = ""; }, 1400);
    } else {
      location.href = (location.pathname.indexOf("products.html") > -1 ? "" : "products.html") + "?goto=" + b.getAttribute("data-goto");
    }
  });

  /* =======================================================
     Toast
     ======================================================= */
  var toast = $("#toast"), toastT;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg; toast.hidden = false;
    requestAnimationFrame(function () { toast.classList.add("show"); });
    clearTimeout(toastT);
    toastT = setTimeout(function () { toast.classList.remove("show"); setTimeout(function () { toast.hidden = true; }, 400); }, 2600);
  }

  /* =======================================================
     Cart
     ======================================================= */
  var overlay = $("#overlay"), cart = $("#cart"), cartItems = $("#cartItems"), cartEmpty = $("#cartEmpty"),
      cartFoot = $("#cartFoot"), cartTotal = $("#cartTotal"), cartCount = $("#cartCount"), modal = $("#modal"),
      checkoutModal = $("#checkoutModal");
  var items = {};
  try { var rawCart = localStorage.getItem(LS_CART); if (rawCart) items = JSON.parse(rawCart); } catch (e) {}
  function saveCart() { try { localStorage.setItem(LS_CART, JSON.stringify(items)); } catch (e) {} }
  function totals() { var q = 0, s = 0; Object.keys(items).forEach(function (k) { q += items[k].qty; s += items[k].qty * items[k].price; }); return { q: q, s: s }; }
  function tr(k) { return currentLang === "es" && ES[k] != null ? ES[k] : (k === "cart.remove" ? "Remove" : "each"); }
  function renderCart() {
    saveCart();
    var t = totals(), keys = Object.keys(items);
    if (cartCount) { cartCount.textContent = t.q; cartCount.hidden = t.q === 0; }
    if (cartEmpty) cartEmpty.style.display = keys.length ? "none" : "flex";
    if (cartFoot) cartFoot.hidden = keys.length === 0;
    if (cartItems) cartItems.style.display = keys.length ? "flex" : "none";
    if (cartTotal) cartTotal.textContent = money(t.s);
    if (!cartItems) return;
    var eachW = currentLang === "es" ? "c/u" : "each", rmW = currentLang === "es" ? "Quitar" : "Remove";
    cartItems.innerHTML = keys.map(function (k) {
      var it = items[k];
      return '<div class="citem" data-k="' + it.id + '"><img class="citem__img" src="' + it.img + '" alt=""/>' +
        '<div class="citem__main"><div class="citem__name">' + it.name + '</div><div class="citem__price">' + money(it.price) + " " + eachW + '</div>' +
        '<div class="citem__ctrls"><button data-dec aria-label="-">−</button><span class="citem__qty">' + it.qty + '</span><button data-inc aria-label="+">+</button></div>' +
        '<button class="citem__rm" data-rm>' + rmW + '</button></div><div class="citem__line">' + money(it.price * it.qty) + "</div></div>";
    }).join("");
  }
  function showOverlay() { overlay.hidden = false; requestAnimationFrame(function () { overlay.classList.add("show"); }); }
  function anyPanelOpen() { return cart.classList.contains("open") || (modal && modal.classList.contains("open")) || (checkoutModal && checkoutModal.classList.contains("open")); }
  function maybeHideOverlay() { if (!anyPanelOpen()) { overlay.classList.remove("show"); setTimeout(function () { overlay.hidden = true; }, 300); } }
  function closeModalPanel() { if (modal) { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); } }
  function openCart() { if (!cart) return; closeModalPanel(); showOverlay(); cart.classList.add("open"); cart.setAttribute("aria-hidden", "false"); document.body.classList.add("no-scroll"); }
  function closeCart() { if (!cart) return; cart.classList.remove("open"); cart.setAttribute("aria-hidden", "true"); if (!anyPanelOpen()) document.body.classList.remove("no-scroll"); maybeHideOverlay(); }
  function addItem(p) {
    if (items[p.id]) items[p.id].qty++; else items[p.id] = { id: p.id, name: p.name, price: +p.price, img: p.img, qty: 1 };
    renderCart(); showToast(p.name + (currentLang === "es" ? " añadido — 2–8 °C hasta tu puerta" : " added — kept 2–8 °C to your door"));
  }
  if ($("#cartOpen")) $("#cartOpen").addEventListener("click", openCart);
  if ($("#cartClose")) $("#cartClose").addEventListener("click", closeCart);
  if ($("#cartKeep")) $("#cartKeep").addEventListener("click", function () { closeCart(); location.hash = "#products"; });
  if (cartItems) cartItems.addEventListener("click", function (e) {
    var row = e.target.closest(".citem"); if (!row) return;
    var id = row.getAttribute("data-k"), it = items[id]; if (!it) return;
    if (e.target.closest("[data-inc]")) it.qty++;
    else if (e.target.closest("[data-dec]")) { it.qty--; if (it.qty <= 0) delete items[id]; }
    else if (e.target.closest("[data-rm]")) delete items[id];
    renderCart();
  });
  $$("[data-add]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault(); e.stopPropagation();
      var c = btn.closest("[data-id]") || btn;
      addItem({ id: c.getAttribute("data-id"), name: c.getAttribute("data-name"), price: c.getAttribute("data-price"), img: c.getAttribute("data-img") });
      openCart();
    });
  });

  /* =======================================================
     Quick-view
     ======================================================= */
  var mv = { img: $("#mvImg"), cat: $("#mvCat"), name: $("#mvName"), spec: $("#mvSpec"), price: $("#mvPrice"), action: $("#mvAction"), note: $("#mvNote"), detail: $("#mvDetail") };
  var cur = null;
  function openModal(c) {
    if (!modal) return;
    cur = { id: c.getAttribute("data-id"), name: c.getAttribute("data-name"), price: c.getAttribute("data-price"), img: c.getAttribute("data-img"), cat: c.getAttribute("data-cat-label"), spec: c.getAttribute("data-spec"), pro: c.getAttribute("data-cat") === "pro" };
    mv.img.src = cur.img; mv.img.alt = cur.name; mv.cat.textContent = cur.cat; mv.name.textContent = cur.name; mv.spec.textContent = cur.spec;
    var es = currentLang === "es";
    if (cur.pro) { mv.price.textContent = es ? "Bajo pedido" : "By request"; mv.action.textContent = es ? "Solicitar acceso" : "Request access"; mv.note.textContent = es ? "Solo profesionales con licencia · precio institucional." : "License-verified professionals only · institutional pricing."; }
    else { mv.price.textContent = money(+cur.price); mv.action.textContent = es ? "Añadir al carrito" : "Add to cart"; mv.note.textContent = es ? "Envío en cadena de frío · protocolo incluido." : "Ships in cold chain · protocol included."; }
    if (mv.detail) {
      var info = prodInfo[cur.id];
      if (info) {
        var d = info[currentLang] || info.en;
        var incL = es ? "Qué incluye" : "What ships with it", useL = es ? "Aplicaciones" : "Applications";
        mv.detail.innerHTML = '<p class="modal__desc">' + d.desc + '</p>' +
          '<div class="modal__includes"><span>' + incL + '</span><ul>' + d.includes.map(function (i) { return "<li>" + i + "</li>"; }).join("") + '</ul></div>' +
          '<p class="modal__use"><span>' + useL + '</span> ' + d.use + '</p>';
      } else mv.detail.innerHTML = "";
    }
    cart.classList.remove("open"); cart.setAttribute("aria-hidden", "true");
    showOverlay(); requestAnimationFrame(function () { modal.classList.add("open"); });
    modal.setAttribute("aria-hidden", "false"); document.body.classList.add("no-scroll");
  }
  function closeModal() { closeModalPanel(); if (!anyPanelOpen()) document.body.classList.remove("no-scroll"); maybeHideOverlay(); }
  $$("[data-quick]").forEach(function (b) { b.addEventListener("click", function () { openModal(b.closest("[data-id]")); }); });
  if ($("#modalClose")) $("#modalClose").addEventListener("click", closeModal);
  if (mv.action) mv.action.addEventListener("click", function () { if (!cur) return; if (cur.pro) { closeModal(); location.hash = "#professional"; } else { addItem(cur); closeModal(); openCart(); } });

  /* =======================================================
     Checkout flow
     ======================================================= */
  function coStep(n) {
    $$("#checkoutModal .co__pane").forEach(function (p) { p.classList.toggle("is-active", p.getAttribute("data-pane") === String(n)); });
    $$("#coSteps span").forEach(function (s, i) { s.classList.toggle("is-active", i === n - 1); s.classList.toggle("done", i < n - 1); });
  }
  function openCheckout() {
    if (!checkoutModal || !totals().q) return;
    cart.classList.remove("open"); cart.setAttribute("aria-hidden", "true");
    showOverlay(); requestAnimationFrame(function () { checkoutModal.classList.add("open"); });
    checkoutModal.setAttribute("aria-hidden", "false"); document.body.classList.add("no-scroll"); coStep(1);
  }
  function closeCheckout() { if (!checkoutModal) return; checkoutModal.classList.remove("open"); checkoutModal.setAttribute("aria-hidden", "true"); if (!anyPanelOpen()) document.body.classList.remove("no-scroll"); maybeHideOverlay(); }
  if ($("#checkout")) $("#checkout").addEventListener("click", openCheckout);
  if ($("#coClose")) $("#coClose").addEventListener("click", closeCheckout);
  if ($("#coBack")) $("#coBack").addEventListener("click", function () { coStep(1); });
  var coStep1 = $("#coStep1");
  if (coStep1) coStep1.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = true;
    ["coName", "coEmail", "coAddr", "coCity", "coCountry"].forEach(function (id) {
      var inp = $("#" + id), valid = inp.value.trim() !== "" && (id !== "coEmail" || /.+@.+\..+/.test(inp.value));
      inp.classList.toggle("err", !valid); if (!valid) ok = false;
    });
    if (!ok) return;
    // build review
    var t = totals();
    $("#coSummary").innerHTML = Object.keys(items).map(function (k) {
      var it = items[k];
      return '<div class="co__line"><img src="' + it.img + '" alt=""/><span class="n">' + it.name + '</span><span class="q">×' + it.qty + '</span><span class="p">' + money(it.price * it.qty) + "</span></div>";
    }).join("");
    $("#coTotal").textContent = money(t.s);
    coStep(2);
  });
  if ($("#coPlace")) $("#coPlace").addEventListener("click", function () {
    items = {}; renderCart(); coStep(3);
  });
  if ($("#coFinish")) $("#coFinish").addEventListener("click", closeCheckout);

  /* =======================================================
     Overlay + escape
     ======================================================= */
  if (overlay) overlay.addEventListener("click", function () { closeModal(); closeCart(); closeCheckout(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeModal(); closeCart(); closeCheckout(); closeSearch(); closePage(); } });

  /* =======================================================
     Accordion + forms
     ======================================================= */
  var accs = $$(".acc");
  accs.forEach(function (d) { d.addEventListener("toggle", function () { if (d.open) accs.forEach(function (o) { if (o !== d) o.open = false; }); }); });

  var proForm = $("#proForm"), proMsg = $("#proMsg"), proEmail = $("#proEmail");
  if (proForm) proForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!/.+@.+\..+/.test(proEmail.value)) { proEmail.classList.add("err"); return; }
    proEmail.classList.remove("err"); proForm.reset();
    proMsg.textContent = currentLang === "es" ? "✓ Solicitud recibida — verificaremos tu licencia en 24 h." : "✓ Request received — we'll verify your license within 24 h.";
    proMsg.classList.add("ok");
  });
  var newsForm = $("#newsForm"), newsMsg = $("#newsMsg"), newsEmail = $("#newsEmail");
  if (newsForm) newsForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!/.+@.+\..+/.test(newsEmail.value)) { newsEmail.classList.add("err"); return; }
    newsEmail.classList.remove("err"); newsForm.reset();
    newsMsg.textContent = currentLang === "es" ? "✓ Suscrito. Bienvenido." : "✓ Subscribed. Welcome.";
  });

  /* =======================================================
     Live temperature
     ======================================================= */
  var tempEl = $("#liveTemp");
  if (tempEl && !reduce) setInterval(function () { tempEl.textContent = (3.7 + Math.random() * 1.2).toFixed(1); }, 2600);

  /* =======================================================
     Process sticky narrative
     ======================================================= */
  var steps = $$(".step[data-step]"), arts = $$(".process__art img"), cap = $("#processCap");
  var procLabels = { en: { "1": "01 — Culture", "2": "02 — Characterize", "3": "03 — Ship at 2–8 °C", "4": "04 — Apply" }, es: { "1": "01 — Cultivo", "2": "02 — Caracterización", "3": "03 — Envío a 2–8 °C", "4": "04 — Aplicación" } };
  if (steps.length && "IntersectionObserver" in window) {
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) {
          var n = en.target.getAttribute("data-step");
          steps.forEach(function (s) { s.classList.toggle("is-active", s === en.target); });
          arts.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("data-step") === n); });
          if (cap) cap.textContent = (procLabels[currentLang] || procLabels.en)[n];
        }
      });
    }, { threshold: 0.6, rootMargin: "-18% 0px -32% 0px" });
    steps.forEach(function (s) { so.observe(s); });
  }

  /* =======================================================
     Scroll-scrub product moment
     ======================================================= */
  var scrub = $("#scrub"), scrubVial = $("#scrubVial"), scrubCaps = $$(".scrub__cap"), scrubBuy = $("#scrubBuy");
  function scrubUpdate() {
    if (!scrub || !scrubVial || reduce || window.innerWidth < 861) return;
    var r = scrub.getBoundingClientRect(), vh = window.innerHeight;
    var total = r.height - vh;
    var prog = Math.min(1, Math.max(0, -r.top / total));
    var scale = 1 + prog * 0.9;
    var rot = prog * 12;
    scrubVial.style.transform = "translateY(" + (-prog * 30) + "px) scale(" + scale.toFixed(3) + ") rotate(" + rot.toFixed(2) + "deg)";
    scrubCaps.forEach(function (c, i) { c.classList.toggle("on", prog > 0.18 + i * 0.22); });
    if (scrubBuy) scrubBuy.classList.toggle("on", prog > 0.82);
  }

  /* =======================================================
     Smooth anchors
     ======================================================= */
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]'); if (!a) return;
    var id = a.getAttribute("href"); if (id.length < 2) return;
    var t = $(id); if (!t) return;
    e.preventDefault();
    window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 72, behavior: reduce ? "auto" : "smooth" });
  });

  /* =======================================================
     Desktop kinetic: cursor, magnetic, parallax
     ======================================================= */
  if (fine && !reduce) {
    var cursor = $("#cursor");
    if (cursor) {
      var cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy;
      window.addEventListener("mousemove", function (e) { tx = e.clientX; ty = e.clientY; cursor.classList.add("on"); });
      (function loop() { cx += (tx - cx) * 0.22; cy += (ty - cy) * 0.22; cursor.style.transform = "translate(" + cx + "px," + cy + "px)"; requestAnimationFrame(loop); })();
      document.addEventListener("mouseover", function (e) { if (e.target.closest("[data-cursor],a,button")) cursor.classList.add("hot"); });
      document.addEventListener("mouseout", function (e) { if (e.target.closest("[data-cursor],a,button")) cursor.classList.remove("hot"); });
    }
    $$(".magnetic").forEach(function (el) {
      el.addEventListener("mousemove", function (e) { var r = el.getBoundingClientRect(); el.style.transform = "translate(" + (e.clientX - r.left - r.width / 2) * 0.25 + "px," + (e.clientY - r.top - r.height / 2) * 0.35 + "px)"; });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
    var pxEls = $$("[data-parallax]"), hero = $(".hero");
    if (pxEls.length && hero) {
      hero.addEventListener("mousemove", function (e) {
        var cxp = (e.clientX / innerWidth - 0.5), cyp = (e.clientY / innerHeight - 0.5);
        pxEls.forEach(function (el) { var amt = parseFloat(el.getAttribute("data-parallax")) || 20; el.style.transform = "translate(" + (cxp * amt) + "px," + (cyp * amt) + "px)"; });
      });
      hero.addEventListener("mouseleave", function () { pxEls.forEach(function (el) { el.style.transform = ""; }); });
    }
  }

  /* =======================================================
     Hero gradient mesh
     ======================================================= */
  var mesh = $("#mesh");
  if (mesh && !reduce) {
    var ctx = mesh.getContext("2d"), W, H, dpr = Math.min(devicePixelRatio || 1, 1.5), raf;
    var blobs = [
      { c: "#1FB894", r: .55, ox: .2, oy: .3, sx: .00012, sy: .00017, a: .5 },
      { c: "#0B5A54", r: .6, ox: .75, oy: .35, sx: .00015, sy: .00011, a: .45 },
      { c: "#7fe4d6", r: .5, ox: .6, oy: .7, sx: .0001, sy: .00014, a: .4 },
      { c: "#0F766E", r: .45, ox: .35, oy: .75, sx: .00013, sy: .0001, a: .38 }
    ];
    function size() { var b = mesh.getBoundingClientRect(); W = b.width; H = b.height; mesh.width = W * dpr; mesh.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    function hex(h, a) { var n = parseInt(h.slice(1), 16); return "rgba(" + (n >> 16 & 255) + "," + (n >> 8 & 255) + "," + (n & 255) + "," + a + ")"; }
    function draw(now) {
      ctx.clearRect(0, 0, W, H);
      blobs.forEach(function (bl) {
        var x = (bl.ox + Math.sin(now * bl.sx) * .12) * W, y = (bl.oy + Math.cos(now * bl.sy) * .12) * H, rad = bl.r * Math.max(W, H);
        var g = ctx.createRadialGradient(x, y, 0, x, y, rad);
        g.addColorStop(0, hex(bl.c, bl.a)); g.addColorStop(1, hex(bl.c, 0));
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      });
      raf = requestAnimationFrame(draw);
    }
    size(); draw(0);
    var rt; window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(size, 200); }, { passive: true });
    document.addEventListener("visibilitychange", function () { if (document.hidden) cancelAnimationFrame(raf); else draw(0); });
  }

  /* =======================================================
     Info pages modal
     ======================================================= */
  var pageData = {
    about: {
      en: { title: "About 1CELL Health", body: '<h3>Our mission</h3><p>1CELL Health exists to make clinical-grade regenerative therapies accessible, transparent and verifiable — so every professional and patient can trust what they receive.</p><h3>The standard</h3><p>Every product ships with a third-party Certificate of Analysis, flow-cytometry characterization and a clinical protocol. Nothing leaves our facility without documentation.</p><h3>Manufacturing</h3><p>cGMP-compliant facilities with full audit trails, environmental monitoring and qualified operators. Our manufacturing follows the same rigor expected of pharmaceutical biologics.</p><h3>Cold chain</h3><p>Validated 2–8 °C logistics from culture to clinic. Every shipment carries a digital temperature logger monitored around the clock. Out-of-range lots are automatically rejected.</p><h3>Medical guidance</h3><p>A dedicated clinical team guides product selection, application protocols and patient follow-up. We don’t just sell biologics — we support the clinician through the entire process.</p><h3>Contact</h3><p><strong>Email:</strong> info@1cellhealth.com<br><strong>Web:</strong> 1cellhealth.com</p>' },
      es: { title: "Acerca de 1CELL Health", body: '<h3>Nuestra misión</h3><p>1CELL Health existe para hacer las terapias regenerativas de grado clínico accesibles, transparentes y verificables — para que cada profesional y paciente pueda confiar en lo que recibe.</p><h3>El estándar</h3><p>Cada producto se envía con un Certificado de Análisis de terceros, caracterización por citometría de flujo y un protocolo clínico. Nada sale de nuestra instalación sin documentación.</p><h3>Fabricación</h3><p>Instalaciones cGMP con trazas de auditoría completas, monitoreo ambiental y operadores cualificados.</p><h3>Cadena de frío</h3><p>Logística validada a 2–8 °C de cultivo a clínica. Cada envío lleva un registrador digital de temperatura monitoreado 24/7. Los lotes fuera de rango se rechazan automáticamente.</p><h3>Guía médica</h3><p>Un equipo clínico dedicado guía la selección de productos, protocolos de aplicación y seguimiento del paciente.</p><h3>Contacto</h3><p><strong>Email:</strong> info@1cellhealth.com<br><strong>Web:</strong> 1cellhealth.com</p>' }
    },
    privacy: {
      en: { title: "Privacy Policy", body: '<p><strong>Effective:</strong> August 2026</p><h3>Data we collect</h3><p>Name, email and shipping address (when you place an order), professional license information (for clinician accounts), and basic browsing data (cookies, IP address, device type).</p><h3>How we use it</h3><ul><li>Process and fulfill your orders</li><li>Verify professional licenses for pro access</li><li>Send order updates and shipping notifications</li><li>Improve our products and service</li></ul><h3>What we don’t do</h3><p>We do not sell, rent or trade your personal data to third parties. We do not use your data for purposes unrelated to your 1CELL Health experience.</p><h3>Cookies</h3><p>We use essential cookies for site functionality. Analytics cookies require your consent and can be disabled at any time.</p><h3>Your rights</h3><p>You may access, correct, delete or export your data by contacting us at <strong>privacy@1cellhealth.com</strong>.</p><h3>Security</h3><p>All data is transmitted over TLS encryption and stored in access-controlled systems.</p>' },
      es: { title: "Política de Privacidad", body: '<p><strong>Vigente:</strong> Agosto 2026</p><h3>Datos que recopilamos</h3><p>Nombre, email y dirección de envío (al realizar un pedido), información de licencia profesional (para cuentas clínicas) y datos básicos de navegación (cookies, IP, tipo de dispositivo).</p><h3>Cómo los usamos</h3><ul><li>Procesar y completar tus pedidos</li><li>Verificar licencias profesionales para acceso pro</li><li>Enviar actualizaciones y notificaciones de envío</li><li>Mejorar nuestros productos y servicio</li></ul><h3>Lo que no hacemos</h3><p>No vendemos, alquilamos ni intercambiamos tus datos personales con terceros.</p><h3>Cookies</h3><p>Usamos cookies esenciales para la funcionalidad del sitio. Las cookies analíticas requieren tu consentimiento.</p><h3>Tus derechos</h3><p>Puedes acceder, corregir, eliminar o exportar tus datos contactándonos en <strong>privacy@1cellhealth.com</strong>.</p><h3>Seguridad</h3><p>Todos los datos se transmiten con cifrado TLS y se almacenan en sistemas con control de acceso.</p>' }
    },
    terms: {
      en: { title: "Terms of Service", body: '<p><strong>Effective:</strong> August 2026</p><h3>Products</h3><p>1CELL Health provides regenerative biologics, peptides, nutraceuticals and cosmetics. Cellular therapies and exosomes require professional license verification before purchase.</p><h3>Medical disclaimer</h3><p>Our products are not intended to diagnose, treat, cure or prevent any disease unless used under the supervision of a licensed healthcare professional. Always consult a qualified clinician before use.</p><h3>Pricing &amp; payment</h3><p>Prices are listed in USD. Professional/institutional pricing is available after license verification. Prices may change without notice.</p><h3>Shipping</h3><p>All products ship in validated 2–8 °C cold chain. Free cold-chain shipping on orders over $150. Delivery times vary by destination.</p><h3>Returns</h3><p>Due to the biological nature of our products and strict cold-chain requirements, returns are not accepted once shipped. Damaged or out-of-temperature shipments are replaced at no cost.</p><h3>Liability</h3><p>1CELL Health provides Certificates of Analysis and clinical protocols but is not liable for outcomes of clinical application. Professional users are responsible for appropriate use within their scope of practice.</p>' },
      es: { title: "Términos de Servicio", body: '<p><strong>Vigente:</strong> Agosto 2026</p><h3>Productos</h3><p>1CELL Health ofrece biológicos regenerativos, péptidos, nutracéuticos y cosméticos. Las terapias celulares y exosomas requieren verificación de licencia profesional.</p><h3>Aviso médico</h3><p>Nuestros productos no están destinados a diagnosticar, tratar, curar o prevenir ninguna enfermedad a menos que se utilicen bajo supervisión de un profesional de salud con licencia.</p><h3>Precios y pago</h3><p>Precios en USD. Precios institucionales disponibles tras verificación de licencia. Los precios pueden cambiar sin previo aviso.</p><h3>Envío</h3><p>Todos los productos se envían en cadena de frío validada a 2–8 °C. Envío gratis en pedidos superiores a $150.</p><h3>Devoluciones</h3><p>Debido a la naturaleza biológica de nuestros productos, no se aceptan devoluciones una vez enviados. Los envíos dañados o fuera de temperatura se reemplazan sin costo.</p><h3>Responsabilidad</h3><p>1CELL Health proporciona Certificados de Análisis y protocolos clínicos pero no es responsable de los resultados de la aplicación clínica.</p>' }
    },
    compliance: {
      en: { title: "Quality & Compliance", body: '<h3>cGMP manufacturing</h3><p>All cellular products are manufactured in cGMP-compliant facilities with documented standard operating procedures, environmental monitoring and operator qualification records.</p><h3>Quality control</h3><p>Every lot undergoes third-party testing:</p><ul><li>Flow-cytometry characterization (identity and purity markers)</li><li>Viability assay (≥ 92% threshold for cellular products)</li><li>Sterility and endotoxin screening</li></ul><h3>Certificate of Analysis</h3><p>An independent COA accompanies every shipment, documenting identity, purity, potency and safety for each lot number.</p><h3>Cold-chain validation</h3><p>Products maintained at 2–8 °C from manufacturing through delivery. Each shipment includes a digital temperature logger monitored 24/7. Out-of-range lots are automatically rejected.</p><h3>Traceability</h3><p>Full chain of custody from tissue sourcing through manufacturing, quality release, shipping and delivery. Every lot is archived with its COA, temperature log and distribution record.</p><h3>Reporting</h3><p>Quality events and product complaints can be reported to <strong>quality@1cellhealth.com</strong>.</p>' },
      es: { title: "Calidad y Cumplimiento", body: '<h3>Fabricación cGMP</h3><p>Todos los productos celulares se fabrican en instalaciones cGMP con procedimientos operativos documentados, monitoreo ambiental y registros de cualificación de operadores.</p><h3>Control de calidad</h3><p>Cada lote se somete a pruebas de terceros:</p><ul><li>Caracterización por citometría de flujo (marcadores de identidad y pureza)</li><li>Ensayo de viabilidad (umbral ≥ 92% para productos celulares)</li><li>Cribado de esterilidad y endotoxinas</li></ul><h3>Certificado de Análisis</h3><p>Un COA independiente acompaña cada envío, documentando identidad, pureza, potencia y seguridad por número de lote.</p><h3>Validación de cadena de frío</h3><p>Productos mantenidos a 2–8 °C desde la fabricación hasta la entrega. Cada envío incluye un registrador digital monitoreado 24/7. Los lotes fuera de rango se rechazan automáticamente.</p><h3>Trazabilidad</h3><p>Cadena de custodia completa desde la obtención del tejido hasta la entrega. Cada lote se archiva con su COA, registro de temperatura y distribución.</p><h3>Reportes</h3><p>Eventos de calidad pueden reportarse a <strong>quality@1cellhealth.com</strong>.</p>' }
    }
  };

  var pageModal = $("#pageModal"), pageTitle = $("#pageTitle"), pageBody = $("#pageBody");
  function openPage(key) {
    if (!pageModal || !pageData[key]) return;
    var p = pageData[key][currentLang] || pageData[key].en;
    pageTitle.textContent = p.title;
    pageBody.innerHTML = p.body;
    pageModal.classList.add("open");
    pageModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  }
  function closePage() {
    if (!pageModal) return;
    pageModal.classList.remove("open");
    pageModal.setAttribute("aria-hidden", "true");
    if (!anyPanelOpen()) document.body.classList.remove("no-scroll");
  }
  if ($("#pageClose")) $("#pageClose").addEventListener("click", closePage);
  if (pageModal) pageModal.addEventListener("click", function (e) { if (e.target === pageModal) closePage(); });

  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-page]");
    if (a) { e.preventDefault(); openPage(a.getAttribute("data-page")); }
  });

  $$(".footer__socials a").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      showToast(currentLang === "es" ? "Síguenos — perfiles lanzándose pronto" : "Follow @1cellhealth — profiles launching soon");
    });
  });

  /* =======================================================
     Active nav + cross-page deep links
     ======================================================= */
  (function navActive() {
    var path = (location.pathname.split("/").pop() || "index.html");
    $$(".nav a[href], .drawer a[href]:not(.btn)").forEach(function (a) {
      var href = a.getAttribute("href").split("#")[0].split("/").pop() || "index.html";
      if (href === path) a.classList.add("is-active");
    });
  })();
  (function urlParams() {
    var qs = new URLSearchParams(location.search);
    var f = qs.get("filter");
    if (f) {
      var fb = $('.filter[data-filter="' + f + '"]');
      if (fb) { $$(".filter").forEach(function (b) { b.classList.remove("is-active"); }); fb.classList.add("is-active"); activeFilter = f; applyCatalog(); }
    }
    var g = qs.get("goto");
    if (g) {
      var card = $('.card[data-id="' + g + '"]');
      if (card) setTimeout(function () { card.scrollIntoView({ behavior: "smooth", block: "center" }); card.style.outline = "2px solid var(--green)"; card.style.outlineOffset = "3px"; setTimeout(function () { card.style.outline = ""; }, 1600); }, 300);
    }
  })();

  /* init */
  applyLang(currentLang);
  renderCart();
  onScroll();
  scrubUpdate();
})();
