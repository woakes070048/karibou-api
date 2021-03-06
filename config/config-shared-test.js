

module.exports = {
  i18n:{
    locales:['en','fr'],
    defaultLocale:'fr'
  },

  generalFees:0.15,
  system:{
    password:{len:5},
    post:{limitMS:10}
  },

  document:{
    types:['recipe','post','bundle','page']
  },

  category:{
    types:['Category', 'Catalog']
  },


  shipping:{
    average:115, // average 
    discountA:145,  // half price 5.4@18% & 4.5@15%
    discountB:180,    // 180 full price 11.7@18% & 9.75@15%
    price:{
      hypercenter:10,
      periphery:17.90
    }, // shipping price
    priceA:5.0,
    priceB:0,
    periphery:["1219"]
  },


  marketplace:{
    list:[
      {name:"Marché de Plainpalais le mardi",lat:46.19838,lng:6.14083, d:2},
      {name:"Marché de Plainpalais le vendredi",lat:46.19838,lng:6.14083, d:5},
      {name:"Marché de Plainpalais le dimanche",lat:46.19838,lng:6.14083, d:0},
      {name:"Marché de Rive le jeudi" ,lat:46.20195,lng:6.15491, d:4},
      {name:"Marché de Rive le samedi" ,lat:46.20195,lng:6.15491, d:6}
    ]
  },
  user:{
    location:{
      list:["1201","1202","1203","1204","1205","1206","1207","1208"]
    },
    region:{
      list:["Genève", "Carouge,GE"]
    }
  },
  region:{
    list:["Aire-la-Ville,GE","Anières,GE","Avully,GE","Avusy,GE","Bardonnex,GE","Bellevue,GE",
          "Bernex,GE","Carouge,GE","Cartigny,GE","Céligny,GE","Chancy,GE","Chêne-Bougeries,GE",
          "Chêne-Bourg,GE","Choulex,GE","Collex-Bossy,GE","Collonge-Bellerive,GE",
          "Cologny,GE","Confignon,GE","Corsier,GE","Dardagny,GE","Genève",
          "Genthod,GE","Grand-Saconnex,GE","Gy,GE","Hermance,GE","Jussy,GE","Laconnex,GE",
          "Lancy,GE","Meinier,GE","Meyrin,GE","Onex,GE","Perly-Certoux,GE",
          "Plan-les-Ouates,GE","Pregny-Chambésy,GE","Presinge,GE","Puplinge,GE",
          "Russin,GE","Satigny,GE","Soral,GE","Thônex,GE","Troinex,GE","Vandoeuvres,GE",
          "Vernier,GE","Versoix,GE","Veyrier,GE", 
          "Reignier, France"
    ]
  },
  product:{
    location:["Appenzell Rhodes-Extérieures",
              "Appenzell Rhodes-Intérieures",
              "Argovie",
              "Bâle-Campagne",
              "Bâle-Ville",
              "Berne",
              "Fribourg",
              "Genève",
              "Glaris",
              "Grisons",
              "Jura",
              "Lucerne",
              "Neuchâtel",
              "Nidwald",
              "Obwald",
              "Saint-Gall",
              "Schaffhouse",
              "Schwyz",
              "Soleure",
              "Tessin",
              "Thurgovie",
              "Uri",
              "Valais",
              "Vaud",
              "Zoug",
              "Zurich"]
  },

  issue:{
    code:[
    "issue_missing_client_id",
    "issue_missing_product",
    "issue_missing_validation",
    "issue_wrong_packing",
    "issue_wrong_client_id",
    "issue_wrong_product_quality",
    "issue_late_delivry"
    ]
  },
  
  order:{      
    financialstatus:["pending",
                     "authorized",
                     "partially_paid",
                     "invoice",
                     "paid",
                     "partially_refunded",
                     "refunded",
                     "voided"
    ],
    cancelreason:["customer", "fraud", "inventory","system","timeout","other"],
    status:["failure","created","reserved","partial","fulfilled"],
    gateway:[ 
      {label:"postfinance card",fees:0.02}, 
      {label:"american express",fees:0.029}, 
      {label:"visa",fees:0.029}, 
      {label:"mastercard",fees:0.029}, 
      {label:"paypal",fees:0.034}, 
      {label:"invoice",fees:0.0}, 
      {label:"tester",fees:0.02}, 
      {label:"bitcoin",fees:0.0}
    ],

    /*open invoice limit to authorize invoice payment */
    openInvoice:0,

    /* for testing 50 hours is the time limit between order and delivery*/
    /* timelimit = monday 18:00 + timelimit = dayDest 9:00*/
    timelimit:39,

    /* order date range between day1 to day2 max 9:00. Lapse time = timelimit */
    timelimitH:2,

    /* currently only grouped is available */
    shippingmode:["grouped", "none"],

    /* order is in timeout if payment status != 'paid' and created<1s (timeoutAndNotPaid)*/
    timeoutAndNotPaid:0.2,
    uncapturedTimeLimit:7,

    //
    // Dimanche*, Lundi, Mardi, Mercredi, Jeudi, Vendredi, Samedi(
    weekdays:[1,2,3,4,5,6],      
    shippingtimes:{11:"11:00 à 13:00", 16:"16:00 à 18:00"},    
    
  }
};
