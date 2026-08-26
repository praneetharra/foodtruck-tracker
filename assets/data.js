/* =========================================================================
   SEED DATA — Food Truck Launch Tracker, Salt Lake County UT
   Researched Aug 2026 from Salt Lake County Health Dept, Salt Lake City,
   and Utah state sources. Fees marked "est." are third-party ballparks,
   NOT official quotes. Always confirm with the agency.
   Edit freely: add phases/steps here and they appear for everyone who
   loads the site. Your personal notes/status live separately in the browser.
   ========================================================================= */

const SEED_VERSION = "2026.08.26";

/* Shared agency contacts, referenced by key from steps */
const AGENCIES = {
  slcohd: {
    name: "Food Protection Bureau",
    org: "Salt Lake County Health Dept — Environmental Health",
    phone: "385-468-3845",
    address: "788 E Woodoak Ln, Murray, UT 84107",
    url: "https://www.saltlakecounty.gov/health/food-protection/permits/mobile/"
  },
  slcohdMain: {
    name: "Health Dept main line",
    org: "Salt Lake County Health Department",
    phone: "385-468-4100",
    url: "https://www.saltlakecounty.gov/health/food-protection/"
  },
  slcLicensing: {
    name: "Business Licensing",
    org: "Salt Lake City Corporation",
    phone: "801-535-7224",
    address: "Room 225, City & County Building, 451 S State St",
    url: "https://www.slc.gov/Finance/business-licensing/license-information/mobile-food-business/"
  },
  slcEcon: {
    name: "Economic Development",
    org: "Salt Lake City",
    phone: "801-535-7200",
    email: "ed@slcgov.com",
    address: "451 S State St, Room 118",
    url: "https://www.slc.gov/ed/salt-lake-city-food-truck-guide/"
  },
  slcFire: {
    name: "Fire Inspection line",
    org: "Salt Lake City Fire Department",
    phone: "801-799-4164",
    url: "https://www.slc.gov/fire/"
  },
  truckInspectors: {
    name: "Marci Jacobson / Jorge Morales",
    org: "SLC truck inspectors",
    phone: "801-535-6432 / 801-535-7220",
    url: "https://www.slcdocs.com/ed/SLCFoodTruckGuide.pdf"
  },
  commerce: {
    name: "Division of Corporations",
    org: "Utah Dept of Commerce",
    phone: "801-530-6701",
    email: "commerce@utah.gov",
    url: "https://corporations.utah.gov/"
  },
  taxcomm: {
    name: "Taxpayer Services",
    org: "Utah State Tax Commission",
    phone: "801-297-2200 / 800-662-4335",
    address: "210 N 1950 W, Salt Lake City, UT 84134",
    url: "https://tax.utah.gov/"
  },
  msd: {
    name: "Business Licensing",
    org: "Municipal Services District (unincorporated SL County + member cities)",
    phone: "385-910-5600",
    url: "https://msd.utah.gov/"
  },
  sbdc: {
    name: "Utah SBDC (free business advising)",
    org: "Utah Small Business Development Center",
    url: "https://utahsbdc.org/",
    note: "Find your nearest center and its phone number on the site."
  },
  dmv: {
    name: "Utah DMV",
    org: "Utah State Tax Commission — Division of Motor Vehicles",
    url: "https://dmv.utah.gov/",
    note: "Current phone numbers are listed on the DMV contact page."
  },
  slcFog: {
    name: "FOG Program (fats, oils & grease)",
    org: "Salt Lake City Public Utilities — Wastewater Pretreatment",
    phone: "801-799-4087",
    url: "https://www.slc.gov/utilities/pretreatment-fats-oils-grease-fog/",
    note: "Ask them about grease interceptor requirements before you commit to any sewer connection."
  },
  slcDevServices: {
    name: "Development Services",
    org: "Salt Lake City",
    url: "https://www.slc.gov/buildingservices/",
    note: "Handles building and plumbing permits, and grease interceptor sizing questions."
  }
};

/* ---------------------------------------------------------------------------
   LICENSING PATH COMPARISON — the trailer / sewage decision
   --------------------------------------------------------------------------- */
