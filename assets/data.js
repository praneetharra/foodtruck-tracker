/* =========================================================================
   SEED DATA — Food Truck Launch Tracker, Salt Lake County UT
   Researched Aug 2026 from Utah Code, Utah Administrative Code R392-102,
   Salt Lake County Health Department guidance, Salt Lake City, and Utah
   state agency sources.

   CITATION POLICY
   - Every factual claim in a step carries a `refs` entry pointing at the
     document it came from, keyed into the REFS registry below.
   - A step with no `refs` is operational judgment, not a regulation. The
     drawer says so explicitly rather than letting it look rule-backed.
   - Fees marked "est." come from third-party guides, NOT official quotes.
   - Rules change and local interpretation varies. Confirm with the agency.
   ========================================================================= */

const SEED_VERSION = "2026.08.26b";

/* ---------------------------------------------------------------------------
   AGENCY CONTACTS
   --------------------------------------------------------------------------- */
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
   REFERENCE REGISTRY
   Every citation in this file keys into this table. `kind` groups them on the
   Sources tab. `what` describes what the document actually is.
   --------------------------------------------------------------------------- */
const REFS = {
  /* ---- State statute ---- */
  code1156: {
    kind: "Utah statute",
    title: "Utah Code Title 11, Chapter 56 — Food Truck Licensing (full chapter PDF)",
    url: "https://le.utah.gov/xcode/Title11/Chapter56/C11-56_2023050320230503.pdf",
    what: "Contains §11-56-102 (definitions) and §11-56-103 (licensing and reciprocity). This is the statute that makes a towed trailer a “food truck.”"
  },
  code1156_103: {
    kind: "Utah statute",
    title: "Utah Code §11-56-103 — Licensing, Reciprocity, Fees (PDF)",
    url: "https://le.utah.gov/xcode/Title11/Chapter56/C11-56-S103_2023050320230503.pdf",
    what: "The reciprocity section on its own. Limits what a city may charge and require, and names the two grounds for refusing reciprocity."
  },

  /* ---- State administrative rule ---- */
  r392_102: {
    kind: "Utah administrative rule",
    title: "Utah Admin. Code R392-102 — Mobile Food Business Sanitation (full rule PDF)",
    url: "https://epi.utah.gov/wp-content/uploads/R392-102_FoodTruckSanitation_Jan32022.pdf",
    what: "The complete state sanitation rule for food trucks and food carts. The single most useful document for a mobile operator."
  },
  r392_102_2: {
    kind: "Utah administrative rule",
    title: "R392-102-2 — Definitions",
    url: "https://www.law.cornell.edu/regulations/utah/Utah-Admin-Code-R392-102-2",
    what: "Defines mobile food business, commissary, and drinking water; adopts the food truck / food cart definitions from §11-56-102."
  },
  r392_102_3: {
    kind: "Utah administrative rule",
    title: "R392-102-3 — Commissary Requirements",
    url: "https://www.law.cornell.edu/regulations/utah/Utah-Admin-Code-R392-102-3",
    what: "What a commissary must provide, how often you must return, and the narrow tier-one exemption that removes the commissary requirement."
  },
  r392_102_4: {
    kind: "Utah administrative rule",
    title: "R392-102-4 — Mobile Food Business Permit Requirements",
    url: "https://www.law.cornell.edu/regulations/utah/Utah-Admin-Code-R392-102-4",
    what: "Permit types and duration, the 14-day temporary permit for fixed locations, commissary agreement and vending-route documentation, renewal timing."
  },
  r392_102_5: {
    kind: "Utah administrative rule",
    title: "R392-102-5 — Plan Review Requirements",
    url: "https://www.law.cornell.edu/regulations/utah/Utah-Admin-Code-R392-102-5",
    what: "When plan review is triggered — including explicitly the conversion of an existing vehicle or trailer — and what must be submitted."
  },
  r392_102_7: {
    kind: "Utah administrative rule",
    title: "R392-102-7 — Water and Wastewater Requirements",
    url: "https://www.law.cornell.edu/regulations/utah/Utah-Admin-Code-R392-102-7",
    what: "Tank minimums, the 15% wastewater rule, approved disposal points, and the pressurized-water-plus-sanitary-sewer alternative. The key rule for the trailer decision."
  },
  r392_102_11: {
    kind: "Utah administrative rule",
    title: "R392-102-11 — Food Safety Requirements",
    url: "https://www.law.cornell.edu/regulations/utah/Utah-Admin-Code-R392-102-11",
    what: "The food safety section of the mobile rule. Worth reading in full alongside your plan review packet."
  },
  r392_102_16: {
    kind: "Utah administrative rule",
    title: "R392-102-16 — Inspections, Corrective Actions, Prevention of Foodborne Disease",
    url: "https://www.law.cornell.edu/regulations/utah/Utah-Admin-Code-R392-102-16",
    what: "How inspections are conducted and what happens when violations are found."
  },

  /* ---- Salt Lake County Health Department ---- */
  slcohdMobile: {
    kind: "Salt Lake County Health Dept",
    title: "SLCoHD — Mobile Food Service permits",
    url: "https://www.saltlakecounty.gov/health/food-protection/permits/mobile/",
    what: "The county's own nine-step process, the mandatory class, application forms, and the pre-opening inspection checklist."
  },
  slcohdMobileGuide: {
    kind: "Salt Lake County Health Dept",
    title: "SLCoHD — Food Cart and Mobile Food Unit Construction Guidelines (PDF)",
    url: "https://www.saltlakecounty.gov/globalassets/1-site-files/health/programs/food-protection/permits/mobile-food-service/mobile_guidelines.pdf",
    what: "The construction spec your unit is judged against: tank sizing and formula, sinks, splashguards, water temperatures, commissary duties, dumping fines."
  },
  slcohdPlanReview: {
    kind: "Salt Lake County Health Dept",
    title: "SLCoHD — Plan Review Guidelines, permanent facilities (PDF)",
    url: "https://www.saltlakecounty.gov/globalassets/1-site-files/health/programs/food-protection/permits/permanent-facility-permits/plan_review_guidelines.pdf",
    what: "Everything a permanent food establishment must have — grease interceptor, sinks, restrooms, coving, finishes, hoods, water heater — plus the submittal list."
  },
  slcohdPermanent: {
    kind: "Salt Lake County Health Dept",
    title: "SLCoHD — Permanent-Facility Permits",
    url: "https://www.saltlakecounty.gov/health/food-protection/permits/permanent/",
    what: "The permit page for restaurants and other fixed facilities."
  },
  slcohdPermits: {
    kind: "Salt Lake County Health Dept",
    title: "SLCoHD — Permits overview",
    url: "https://www.saltlakecounty.gov/health/food-protection/permits/",
    what: "All permit types, and the rule that permits are not transferable on change of ownership."
  },
  slcohdFoodHandlers: {
    kind: "Salt Lake County Health Dept",
    title: "SLCoHD — Food Handler permits",
    url: "https://www.saltlakecounty.gov/health/food-protection/food-workers/food-handlers/",
    what: "The list of approved online training providers, and confirmation that no in-person classes are offered in Salt Lake County."
  },
  slcohdPay: {
    kind: "Salt Lake County Health Dept",
    title: "SLCoHD — online permit fee payment",
    url: "https://paydirect.link2gov.com/SLCoHealthPermits/ItemSearch",
    what: "Where health permit fees are paid online."
  },
  slcoBizLic: {
    kind: "Salt Lake County",
    title: "Salt Lake County — Business Licenses & Permitting",
    url: "https://www.saltlakecounty.gov/business-licenses-permitting/",
    what: "Confirms the county no longer issues business licenses; licensing moved to the Municipal Services District."
  },

  /* ---- Salt Lake City ---- */
  slcGuide: {
    kind: "Salt Lake City",
    title: "Salt Lake City — Food Truck Guide",
    url: "https://www.slc.gov/ed/salt-lake-city-food-truck-guide/",
    what: "The city's step-by-step guide, city and county requirements side by side, plus agency contacts."
  },
  slcGuidePdf: {
    kind: "Salt Lake City",
    title: "Salt Lake City — Food Truck Guide (PDF, includes commissary list)",
    url: "https://www.slcdocs.com/ed/SLCFoodTruckGuide.pdf",
    what: "The printable version. Contains the list of roughly two dozen approved commissaries and the named truck inspectors."
  },
  slcMobileLicense: {
    kind: "Salt Lake City",
    title: "Salt Lake City — Mobile Food Business license requirements",
    url: "https://www.slc.gov/Finance/business-licensing/license-information/mobile-food-business/",
    what: "License conditions, insurance and background check requirements, allowed zones, parking and distance limits."
  },
  slcPortal: {
    kind: "Salt Lake City",
    title: "Salt Lake City — Business Licensing application portal",
    url: "https://slcgov.my.site.com/BusinessLicensing/s/",
    what: "Where the city business license application is actually filed."
  },
  slcFeeSchedule: {
    kind: "Salt Lake City",
    title: "Salt Lake City — Consolidated Fee Schedule",
    url: "https://tools.slc.gov/feeschedule/",
    what: "The official fee amounts. Mobile food business fees are around page 15. Use this rather than any third-party estimate."
  },
  slcOrd569: {
    kind: "Salt Lake City",
    title: "Salt Lake City Code 5.69 — Mobile food businesses",
    url: "https://codelibrary.amlegal.com/codes/saltlakecityut/latest/saltlakecity_ut/0-0-0-48223",
    what: "The governing city ordinance for mobile food businesses, cited by the city's own license page."
  },
  slcOrd21A: {
    kind: "Salt Lake City",
    title: "Salt Lake City Code 21A.36.160 — zoning provisions",
    url: "https://codelibrary.amlegal.com/codes/saltlakecityut/latest/saltlakecity_ut/0-0-0-67868#JD_21A.36.160",
    what: "The zoning section the city's mobile food business page points to."
  },
  slcZoningMap: {
    kind: "Salt Lake City",
    title: "Salt Lake City — zoning map",
    url: "https://maps.slc.gov/mws/zoning.htm",
    what: "Check whether a given address falls in M-1, M-2, D-1 through D-4, or G-MU."
  },
  slcTransport: {
    kind: "Salt Lake City",
    title: "Salt Lake City — Transportation Division permits",
    url: "https://www.slc.gov/mystreet/permits/",
    what: "The permit that can extend right-of-way parking beyond the two-hour default."
  },
  slcFogRef: {
    kind: "Salt Lake City",
    title: "Salt Lake City Public Utilities — Fats, Oils and Grease (FOG) program",
    url: "https://www.slc.gov/utilities/pretreatment-fats-oils-grease-fog/",
    what: "Grease interceptor obligations under city ordinance 17.36.140, cleaning frequencies, and program contacts."
  },
  slcPretreatment: {
    kind: "Salt Lake City",
    title: "Salt Lake City Public Utilities — Wastewater Pretreatment",
    url: "https://www.slc.gov/utilities/wastewater-pretreatment/",
    what: "The broader pretreatment program that governs what you may discharge to the sewer."
  },
  slcDevServicesRef: {
    kind: "Salt Lake City",
    title: "Salt Lake City — Development Services (building & plumbing permits)",
    url: "https://www.slc.gov/buildingservices/",
    what: "Where building and plumbing permits come from, and who answers grease interceptor sizing questions."
  },
  slcReciprocal: {
    kind: "Salt Lake City",
    title: "Salt Lake City — reciprocal-based food truck checklist",
    url: "https://www.slc.gov/ed/salt-lake-city-food-truck-checklist-reciprocal-based/",
    what: "The shorter application path if you already hold a license from another Utah city."
  },

  /* ---- Utah state agencies ---- */
  utahCorp: {
    kind: "Utah state agency",
    title: "Utah Division of Corporations and Commercial Code",
    url: "https://corporations.utah.gov/",
    what: "Entity registration, name availability search, and annual renewals."
  },
  utahTap: {
    kind: "Utah state agency",
    title: "Utah Taxpayer Access Point (TAP)",
    url: "https://tap.utah.gov/",
    what: "Where you register for a sales tax account and file returns."
  },
  utahOsbr: {
    kind: "Utah state agency",
    title: "Utah Tax Commission — OneStop Business Registration shut down (Sept 12, 2024)",
    url: "https://tax.utah.gov/onestop-business-registration-osbr-system-is-shut-down-effective-september-12-2024",
    what: "Confirms the old OSBR portal is gone — register directly with the Tax Commission instead. Older guides still point at OSBR."
  },
  utahTaxRates: {
    kind: "Utah state agency",
    title: "Utah Tax Commission — sales and use tax rates by location",
    url: "https://tax.utah.gov/sales/rates",
    what: "Combined rates for every Utah city and county. A mobile business charges the rate where the sale happens."
  },
  utahDmvRef: {
    kind: "Utah state agency",
    title: "Utah Division of Motor Vehicles",
    url: "https://dmv.utah.gov/",
    what: "Vehicle and trailer registration and titling."
  },
  laborComm: {
    kind: "Utah state agency",
    title: "Utah Labor Commission — Industrial Accidents (workers' compensation)",
    url: "https://laborcommission.utah.gov/divisions/industrial-accidents/",
    what: "Workers' compensation obligations for Utah employers."
  },
  dws: {
    kind: "Utah state agency",
    title: "Utah Dept of Workforce Services — employer registration",
    url: "https://jobs.utah.gov/ui/employer/",
    what: "Unemployment insurance registration once you have employees."
  },

  /* ---- Federal & other ---- */
  irsEin: {
    kind: "Federal",
    title: "IRS — Apply for an EIN online",
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online",
    what: "The free, official EIN application. Never pay a third party for this."
  },
  sbaUtah: {
    kind: "Federal",
    title: "U.S. Small Business Administration — Utah District Office",
    url: "https://www.sba.gov/district/utah",
    what: "SBA loan programs and local resource partners."
  },
  sbdcRef: {
    kind: "Business support",
    title: "Utah Small Business Development Center",
    url: "https://utahsbdc.org/",
    what: "Free consulting and training for Utah entrepreneurs."
  },
  servsafe: {
    kind: "Business support",
    title: "ServSafe Manager certification",
    url: "https://www.servsafe.com/ServSafe-Manager",
    what: "One accepted route to the Certified Food Safety Manager credential the county requires."
  },
  ftl: {
    kind: "Business support",
    title: "Food Truck League",
    url: "https://foodtruckleague.com/",
    what: "Runs weekly rallies and league nights and maintains a registered truck roster."
  }
};