const PATHS = [
  {
    id: "A",
    name: "Mobile permit, self-contained tanks",
    tagline: "The standard food truck path. You carry your water in and your wastewater out.",
    verdict: "Cheapest and most flexible. The water ceiling is the catch.",
    sewage: "Onboard wastewater holding tank, dumped at an approved location. Nothing connects to a sewer.",
    numbers: [
      ["Fresh water tank", "Min. 30 gal for a food truck (measured down from the inlet) per Utah R392-102-7. SLCoHD's own guidelines allow 10 gal if you only have a hand sink, 30 gal with a three-compartment sink."],
      ["Wastewater tank", "Must be 15% larger than the fresh tank — so 34.5 gal minimum against a 30 gal supply."],
      ["Where it goes", "An approved commissary, a waste servicing area approved by the local health officer, or a wastewater transport vehicle."],
      ["Illegal dumping", "SLCoHD lists fines of $1,000–$2,000 per violation for dumping in storm drains."]
    ],
    also: ["Signed commissary agreement (a residential kitchen is never allowed)",
           "Restroom agreement with a business within 500 ft of the vending location, open during all your operating hours",
           "Daily return to the commissary for cleaning, water and waste"],
    pros: ["Lowest upfront cost by a wide margin",
           "Statewide reciprocity under Utah Code 11-56-103 — other Utah cities must honor your license",
           "Festivals, catering and multiple cities all stay open to you",
           "No building permit, no landlord construction negotiation"],
    cons: ["~30 gallons of water is your entire allowance for a service — handwashing, warewashing and prep combined",
           "A daily commissary round trip, every operating day",
           "In Salt Lake City a trailer cannot operate in the public right-of-way at all, so you're on private property regardless",
           "Grease-heavy menus fill a wastewater tank fast"]
  },
  {
    id: "B",
    name: "Mobile permit, connected to water & sewer",
    tagline: "Still a mobile food business — but plumbed in at your site. This option is written into the state rule and most people don't know it exists.",
    verdict: "Probably your best fit, if the health officer signs off and your site has a sewer lateral.",
    sewage: "Straight into the public sanitary sewer. No tank, no ceiling, no dump run.",
    numbers: [
      ["The rule", "Utah R392-102-7 lets a mobile food business skip the onboard potable water tank and connect to an adjacent pressurized water source — but ONLY when the unit is \"concurrently connected to a public sanitary sewer system in a manner approved by the local health officer.\""],
      ["Water and sewer are a package", "You cannot take the pressurized water connection without the sewer connection. The rule ties them together deliberately."],
      ["Discretion", "\"In a manner approved by the local health officer\" means SLCoHD decides what a compliant connection looks like. Get this answer by phone before you spend anything."],
      ["Grease", "Expect the sewer authority's FOG rules to apply. In Salt Lake City that's ordinance 17.36.140 — grease traps cleaned at least every 30 days, gravity interceptors every 90 days or at 25% capacity."]
    ],
    also: ["A site with a legal sanitary sewer lateral you're permitted to tie into",
           "A plumbing permit from the city, and likely a grease interceptor",
           "A landlord willing to allow the connection",
           "Confirm with SLCoHD whether commissary and restroom agreements are still required — assume yes until told otherwise"],
    pros: ["Removes the water and wastewater ceiling entirely — the thing that most constrains an Indian menu",
           "You keep the mobile permit, so you keep reciprocity and can still unhook for a festival",
           "Far cheaper than a permanent build-out",
           "No daily dump run"],
    cons: ["Approval is discretionary — the local health officer can say no",
           "Ties you to a specific site with sewer access",
           "Grease interceptor cost and ongoing cleaning contract",
           "A plumbing permit and possibly landlord construction consent"]
  },
  {
    id: "C",
    name: "Permanent food establishment",
    tagline: "The trailer stops being a mobile unit. The site becomes a restaurant, and is regulated like one.",
    verdict: "No constraints on your kitchen — and by far the highest cost and lowest flexibility.",
    sewage: "Public sewer or a health-department-approved wastewater treatment system, with a grease interceptor.",
    numbers: [
      ["Sewage", "Must go to a public sewer or an approved individual wastewater treatment system."],
      ["Grease interceptor", "Required where needed, accessible for cleaning. No water above 140°F and no food waste discharged into it. Sizing comes from your local sewer district."],
      ["Sinks", "Three-compartment sink meeting NSF #2, sized for your largest equipment; hand sinks within 15 ft (25 ft maximum) of every prep area, warewashing area, toilet room and customer area; plus a mop/janitorial sink."],
      ["Restrooms", "Toilet rooms with hand sinks, hot and cold water, self-closing tight-fitting doors, and mechanical ventilation giving a complete air change every 15 minutes."],
      ["Finishes", "Coving at floor/wall junctures (¼ in. radius, 4 in. high). Light-colored, smooth, non-absorbent, cleanable surfaces. No exposed studs or joists in prep areas. No carpet in prep, storage or utility areas."],
      ["Ventilation", "Type I hood over every appliance producing grease, vapor or smoke, overhanging the cooking surface by at least 6 in."],
      ["Water heater", "Minimum 50 gal at 50,000 BTU or 11 kW for facilities without critical plumbing fixtures."],
      ["Plan review packet", "Application and fee, site plan, dimensional floor plan of the entire facility, equipment schedule and specs, plumbing/mechanical/room finish schedules, and your proposed menu. Construction must begin within 180 days of approval."]
    ],
    also: ["A building permit and zoning / land use approval from the city",
           "Likely ADA, parking and accessibility requirements",
           "A long-term lease or ownership of the site"],
    pros: ["No wastewater or water ceiling at all",
           "No commissary, no restroom agreement, no daily dump run",
           "You can build the kitchen your menu actually needs — tandoor, fryers, real ventilation",
           "A fixed address builds regulars in a way a rotating truck cannot"],
    cons: ["Dramatically more expensive — plan review, build-out, permits, sewer connection, interceptor",
           "You lose mobility and statewide reciprocity entirely",
           "Locked to one site and its lease",
           "Much longer timeline before you can open"]
  }
];

/* Decision helper questions. Each option adds weight to path A / B / C. */
const PATH_QUIZ = [
  { q: "Will the trailer normally stay parked at one location, or move around?",
    opts: [
      ["Moves between locations and events", { A: 3, B: 0, C: -3 }],
      ["Mostly one spot, occasional events", { A: 1, B: 3, C: 1 }],
      ["One fixed location, essentially never moves", { A: -2, B: 2, C: 3 }]
    ]},
  { q: "Can your target site connect to a public sanitary sewer, and would the property owner allow it?",
    opts: [
      ["Yes — there's a sewer lateral and the owner is open to it", { A: 0, B: 3, C: 2 }],
      ["No, or the owner won't allow any plumbing work", { A: 3, B: -3, C: -2 }],
      ["Don't know yet", { A: 1, B: 1, C: 0 }]
    ]},
  { q: "Realistically, how much water does a full service of your menu use?",
    opts: [
      ["Under ~30 gallons — limited frying, small pot load", { A: 3, B: 1, C: 0 }],
      ["Well over 30 gallons — heavy frying, rice and dal, lots of pot washing", { A: -3, B: 3, C: 3 }],
      ["Haven't measured it yet", { A: 0, B: 1, C: 0 }]
    ]},
  { q: "How important is working festivals, catering and other Utah cities?",
    opts: [
      ["Essential — it's a big part of the revenue plan", { A: 3, B: 2, C: -3 }],
      ["Nice to have occasionally", { A: 1, B: 2, C: 0 }],
      ["Not part of the plan", { A: -1, B: 1, C: 3 }]
    ]},
  { q: "What's your budget tolerance for build-out and permitting before you open?",
    opts: [
      ["As lean as possible", { A: 3, B: 1, C: -3 }],
      ["Moderate — I'd spend on something that removes a real constraint", { A: 0, B: 3, C: 1 }],
      ["I'm prepared to fund a full commercial build-out", { A: -1, B: 1, C: 3 }]
    ]}
];

/* The call script — what to actually ask SLCoHD */
const ASK_HEALTH = [
  "We're building a towed trailer, not a self-propelled truck. Do you permit it as a mobile food unit? (Utah Code 11-56-102 defines a food truck as a fully encased food service establishment \"on a motor vehicle or on a trailer that a motor vehicle pulls\" — we want to confirm the county applies it that way.)",
  "If we park on private property and connect to the site's pressurized potable water AND the public sanitary sewer, will you approve that under R392-102-7 and keep us on a mobile permit?",
  "What does \"in a manner approved by the local health officer\" require in practice — backflow prevention, an air gap, a specific sewer connection detail, a grease interceptor?",
  "If we are sewer-connected, do we still need a commissary agreement and a restroom agreement?",
  "At what point would you reclassify a stationary trailer as a permanent food establishment — is it time in one place, the utility connections, or something else?",
  "Your mobile guidelines list a 10-gallon minimum fresh water tank, but state rule R392-102-7 says 30 gallons for a food truck. Which applies to us?",
  "Our menu includes deep frying and possibly a tandoor. Any specific requirements or restrictions for those in a mobile unit?",
  "What are the current mobile plan review and annual food service permit fees, and which risk tier would our menu fall into?"
];

const ASK_CITY = [
  "Is a food trailer allowed to operate on private property at this address, and under what zoning designation?",
  "If the trailer stays in one place and is connected to utilities, does the city treat it as a structure requiring a building permit?",
  "What plumbing permit do we need to connect to the sewer lateral, and who inspects it?",
  "Does the sewer authority require a grease interceptor for our operation, and how is it sized?",
  "Are there restroom requirements the city imposes on a stationary food trailer that the health department doesn't?",
  "Is there any limit on how long a trailer may remain parked at one location?"
];

const SOURCES = [
  ["Salt Lake County Health Dept — Mobile Food Service permits", "https://www.saltlakecounty.gov/health/food-protection/permits/mobile/"],
  ["Salt Lake County Health Dept — Food handler permits", "https://www.saltlakecounty.gov/health/food-protection/food-workers/food-handlers/"],
  ["Salt Lake City — Food Truck Guide", "https://www.slc.gov/ed/salt-lake-city-food-truck-guide/"],
  ["Salt Lake City — Food Truck Guide (PDF, incl. commissary list)", "https://www.slcdocs.com/ed/SLCFoodTruckGuide.pdf"],
  ["Salt Lake City — Mobile Food Business license", "https://www.slc.gov/Finance/business-licensing/license-information/mobile-food-business/"],
  ["Salt Lake City — Consolidated Fee Schedule", "https://tools.slc.gov/feeschedule/"],
  ["Utah Code 11-56-103 — Food truck licensing & reciprocity", "https://le.utah.gov/xcode/Title11/Chapter56/C11-56-S103_2023050320230503.pdf"],
  ["Utah Code 11-56 — full chapter incl. 11-56-102 definitions (PDF)", "https://le.utah.gov/xcode/Title11/Chapter56/C11-56_2023050320230503.pdf"],
  ["Utah Admin. Code R392-102 — Mobile Food Business Sanitation (PDF)", "https://epi.utah.gov/wp-content/uploads/R392-102_FoodTruckSanitation_Jan32022.pdf"],
  ["Utah Admin. Code R392-102-7 — Water and Wastewater Requirements", "https://www.law.cornell.edu/regulations/utah/Utah-Admin-Code-R392-102-7"],
  ["Utah Admin. Code R392-102-4 — Mobile Food Business Permit Requirements", "https://www.law.cornell.edu/regulations/utah/Utah-Admin-Code-R392-102-4"],
  ["Utah Admin. Code R392-102-5 — Plan Review Requirements", "https://www.law.cornell.edu/regulations/utah/Utah-Admin-Code-R392-102-5"],
  ["SLCoHD — Food Cart & Mobile Food Unit Construction Guidelines (PDF)", "https://www.saltlakecounty.gov/globalassets/1-site-files/health/programs/food-protection/permits/mobile-food-service/mobile_guidelines.pdf"],
  ["SLCoHD — Permanent Facility Plan Review Guidelines (PDF)", "https://www.saltlakecounty.gov/globalassets/1-site-files/health/programs/food-protection/permits/permanent-facility-permits/plan_review_guidelines.pdf"],
  ["Salt Lake City Public Utilities — Fats, Oils & Grease (FOG) program", "https://www.slc.gov/utilities/pretreatment-fats-oils-grease-fog/"],
  ["Utah Division of Corporations", "https://corporations.utah.gov/"],
  ["Utah State Tax Commission — TAP registration", "https://tap.utah.gov/"],
  ["Municipal Services District (unincorporated county licensing)", "https://msd.utah.gov/"]
];