/* Sources tab is generated from REFS so nothing drifts out of sync. */
const SOURCES = Object.keys(REFS).map(function (k) {
  return { key: k, kind: REFS[k].kind, title: REFS[k].title, url: REFS[k].url, what: REFS[k].what };
});

/* ---------------------------------------------------------------------------
   LICENSING PATH COMPARISON — the trailer / sewage decision
   Each `numbers` row is [label, detail, refKey]. Each `also`, `pros`, `cons`
   entry is plain text. `refs` lists the documents behind the whole path.
   --------------------------------------------------------------------------- */
const PATHS = [
  {
    id: "A",
    name: "Mobile permit, self-contained tanks",
    tagline: "The standard food truck path. You carry your water in and your wastewater out.",
    verdict: "Cheapest and most flexible. The water ceiling is the catch.",
    sewage: "Onboard wastewater holding tank, dumped at an approved location. Nothing connects to a sewer.",
    numbers: [
      ["A trailer qualifies",
       "Utah Code §11-56-102 defines a food truck as a fully encased food service establishment “on a motor vehicle or on a trailer that a motor vehicle pulls; and from which a food truck vendor, standing within the frame of the vehicle, prepares, cooks, sells, or serves food.” Being towed does not disqualify you. R392-102-2 adopts these same definitions for the state sanitation rule.",
       "code1156"],
      ["Fresh water tank",
       "R392-102-7 sets an onboard potable water tank of at least 30 gallons for a food truck (10 gallons for a food cart), “measured down from the inlet.” SLCoHD's own construction guidelines are structured differently — 10 gallons if you have a hand sink only, 30 gallons with a three-compartment sink — so confirm which figure the county applies to you.",
       "r392_102_7"],
      ["Tank sizing method",
       "SLCoHD gives the formula Length × Width × Height ÷ 231 = gallons, and requires a food-grade, removable tank sloped for complete drainage. Water heater capacity counts toward the calculation.",
       "slcohdMobileGuide"],
      ["Wastewater tank",
       "R392-102-7: the wastewater holding tank “shall be sized 15% larger in capacity than the water supply tank.” SLCoHD works the examples: a 10 gal supply needs 11.5 gal of waste capacity; a 30 gal supply needs 34.5 gal.",
       "r392_102_7"],
      ["Where wastewater goes",
       "R392-102-7 permits removal at an approved commissary, a waste servicing area approved by the local health officer, or by a wastewater transport vehicle. SLCoHD requires disposal “at a SLCOHD approved location.”",
       "r392_102_7"],
      ["Illegal dumping",
       "SLCoHD's guidelines state fines of $1,000.00 to $2,000.00 per violation for illegal dumping, such as into storm drains.",
       "slcohdMobileGuide"],
      ["Plumbing detail",
       "Wastewater conveyance lines without drip protection may not run under food or food-contact surfaces, and potable and wastewater hoses must be stored separately to prevent cross contamination.",
       "r392_102_7"],
      ["Hand sink spec",
       "SLCoHD requires a permanent hand washing station delivering hot water (minimum 100°F within 30 seconds) and cold water through a mixing valve, fed by a pump — gravity-fed systems are prohibited — plus a 12-inch minimum splashguard between the hand sink and food prep area.",
       "slcohdMobileGuide"]
    ],
    also: [
      "Signed commissary agreement — R392-102-3 requires a commissary with a three-compartment sink under pressure, refrigeration, a service sink and an exclusive hand sink; SLCoHD adds that a residential kitchen is never allowed",
      "Return to the commissary at a frequency set by the local health officer, with commissary logs; SLCoHD's guidelines call for a daily return for carts",
      "Restroom agreement with a facility within 500 feet of the vending location, open during all your operating hours (SLCoHD)",
      "Mobile plan review before construction — and R392-102-5 explicitly names “conversion of an existing vehicle or trailer” as a trigger"
    ],
    pros: [
      "Lowest upfront cost by a wide margin",
      "Statewide reciprocity under Utah Code §11-56-103 — other Utah cities must honor a current license in good standing",
      "Festivals, catering and multiple cities all stay open to you",
      "No building permit, no landlord construction negotiation"
    ],
    cons: [
      "~30 gallons of water is your entire allowance for a service — handwashing, warewashing and prep combined",
      "A commissary round trip at whatever frequency the health officer sets",
      "In Salt Lake City a trailer cannot operate in the public right-of-way at all — the city allows mobile food truck vehicles, explicitly “NO TRAILERS,” so you're on private property regardless",
      "Grease-heavy menus fill a wastewater tank fast"
    ],
    refs: ["code1156", "r392_102_7", "r392_102_3", "r392_102_5", "slcohdMobileGuide", "slcohdMobile", "slcGuidePdf"]
  },

  {
    id: "B",
    name: "Mobile permit, connected to water & sewer",
    tagline: "Still a mobile food business — but plumbed in at your site. This option is written into the state rule and most people don't know it exists.",
    verdict: "Probably your best fit, if the health officer signs off and your site has a sewer lateral.",
    sewage: "Straight into the public sanitary sewer. No tank, no ceiling, no dump run.",
    numbers: [
      ["The enabling rule",
       "R392-102-7 allows a mobile food business to use an adjacent potable water source under pressure instead of an onboard tank — but only where the food truck is “concurrently connected to a public sanitary sewer system in a manner approved by the local health officer.” This is the whole basis for Path B.",
       "r392_102_7"],
      ["Water and sewer are one package",
       "The rule ties the two together deliberately. You cannot take the pressurized water connection without the sanitary sewer connection.",
       "r392_102_7"],
      ["Discretion sits with the county",
       "“In a manner approved by the local health officer” means Salt Lake County decides what a compliant connection looks like — backflow prevention, air gaps, the connection detail itself. Get this answer by phone before you spend anything.",
       "r392_102_7"],
      ["General plumbing compliance",
       "Where sanitary sewer connection applies, R392-102-7 requires compliance with local plumbing codes, environmental quality standards, health department regulations and the sewer district's own requirements.",
       "r392_102_7"],
      ["Grease control",
       "Expect the sewer authority's FOG rules to apply. In Salt Lake City that is ordinance 17.36.140: hydro-mechanical grease traps cleaned at minimum every 30 days (or sooner past 25% capacity), gravity grease interceptors every 90 days or at 25% capacity — the “25% rule.” Sizing questions go to SLC Development Services.",
       "slcFogRef"],
      ["Staying put is contemplated",
       "R392-102-4 provides a temporary permit for fixed-location operation of no more than 14 consecutive days, and an annual permit where the majority of operation occurs in one jurisdiction. Operating from one place does not by itself force a different permit class.",
       "r392_102_4"],
      ["Commissary — check carefully",
       "R392-102-3 does contain a narrow exemption: a tier one mobile food business may operate without a commissary if it meets all six listed conditions, including using no temperature-controlled products and storing no prepared food between operating days. An Indian menu will almost certainly fail that test, so assume the commissary still applies until SLCoHD tells you otherwise.",
       "r392_102_3"]
    ],
    also: [
      "A site with a legal sanitary sewer lateral you are permitted to tie into",
      "A plumbing permit from the city, and very likely a grease interceptor",
      "A property owner willing to allow the connection",
      "Written confirmation from SLCoHD that the connection is approved and what it must look like"
    ],
    pros: [
      "Removes the water and wastewater ceiling entirely — the thing that most constrains an Indian menu",
      "You keep the mobile permit, so reciprocity under §11-56-103 survives and you can still unhook for a festival",
      "Far cheaper than a permanent build-out",
      "No dump run"
    ],
    cons: [
      "Approval is discretionary — the local health officer can say no",
      "Ties you to a specific site with sewer access",
      "Grease interceptor cost plus an ongoing cleaning contract and record-keeping",
      "A plumbing permit, and possibly landlord construction consent"
    ],
    refs: ["r392_102_7", "r392_102_4", "r392_102_3", "slcFogRef", "slcPretreatment", "slcDevServicesRef", "code1156_103"]
  },

  {
    id: "C",
    name: "Permanent food establishment",
    tagline: "The trailer stops being a mobile unit. The site becomes a restaurant, and is regulated like one.",
    verdict: "No constraints on your kitchen — and by far the highest cost and lowest flexibility.",
    sewage: "Public sewer or a health-department-approved wastewater treatment system, with a grease interceptor.",
    numbers: [
      ["Sewage",
       "All sewage must be disposed of via a public sewer or a Health Department approved individual wastewater treatment system. Water supply must come from an approved public or private source.",
       "slcohdPlanReview"],
      ["Grease interceptor",
       "Required where needed and must be accessible for cleaning. Water above 140°F and food waste may not be discharged into it. Sizing and location come from your local sewer district.",
       "slcohdPlanReview"],
      ["Sinks",
       "A three-compartment sink meeting NSF Standard #2, with compartments large enough for your largest equipment. Hand sinks convenient to all food prep, warewashing, toilet and customer areas — within 15 feet of the point of use, 25 feet maximum. Plus a mop or janitorial service sink.",
       "slcohdPlanReview"],
      ["Restrooms",
       "Toilet rooms need hand sinks with hot and cold water, hand cleaner and drying devices, tight-fitting self-closing doors, waste containers, covered sanitary product receptacles in women's rooms, and mechanical ventilation providing a complete air change every 15 minutes.",
       "slcohdPlanReview"],
      ["Floors, walls, ceilings",
       "Coving required at floor-wall junctures with a ¼ inch radius and 4 inches in height. All surfaces light coloured, smooth, non-absorbent and easily cleanable. Exposed studs and joists prohibited in prep areas. No carpet in preparation, storage or utility areas.",
       "slcohdPlanReview"],
      ["Ventilation",
       "A Type I hood with filters above all commercial heat processing appliances producing grease, vapours or smoke — overhanging the cooking surface by at least 6 inches, with a maximum 4-foot vertical distance from hood lip to cooking surface.",
       "slcohdPlanReview"],
      ["Water heater",
       "Minimum 50-gallon water heater with 50,000 BTU or 11 KW capacity for facilities without critical plumbing fixtures.",
       "slcohdPlanReview"],
      ["Plan review packet",
       "Application and fee, site plan, dimensional floor plan for the entire facility, complete equipment schedule and specifications, plumbing, mechanical and room finish schedules, and your proposed menu. Construction must begin within 6 months (180 days) of plan approval, and any change requires resubmission.",
       "slcohdPlanReview"],
      ["Permits are not transferable",
       "On a change of ownership the new owner must apply for a new permit and pay all applicable fees. Worth knowing before you structure any sale or partnership.",
       "slcohdPermits"]
    ],
    also: [
      "A building permit and zoning / land use approval from the city",
      "Likely ADA, parking and accessibility requirements",
      "A long-term lease or ownership of the site",
      "Grease interceptor sizing from the sewer district, plus FOG program compliance"
    ],
    pros: [
      "No wastewater or water ceiling at all",
      "No commissary agreement, no restroom agreement, no dump run",
      "You can build the kitchen your menu actually needs — tandoor, fryers, real ventilation",
      "A fixed address builds regulars in a way a rotating truck cannot"
    ],
    cons: [
      "Dramatically more expensive — plan review, build-out, permits, sewer connection, interceptor",
      "You lose mobility and the statewide reciprocity in §11-56-103 entirely",
      "Locked to one site and its lease",
      "Much longer timeline before you can open"
    ],
    refs: ["slcohdPlanReview", "slcohdPermanent", "slcohdPermits", "slcFogRef", "slcDevServicesRef"]
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

/* Call scripts. Each item is [question, refKey or null] */
const ASK_HEALTH = [
  ["We're building a towed trailer, not a self-propelled truck. Do you permit it as a mobile food unit? Utah Code §11-56-102 defines a food truck as a fully encased food service establishment “on a motor vehicle or on a trailer that a motor vehicle pulls” — we want to confirm the county applies it that way.", "code1156"],
  ["If we park on private property and connect to the site's pressurized potable water AND the public sanitary sewer, will you approve that under R392-102-7 and keep us on a mobile permit?", "r392_102_7"],
  ["What does “in a manner approved by the local health officer” require in practice — backflow prevention, an air gap, a specific sewer connection detail, a grease interceptor?", "r392_102_7"],
  ["If we are sewer-connected, do we still need a commissary agreement and a restroom agreement? Would we ever qualify for the tier one commissary exemption in R392-102-3?", "r392_102_3"],
  ["At what point would you reclassify a stationary trailer as a permanent food establishment — is it time in one place, the utility connections, or something else?", "slcohdPlanReview"],
  ["Your construction guidelines list a 10-gallon minimum fresh water tank for a hand-sink-only unit, but R392-102-7 says 30 gallons for a food truck. Which applies to us?", "slcohdMobileGuide"],
  ["Our menu includes deep frying and possibly a tandoor. Any specific requirements or restrictions for those in a mobile unit?", null],
  ["What are the current mobile plan review and annual food service permit fees, and which risk tier would our menu fall into?", "slcohdMobile"]
];

const ASK_CITY = [
  ["Is a food trailer allowed to operate on private property at this address, and under what zoning designation?", "slcZoningMap"],
  ["If the trailer stays in one place and is connected to utilities, does the city treat it as a structure requiring a building permit?", "slcDevServicesRef"],
  ["What plumbing permit do we need to connect to the sewer lateral, and who inspects it?", "slcDevServicesRef"],
  ["Does the sewer authority require a grease interceptor for our operation, and how is it sized?", "slcFogRef"],
  ["Are there restroom requirements the city imposes on a stationary food trailer that the health department doesn't?", "slcOrd569"],
  ["Is there any limit on how long a trailer may remain parked at one location?", "slcMobileLicense"],
  ["What is the actual mobile food business license fee for our setup — base plus per vehicle?", "slcFeeSchedule"]
];

/* ---------------------------------------------------------------------------
   PHASES
   `refs` on a step is [refKey, "what this source establishes for this step"].
   A step with no refs is operational judgment, not regulation.
   --------------------------------------------------------------------------- */
const PHASES = [
  /* ================= PHASE 0 — the gating decision ================= */
  {
    id: "p0", name: "Licensing Path Decision", icon: "🔀",
    sub: "Trailer + sewage. This decides which permit you pursue and roughly half your startup cost — settle it before you buy anything. See the Path Decision tab for the full comparison with citations.",
    steps: [
      { id:"p0s1", title:"Confirm SLCoHD will permit a towed trailer as a mobile food unit", est:0,
        why:"Utah Code §11-56-102 defines a food truck as a fully encased food service establishment on a motor vehicle OR on a trailer that a motor vehicle pulls — so a trailer qualifies in state law. Confirm the county applies it the same way.",
        checklist:["Call 385-468-3845 and ask directly","Get the answer in writing or by email if you can","Note the name of who told you","Ask whether their Mobile Food Unit Guidelines apply unchanged to trailers"],
        contacts:["slcohd"],
        refs:[["code1156","§11-56-102 defines a food truck to include a unit “on a trailer that a motor vehicle pulls”"],
              ["r392_102_2","The state sanitation rule adopts the §11-56-102 definitions of food truck and food cart"],
              ["slcohdMobileGuide","SLCoHD's own definition describes a mobile food unit as “vehicle-mounted” — narrower than the statute, which is why you ask"]],
        tips:"That gap between the state definition and the county's wording is exactly why this is question one, not an assumption."
      },
      { id:"p0s2", title:"Ask the sewer-connection question (R392-102-7)", est:0,
        why:"The single highest-leverage question in your whole plan. State rule allows a mobile food business to skip the onboard water tank and connect to pressurized water — but only when concurrently connected to a public sanitary sewer 'in a manner approved by the local health officer.'",
        checklist:["Read R392-102-7 before you call so you can cite it","Ask whether SLCoHD approves this for a stationary trailer","Ask exactly what a compliant connection requires (backflow prevention, air gap, connection detail)","Ask whether commissary and restroom agreements still apply if you're sewer-connected","Log the answer and who gave it in the notes below"],
        contacts:["slcohd"],
        refs:[["r392_102_7","The pressurized-water alternative and its “concurrently connected to a public sanitary sewer” condition"],
              ["r392_102","Full rule text, so you can read the section in context before calling"],
              ["r392_102_3","The tier one commissary exemption and its six conditions"]],
        tips:"If the answer is yes, you get an unconstrained kitchen on a mobile permit. If it's no, your menu has to fit a ~30 gallon water budget or you're heading toward a permanent establishment."
      },
      { id:"p0s3", title:"Verify sewer access and landlord consent at your target site", est:0,
        why:"Path B only works if there is a legal sanitary sewer lateral you're allowed to tie into, and an owner who will let you.",
        checklist:["Confirm a sewer lateral exists at the site","Identify which sewer district or city utility serves it","Ask the property owner about permitting a connection","Ask about a plumbing permit and who inspects it","Ask the sewer authority whether a grease interceptor is required and how it's sized"],
        contacts:["slcFog","slcDevServices"],
        refs:[["slcFogRef","Ordinance 17.36.140 grease interceptor obligations; traps cleaned every 30 days, gravity interceptors every 90 days or at 25% capacity"],
              ["slcPretreatment","What may lawfully be discharged to the sewer"],
              ["slcDevServicesRef","Where plumbing permits and interceptor sizing answers come from"],
              ["r392_102_7","Requires compliance with local plumbing codes and sewer district requirements where sewer connection applies"]],
        tips:"Interceptor purchase plus an ongoing cleaning contract and record-keeping are easy to leave out of a budget. Price them now."
      },
      { id:"p0s4", title:"Measure your menu's actual water and wastewater load", est:0,
        why:"An Indian menu is water- and grease-heavy: rinsing rice and dal, deep frying, tempering, and a lot of pot washing. Thirty gallons has to cover handwashing, warewashing and prep combined.",
        checklist:["Do a full test service at a commissary and meter the water","Separate handwash, warewash and prep water","Estimate fryer oil volume and disposal method","Compare the total against a 30 gal fresh / 34.5 gal waste system","Decide whether the menu fits the tank or the tank has to go"],
        refs:[["r392_102_7","30 gallon minimum fresh tank for a food truck; wastewater tank 15% larger"],
              ["slcohdMobileGuide","Tank sizing formula (L × W × H ÷ 231) and worked examples — 30 gal supply needs 34.5 gal of waste capacity"]],
        tips:"Measure before you decide, not after. If a realistic service runs 60+ gallons, Path A is out — and finding that out now costs you an afternoon instead of a trailer build."
      },
      { id:"p0s5", title:"Check city zoning and building requirements for a stationary trailer", est:0,
        why:"The health department and the city are separate gates. A trailer that never moves may be treated as a structure, which pulls in building permits, restrooms and accessibility.",
        checklist:["Confirm the zoning at your target address allows a food trailer","Ask whether a permanently sited trailer needs a building permit","Ask whether there's a time limit on parking at one location","Ask about on-site restroom requirements","Ask about parking, accessibility and screening requirements"],
        contacts:["slcLicensing","slcDevServices","msd"],
        refs:[["slcGuidePdf","States that public right-of-way operation is for mobile food truck vehicles, “NO TRAILERS”"],
              ["slcMobileLicense","City license conditions, allowed zones and operating limits"],
              ["slcZoningMap","Check the zoning designation for a specific address"],
              ["slcOrd569","The governing city ordinance for mobile food businesses"],
              ["slcoBizLic","Unincorporated county licensing now runs through the Municipal Services District"]],
        tips:"Because Salt Lake City bars trailers from the right-of-way entirely, a trailer is a private-property operation there no matter which permit you hold."
      },
      { id:"p0s6", title:"Price all three paths side by side", est:0,
        why:"The gap between a self-contained mobile unit and a permanent establishment is large enough to change whether the business is viable.",
        checklist:["Path A: trailer + tanks + commissary rent + permits","Path B: Path A minus commissary, plus sewer/water connection, plumbing permit, grease interceptor + cleaning contract","Path C: full plan review, build-out, building permit, sewer connection, interceptor, restrooms","Include ongoing monthly cost, not just upfront","Put the numbers in the Budget tab"],
        refs:[["slcFeeSchedule","Official Salt Lake City fee amounts — use these instead of third-party estimates"],
              ["slcohdMobile","Call SLCoHD for the current official plan review and permit fees"],
              ["slcohdPlanReview","The full scope of what a permanent facility must be built to, which is what drives the Path C number"]]
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
        why:"A tight 6–10 item menu is what fits in a trailer and what lets you hit speed-of-service. Pick a lane the SLC market isn't saturated in.",
        checklist:["Write a one-sentence concept statement","Draft a 6–10 item core menu","Identify 2–3 signature items","Name your target customer (lunch crowd / breweries / events / late night)"],
        refs:[["r392_102_5","Every menu item drives your plan review packet — menu changes that affect risk assessment trigger a new review"]],
        tips:"Keep the menu small partly for regulatory reasons: each item needs its own food flow chart and its own temperature control plan."
      },
      { id:"p1s2", title:"Scout the market: existing trucks and gaps", est:0,
        why:"You need to know who you're competing against, where they park, and what they charge.",
        checklist:["List 15+ active SLC-area trucks and their cuisine","Note their typical price points","Visit 3 truck rallies / brewery lots and count traffic","Photograph menu boards for pricing reference"],
        refs:[["ftl","Maintains a roster of registered Utah trucks and runs the rallies where you can see them all in one place"]]
      },
      { id:"p1s3", title:"Validate demand and target locations", est:0,
        why:"Location is the single biggest revenue lever. Confirm your spots before you buy a trailer.",
        checklist:["List 10 candidate locations (office parks, breweries, apartment complexes, industrial areas)","Confirm each is in an allowed zone or on private property with permission","Ask whether each site has a sanitary sewer lateral (this matters for Path B)","Talk to 3 property/brewery managers about hosting you","Map lunch-hour foot traffic for your top 3"],
        refs:[["slcMobileLicense","Allowed zones (M-1, M-2, D-1 through D-4, G-MU), the two-hour right-of-way limit and the 12-hour/24-hour cap"],
              ["slcZoningMap","Check the zoning of each candidate address"],
              ["slcGuidePdf","Confirms trailers are not permitted in the public right-of-way in Salt Lake City"]],
        tips:"Since you're building a trailer, screen candidate sites for sewer access at the same time you screen them for foot traffic. It costs nothing to ask and it's what unlocks Path B."
      },
      { id:"p1s4", title:"Build a startup budget and break-even model", est:0,
        why:"Know your number before you commit. Trailer + build-out + permits + first 3 months of operating cash.",
        checklist:["Estimate trailer/build-out cost","Add licensing + permits (see Budget tab)","Add 3 months of commissary rent and food cost","Calculate covers/day needed to break even","Decide your funding source"],
        refs:[["slcFeeSchedule","Official city fee amounts"],
              ["sbdcRef","Free advising that includes financial modelling for Utah startups"]],
        tips:"Commissary rent is typically the largest recurring cost after food and labour — roughly $300–$1,500/month (est., varies widely by kitchen)."
      },
      { id:"p1s5", title:"Specify the trailer against the rules before you shop", est:0,
        why:"A cheap used unit that fails plan review costs more than a compliant one. Read the construction spec first.",
        checklist:["Read the SLCoHD construction guidelines end to end","Check tank capacities against your measured water need","Confirm hand sink, three-compartment sink and splashguard layout","Confirm the unit is self-contained and readily movable","Budget for inspection-driven retrofits"],
        refs:[["slcohdMobileGuide","The construction spec your unit will be judged against — tanks, sinks, water temperatures, splashguards"],
              ["r392_102_5","Plan review is required before construction AND before conversion of an existing vehicle or trailer"],
              ["r392_102_7","Tank minimums and plumbing separation rules"]],
        tips:"R392-102-5 names trailer conversion explicitly as a plan review trigger. Do not start cutting into a trailer before the county has seen your plans."
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
        checklist:["Choose LLC vs. sole proprietor vs. S-corp (talk to a CPA)","Check business name availability","File with Utah Division of Corporations","Register a DBA if you'll trade under a different name","Calendar the annual renewal"],
        contacts:["commerce"],
        refs:[["utahCorp","Entity registration, name availability search and annual renewal"],
              ["slcGuide","The city's guide lists registering with the Utah Dept of Commerce as a required step"]],
        tips:"The LLC annual renewal is easy to forget. Put it on a calendar the day you file."
      },
      { id:"p2s2", title:"Get a federal EIN from the IRS", est:0,
        why:"Free, takes minutes online, and you need it for the bank account, payroll and tax registration.",
        checklist:["Apply online at irs.gov","Save the EIN confirmation letter (CP 575) to a permanent folder"],
        refs:[["irsEin","The official, free EIN application"]],
        tips:"Never pay a third party for an EIN. It is free directly from the IRS."
      },
      { id:"p2s3", title:"Register for a Utah sales tax license", est:0,
        why:"Prepared food is taxable. You must collect and remit sales tax from day one.",
        checklist:["Register through Utah Taxpayer Access Point (TAP)","Note your filing frequency (monthly/quarterly/annual)","Confirm the correct combined rate for each city you vend in","Configure the tax rate in your POS"],
        contacts:["taxcomm"],
        refs:[["utahTap","Where sales tax registration and filing now happen"],
              ["utahOsbr","Confirms the old OneStop Business Registration system shut down 12 Sept 2024 — older guides still point at it"],
              ["utahTaxRates","Combined rates by city and county; a mobile business charges the rate where the sale happens"]],
        tips:"Rates differ between Salt Lake City, Murray, Sandy and West Valley. If you work multiple cities your POS needs to handle that."
      },
      { id:"p2s4", title:"Open a business bank account and set up bookkeeping", est:0,
        why:"Mixing personal and business money destroys the liability protection you just paid for, and makes taxes miserable.",
        checklist:["Open a business checking account (bring EIN + formation docs)","Get a business debit/credit card","Set up bookkeeping software","Decide on a CPA or bookkeeper"]
      },
      { id:"p2s5", title:"Confirm which city (or cities) you'll be based in", est:0,
        why:"Salt Lake County is a patchwork: Salt Lake City, West Valley, Sandy, Murray, West Jordan, Millcreek and unincorporated areas all license separately.",
        checklist:["Identify your primary operating city","Call that city's business licensing division to confirm food trailers are permitted","Check unincorporated areas via the Municipal Services District","Note each city's fee and process"],
        contacts:["msd","slcLicensing"],
        refs:[["slcohdMobile","Step one of the county's own nine-step process is confirming your business type with your city's licensing division"],
              ["slcoBizLic","Salt Lake County no longer issues business licenses — that moved to the Municipal Services District (385-910-5600)"],
              ["code1156_103","Sets the ceiling on what any Utah city may charge and require once you hold one licence"]]
      }
    ]
  },

  /* ================= PHASE 3 ================= */
  {
    id: "p3", name: "Money, Insurance & Risk", icon: "💵",
    sub: "Funding lined up, insurance in force. Salt Lake City won't issue your license without a certificate of insurance.",
    steps: [
      { id:"p3s1", title:"Secure funding", est:0,
        why:"The trailer is usually the largest single cheque you'll write. Know where it's coming from before you shop.",
        checklist:["Total your startup number from Phase 1","Compare: savings, SBA microloan, equipment financing, investor","Prepare a written business plan for lenders","Book a free session with the Utah SBDC"],
        contacts:["sbdc"],
        refs:[["sbdcRef","Free consulting and training for Utah entrepreneurs"],
              ["sbaUtah","SBA loan programmes and local resource partners"]]
      },
      { id:"p3s2", title:"Get commercial insurance", est:0,
        why:"Required. Salt Lake City requires a certificate of insurance naming the City as additional insured for the mobile food business license.",
        checklist:["Get quotes for general liability","Add commercial auto covering the tow vehicle and trailer","Add property/equipment coverage","Request a certificate naming Salt Lake City as additional insured","Ask each event/property host what limits they require"],
        refs:[["slcMobileLicense","Certificate of insurance required per Utah Code; city named as additional insured"],
              ["slcGuidePdf","Lists the certificate of insurance showing Salt Lake City as additional insured among required documents"]],
        tips:"Get the certificate wording right the first time — a certificate without the additional-insured line will bounce your license application."
      },
      { id:"p3s3", title:"Workers' compensation (if you hire)", est:0,
        why:"Utah requires workers' comp coverage for employees. Getting this wrong is expensive.",
        checklist:["Determine if you'll have W-2 employees","Get a workers' comp quote","Register for Utah unemployment insurance with DWS","Set up payroll"],
        refs:[["laborComm","Workers' compensation obligations for Utah employers"],
              ["dws","Unemployment insurance employer registration"]]
      }
    ]
  },

  /* ================= PHASE 4 ================= */
  {
    id: "p4", name: "The Trailer & Equipment", icon: "🚚",
    sub: "Build or buy a unit that will actually pass plan review and the pre-opening inspection.",
    steps: [
      { id:"p4s1", title:"Buy or build the mobile unit", est:0,
        why:"The unit has to be self-contained and readily movable, with the equipment the health department's checklist expects.",
        checklist:["Inspect candidate units against the SLCoHD construction guidelines","Verify title/VIN and no liens","Get a mechanical and axle inspection","Negotiate retrofit costs into the price","Submit plan review BEFORE any conversion work starts"],
        contacts:["slcohd"],
        refs:[["slcohdMobileGuide","The full construction spec, including the self-contained and readily movable requirement"],
              ["r392_102_5","Plan review required before construction or conversion of an existing vehicle or trailer"],
              ["slcohdMobile","The pre-opening inspection checklist the unit will be measured against"]],
        tips:"Read the guidelines BEFORE you buy. Buying first and retrofitting later is the classic expensive mistake."
      },
      { id:"p4s2", title:"Water and wastewater systems", est:0,
        why:"Specific, checkable requirements — inspectors measure these.",
        checklist:["Fresh water tank sized to the rule and to your measured need","Food-grade, removable tank sloped for complete drainage","Wastewater tank at least 15% larger than the fresh tank","Hand wash sink with hot (100°F within 30 seconds) and cold water via mixing valve","Pump-fed system — gravity feed is prohibited","12-inch minimum splashguard between hand sink and prep area","Wastewater lines not routed under food-contact surfaces","Separate storage for potable and wastewater hoses"],
        refs:[["r392_102_7","30 gal minimum for a food truck; wastewater 15% larger; disposal points; hose separation; drip protection"],
              ["slcohdMobileGuide","Sizing formula, drainage slope, water temperatures, mixing valve, pump requirement, splashguard dimension"]],
        tips:"The 15%-larger wastewater tank rule trips up a lot of self-builds. Measure before you plumb."
      },
      { id:"p4s3", title:"Cooking equipment, refrigeration and food protection", est:0,
        why:"Temperature control and physical food protection are the top inspection findings.",
        checklist:["Refrigeration capable of holding 41°F or below","Hot holding capable of 135°F or above","Calibrated probe thermometers","Sneeze guard / overhead protection at the service window","Three-compartment sink maintaining a 110°F wash solution (on unit or at commissary)","Adequate dry and cold storage","Food-grade surfaces throughout"],
        refs:[["slcohdMobile","Inspection checklist items — temperature control, sneeze guard and overhead protection"],
              ["slcohdMobileGuide","Three-compartment sink and 110°F wash solution requirement"],
              ["r392_102_11","The food safety section of the state mobile rule — read alongside your plan review packet"]]
      },
      { id:"p4s4", title:"Fire suppression, propane and extinguishers", est:0,
        why:"You need to pass a fire safety inspection, and reciprocity in other Utah cities depends on having current evidence of one.",
        checklist:["Install a UL-300 compliant hood fire suppression system","Get the suppression system serviced and tagged by a licensed company","Correct class extinguisher(s), inspected and tagged","Propane tanks properly mounted, secured and leak-tested","Ask specifically about tandoor installation before buying one","Schedule the fire inspection with your city's fire dept"],
        contacts:["slcFire"],
        refs:[["code1156_103","A city may refuse reciprocity where you lack current evidence of passing a fire safety inspection"],
              ["slcGuidePdf","City fire inspection contact and process"]],
        tips:"A tandoor raises separate questions — solid fuel vs gas changes hood type, suppression requirements and possibly whether it's allowed in a mobile unit at all. Ask the health department AND the fire inspector before buying."
      },
      { id:"p4s5", title:"Register and plate the trailer and tow vehicle", est:0,
        why:"Salt Lake City's application asks for registration and copies of driver's licenses for all drivers.",
        checklist:["Register/title the trailer with Utah DMV","Register the tow vehicle","Confirm commercial registration class if applicable","Collect copies of driver's licenses for every driver","Verify safety/emissions requirements for the county"],
        contacts:["dmv"],
        refs:[["utahDmvRef","Vehicle and trailer registration and titling"],
              ["slcGuidePdf","City application requires truck registration and driver's licence copies for all drivers"]]
      },
      { id:"p4s6", title:"Generator, power and ventilation", est:0,
        why:"Underpowered electrical is the most common cause of a miserable first service.",
        checklist:["Size the generator to peak simultaneous load","Plan for noise limits at residential-adjacent sites","Shore power capability for commissary and events","Adequate ventilation and hood CFM for high-heat Indian cooking"],
        refs:[["r392_102_3","A commissary must provide an electrical outlet complying with state codes where needed"]]
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
        refs:[["slcohdMobile","Step 2 of the county's nine-step process; registration by phone, typically Thursdays at 10am but not weekly"]],
        tips:"This gates everything after it. Call the week you decide to move forward."
      },
      { id:"p5s2", title:"Get food handler permits for every worker", est:20,
        why:"Every food worker needs a valid Utah food handler card. It's online-only in Salt Lake County.",
        checklist:["Pick an approved provider from the county's list","Complete the course and assessment","Print/save cards for each worker","Track expiration dates","Keep copies in the unit"],
        contacts:["slcohdMain"],
        refs:[["slcohdFoodHandlers","The list of approved online providers; confirms no in-person classes are offered in Salt Lake County; replacement cards $15"]],
        tips:"Budget roughly $15–25 per worker (est.). Only the $15 replacement card fee is stated officially."
      },
      { id:"p5s3", title:"Certify and register a Food Safety Manager", est:0,
        why:"The health department requires you to register a Certified Food Safety Manager (ServSafe or equivalent) as part of the permit process.",
        checklist:["Take a ServSafe Manager (or equivalent) course","Pass the proctored exam","Register the certificate with SLCoHD","Calendar the renewal"],
        contacts:["slcohd"],
        refs:[["slcohdMobile","Step 8 of the county process — register a Certified Food Safety Manager"],
              ["servsafe","One accepted route to the credential"],
              ["r392_102_4","Local health officers may grant exemptions from manager certification under certain criteria — ask whether any apply"]]
      },
      { id:"p5s4", title:"Sign a commissary agreement", est:0,
        why:"Required in nearly all cases. A residential kitchen is NOT allowed — every mobile unit must use a health-department-approved commissary.",
        checklist:["Get the approved commissary list from the SLC Food Truck Guide PDF","Tour 3 candidates — check hours, storage, dump station, water fill","Confirm it has a 3-comp sink under pressure, refrigeration, service sink and an exclusive hand sink","Compare monthly cost and what's included","Get the agreement SIGNED by the commissary owner","Submit it to SLCoHD for approval"],
        contacts:["slcohd"],
        refs:[["r392_102_3","What a commissary must provide; return frequency set by the local health officer; the narrow tier one exemption and its six conditions"],
              ["slcohdMobile","Commissary required for all mobile food units; a residential kitchen is not allowed"],
              ["slcGuidePdf","Lists roughly two dozen approved commissaries in the Salt Lake City area"],
              ["slcohdMobileGuide","Commissary duties including logs documenting daily vendor activity"]],
        tips:"Access hours matter more than price. A cheap kitchen you can't get into at 5am is worthless. Note also that the tier one exemption requires using no temperature-controlled products — an Indian menu will not qualify."
      },
      { id:"p5s5", title:"Secure a restroom agreement", est:0,
        why:"The health department requires an arrangement with a local business for restroom access — and specifically calls it out for trailers.",
        checklist:["Identify a business within 500 feet of your primary location","Confirm it is open during ALL your operating hours","Get a written, signed restroom agreement","Submit with your permit packet"],
        contacts:["slcohd"],
        refs:[["slcohdMobileGuide","Restroom agreement required for a facility within 500 feet of the vending location, open during all hours of operation"],
              ["slcGuide","Restroom agreement listed as a county requirement, noted for trailers"]]
      },
      { id:"p5s6", title:"Write food flow charts for every menu item", est:0,
        why:"Required with the plan review application — one flow chart per menu item, receiving through service.",
        checklist:["List every menu item","For each: receiving → storage → prep → cook → hold → serve","Note critical control points and temperatures","Note which steps happen at the commissary vs. on the unit"],
        contacts:["slcohd"],
        refs:[["slcGuidePdf","Food flow charts required for every menu item as part of the county packet"],
              ["r392_102_5","Plan review submittals include the menu, anticipated volumes, equipment and plumbing schedules"]],
        tips:"Another reason to keep the menu small — every added item is another flow chart and another thing to hold at temperature."
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
        checklist:["Download the Mobile Plan Review Application","Attach food flow charts for every item","Attach signed commissary agreement","Attach restroom agreement","Attach trailer registration and vending route","Pay the plan review fee","Record your submission date and reviewer name"],
        contacts:["slcohd"],
        refs:[["slcohdMobile","Step 5 of the county process; application forms and fee"],
              ["r392_102_5","When plan review is triggered and the full submittal list; conversion of a trailer is explicitly named"],
              ["slcohdPay","Where health permit fees are paid online"],
              ["slcGuidePdf","County submittal list including registration, vending route and food flow charts"]],
        tips:"Third-party guides put plan review around $380–$550 (est.). Call 385-468-3845 for the current official fee — do not budget off an estimate."
      },
      { id:"p6s2", title:"Submit the Food Service Permit application + fee", est:425,
        why:"The permit itself. Annual, and not transferable if the business changes owners.",
        checklist:["Complete the Food Service Permit application","Pay the permit fee","Confirm which risk tier your menu falls into","Confirm annual vs. temporary permit type","Calendar the annual renewal date"],
        contacts:["slcohd"],
        refs:[["slcohdMobile","Step 7 of the county process"],
              ["r392_102_4","Temporary permit for fixed-location operation up to 14 consecutive days; annual permit where the majority of operation occurs in one jurisdiction; renewal information due within 30 days before expiry"],
              ["slcohdPermits","Permits are not transferable — a new owner must apply and pay all applicable fees"]],
        tips:"Third-party 2026 guides estimate roughly $350/yr (tier one) to $500/yr (tier two) — est. only. Higher-risk menus land in a higher tier."
      },
      { id:"p6s3", title:"Pass the pre-opening inspection", est:0,
        why:"The final health gate. An inspector walks your unit against the checklist.",
        checklist:["Self-audit against the inspection checklist first","Fill water tank, test hot water at the hand sink","Have thermometers, test strips and sanitiser on board","Have permits, food handler cards and manager cert on board","Schedule the inspection","Fix findings and re-inspect if needed"],
        contacts:["slcohd"],
        refs:[["slcohdMobile","The pre-opening inspection is step 9; the page lists the common inspection checklist items"],
              ["r392_102_16","How inspections are conducted and what follows a violation"],
              ["slcohdMobileGuide","The construction details inspectors measure against"]],
        tips:"Common findings: no hot water at the hand sink, undersized wastewater tank, missing overhead protection, no certified manager on record."
      },
      { id:"p6s4", title:"Post the permit and set up the inspection binder", est:0,
        why:"Inspectors check that the valid permit is posted and that worker documentation is present.",
        checklist:["Post the food service permit visibly in the unit","Binder: permit, plan review approval, commissary + restroom agreements","Binder: food handler cards, manager certificate","Binder: fire inspection evidence, insurance certificate, business licenses","Keep a duplicate set off the unit"],
        refs:[["slcohdMobile","Valid permit posted and worker documentation present are inspection checklist items"],
              ["code1156_103","A city may require you to carry relevant licences and inspection documentation while operating"]],
        tips:"That binder is also what lets you claim reciprocity in other Utah cities on short notice."
      }
    ]
  },

  /* ================= PHASE 7 ================= */
  {
    id: "p7", name: "City Licensing, Fire & Zoning", icon: "🏙️",
    sub: "One city license to start, then use Utah's reciprocity law to expand across the valley.",
    steps: [
      { id:"p7s1", title:"Apply for the city mobile food business license", est:300,
        why:"A current city business license is required for all mobile food businesses, with a separate fee for each vehicle.",
        checklist:["Apply through the city business licensing portal","Attach copies of health and transportation permits","Attach certificate of insurance naming the city as additional insured","Attach state tax ID proof","Attach driver's licenses for all drivers","Attach written property owner permission","Complete background checks for owner/drivers"],
        contacts:["slcLicensing","slcEcon"],
        refs:[["slcMobileLicense","License conditions: separate fee per vehicle, background checks for owner/drivers, insurance certificate, health department compliance"],
              ["slcPortal","Where the application is filed"],
              ["slcFeeSchedule","Official fee amounts — mobile food business fees around page 15"],
              ["slcGuidePdf","The full document checklist for a first-time city application"]],
        tips:"Third-party guides estimate ~$193 base plus ~$103 per vehicle (est.). Check the official Consolidated Fee Schedule for the real number."
      },
      { id:"p7s2", title:"Pass the city fire safety inspection", est:0,
        why:"Required to operate, and required evidence if you want other Utah cities to honor your license.",
        checklist:["Call the fire inspection line to schedule","Have suppression system service tags current","Have extinguishers tagged","Have propane installation ready to inspect","File the passing inspection in your binder"],
        contacts:["slcFire","truckInspectors"],
        refs:[["code1156_103","Cities may refuse reciprocity where current evidence of passing a fire safety inspection is absent"],
              ["slcGuidePdf","Fire inspection contact and the named city truck inspectors"]]
      },
      { id:"p7s3", title:"Learn the parking and zoning rules cold", est:0,
        why:"These are the rules that get units ticketed and licenses pulled — and several of them exclude trailers outright.",
        checklist:["Public right-of-way only in M-1, M-2, D-1, D-2, D-3, D-4, G-MU","Trucks only in the right-of-way — NO trailers","Max 2 hours at one right-of-way location, or up to 12 with a Transportation Division permit","Max 12 hours in any 24-hour period","Only one vehicle per block face","Keep 100 feet from restaurant doors on the same block unless waived","Vending window faces the sidewalk"],
        refs:[["slcMobileLicense","Allowed zones, two-hour limit, 12-hour cap, one vehicle per block face, 100-foot rule, vending window orientation"],
              ["slcGuidePdf","States mobile food truck vehicles “(NO TRAILERS)” may operate in the public right-of-way"],
              ["slcZoningMap","Check the zoning for a specific address"],
              ["slcOrd569","The governing ordinance"],
              ["slcOrd21A","The zoning section the city cites"],
              ["slcTransport","The permit that extends right-of-way parking beyond two hours"]],
        tips:"For a trailer, the right-of-way rules are mostly moot — you'll be on private property. But the 12-hour/24-hour cap still applies there."
      },
      { id:"p7s4", title:"Understand statewide reciprocity (Utah Code 11-56-103)", est:0,
        why:"This law is your expansion plan. Utah cities must honor a valid business license from another Utah municipality.",
        checklist:["Read §11-56-103","Confirm your license stays current and in good standing","Keep current health permit + fire inspection evidence on the unit","Ask each new city about its reciprocity application form","Note that a city may still require event permits and enforce zoning"],
        refs:[["code1156_103","Cities must recognise a current licence in good standing; may not require multiple licences, per-employee fees, background checks (except ice cream trucks), zoning documentation at application, or regulate vehicle size; may refuse only where a current health permit or fire inspection evidence is missing"],
              ["code1156","The full chapter including the definitions that make a trailer a food truck"],
              ["slcReciprocal","Salt Lake City's shorter reciprocal application path"]]
      },
      { id:"p7s5", title:"Register in the other cities you'll work", est:0,
        why:"Each city has its own reciprocity form, event permits and zoning. Do this before you accept a booking there.",
        checklist:["West Valley City","Sandy","Murray","West Jordan","Millcreek / unincorporated (Municipal Services District)","Draper, South Jordan, Taylorsville as needed"],
        contacts:["msd"],
        refs:[["slcReciprocal","The reciprocal-based checklist format"],
              ["slcoBizLic","Unincorporated county licensing runs through MSD, 385-910-5600"],
              ["code1156_103","Sets the limits on what each new city may ask of you"]]
      },
      { id:"p7s6", title:"Collect written property-owner permissions", est:0,
        why:"Any private-property location needs the owner's written permission, and the city asks for it. For a trailer this is your primary operating mode.",
        checklist:["Draft a one-page permission letter template","Get signed letters for each recurring private location","Confirm the 12-hour/24-hour limit is respected","If pursuing Path B, get sewer connection consent in the same letter","Keep copies in the binder"],
        refs:[["slcMobileLicense","Twelve-hour maximum per 24-hour period on private property"],
              ["slcGuidePdf","Written property owner permission listed among required documents"]],
        tips:"If you're chasing Path B, negotiate the sewer connection at the same time as the parking permission. Coming back later to renegotiate is much harder."
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
        checklist:["Open a Restaurant Depot / Sysco / US Foods account","Identify local Indian grocery and spice suppliers","Compare delivery minimums vs. cash-and-carry","Set par levels for each item","Identify a backup source for your signature ingredients"]
      },
      { id:"p8s3", title:"Set prices and design the menu board", est:0,
        why:"A trailer menu has to be readable from 15 feet and orderable in under 20 seconds.",
        checklist:["Set prices from plate cost, not from competitors alone","Design a large, high-contrast menu board","Include allergen notes","Label spice levels clearly","Decide on combos/upsells","Print a weatherproof version"]
      },
      { id:"p8s4", title:"Run a full test service at the commissary", est:0,
        why:"Find the bottlenecks with friends in line, not paying customers — and meter your water while you do it.",
        checklist:["Prep as if for a real service","Time each item from order to hand-off","Meter total water use and log it against Phase 0 step 4","Test holding temperatures over 4 hours","Identify the bottleneck station and fix it","Adjust the menu based on what actually worked"],
        refs:[["r392_102_7","The tank capacities your measured water use has to fit inside"]],
        tips:"This test service is what makes the Phase 0 decision real. Don't skip the metering."
      }
    ]
  },

  /* ================= PHASE 9 ================= */
  {
    id: "p9", name: "Brand, Marketing & Tech", icon: "📣",
    sub: "People can't eat at a trailer they can't find. Location broadcasting is your marketing.",
    steps: [
      { id:"p9s1", title:"Name, logo and wrap", est:0,
        why:"The wrap is your biggest billboard.",
        checklist:["Confirm the name isn't taken (state + trademark search)","Register the DBA if different from the LLC","Design logo and wrap","Get 2–3 wrap quotes","Make sure the name is readable at distance and in a photo"],
        refs:[["utahCorp","Business name availability search and DBA registration"]]
      },
      { id:"p9s2", title:"Set up social + a schedule page", est:0,
        why:"Instagram plus a live schedule is how food trucks get found. Post today's location every day.",
        checklist:["Claim the handle on Instagram, Facebook, TikTok","Set up a Google Business Profile","Publish a weekly schedule page","Build a posting routine (location by 9am daily)","Collect emails/SMS for regulars"],
        refs:[["r392_102_4","You must give the health department a means to determine your vending location or route and your operating days and hours — your public schedule can double as this"]]
      },
      { id:"p9s3", title:"POS, payments and tax rates", est:0,
        why:"Card acceptance is table stakes, and your POS has to charge the right sales tax for the city you're parked in.",
        checklist:["Choose a POS (Square, Toast, Clover)","Test offline/low-signal card processing","Configure sales tax rates per operating city","Set up tip handling","Set up daily sales reporting for tax filing"],
        refs:[["utahTaxRates","Combined rates by jurisdiction — configure each city you work"],
              ["utahTap","Where the resulting returns are filed"]],
        tips:"Downtown SLC has dead zones. Confirm your POS handles offline card capture before your first rally."
      },
      { id:"p9s4", title:"Join the local truck ecosystem", est:0,
        why:"Rallies, brewery lots and booking platforms fill your calendar faster than cold outreach.",
        checklist:["Apply to the Food Truck League roster","Introduce yourself to 5 established truck owners","Get on brewery/office-park rotation lists","Register for the big local festivals early","Confirm each event's permit requirements"],
        refs:[["ftl","Weekly rallies, league nights and the registered truck roster"],
              ["code1156_103","Cities may still require event permits even where your licence is honoured"]]
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
        checklist:["Opening: water fill, temps, sanitiser, cash float","Service: hourly temperature log","Closing: wastewater dump at an approved location, cleaning, commissary check-in","Commissary log entry every visit","Weekly: deep clean, equipment check","Print it and laminate it for the unit"],
        refs:[["slcohdMobileGuide","Commissary logs documenting daily vendor activity; approved disposal locations"],
              ["r392_102_7","Approved wastewater removal points"],
              ["r392_102_16","What inspections look for and what happens when violations are found"]]
      },
      { id:"p10s3", title:"Set up the renewals and filings calendar", est:0,
        why:"Most compliance failures are calendar failures, not knowledge failures.",
        checklist:["Health food service permit — annual","City business license — annual, per vehicle","Fire safety inspection — per city requirement","Insurance renewal","LLC annual renewal with Utah Div. of Corporations","Sales tax filings — per your assigned frequency","Food handler cards — track each worker's expiry","Fire suppression system service tag","Grease interceptor cleaning (if Path B or C)"],
        refs:[["r392_102_4","Permit renewal requires resubmitting your operating information within 30 days before expiry"],
              ["slcohdPermits","Permits are not transferable on change of ownership"],
              ["slcFogRef","Interceptor cleaning frequencies — 30 days for traps, 90 days or 25% capacity for gravity interceptors"],
              ["code1156_103","Reciprocity depends on your licence remaining current and in good standing"]],
        tips:"Put every one of these in a shared calendar with a 30-day advance reminder. Lapsed paperwork also kills your reciprocity in other cities."
      },
      { id:"p10s4", title:"Hire and train staff", est:0,
        why:"You cannot run window, tandoor and cash alone for long.",
        checklist:["Write the roles you need","Confirm food handler cards before first shift","Train on the daily checklist and temp logs","Set up payroll and workers' comp","Document opening/closing procedures"],
        refs:[["slcohdFoodHandlers","Every food worker needs a valid card before their first shift"],
              ["laborComm","Workers' compensation obligations"],
              ["dws","Unemployment insurance registration"]]
      },
      { id:"p10s5", title:"Track the numbers weekly", est:0,
        why:"Trucks fail slowly and quietly. Weekly numbers catch it early.",
        checklist:["Sales by location and by day","Food cost % and labour %","Average ticket and covers per service","Best/worst performing menu items","Drop or fix anything under target for 3 straight weeks"]
      }
    ]
  },

  /* ================= PHASE 11 ================= */
  {
    id: "p11", name: "Growth", icon: "📈",
    sub: "Once the trailer runs itself, the money is in catering, recurring spots and repeatability.",
    steps: [
      { id:"p11s1", title:"Build a catering and private events offer", est:0,
        why:"Catering has better margins and predictable revenue than street service.",
        checklist:["Build 2–3 catering packages with per-head pricing","Write a simple contract with a deposit","Create a one-page sell sheet","Pitch 10 local companies and wedding planners","Confirm insurance limits venues require"],
        refs:[["r392_102_4","Temporary permits cover fixed-location operation up to 14 consecutive days — relevant for multi-day event work"]]
      },
      { id:"p11s2", title:"Lock in recurring locations", est:0,
        why:"A reliable weekly rotation smooths the revenue curve.",
        checklist:["Convert your best 3 one-offs into weekly slots","Negotiate brewery/office-park agreements","Get written permissions for each","Publish the recurring schedule"],
        refs:[["slcMobileLicense","Private property operating limits still apply to recurring slots"]]
      },
      { id:"p11s3", title:"Work the festival and rally circuit", est:0,
        why:"High-volume days, and where new regulars find you.",
        checklist:["List the major SLC-area festivals and their application deadlines","Budget for booth/event fees","Plan a high-throughput festival menu","Confirm water and waste servicing for long events","Staff up for volume"],
        refs:[["ftl","Rallies and league nights"],
              ["r392_102_7","At high-volume events, tank capacity and access to an approved servicing area become the binding constraint"]]
      },
      { id:"p11s4", title:"Decide the next move: second unit, ghost kitchen, or brick-and-mortar", est:0,
        why:"Each path has very different capital and permitting needs — a permanent facility means a whole new health permit process.",
        checklist:["Compare capital needs and margins for each path","Model staffing for an operation you're not personally running","Research permanent-facility permitting if going brick-and-mortar","Decide a target date and trigger metric"],
        refs:[["slcohdPermanent","The permit path for a fixed facility"],
              ["slcohdPlanReview","The full build standard a brick-and-mortar must meet"],
              ["slcohdPermits","Permits are not transferable — relevant if you buy an existing location"]]
      }
    ]
  }
];