const PHASES = [
  /* ================= PHASE 0 — the gating decision ================= */
  {
    id: "p0", name: "Licensing Path Decision", icon: "🔀",
    sub: "Trailer + sewage. This decides which permit you pursue and roughly half your startup cost — settle it before you buy anything. See the Path Decision tab for the full comparison.",
    steps: [
      { id:"p0s1", title:"Confirm SLCoHD will permit a towed trailer as a mobile food unit", est:0,
        why:"Utah Code 11-56-102 defines a food truck as a fully encased food service establishment on a motor vehicle OR on a trailer that a motor vehicle pulls — so a trailer qualifies in state law. Confirm the county applies it the same way.",
        checklist:["Call 385-468-3845 and ask directly","Get the answer in writing or email if you can","Note the name of who told you","Ask whether their Mobile Food Unit Guidelines apply unchanged to trailers"],
        contacts:["slcohd"],
        links:[["Utah Code 11-56-102 (definitions)","https://le.utah.gov/xcode/Title11/Chapter56/C11-56_2023050320230503.pdf"],["SLCoHD Mobile Food Unit Guidelines (PDF)","https://www.saltlakecounty.gov/globalassets/1-site-files/health/programs/food-protection/permits/mobile-food-service/mobile_guidelines.pdf"]],
        tips:"Note that SLCoHD's own guidelines describe a mobile food unit as 'vehicle-mounted,' while state law explicitly includes trailers. That gap is exactly why you ask rather than assume."
      },
      { id:"p0s2", title:"Ask the sewer-connection question (R392-102-7)", est:0,
        why:"This is the single highest-leverage question in your whole plan. State rule allows a mobile food business to skip the onboard water tank and connect to pressurized water — but only when concurrently connected to a public sanitary sewer 'in a manner approved by the local health officer.'",
        checklist:["Read R392-102-7 before you call so you can cite it","Ask whether SLCoHD approves this for a stationary trailer","Ask exactly what a compliant connection requires (backflow prevention, air gap, connection detail)","Ask whether commissary and restroom agreements still apply if you're sewer-connected","Log the answer and who gave it in the notes below"],
        contacts:["slcohd"],
        links:[["Utah R392-102-7 — Water and Wastewater Requirements","https://www.law.cornell.edu/regulations/utah/Utah-Admin-Code-R392-102-7"],["Full R392-102 rule (PDF)","https://epi.utah.gov/wp-content/uploads/R392-102_FoodTruckSanitation_Jan32022.pdf"]],
        tips:"If the answer is yes, you get an unconstrained kitchen on a mobile permit — the best of both paths. If it's no, your menu has to fit inside a ~30 gallon water budget or you're heading toward a permanent establishment."
      },
      { id:"p0s3", title:"Verify sewer access and landlord consent at your target site", est:0,
        why:"Path B only works if there is a legal sanitary sewer lateral you're allowed to tie into, and an owner who will let you.",
        checklist:["Confirm a sewer lateral exists at the site","Identify which sewer district or city utility serves it","Ask the property owner about permitting a connection","Ask about a plumbing permit and who inspects it","Ask the sewer authority whether a grease interceptor is required and how it's sized"],
        contacts:["slcFog","slcDevServices"],
        links:[["SLC Public Utilities — FOG program","https://www.slc.gov/utilities/pretreatment-fats-oils-grease-fog/"]],
        tips:"Grease interceptor cost and an ongoing cleaning contract are easy to forget in the budget. Salt Lake City requires grease traps cleaned at least every 30 days, gravity interceptors every 90 days or at 25% capacity."
      },
      { id:"p0s4", title:"Measure your menu's actual water and wastewater load", est:0,
        why:"An Indian menu is water- and grease-heavy: rinsing rice and dal, deep frying, tempering, and a lot of pot washing. 30 gallons has to cover handwashing, warewashing and prep combined.",
        checklist:["Do a full test service at a commissary and meter the water","Separate handwash, warewash and prep water","Estimate fryer oil volume and disposal method","Compare the total against a 30 gal fresh / 34.5 gal waste system","Decide whether the menu fits the tank or the tank has to go"],
        tips:"Measure before you decide, not after. If a realistic service runs 60+ gallons, Path A is off the table and you've saved yourself an expensive mistake."
      },
      { id:"p0s5", title:"Check city zoning and building requirements for a stationary trailer", est:0,
        why:"The health department and the city are separate gates. A trailer that never moves may be treated as a structure, which pulls in building permits, restrooms and accessibility.",
        checklist:["Confirm the zoning at your target address allows a food trailer","Ask whether a permanently sited trailer needs a building permit","Ask whether there's a time limit on parking at one location","Ask about on-site restroom requirements","Ask about parking, accessibility and screening requirements"],
        contacts:["slcLicensing","slcDevServices","msd"],
        tips:"Salt Lake City does not allow trailers in the public right-of-way at all, so a trailer is a private-property operation there regardless of which permit you hold."
      },
      { id:"p0s6", title:"Price all three paths side by side", est:0,
        why:"The gap between a self-contained mobile unit and a permanent establishment is large enough to change whether the business is viable.",
        checklist:["Path A: trailer + tanks + commissary rent + permits","Path B: Path A minus commissary, plus sewer/water connection, plumbing permit, grease interceptor + cleaning contract","Path C: full plan review, build-out, building permit, sewer connection, interceptor, restrooms","Include ongoing monthly cost, not just upfront","Put the numbers in the Budget tab"]
      },
      { id:"p0s7", title:"Make the call and write down why", est:0,
        why:"Every later phase depends on this. Document the decision and the evidence so you don't relitigate it in month four.",
        checklist:["Choose Path A, B or C","Write the reasoning in the notes below","Note who at SLCoHD confirmed what, and when","Mark the steps in later phases that no longer apply as N/A","Revisit if the health department's answer changes"],
        tips:"Use the N/A status on steps that don't apply to your chosen path — they drop out of your progress percentage instead of sitting there looking incomplete."
      }
    ]
  },

  /* ================= PHASE 1 ================= */
  {
    id: "p1", name: "Concept & Feasibility", icon: "🧭",
    sub: "Decide what you're selling, to whom, and whether the numbers can work — before you spend real money.",
    steps: [
      { id:"p1s1", title:"Define your concept and menu niche", est:0,
        why:"A tight 6–10 item menu is what fits in a truck and what lets you hit speed-of-service. Pick a lane the SLC market isn't saturated in.",
        checklist:["Write a one-sentence concept statement","Draft a 6–10 item core menu","Identify 2–3 signature items","Name your target customer (lunch crowd / breweries / events / late night)"],
        tips:"Trucks that survive usually do one thing very well. Salt Lake's scene is dense in tacos and burgers — check what's actually underserved before committing."
      },
      { id:"p1s2", title:"Scout the market: existing trucks and gaps", est:0,
        why:"You need to know who you're competing against, where they park, and what they charge.",
        checklist:["List 15+ active SLC-area trucks and their cuisine","Note their typical price points","Visit 3 truck rallies / brewery lots and count traffic","Photograph menu boards for pricing reference"],
        links:[["Food Truck League — weekly rallies & truck roster","https://foodtruckleague.com/"]]
      },
      { id:"p1s3", title:"Validate demand and target locations", est:0,
        why:"Location is the single biggest revenue lever. Confirm your spots before you buy a truck.",
        checklist:["List 10 candidate locations (office parks, breweries, apartment complexes, industrial areas)","Confirm each is in an allowed zone or on private property with permission","Talk to 3 property/brewery managers about hosting you","Map lunch-hour foot traffic for your top 3"],
        tips:"SLC public right-of-way vending is restricted to zones M-1, M-2, D-1, D-2, D-3, D-4 and G-MU — and trailers are NOT allowed in the right-of-way. Private property with written permission is often the easier path."
      },
      { id:"p1s4", title:"Build a startup budget and break-even model", est:0,
        why:"Know your number before you commit. Truck + build-out + permits + first 3 months of operating cash.",
        checklist:["Estimate truck/build-out cost","Add licensing + permits (see Budget tab)","Add 3 months of commissary rent and food cost","Calculate covers/day needed to break even","Decide your funding source"],
        tips:"Commissary rent is typically the largest recurring cost after food and labor — roughly $300–$1,500/month (est., varies widely by kitchen)."
      },
      { id:"p1s5", title:"Decide: truck vs. trailer, new vs. used", est:0,
        why:"This choice constrains where you can legally park in Salt Lake City and how much you'll spend.",
        checklist:["Confirm whether you need public right-of-way access (→ truck, not trailer)","Price 3 used units and 1 new build","Check that any unit is self-contained and readily movable","Budget for inspection-driven retrofits"],
        tips:"Health rules require the unit to be self-contained and readily movable. A cheap used unit that fails plan review costs more than a compliant one."
      }
    ]
  },

  /* ================= PHASE 2 ================= */
  {
    id: "p2", name: "Business Formation & Registration", icon: "🏛️",
    sub: "Get a legal entity, a tax ID, and a sales tax account. Everything downstream asks for these.",
    steps: [
      { id:"p2s1", title:"Choose an entity and register with the State of Utah", est:75,
        why:"You need a registered business before the city or the health department will license you. Most food trucks form an LLC for liability separation.",
        checklist:["Choose LLC vs. sole proprietor vs. S-corp (talk to a CPA)","Check business name availability","File with Utah Division of Corporations","Get your Registered Principal / DBA if needed","Calendar the annual renewal"],
        contacts:["commerce"],
        links:[["Utah Division of Corporations","https://corporations.utah.gov/"]],
        tips:"Filing fees are modest; the LLC annual renewal is easy to forget. Put it on a calendar now."
      },
      { id:"p2s2", title:"Get a federal EIN from the IRS", est:0,
        why:"Free, takes minutes online, and you need it for the bank account, payroll and tax registration.",
        checklist:["Apply online at irs.gov","Save the EIN confirmation letter (CP 575) to a permanent folder"],
        links:[["IRS — Apply for an EIN online","https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online"]],
        tips:"Never pay a third party for an EIN. It is free directly from the IRS."
      },
      { id:"p2s3", title:"Register for a Utah sales tax license", est:0,
        why:"Prepared food is taxable. You must collect and remit sales tax from day one.",
        checklist:["Register through Utah Taxpayer Access Point (TAP)","Note your filing frequency (monthly/quarterly/annual)","Confirm the correct combined rate for each city you vend in","Configure the tax rate in your POS"],
        contacts:["taxcomm"],
        links:[["Utah TAP — register a business","https://tap.utah.gov/"],["Utah sales tax rates by location","https://tax.utah.gov/sales/rates"]],
        tips:"The old OneStop Business Registration (OSBR) system was shut down in Sept 2024 — register directly with the Tax Commission. Rates differ between SLC, Murray, Sandy, West Valley etc.; a mobile business has to charge the rate for where the sale happens."
      },
      { id:"p2s4", title:"Open a business bank account and set up bookkeeping", est:0,
        why:"Mixing personal and business money destroys the liability protection you just paid for, and makes taxes miserable.",
        checklist:["Open a business checking account (bring EIN + formation docs)","Get a business debit/credit card","Set up bookkeeping software","Decide on a CPA or bookkeeper"]
      },
      { id:"p2s5", title:"Confirm which city (or cities) you'll be based in", est:0,
        why:"Salt Lake County is a patchwork: Salt Lake City, West Valley, Sandy, Murray, West Jordan, Millcreek and unincorporated areas all license separately.",
        checklist:["Identify your primary operating city","Call that city's business licensing division to confirm food trucks are permitted","Check unincorporated areas via the Municipal Services District","Note each city's fee and process"],
        contacts:["msd","slcLicensing"],
        tips:"The health department's own instructions start with 'contact your city's business licensing division to confirm your business type is permitted.' Do that before spending anything."
      }
    ]
  },

  /* ================= PHASE 3 ================= */
  {
    id: "p3", name: "Money, Insurance & Risk", icon: "💵",
    sub: "Funding lined up, insurance in force. Salt Lake City won't issue your license without a certificate of insurance.",
    steps: [
      { id:"p3s1", title:"Secure funding", est:0,
        why:"Trucks are usually the largest single check you'll write. Know where it's coming from before you shop.",
        checklist:["Total your startup number from Phase 1","Compare: savings, SBA microloan, equipment financing, investor","Prepare a written business plan for lenders","Book a free session with the Utah SBDC"],
        contacts:["sbdc"],
        links:[["Utah SBDC — free business advising","https://utahsbdc.org/"],["SBA Utah District Office","https://www.sba.gov/district/utah"]]
      },
      { id:"p3s2", title:"Get commercial insurance", est:0,
        why:"Required. Salt Lake City requires a certificate of insurance naming the City as additional insured for the mobile food business license.",
        checklist:["Get quotes for general liability","Add commercial auto for the truck","Add property/equipment coverage","Request certificate naming Salt Lake City as additional insured","Ask each event/property host what limits they require"],
        links:[["SLC Mobile Food Business license requirements","https://www.slc.gov/Finance/business-licensing/license-information/mobile-food-business/"]],
        tips:"Get the certificate wording right the first time — a certificate without the additional-insured line will bounce your license application."
      },
      { id:"p3s3", title:"Workers' compensation (if you hire)", est:0,
        why:"Utah requires workers' comp coverage for employees. Getting this wrong is expensive.",
        checklist:["Determine if you'll have W-2 employees","Get a workers' comp quote","Register for Utah unemployment insurance with DWS","Set up payroll"],
        links:[["Utah Labor Commission — workers' comp","https://laborcommission.utah.gov/divisions/industrial-accidents/"],["Utah DWS employer registration","https://jobs.utah.gov/ui/employer/"]]
      }
    ]
  },

  /* ================= PHASE 4 ================= */
  {
    id: "p4", name: "The Truck & Equipment", icon: "🚚",
    sub: "Build or buy a unit that will actually pass plan review and the pre-opening inspection.",
    steps: [
      { id:"p4s1", title:"Buy or build the mobile unit", est:0,
        why:"The unit has to be self-contained and readily movable, with the equipment the health department's checklist expects.",
        checklist:["Inspect candidate units against the SLCoHD Mobile Food Unit Guidelines","Verify title/VIN and no liens","Get a mechanical inspection","Negotiate retrofit costs into the price"],
        contacts:["slcohd"],
        links:[["SLCoHD Mobile Food Service — guidelines & applications","https://www.saltlakecounty.gov/health/food-protection/permits/mobile/"]],
        tips:"Read the Mobile Food Unit Guidelines BEFORE you buy. Buying first and retrofitting later is the classic expensive mistake."
      },
      { id:"p4s2", title:"Water and wastewater systems", est:0,
        why:"Specific, checkable requirements — inspectors measure these.",
        checklist:["Fresh water tank: 10-gallon minimum","Food-grade water hose","Wastewater tank at least 15% larger than the fresh water tank","Hand wash sink with hot AND cold running water","Warewashing sink per guidelines","Water heater sized for the sinks"],
        tips:"The 15%-larger wastewater tank rule trips up a lot of self-builds. Measure before you plumb."
      },
      { id:"p4s3", title:"Cooking equipment, refrigeration and food protection", est:0,
        why:"Temperature control and physical food protection are the top inspection findings.",
        checklist:["Refrigeration capable of holding 41°F or below","Hot holding capable of 135°F or above","Calibrated probe thermometers","Sneeze guard / overhead protection at the service window","Adequate dry and cold storage","Food-grade surfaces throughout"]
      },
      { id:"p4s4", title:"Fire suppression, propane and extinguishers", est:0,
        why:"You need to pass a fire safety inspection, and reciprocity in other Utah cities depends on having current evidence of one.",
        checklist:["Install a UL-300 compliant hood fire suppression system","Get the suppression system serviced/tagged by a licensed company","Correct class extinguisher(s), inspected and tagged","Propane tanks properly mounted, secured and leak-tested","Schedule the fire inspection with your city's fire dept"],
        contacts:["slcFire"],
        tips:"Utah Code 11-56-103 lets other cities refuse reciprocity if you lack current evidence of passing a fire safety inspection. Keep the paperwork in the truck."
      },
      { id:"p4s5", title:"Register and plate the vehicle", est:0,
        why:"Salt Lake City's application asks for truck registration and copies of driver's licenses for all drivers.",
        checklist:["Register/title the truck with Utah DMV","Confirm commercial registration class if applicable","Collect copies of driver's licenses for every driver","Verify safety/emissions requirements for the county"],
        contacts:["dmv"],
        links:[["Utah DMV","https://dmv.utah.gov/"]]
      },
      { id:"p4s6", title:"Generator, power and ventilation", est:0,
        why:"Underpowered electrical is the most common cause of a miserable first service.",
        checklist:["Size the generator to peak simultaneous load","Plan for noise limits at residential-adjacent sites","Shore power capability for commissary/events","Adequate ventilation and hood CFM"]
      }
    ]
  },

  /* ================= PHASE 5 ================= */
  {
    id: "p5", name: "Food Safety & Commissary", icon: "🍳",
    sub: "The health department requires these before it will issue a permit. Start early — the class isn't offered every week.",
    steps: [
      { id:"p5s1", title:"Register for the SLCoHD Mobile Food Service Class", est:0,
        why:"Mandatory. Call to register — it's typically Thursdays at 10am, but not every week, so book it early.",
        checklist:["Call 385-468-3845 to register","Attend the class","Keep the materials — they explain the plan review packet","Note any handouts about fees and timelines"],
        contacts:["slcohd"],
        links:[["SLCoHD Mobile Food Service","https://www.saltlakecounty.gov/health/food-protection/permits/mobile/"]],
        tips:"This is step 2 of the health department's own nine-step process and it gates everything after it. Call the week you decide to move forward."
      },
      { id:"p5s2", title:"Get food handler permits for every worker", est:20,
        why:"Every food worker needs a valid Utah food handler card. It's online-only in Salt Lake County.",
        checklist:["Pick an approved provider from the county's list","Complete the course and assessment","Print/save cards for each worker","Track expiration dates","Keep copies in the truck"],
        contacts:["slcohdMain"],
        links:[["SLCoHD — approved food handler training providers","https://www.saltlakecounty.gov/health/food-protection/food-workers/food-handlers/"]],
        tips:"There are currently no in-person food handler classes in Salt Lake County — all approved training is online. Replacement cards cost $15. Budget roughly $15–25 per worker (est.)."
      },
      { id:"p5s3", title:"Certify and register a Food Safety Manager", est:0,
        why:"The health department requires you to register a Certified Food Safety Manager (ServSafe or equivalent) as part of the permit process.",
        checklist:["Take a ServSafe Manager (or equivalent) course","Pass the proctored exam","Register the certificate with SLCoHD","Calendar the renewal (typically 5 years)"],
        contacts:["slcohd"],
        links:[["ServSafe Manager certification","https://www.servsafe.com/ServSafe-Manager"]]
      },
      { id:"p5s4", title:"Sign a commissary agreement", est:0,
        why:"Required. A residential kitchen is NOT allowed — every mobile unit must use a health-department-approved commissary.",
        checklist:["Get the approved commissary list (SLC Food Truck Guide PDF lists ~24)","Tour 3 candidates — check hours, storage, dump station, water fill","Compare monthly cost and what's included","Get the agreement SIGNED by the commissary owner","Submit it to SLCoHD for approval"],
        contacts:["slcohd"],
        links:[["SLC Food Truck Guide PDF (approved commissary list)","https://www.slcdocs.com/ed/SLCFoodTruckGuide.pdf"]],
        tips:"Commissary access hours matter more than price. A cheap kitchen you can't get into at 5am is worthless."
      },
      { id:"p5s5", title:"Secure a restroom agreement", est:0,
        why:"The health department requires an arrangement with a local business for restroom access (particularly for trailers).",
        checklist:["Identify a business near your primary location","Get a written, signed restroom agreement","Submit with your permit packet"],
        contacts:["slcohd"]
      },
      { id:"p5s6", title:"Write food flow charts for every menu item", est:0,
        why:"Required with the plan review application — one flow chart per menu item, receiving through service.",
        checklist:["List every menu item","For each: receiving → storage → prep → cook → hold → serve","Note critical control points and temperatures","Note which steps happen at the commissary vs. on the truck"],
        contacts:["slcohd"],
        tips:"Keep the menu small partly for this reason — every added item is another flow chart and another thing to hold at temperature."
      }
    ]
  },

  /* ================= PHASE 6 ================= */
  {
    id: "p6", name: "Salt Lake County Health Permit", icon: "🏥",
    sub: "Plan review, permit application, then the pre-opening inspection. This is the long pole — start it early.",
    steps: [
      { id:"p6s1", title:"Submit the Mobile Plan Review application + fee", est:450,
        why:"The health department reviews your unit's design before you're allowed to operate. Submitted with food flow charts and the commissary agreement.",
        checklist:["Download the Mobile Plan Review Application","Attach food flow charts for every item","Attach signed commissary agreement","Attach restroom agreement if applicable","Attach truck registration and vending route","Pay the plan review fee","Record your submission date and reviewer name"],
        contacts:["slcohd"],
        links:[["SLCoHD Mobile Food Service — applications","https://www.saltlakecounty.gov/health/food-protection/permits/mobile/"],["Pay health permit fees online","https://paydirect.link2gov.com/SLCoHealthPermits/ItemSearch"]],
        tips:"Third-party guides put plan review around $380–$550 (est.). Call 385-468-3845 for the current official fee — do not budget off an estimate."
      },
      { id:"p6s2", title:"Submit the Food Service Permit application + fee", est:425,
        why:"The permit itself. Annual, and not transferable if the business changes owners.",
        checklist:["Complete the Food Service Permit application","Pay the permit fee","Confirm which risk tier your menu falls into","Calendar the annual renewal date"],
        contacts:["slcohd"],
        tips:"Third-party 2026 guides estimate roughly $350/yr (tier one) to $500/yr (tier two) — est. only. Higher-risk menus land in a higher tier."
      },
      { id:"p6s3", title:"Pass the pre-opening inspection", est:0,
        why:"The final health gate. An inspector walks your unit against the checklist.",
        checklist:["Self-audit against the inspection checklist first","Fill water tank, test hot water at the hand sink","Have thermometers, test strips and sanitizer on board","Have permits, food handler cards and manager cert on board","Schedule the inspection","Fix findings and re-inspect if needed"],
        contacts:["slcohd"],
        tips:"Common findings: no hot water at the hand sink, undersized wastewater tank, missing overhead protection, no certified manager on record."
      },
      { id:"p6s4", title:"Post the permit and set up the inspection binder", est:0,
        why:"Inspectors check that the valid permit is posted and that worker documentation is present.",
        checklist:["Post the food service permit visibly in the unit","Binder: permit, plan review approval, commissary + restroom agreements","Binder: food handler cards, manager certificate","Binder: fire inspection evidence, insurance certificate, business licenses","Keep a duplicate set off the truck"],
        tips:"That binder is also what lets you claim reciprocity in other Utah cities on short notice."
      }
    ]
  },

  /* ================= PHASE 7 ================= */
  {
    id: "p7", name: "City Licensing, Fire & Zoning", icon: "🏙️",
    sub: "One city license to start, then use Utah's reciprocity law to expand across the valley.",
    steps: [
      { id:"p7s1", title:"Apply for the Salt Lake City mobile food business license", est:300,
        why:"A current SLC business license is required for all mobile food businesses operating in the city, with a separate fee for each vehicle.",
        checklist:["Apply through the SLC business licensing portal","Attach copies of health and transportation permits","Attach certificate of insurance naming SLC as additional insured","Attach state tax ID proof","Attach driver's licenses for all drivers","Attach written property owner permission if on private property","Complete background checks for owner/drivers"],
        contacts:["slcLicensing","slcEcon"],
        links:[["Apply — SLC Business Licensing portal","https://slcgov.my.site.com/BusinessLicensing/s/"],["SLC Mobile Food Business requirements","https://www.slc.gov/Finance/business-licensing/license-information/mobile-food-business/"],["SLC Consolidated Fee Schedule (see p.15)","https://tools.slc.gov/feeschedule/"]],
        tips:"Third-party guides estimate ~$193 base plus ~$103 per vehicle (est.). Check the official Consolidated Fee Schedule for the real number."
      },
      { id:"p7s2", title:"Pass the city fire safety inspection", est:0,
        why:"Required to operate, and required evidence if you want other Utah cities to honor your license.",
        checklist:["Call the SLC fire inspection line to schedule","Have suppression system service tags current","Have extinguishers tagged","Have propane installation ready to inspect","File the passing inspection in your binder"],
        contacts:["slcFire","truckInspectors"]
      },
      { id:"p7s3", title:"Learn the SLC parking and zoning rules cold", est:0,
        why:"These are the rules that get trucks ticketed and licenses pulled.",
        checklist:["Public right-of-way only in M-1, M-2, D-1, D-2, D-3, D-4, G-MU","Trucks only in the right-of-way — NO trailers","Max 2 hours at one right-of-way location","Max 12 hours in any 24-hour period","Only one vehicle per block face","Keep 100 feet from restaurant doors on the same block unless waived","Vending window faces the sidewalk"],
        links:[["SLC zoning map","https://maps.slc.gov/mws/zoning.htm"],["SLC ordinance 5.69 — mobile food business","https://codelibrary.amlegal.com/codes/saltlakecityut/latest/saltlakecity_ut/0-0-0-48223"],["SLC Transportation Division permits","https://www.slc.gov/mystreet/permits/"]],
        tips:"A Transportation Division permit can extend the 2-hour right-of-way limit to as much as 12 hours. Worth it for a steady lunch spot."
      },
      { id:"p7s4", title:"Understand statewide reciprocity (Utah Code 11-56-103)", est:0,
        why:"This law is your expansion plan. Utah cities must honor a valid business license from another Utah municipality.",
        checklist:["Read 11-56-103","Confirm your license stays current and in good standing","Keep current health permit + fire inspection evidence on the truck","Ask each new city about its reciprocity application form","Note that a city may still require event permits and enforce zoning"],
        links:[["Utah Code 11-56-103 (PDF)","https://le.utah.gov/xcode/Title11/Chapter56/C11-56-S103_2023050320230503.pdf"]],
        tips:"Cities may NOT require multiple licenses, per-employee fees, background checks (except ice cream trucks), or regulate your vehicle's size. They MAY refuse reciprocity if you lack a current health permit or fire inspection evidence."
      },
      { id:"p7s5", title:"Register in the other cities you'll work", est:0,
        why:"Each city has its own reciprocity form, event permits and zoning. Do this before you accept a booking there.",
        checklist:["West Valley City","Sandy","Murray","West Jordan","Millcreek / unincorporated (Municipal Services District)","Draper, South Jordan, Taylorsville as needed"],
        contacts:["msd"],
        links:[["SLC reciprocal-based food truck checklist","https://www.slc.gov/ed/salt-lake-city-food-truck-checklist-reciprocal-based/"],["Municipal Services District","https://msd.utah.gov/"]]
      },
      { id:"p7s6", title:"Collect written property-owner permissions", est:0,
        why:"Any private-property location needs the owner's written permission, and the city asks for it.",
        checklist:["Draft a one-page permission letter template","Get signed letters for each recurring private location","Note the 12-hour/24-hour limit applies on private property too","Keep copies in the binder"]
      }
    ]
  },

  /* ================= PHASE 8 ================= */
  {
    id: "p8", name: "Menu, Suppliers & Pricing", icon: "🍔",
    sub: "Cost every plate, lock your suppliers, and test the line before customers are watching.",
    steps: [
      { id:"p8s1", title:"Cost out every recipe", est:0,
        why:"You can't price without knowing plate cost. Target food cost is usually 28–35% for trucks.",
        checklist:["Build a recipe card with weights for each item","Price each ingredient per unit","Calculate plate cost and target menu price","Set your food cost % target","Re-cost quarterly as prices move"]
      },
      { id:"p8s2", title:"Line up suppliers", est:0,
        why:"Delivery minimums and cash-and-carry both have a place. Know your fallback for a sold-out Saturday.",
        checklist:["Open a Restaurant Depot / Sysco / US Foods account","Identify local produce and specialty suppliers","Compare delivery minimums vs. cash-and-carry","Set par levels for each item","Identify a backup source for your signature ingredient"]
      },
      { id:"p8s3", title:"Set prices and design the menu board", est:0,
        why:"A truck menu has to be readable from 15 feet and orderable in under 20 seconds.",
        checklist:["Set prices from plate cost, not from competitors alone","Design a large, high-contrast menu board","Include allergen notes","Decide on combos/upsells","Print a weatherproof version"]
      },
      { id:"p8s4", title:"Run a full test service at the commissary", est:0,
        why:"Find the bottlenecks with friends in line, not paying customers.",
        checklist:["Prep as if for a real service","Time each item from order to hand-off","Test holding temperatures over 4 hours","Identify the bottleneck station and fix it","Adjust the menu based on what actually worked"]
      }
    ]
  },

  /* ================= PHASE 9 ================= */
  {
    id: "p9", name: "Brand, Marketing & Tech", icon: "📣",
    sub: "People can't eat at a truck they can't find. Location broadcasting is your marketing.",
    steps: [
      { id:"p9s1", title:"Name, logo and truck wrap", est:0,
        why:"The wrap is your biggest billboard and it's mobile.",
        checklist:["Confirm the name isn't taken (state + trademark search)","Register the DBA if different from the LLC","Design logo and wrap","Get 2–3 wrap quotes","Make sure the name is readable at 40mph and in a photo"]
      },
      { id:"p9s2", title:"Set up social + a schedule page", est:0,
        why:"Instagram + a live schedule is how food trucks get found. Post today's location every day.",
        checklist:["Claim the handle on Instagram, Facebook, TikTok","Set up a Google Business Profile","Publish a weekly schedule page","Build a posting routine (location by 9am daily)","Collect emails/SMS for regulars"]
      },
      { id:"p9s3", title:"POS, payments and tax rates", est:0,
        why:"Card acceptance is table stakes, and your POS has to charge the right sales tax for the city you're parked in.",
        checklist:["Choose a POS (Square, Toast, Clover)","Test offline/low-signal card processing","Configure sales tax rates per operating city","Set up tip handling","Set up daily sales reporting for tax filing"],
        links:[["Utah sales tax rates by location","https://tax.utah.gov/sales/rates"]],
        tips:"Downtown SLC has dead zones. Confirm your POS handles offline card capture before your first rally."
      },
      { id:"p9s4", title:"Join the local truck ecosystem", est:0,
        why:"Rallies, brewery lots and booking platforms fill your calendar faster than cold outreach.",
        checklist:["Apply to the Food Truck League roster","Introduce yourself to 5 established truck owners","Get on brewery/office-park rotation lists","Register for the big local festivals early"],
        links:[["Food Truck League","https://foodtruckleague.com/"]]
      }
    ]
  },

  /* ================= PHASE 10 ================= */
  {
    id: "p10", name: "Launch & Daily Operations", icon: "🚀",
    sub: "Soft launch, then build the routines that keep you compliant and sane.",
    steps: [
      { id:"p10s1", title:"Soft launch", est:0,
        why:"A quiet first service at a friendly location lets you fail cheaply.",
        checklist:["Pick a low-pressure location and a limited menu","Invite friends and family","Time the service and collect feedback","Fix the top 3 problems before a public launch","Then announce the public launch"]
      },
      { id:"p10s2", title:"Build the daily operations checklist", est:0,
        why:"Consistency is what passes surprise inspections and keeps food safe.",
        checklist:["Opening: water fill, temps, sanitizer, cash float","Service: hourly temperature log","Closing: wastewater dump, cleaning, commissary check-in","Weekly: deep clean, equipment check","Print it and laminate it for the truck"]
      },
      { id:"p10s3", title:"Set up the renewals and filings calendar", est:0,
        why:"Most compliance failures are calendar failures, not knowledge failures.",
        checklist:["Health food service permit — annual","City business license — annual, per vehicle","Fire safety inspection — per city requirement","Insurance renewal","LLC annual renewal with Utah Div. of Corporations","Sales tax filings — monthly/quarterly per your assigned frequency","Food handler cards — track each worker's expiry","Fire suppression system service tag"],
        tips:"Put every one of these in a shared calendar with a 30-day advance reminder. Lapsed paperwork also kills your reciprocity in other cities."
      },
      { id:"p10s4", title:"Hire and train staff", est:0,
        why:"You cannot run window, grill and cash alone for long.",
        checklist:["Write the roles you need","Confirm food handler cards before first shift","Train on the daily checklist and temp logs","Set up payroll and workers' comp","Document opening/closing procedures"]
      },
      { id:"p10s5", title:"Track the numbers weekly", est:0,
        why:"Trucks fail slowly and quietly. Weekly numbers catch it early.",
        checklist:["Sales by location and by day","Food cost % and labor %","Average ticket and covers per service","Best/worst performing menu items","Drop or fix anything under target for 3 straight weeks"]
      }
    ]
  },

  /* ================= PHASE 11 ================= */
  {
    id: "p11", name: "Growth", icon: "📈",
    sub: "Once the truck runs itself, the money is in catering, recurring spots and repeatability.",
    steps: [
      { id:"p11s1", title:"Build a catering and private events offer", est:0,
        why:"Catering has better margins and predictable revenue than street service.",
        checklist:["Build 2–3 catering packages with per-head pricing","Write a simple contract with a deposit","Create a one-page sell sheet","Pitch 10 local companies and wedding planners","Confirm insurance limits venues require"]
      },
      { id:"p11s2", title:"Lock in recurring locations", est:0,
        why:"A reliable weekly rotation smooths the revenue curve.",
        checklist:["Convert your best 3 one-offs into weekly slots","Negotiate brewery/office-park agreements","Get written permissions for each","Publish the recurring schedule"]
      },
      { id:"p11s3", title:"Work the festival and rally circuit", est:0,
        why:"High-volume days, and where new regulars find you.",
        checklist:["List the major SLC-area festivals and their application deadlines","Budget for booth/event fees","Plan a high-throughput festival menu","Staff up for volume"]
      },
      { id:"p11s4", title:"Decide the next move: second truck, ghost kitchen, or brick-and-mortar", est:0,
        why:"Each path has very different capital and permitting needs — a permanent facility means a whole new health permit process.",
        checklist:["Compare capital needs and margins for each path","Model staffing for an operation you're not personally running","Research permanent-facility permitting if going brick-and-mortar","Decide a target date and trigger metric"],
        links:[["SLCoHD permanent-facility permits","https://www.saltlakecounty.gov/health/food-protection/permits/permanent/"]]
      }
    ]
  }
];
