/* =========================================================================
   CITY-BY-CITY MOBILE FOOD RULES — Salt Lake County, Utah
   Researched September 2026 direct from municipal codes and official city
   pages. No third-party food-truck blogs were used for any figure here.

   Focus: does each jurisdiction allow a TOWED FOOD TRAILER, and where may a
   mobile unit actually operate.

   trailer:  "yes-row"  allowed, right-of-way included (best case)
             "yes"      explicitly allowed (private property)
             "special"  allowed but on a separate, more restrictive track
             "row-ban"  trailers specifically barred from the right-of-way
             "unclear"  ordinance regulates mobile food but never says "trailer"
             "none"     no mobile food ordinance at all
   row:      "yes" | "permit" | "event" | "no" | "none"
   conf:     "high" | "med" | "low"   — how well the finding is verified
   ========================================================================= */

const CITY_VERSION = "2026.09.10";

const TRAILER_LABEL = {
  "yes-row": ["Allowed, incl. right-of-way", "ok"],
  "yes":     ["Allowed", "ok"],
  "special": ["Allowed, separate track", "warn"],
  "row-ban": ["Barred from right-of-way", "bad"],
  "unclear": ["Ordinance silent", "warn"],
  "none":    ["No ordinance", "grey"]
};

const ROW_LABEL = {
  "yes":    "Open to mobile units",
  "permit": "By written city permission",
  "event":  "Special events only",
  "no":     "Prohibited",
  "none":   "Not addressed in code"
};

const CITIES = [
  /* ---------------------------------------------------------------- */
  {
    id: "sslc", name: "South Salt Lake", type: "City", pop: "~26k",
    trailer: "yes-row", row: "yes", conf: "high",
    flag: "The most trailer-friendly jurisdiction in the county. Names food trailers in its definition and lets them work the right-of-way.",
    trailerNote: "Code 17.01.010 defines “Food Truck/Food Trailer” as a fully enclosed food service establishment “on a motor vehicle or on a trailer that a motor vehicle pulls” — tracking Utah Code §11-56-102 almost word for word. 17.04.030(J): “All mobile food vending business shall take place in either a Food Truck or a Food Trailer.” Every operative rule reads “Food Trucks or Food Trailers.”",
    rowNote: "Two units per city block may operate in the right-of-way on city streets abutting Downtown, East Streetcar, Commercial Corridor, Commercial General, TOD, Mixed-Use, Flex, City Facility, Historic and Master Planned Mixed-Use districts, and streets abutting parks. Vending window must face away from the right-of-way.",
    zones: "Private property (accessory use) permitted in Commercial Corridor, Commercial Neighborhood, Commercial General, TOD and TOD-Core, Mixed Use, Flex, Historic and Landmark, City Facility, R1, Residential Multiple, all four Downtown districts, and all three East Streetcar districts. Not permitted in Business Park, Jordan River, School or Open Space. Food Truck Parks (3+ units) are a separate permitted primary use in most commercial districts.",
    limits: [
      "18 hours maximum in any 24-hour period at one location",
      "Within 100 ft of a single-family use in R-1 or RM: hours limited to 10am–10pm, no light spill onto residences",
      "Right-of-way: not within 50 ft of a minor arterial intersection or 100 ft of a major arterial",
      "Must have functioning wheels, removed daily, never stored overnight on site",
      "Must clean the occupied area and the surrounding 50 ft daily",
      "No alcohol; amplified music and sound systems prohibited",
      "Food truck parks: minimum 10 ft between vendor windows"
    ],
    fees: "$169 initial, $60 annual renewal. On-site Building and Fire inspections required before approval.",
    lic: "Dedicated Food Truck Business License covering trucks and trailers. §5.02.200 provides mutual recognition of licenses from another city or Salt Lake County — but it is conditioned on that city reciprocating, unlike the unconditional state mandate. Applications must be submitted in person.",
    contact: { phone: "801-483-6063 ext. 3", email: "businesslicense@sslc.gov" },
    links: [
      ["Code 17.04.030(J) — food truck/trailer standards", "https://library.municode.com/ut/south_salt_lake/codes/code_of_ordinances?nodeId=TIT17LAUSDE_CH17.04PEUSRE_17.04.030PEUSSPST"],
      ["Definitions 17.01.010", "https://library.municode.com/ut/south_salt_lake/codes/code_of_ordinances?nodeId=TIT17LAUSDE_CH17.01DE_17.01.010DE"],
      ["Food Truck License Application (fees)", "https://sslc.gov/DocumentCenter/View/2217/Food-Truck-Business-License-Application"],
      ["Business licensing", "https://sslc.gov/214/Business-Licensing"]
    ],
    verify: ["Whether the §5.02.200 mutual-recognition clause is actually applied to food trucks — the city's own application doesn't mention it", "Whether a restroom agreement is required administratively"]
  },

  /* ---------------------------------------------------------------- */
  {
    id: "sandy", name: "Sandy", type: "City", pop: "~96k",
    trailer: "yes-row", row: "permit", conf: "high",
    flag: "Only city besides South Salt Lake that affirmatively opens the right-of-way to trailers — but it carries the heaviest compliance load.",
    trailerNote: "§21-37-14: “Mobile food business means a business that prepares and serves food or beverages from a self-contained unit that is a motorized vehicle, nonmotorized cart, portable stand, or a trailer.” “Trailer” then recurs through §21-11-19 in operative provisions covering licence display, daily removal, condition and signage.",
    rowNote: "Allowed with written permission from the City. Parallel parking spaces only — no sidewalk, parkstrip or landscaping. Vending window must face the sidewalk or private property. No operation on streets posted above 35 mph.",
    zones: "All commercial or industrial land use areas, with prior written owner consent specifying where on the site you may sit. Parks and the OS zone require written consent of the Community Development Director. Mobile food courts (3+ units) allowed by permit; permanent courts in certain districts, min 2,000 sq ft, max 10 vendors.",
    limits: [
      "12 hours maximum in any 24-hour period; all units removed at close of business",
      "Hours 7am–10pm unless the Director extends them",
      "1,000 ft from any K-12 school, 7am–4pm Mon–Fri, unless the school authorises it",
      "60 ft from any intersection or driveway",
      "10 ft from hydrants, transit stops, accessible parking, curb cuts, storm drains, and other mobile units",
      "Restroom access must be made available",
      "Insurance for public property: $200k/person, $500k/occurrence, city as additional insured",
      "No distance requirement from restaurants or residences"
    ],
    fees: "Food Truck (single location) $105. Fire inspection $40. Food Truck Court promoter $131 plus $25 per additional truck.",
    lic: "Reciprocity is explicit in the ordinance: “A mobile food business may provide a copy of a current business license in good standing from another political subdivision in the State in lieu of a Sandy City business license.” One licence covers several locations, public and private.",
    contact: { phone: "801-568-7252", email: "BusLic@sandy.utah.gov" },
    links: [
      ["§21-11-19 Mobile Food and Street Vendor Businesses", "https://sandy.municipalcodeonline.com/book?type=ordinances#name=21-11-19_Mobile_Food_And_Street_Vendor_Businesses"],
      ["Business licensing", "https://sandy.utah.gov/267/Business-Licensing"],
      ["Food truck annual fire inspection", "https://sandy.utah.gov/food-truck-annual-inspection"]
    ],
    verify: ["Whether the $40 food-truck fire inspection differs in practice from the $44 general fire inspection — both appear on the schedule"]
  },

  /* ---------------------------------------------------------------- */
  {
    id: "midvale", name: "Midvale", type: "City", pop: "~36k",
    trailer: "yes", row: "no", conf: "high",
    flag: "Clean, explicit trailer inclusion and a codified reciprocity section. One of the easiest to work with on private property.",
    trailerNote: "Code 5.36.010 defines “food truck” as “a fully encased food service establishment (1) on a motor vehicle or on a trailer that a motor vehicle pulls to transport” — verbatim Utah Code §11-56-102. A towed trailer gets the full benefit of every operative section. (The city's older fillable application still recites “self-contained vehicle”; the codified definition controls.)",
    rowNote: "5.36.090 — a food truck may not vend to any customer located in any portion of the right-of-way. Combined with the zone list, this is effectively private property only.",
    zones: "Mixed use; State Street; Transit-oriented development; Main Street form-based code (MS-FBC); Regional commercial; Clean industrial; State Street overlay; TOD overlay; commercial properties within Bingham Junction; commercial properties within Jordan Bluffs. Plus any church or school in any zone during a community event you've been invited to.",
    limits: [
      "Hours 6am–10pm unless the city authorises otherwise",
      "May not reduce site parking below what the property's use requires",
      "Property owner permission required",
      "No drive-through; pedestrian vending only",
      "Food, beverages and own-logo merchandise only; no alcohol",
      "No time-at-one-location cap, no restroom rule, no distance or spacing rules — the code is genuinely silent"
    ],
    fees: "$137 commercial base + $25 food truck variable ≈ $162 new. Renewal $19 + $25.",
    lic: "5.36.050 Reciprocity — the city will issue a licence on presentation of a current business licence from another political subdivision, a current health department food truck permit and a current fire safety inspection. The Midvale licence then expires on the same date as the presented licence. Separate licence per unit.",
    contact: { phone: "801-567-7200 ext. 1017", email: "businesslicense@midvaleut.gov" },
    links: [
      ["Chapter 5.36 Food Trucks", "https://midvale.municipal.codes/Code/5.36"],
      ["Business licensing", "https://midvale.utah.gov/government/departments/community_development/business_licensing/obtain_a_business_license.php"],
      ["FY2026 fee schedule", "https://cms1files.revize.com/midvale/Document%20Center/Government/Departments/Administrative%20Services/Finance/2026/Midvale%20City%20FY2026%20Fee%20Schedule%20Amendment.pdf"]
    ],
    verify: []
  },

  /* ---------------------------------------------------------------- */
  {
    id: "wj", name: "West Jordan", type: "City", pop: "~116k",
    trailer: "yes", row: "yes", conf: "high",
    flag: "Adopts the state trailer definition verbatim and allows right-of-way operation. Its private-event reciprocity carve-out is the most generous in the county.",
    trailerNote: "Code 4-2V-2: “FOOD TRUCK: A fully encased food service establishment: A. On a motor vehicle or on a trailer that a motor vehicle pulls to transport…” Verbatim Utah Code §11-56-102(4)(a). The only carve-out is a food cart, where the vendor stands outside the frame.",
    rowNote: "Allowed in listed zones. Parallel parking only, no park strips, vending window must face away from the street (rear-vending needs Transportation Division approval), no streets posted above 45 mph, no two units on the same block face.",
    zones: "Right-of-way operation allowed in PC, BR-P, C-G, C-M, SC-1, SC-2, SC-3, M-P, M-1, M-2, P-F, CC-C, CC-F, VLSFR, LSFR, MFR, MU. Article V's zone list applies specifically to the right-of-way — private property is licensed but not zone-restricted by this article.",
    limits: [
      "12 hours maximum in any 24-hour period at one premises",
      "No clock-hour restriction and no annual day cap — verified absent",
      "No separation from restaurants, schools or residences — verified absent",
      "No restroom requirement in the city code — verified absent",
      "Written owner consent needed to use the site's power; generators are the default",
      "Violating the right-of-way conditions is a Class B misdemeanour"
    ],
    fees: "Food Truck $178; Food Truck Secondary Permit $21; Fire Inspection $85. Note 4-2V-6 requires a REDUCED fee for applicants already licensed elsewhere in Utah — limited to the city's actual cost of regulation. Ask for it; $178 looks like the full rate.",
    lic: "Three reciprocity provisions. 4-2V-4(B) gives a short-form application if you hold a valid Utah licence elsewhere. 4-2V-6 caps the fee at cost of regulation. 4-2V-14 goes furthest: the city may not require any licence for a food truck event on private property that is not open to the public, and may not require an event permit for a private-property food truck event at all.",
    contact: { phone: "801-569-5010", email: "business.licensing@westjordan.utah.gov" },
    links: [
      ["4-2V-3 Mobile Food Business Allowed", "https://codelibrary.amlegal.com/codes/westjordanut/latest/westjordan_ut/0-0-0-70132"],
      ["4-2V-2 Definitions", "https://codelibrary.amlegal.com/codes/westjordanut/latest/westjordan_ut/0-0-0-70106"],
      ["Business licensing", "https://www.westjordan.utah.gov/business-licensing/"],
      ["Fee schedule", "https://www.westjordan.utah.gov/fee-schedule/"]
    ],
    verify: [
      "For right-of-way work: whether the trailer must stay hitched, since 4-2V-8 is worded around “motorized vehicles” and requires parallel parking spaces",
      "Whether a Title 13 temporary use permit is also needed on private property"
    ]
  },

  /* ---------------------------------------------------------------- */
  {
    id: "taylorsville", name: "Taylorsville", type: "City", pop: "~60k",
    trailer: "yes", row: "permit", conf: "high",
    flag: null,
    trailerNote: "§13.11.170 treats the trailer as a first-class category: “The mobile food vehicle, trailer, or cart shall be kept in a good operating condition…” and “The vehicle, trailer, or cart must also have the license plate, proof of insurance coverage, safety inspection, and vehicular registration.”",
    rowNote: "Permitted with written authorisation from the city or the agency with jurisdiction, plus a special events permit. UDOT authorisation needed on UDOT right-of-way.",
    zones: "All commercial or industrial land use areas — stated as a land-use category rather than enumerated zone codes. Owner consent required; adequate off-street parking and circulation. On a vacant lot, temporary-use improvements apply.",
    limits: [
      "Hours 7am–10pm",
      "12 hours maximum in any 24-hour period at one location unless the Director approves longer",
      "More than 10 hours a week at the same private location triggers a site plan submission",
      "30 ft from any intersection or driveway; 10 ft from hydrants, transit stops, accessible parking, curb cuts and other mobile units",
      "No operation on streets posted above 35 mph",
      "4 ft continuous clear sidewalk; no drive-thru; no alcohol",
      "Insurance $200k/person, $500k/occurrence",
      "Violation is a Class B misdemeanour"
    ],
    fees: "Not published. Code §5.06.040 sets fees by annual council resolution and the city's forms page lists no food truck form. Call for the current resolution.",
    lic: "City business license required; expires at the earliest of the required health/safety inspection date or one year. No reciprocity provision found in the code.",
    contact: { phone: "801-963-5400", email: "" },
    links: [
      ["§13.11.170 Food Trucks and Street Vendors", "https://codelibrary.amlegal.com/codes/taylorsvilleut/latest/taylorsville_ut/0-0-0-6362"],
      ["Business licensing", "https://www.taylorsvilleut.gov/government/business-licensing"]
    ],
    verify: ["Actual fee amounts", "Whether any reciprocity path exists", "Whether a restroom requirement lives elsewhere in the code"]
  },

  /* ---------------------------------------------------------------- */
  {
    id: "holladay", name: "Holladay", type: "City", pop: "~31k",
    trailer: "yes", row: "permit", conf: "med",
    flag: "Defines “Mobile Food Trailer” as its own category — and imposes a hard size cap that should shape your build: 24 ft long × 8 ft 6 in wide × 12 ft high.",
    trailerNote: "HCC 5.91.030: “Mobile Food Trailer: A mobile food business that serves food or beverages from a nonmotorized vehicle larger than three feet in width and eight feet in length that is normally pulled behind a motorized vehicle.” It gets its own row in the zoning use table, separate from mobile food trucks.",
    rowNote: "Private property only; sales on public property require a permit or concession agreement from the city. 13.76.770(E) bars right-of-way use unless authorised. Special events are carved out of the chapter entirely under 5.91.120.",
    zones: "Mobile food trailer is Permitted in C-1, C-2 and HCR. Not allowed in NC or in any residential zone (FR, R-1-*, R-2-*, R-M, RO, R/M-U). PO, HV and LU could not be read reliably — confirm those three with Planning.",
    limits: [
      "SIZE CAP: no mobile vending truck or trailer larger than 24 ft × 8 ft 6 in × 12 ft",
      "16 hours maximum in any 24-hour period at one location",
      "Within 50 ft of a dwelling: must cease and vacate by 10pm, and portable generators are prohibited",
      "No parking on the park strip; hard surface only; may not occupy required parking stalls",
      "Trash AND recycling containers must be provided, emptied daily",
      "No peeling paint or rust visible; no drive-throughs"
    ],
    fees: "$275 for a mobile food truck or trailer whose commissary is inside the city boundary. Mobile food court $225. Special event permit $100. No line exists for a commissary outside the city — ask what applies.",
    lic: "Separate licence and fee per vehicle. No codified reciprocity, but the city's Mobile Vendors page sets out the out-of-city path: written property owner approval, a business licence from the commissary's jurisdiction, health department inspection and fire safety certification. Processing takes up to 30 days.",
    contact: { phone: "385-425-0853", email: "cnichols@holladayut.gov" },
    links: [
      ["Chapter 5.91 Mobile Food Businesses", "https://codelibrary.amlegal.com/codes/holladayut/latest/holladay_ut/0-0-0-3782"],
      ["13.76.770 zoning standards (size cap)", "https://codelibrary.amlegal.com/codes/holladayut/latest/holladay_ut/0-0-0-11472"],
      ["Mobile Vendors page", "https://holladayut.gov/departments/economic_development/business_licensing/mobile_vendors.php"]
    ],
    verify: ["Zone status in PO, HV and LU — three reads of the use table disagreed", "The fee when the commissary is outside Holladay"]
  },

  /* ---------------------------------------------------------------- */
  {
    id: "herriman", name: "Herriman", type: "City", pop: "~62k",
    trailer: "yes", row: "event", conf: "high",
    flag: "Strongest reciprocity language in the county: a licence “without fee or imposing additional license qualification” if you're licensed elsewhere in Utah.",
    trailerNote: "§3-3-4: “Food truck means a fully-encased food service establishment on a motor vehicle or on a trailer that a motor vehicle pulls to transport…” Verbatim state definition. Excludes food carts and ice cream trucks, not trailers.",
    rowNote: "Prohibited on city-owned property and rights-of-way except as authorised in writing for city events organised by city staff, and then only at W & M Butterfield Park and J. Lynn Crane Park.",
    zones: "Permitted use in A-1-21, C-2, T-M and MU-2 only. Private property with express prior written owner permission, which must state restrictions such as location on site, hours and sales limits — and must be produced on demand.",
    limits: [
      "Unlawful to operate 10pm–7am without prior written city permission",
      "No overnight parking except during a multiday event",
      "No time-at-one-location cap for food trucks",
      "No distance from restaurants, schools or residences; no unit spacing; no restroom rule",
      "Outside prep allowed but customers may not be served from the prep area",
      "Pedestrian service only; no drive-through; no alcohol"
    ],
    fees: "A reciprocal food truck licence is issued WITHOUT FEE. The 2026 master fee schedule has no mobile food line; general commercial licence is $180/yr.",
    lic: "§3-3-4 grants a licence without fee or extra qualification to an operator presenting a current business licence from another Utah political subdivision, a county health department food truck permit, and a current fire safety inspection approval, per §11-56-104(4)(a).",
    contact: { phone: "801-446-5323", email: "licensing@herriman.gov" },
    links: [
      ["§3-3-4 Mobile Food Vendors", "https://herriman.municipalcodeonline.com/book?type=ordinances#name=3-3-4_Mobile_Food_Vendors"],
      ["Licensing", "https://www.herriman.gov/licenses"],
      ["Fee schedule (eff. 7/1/2026)", "https://www.herriman.gov/uploads/files/6491/2026-Fee-Schedule.pdf"]
    ],
    verify: ["The fee for a non-reciprocal applicant — no mobile food line exists on the schedule"]
  },

  /* ---------------------------------------------------------------- */
  {
    id: "bluffdale", name: "Bluffdale", type: "City", pop: "~18k", cap: "60 days/yr — any part of a day counts",
    trailer: "yes", row: "event", conf: "high",
    flag: "No Bluffdale licence needed at all if you're licensed elsewhere in Utah — but a hard 60-day annual ceiling, counted by “any part of” a day.",
    trailerNote: "BCC 3.90.010: “MOBILE FOOD VENDOR UNIT: An enclosed truck, trailer, or similar vehicle-mounted unit that is: A licensed motor vehicle or is capable of being moved by a licensed motor vehicle…” The second clause is the towed-trailer clause.",
    rowNote: "Prohibited on city-owned property and rights-of-way — streets, on-street parking, sidewalks — unless permitted under BCC 7.70 Special Events.",
    zones: "Commercial, professional office and industrial zones, stated as categories rather than zone codes. Residential and agricultural zones only on school, church or non-city government property — or private property where no public services are needed, adequate restrooms are on site, and no traffic or crowd control is required.",
    limits: [
      "ANNUAL CAP: no more than any part of 60 days per calendar year within city limits",
      "Hours 7am–10pm except as otherwise authorised",
      "No overnight parking except during a multiday event",
      "No time-at-one-location cap; no distance or spacing rules",
      "Written owner permission required, stating any restrictions",
      "Outside prep allowed but no direct service from the prep area; no alcohol"
    ],
    fees: "No mobile-food-specific line. Commercial licence $110 + $50 inspection; Solicitor/Peddler/Vendor $125. Which applies is not stated — but reciprocity may make it moot.",
    lic: "BCC 3.90.020: “A mobile food vendor who has a valid business license from another political subdivision within the state is not required to obtain a Bluffdale City business license.” Reinforced by BCC 3.10.120 for enclosed mobile businesses. You must still produce licence, health permit and fire inspection on request.",
    contact: { phone: "801-254-2200 ext. 414", email: "businesslicense@bluffdale.gov" },
    links: [
      ["Chapter 3.90 Mobile Food Vendors", "https://bluffdale.municipalcodeonline.com/book?type=ordinances#name=3.90_MOBILE_FOOD_VENDORS"],
      ["Business licensing", "https://www.bluffdale.gov/153/Business-Licensing"],
      ["Fee schedule (7/22/2026)", "https://www.bluffdale.gov/DocumentCenter/View/9641"]
    ],
    verify: ["Which fee category a mobile unit falls into", "Which zone abbreviations count as commercial / professional office / industrial — call Planning at 801-849-9421"]
  },

  /* ---------------------------------------------------------------- */
  {
    id: "sj", name: "South Jordan", type: "City", pop: "~83k", cap: "60 days/yr — any part of a day counts",
    trailer: "yes", row: "no", conf: "high",
    flag: "Tightest annual ceiling in the county: 60 days, and “any part of” a day counts. At two services a week you exhaust the year in about 30 weeks.",
    trailerNote: "§5.46.010: “MOBILE FOOD VENDOR UNIT: An enclosed truck, trailer, or similar vehicle mounted unit that is: A licensed motor vehicle or is capable of being moved by a licensed motor vehicle…” Tracks the state definition.",
    rowNote: "City rights-of-way are expressly carved out of the permitted city property. This applies to all mobile units equally — it is not a trailer-specific ban.",
    zones: "C-C, MU, C-N, P-O, C-I, C-F, I-F and P-C. Residential, agricultural and open space zones only on school, church, park or other government-owned property with written permission. City property only for park pavilion/field rentals or by City invitation at City-sponsored events.",
    limits: [
      "ANNUAL CAP: no business within city limits for more than any part of 60 days per calendar year",
      "Hours 7am–10pm except as authorised by the City Manager",
      "No overnight parking except during a multiday event",
      "No time-at-one-location cap; no distance or spacing rules; no restroom rule",
      "Express prior written owner permission, stating restrictions on location, hours and sales",
      "Outside prep allowed but customers may not be served from it; pedestrian service only; no alcohol"
    ],
    fees: "Mobile Food Vendor Licence: $154 new, $98 renewal. Separate licence per unit.",
    lic: "“A mobile food vendor who has a valid business license from another political subdivision within the state is not required to obtain a South Jordan City business license.” Health department permit required, plus a City fire inspection or proof of one passed elsewhere in Utah this calendar year.",
    contact: { phone: "801-446-4357", email: "info@sjc.utah.gov" },
    links: [
      ["Chapter 5.46 Mobile Food Vendors", "https://southjordan.municipalcodeonline.com/book?type=ordinances#name=CHAPTER_5.46_MOBILE_FOOD_VENDORS"],
      ["Business licenses", "https://www.sjc.utah.gov/280/Business-Licenses"],
      ["Fee schedule", "https://www.sjc.utah.gov/DocumentCenter/View/5594/FY-25-26-Fee-Schedule-PDF"]
    ],
    verify: ["How the city counts “any part of 60 days” — calendar days present in the city, or days of active sales. This is material; ask directly."]
  },

  /* ---------------------------------------------------------------- */
  {
    id: "riverton", name: "Riverton", type: "City", pop: "~46k", cap: "90 days/yr",
    trailer: "yes", row: "permit", conf: "med",
    flag: "$0 business licence fee — the cheapest entry in the county. But a 90-day annual cap and a parking ordinance that names trailers specifically.",
    trailerNote: "§18.230.010 defines a “MOBILE FOOD VENDOR UNIT” as “An enclosed truck, trailer, or similar vehicle mounted unit” that is a licensed motor vehicle or capable of being moved by one.",
    rowNote: "Prohibited on city-owned property and rights-of-way except as authorised in writing by the city — a middle position between Sandy's permit route and South Jordan's flat prohibition.",
    zones: "Commercial and light industrial, stated as generic categories rather than zone abbreviations. Riverton has at least five commercial zones and separate manufacturing zones, so the specific parcel must be checked with Planning. Residential/agricultural only on school, church, park or government property.",
    limits: [
      "ANNUAL CAP: 90 days per calendar year within city limits",
      "Hours 7am–10pm except as otherwise authorised",
      "No overnight parking except during an approved multiday event",
      "No time-at-one-location cap; no distance or spacing rules; no restroom rule",
      "SEPARATE TRAILER RISK: Ord. 24-02 bars parking any “occupied or empty trailer” on a public street adjacent to a residential lot for more than 2 hours in 24. A parking rule rather than a vending ban, but it constrains where you can stage the unit."
    ],
    fees: "$0 — Riverton eliminated business licence fees in 2018 and still advertises a $0 licence. Late renewal $100 after 30 days.",
    lic: "A valid business licence from another political subdivision within the state exempts you from Riverton licensing. Health department permit and current fire safety inspection are still mandatory. Processing 8–10 business days.",
    contact: { phone: "801-208-3139", email: "businesslicensing@rivertonutah.gov" },
    links: [
      ["Chapter 18.230 Mobile Food Vendors", "https://ecode360.com/47630385"],
      ["Business licensing", "https://www.rivertonutah.gov/business/licensing/index.php"],
      ["Ord. 24-02 trailer parking", "https://www.utah.gov/pmn/files/1099885.pdf"]
    ],
    verify: ["Which specific zone abbreviations count as “commercial and light industrial” — call Planning at 801-208-3149 before signing any site agreement"]
  },

  /* ---------------------------------------------------------------- */
  {
    id: "millcreek", name: "Millcreek", type: "City", pop: "~63k",
    trailer: "yes", row: "event", conf: "high",
    flag: "The 200 ft setback from any restaurant door is the binding constraint here — it rules out most dense commercial corridors unless you get a waiver.",
    trailerNote: "MKC 5.22.020 defines “mobile food business” to include a trailer, and separately defines “Mobile food trailer” as one serving “from a nonmotorized vehicle that is normally pulled behind a motorized vehicle.” All operative rules attach to the umbrella term.",
    rowNote: "5.22.080: no mobile food business may operate in the public right-of-way except by special event permit under MKC 14.58.060.",
    zones: "Any zone that allows a restaurant to operate. Confirmed: C (Commercial) permitted, M (Light Manufacturing) permitted, IF (Institutional Facility) permitted, MD-3 (Mixed Use) conditional. Millcreek offers a Classification Request procedure to confirm a use against the tables.",
    limits: [
      "12 hours maximum in any 24-hour period at one location",
      "200 FT from a door to a restaurant, another mobile food business, or an authorised special event selling food — waivable with that proprietor's written consent, or inside an approved mobile food court",
      "Written consent of the property or business owner required",
      "Insurance naming the city as additional insured, 30-day cancellation notice",
      "Background check on owner and drivers",
      "Trash and recycling containers for patrons; no drive-through; no peeling paint or rust",
      "No hours-of-day restriction and no annual day cap"
    ],
    fees: "$145 annual base, plus a disproportionate fee by category. No mobile food line exists — the nearest categories are Fast Food and Take-Out $275 or Restaurants and Food (no alcohol) $240. Which applies is not stated. Special event permit $50.",
    lic: "Millcreek issues its OWN licence — not through the MSD, despite being a county neighbour. Separate licence per unit. No codified reciprocity: Utah Code §11-56-103 still binds by state law, but there is no local text to point at. Applications must go through the online portal, not email.",
    contact: { phone: "801-214-2700", email: "awendt@millcreekut.gov" },
    links: [
      ["Chapter 5.22 Mobile Food Businesses", "https://millcreek.municipalcodeonline.com/book?type=ordinances#name=Chapter_5.22_MOBILE_FOOD_BUSINESSES"],
      ["Business licensing / food truck application", "https://www.millcreekut.gov/457/Business-Licensing"],
      ["FY26 fee schedule", "https://www.millcreekut.gov/DocumentCenter/View/5836"]
    ],
    verify: ["Which disproportionate fee category applies to a mobile food business", "The complete list of zones permitting restaurants"]
  },

  /* ---------------------------------------------------------------- */
  {
    id: "slc", name: "Salt Lake City", type: "City", pop: "~210k",
    trailer: "row-ban", row: "no", conf: "high",
    flag: "The only jurisdiction in the county that singles trailers out for exclusion. Everything else about SLC is workable — you just can't use the street.",
    trailerNote: "The city's Food Truck Guide states that mobile food truck vehicles “(NO TRAILERS)” are allowed to operate in the public right-of-way. A trailer is therefore a private-property operation in Salt Lake City regardless of which permit you hold.",
    rowNote: "Closed to trailers entirely. For trucks: M-1, M-2, D-1, D-2, D-3, D-4 and G-MU only, max 2 hours at one location (extendable to 12 with a Transportation Division permit), one vehicle per block face, 100 ft from restaurant doors on the same block unless waived, vending window facing the sidewalk.",
    zones: "Private property with written owner permission. The 12-hour-per-24 cap applies on private property too.",
    limits: [
      "12 hours maximum in any 24-hour period on private property",
      "Background checks required for all owner/drivers",
      "Certificate of insurance naming Salt Lake City as additional insured",
      "Separate fee for each vehicle"
    ],
    fees: "Third-party guides estimate ~$193 base plus ~$103 per vehicle. Use the official Consolidated Fee Schedule (around page 15) for the real number, not the estimate.",
    lic: "Full application or a shorter reciprocal-based checklist if you already hold a licence from another Utah city. Requires health and transportation permits, insurance certificate, state tax ID, driver's licences for all drivers, and written property owner permission.",
    contact: { phone: "801-535-7224", email: "ed@slcgov.com" },
    links: [
      ["Mobile Food Business licence requirements", "https://www.slc.gov/Finance/business-licensing/license-information/mobile-food-business/"],
      ["Food Truck Guide (PDF) — the “NO TRAILERS” language", "https://www.slcdocs.com/ed/SLCFoodTruckGuide.pdf"],
      ["Consolidated Fee Schedule", "https://tools.slc.gov/feeschedule/"],
      ["Reciprocal-based checklist", "https://www.slc.gov/ed/salt-lake-city-food-truck-checklist-reciprocal-based/"]
    ],
    verify: ["Whether the trailer exclusion applies only to the right-of-way or has any private-property effect — the guide's wording is right-of-way specific"]
  },

  /* ---------------------------------------------------------------- */
  {
    id: "wvc", name: "West Valley City", type: "City", pop: "~140k",
    trailer: "special", row: "no", conf: "high",
    flag: "DEEP FAT FRYING IS PROHIBITED. That alone may disqualify West Valley City for an Indian menu — samosas, pakoras and vada all need a fryer. Also: only 15 such licences may exist at any time, and applications open one month a year.",
    trailerNote: "A towed trailer is a “Food Vending Unit,” not a “Mobile Food Vending Vehicle.” Code 7-1-103 defines a Food Vending Unit as “A unit that is manually pushed or pulled behind a vehicle and is not motorized to move on its own power, that remains stationary in one location…” The size rule at 7-7-112(10) confirms it: “shall not exceed a width of eight feet and a length of nineteen feet, including the hitch.”",
    rowNote: "Private property only, and only alongside an existing licensed and operational business on site. The public-street section reads as written for roving vehicle vending, not a parked trailer.",
    zones: "Private property with another currently licensed and operational business on site. Prohibited in residential and agricultural zones unless accessory to an approved Community Use. No specific commercial zone codes are enumerated.",
    limits: [
      "DEEP FAT FRYING PROHIBITED (7-7-112(11))",
      "Only 15 food vending unit licences may exist at any time",
      "Applications accepted only 1 April – 1 May, unless fewer than 15 are issued",
      "500 ft from any other food vending unit; 200 ft from a residential zone or use",
      "150 ft from any intersection or crosswalk; 50 ft from driveways, loading zones, bus stops and storm drains",
      "Restroom facilities within 500 ft during operating hours",
      "Hours 7am–12am, unit removed entirely from site by midnight",
      "Relocating requires a new application in the April window",
      "Type I hood with UL-300 suppression, annual fire inspection; propane tanks mounted outside"
    ],
    fees: "Base business licence $110, per-employee $10, transfer $25, compliance inspections $50. No food-vending-unit-specific fee line found.",
    lic: "Notarised property-owner permission, menu, site plan with setbacks, Health Department and Fire Department approvals, restroom agreement and commissary location. No reciprocity provision found in the code — which sits awkwardly against Utah Code §11-56-103.",
    contact: { phone: "801-963-3290", email: "russell.condie@wvc-ut.gov" },
    links: [
      ["7-1-103 Definitions", "https://westvalleycity.municipal.codes/Code/7-1-103"],
      ["7-7-112 Use regulations (frying ban, size)", "https://westvalleycity.municipal.codes/Code/7-7-112"],
      ["17-2-1101 Licences", "https://westvalleycity.municipal.codes/Code/17-2-1101"],
      ["Business licensing", "https://www.wvc-ut.gov/83/Business-Licensing"]
    ],
    verify: [
      "Whether all 15 licences are currently issued — ask before planning around the April window",
      "Whether the deep-frying ban has any exception for enclosed commercial fryers with suppression",
      "Whether WVC honours out-of-city licences at all"
    ]
  },

  /* ---------------------------------------------------------------- */
  {
    id: "murray", name: "Murray", type: "City", pop: "~50k",
    trailer: "unclear", row: "none", conf: "med",
    flag: "Murray's ordinance regulates mobile food but never uses the word “trailer.” Its definition says “self-contained vehicle.” This is a gap, not a prohibition — but it needs a phone call before you commit.",
    trailerNote: "MCC 5.40.010 defines only “mobile food truck”: “A self-contained vehicle that is designed to serve food or beverages and can be moved from one location to another without disassembling.” The word “trailer” appears nowhere in Chapter 5.40. Murray never adopted the state's trailer language. The licence application does ask for VIN, weight, width and length — all of which a trailer can supply.",
    rowNote: "No right-of-way provision exists at all. Murray is private property only, so the trailer question here is definitional rather than locational.",
    zones: "Private property in non-residential zones. Keyed to “residential” versus “non-residential” on the land use map rather than enumerated zone codes. The city may not license a mobile food truck in any residential zone.",
    limits: [
      "12 hours maximum in any 24-hour period; no overnight parking",
      "Written consent of the property owner, available on site at all times",
      "Insurance: $1,000,000 per occurrence / $2,000,000 aggregate, Murray as additional insured — the highest limits in the county",
      "May not reduce the required parking of the premises",
      "Pedestrian access only; no drive-through; signage affixed to the vehicle only",
      "No clock hours, no distance or spacing rules, no restroom rule"
    ],
    fees: "$100 primary licence, $50 secondary, $10 per vehicle, $60 fire safety inspection — and the fire fee is waived if you hold an out-of-city licence, health permit and fire inspection.",
    lic: "No full reciprocity section, but MCC 5.08.010 expressly waives the $60 fire inspection fee for operators presenting a business licence from another political subdivision, a health department food truck permit and a passed fire safety inspection.",
    contact: { phone: "801-270-2425", email: "blicenses@murray.utah.gov" },
    links: [
      ["Chapter 5.40 Mobile Food Trucks", "https://codelibrary.amlegal.com/codes/murrayut/latest/murray_ut/0-0-0-4597"],
      ["5.08.010 fees and out-of-city waiver", "https://codelibrary.amlegal.com/codes/murrayut/latest/murray_ut/0-0-0-3769"],
      ["Application PDF", "https://www.murray.utah.gov/DocumentCenter/View/6356"]
    ],
    verify: ["THE key question: will Murray license a towed trailer at all, given the “self-contained vehicle” definition? Call 801-270-2425."]
  },

  /* ---------------------------------------------------------------- */
  {
    id: "msd-uninc", name: "Unincorporated Salt Lake County", type: "MSD", pop: "—",
    trailer: "yes", row: "event", conf: "high",
    flag: "Reciprocity is codified here AND the reciprocal licence is free — one of only two MSD jurisdictions where that's true.",
    trailerNote: "County Code 5.22.020 defines “mobile food business” to include a trailer, and separately defines “Mobile food trailer” as one serving “from a nonmotorized vehicle that is normally pulled behind a motorized vehicle.” No trailer restriction anywhere.",
    rowNote: "5.22.080(D): no mobile food business may operate in the public right-of-way except by special event permit. This bans all mobile units equally — trucks and trailers alike.",
    zones: "Any zone that allows a restaurant to operate. Restaurant is permitted in C-2, C-3, M-1 and M-2; conditional in C-1, C-V, MD-1/MD-3, O-R-D and the MRZ village district. Whether “allows” includes conditional-use zones is an administrative call — confirm with MSD.",
    limits: [
      "12 hours maximum in any 24-hour period at one location",
      "200 FT from a door to a restaurant, another mobile food business, or an authorised special event selling food — waivable with that proprietor's written consent",
      "No hours-of-day restriction, no annual day cap, no school/residence setback",
      "No drive-through; trash and recycling containers required; signs attached to the vehicle only",
      "County parks: Parks & Rec rules state parks may not be used for commercial purposes such as vending"
    ],
    fees: "General Business Licence $150. Per-employee fee is barred for mobile food businesses, and a reciprocal licence carries NO FEE (§5.22.060). Special event permits $50–$1,000 per day by attendance.",
    lic: "§5.22.035 grants a reciprocal business licence on presentation of a current licence from another Utah political subdivision, a health department food truck permit and a passed fire safety inspection. It expires with the underlying licence. Licensing is administered by the Greater Salt Lake Municipal Services District.",
    contact: { phone: "385-910-5561", email: "blujan@msd.utah.gov" },
    links: [
      ["County Code Ch. 5.22 Mobile Food Businesses", "https://library.municode.com/ut/salt_lake_county/codes/code_of_ordinances?nodeId=TIT5BULIRE_CH5.22MOFOBU"],
      ["§5.22.035 Reciprocal business licenses", "https://library.municode.com/ut/salt_lake_county/codes/code_of_ordinances?nodeId=TIT5BULIRE_CH5.22MOFOBU_5.22.035REBULI"],
      ["MSD business licensing", "https://msd.utah.gov/206/Business-Licensing-Inspections"],
      ["MSD fee schedules", "https://msd.utah.gov/311/Fee-Schedule"]
    ],
    verify: ["Whether MSD treats conditional-use restaurant zones as “allowing a restaurant” for this purpose"]
  },

  /* ---------------------------------------------------------------- */
  {
    id: "msd-townships", name: "Magna, Kearns, White City, Emigration Canyon, Brighton", type: "Metro townships", pop: "—", covers: 5,
    trailer: "yes", row: "event", conf: "high",
    flag: "Licensed by the MSD like unincorporated county — but these five run their OWN codes, copied from the county's 2016 text and never updated. No reciprocity clause, and they still require a background check and written owner consent that the county itself deleted in 2022.",
    trailerNote: "Each township's own Ch. 5.22.020 carries the same definitions as the county: “mobile food business” includes a trailer, and “Mobile food trailer” is separately defined. Magna, Kearns, White City and Copperton also adopt the Utah Code §11-56-102 “Food Truck” definition verbatim in their zoning use definitions.",
    rowNote: "Same as the county: prohibited in the right-of-way except by special event permit. MSD issues special event permits for Kearns, Magna, Emigration Canyon, White City, the Cottonwood Canyons and unincorporated county — but not Copperton.",
    zones: "Magna: food truck Permitted in C-1, C-2, C-V, DH, CMU, PF, PI and PR; prohibited in C-3, NMU and OS. Kearns: Permitted in C-1, C-2, TC, CMU, PF, PI, PR; prohibited in C-3 and NMU. White City: Permitted in C-1, C-2, CMU, PR; prohibited in NMU. Emigration Canyon has no food-truck row — it falls back to “any zone allowing a restaurant,” which is C-2 (permitted) and C-V (conditional). Brighton likewise has no food-truck row; its C-V zone lists restaurant as conditional.",
    limits: [
      "12 hours maximum in any 24-hour period at one location",
      "200 FT from a door to a restaurant, another mobile food business, or an authorised special event selling food",
      "Written consent of the property or business owner required (still in these codes)",
      "Verified background check on owner and drivers required (still in these codes)",
      "No hours-of-day restriction, no annual day cap, no school or residence setback"
    ],
    fees: "General Business Licence $150 in every township, $6 per employee. Note the county's exemptions from the per-employee fee and from reciprocal-licence fees do NOT appear in these five codes.",
    lic: "None of these five has a reciprocity provision — the county added §5.22.035 in 2019 and the townships never picked it up. Utah Code §11-56-103 still preempts as state law, so expect to have to cite the statute to MSD staff. Copperton is different: it adopts the county's Ch. 5.22 by reference, so reciprocity applies there, and it runs an optional business registry.",
    contact: { phone: "385-910-5561", email: "blujan@msd.utah.gov" },
    links: [
      ["Magna code", "https://magna.municipalcodeonline.com/book?type=ordinances#name=Chapter_5.22_MOBILE_FOOD_BUSINESSES"],
      ["Kearns code", "https://kearns.municipalcodeonline.com/book?type=ordinances#name=Chapter_5.22_MOBILE_FOOD_BUSINESSES"],
      ["White City code", "https://whitecity.municipalcodeonline.com/book?type=ordinances#name=Chapter_5.22_MOBILE_FOOD_BUSINESSES"],
      ["Emigration Canyon code", "https://emigrationcanyon.municipalcodeonline.com/book?type=ordinances#name=Chapter_5.22_MOBILE_FOOD_BUSINESSES"],
      ["Brighton code", "https://brighton.municipalcodeonline.com/book?type=ordinances#name=5.22_MOBILE_FOOD_BUSINESSES"],
      ["MSD business licensing", "https://msd.utah.gov/206/Business-Licensing-Inspections"]
    ],
    verify: ["Whether MSD will honour state reciprocity in these five despite the local code being silent — worth asking before you rely on it"]
  },

  /* ---------------------------------------------------------------- */
  {
    id: "copperton", name: "Copperton", type: "Metro township", pop: "~800",
    trailer: "yes", row: "event", conf: "high",
    flag: "Runs an optional business registry rather than a mandatory licence, and adopts the county's reciprocity by reference.",
    trailerNote: "Copperton Ch. 5.11 states that mobile food businesses are subject to Chapters 5.13–5.22 of the Salt Lake County Code — so the county's trailer-inclusive definitions apply directly.",
    rowNote: "County rule applies: right-of-way prohibited except by special event permit. Note MSD does not issue special event permits for Copperton — contact the township directly.",
    zones: "Food truck Permitted in C-1, C-2 and PR; prohibited in NMU and OS.",
    limits: [
      "County rules apply: 12 hours in 24 at one location",
      "200 ft from a restaurant door or another mobile unit",
      "No hours restriction, no annual cap"
    ],
    fees: "$150 general business licence, but the licence itself is optional — §5.02.130 issues one on request after registry listing.",
    lic: "Metro Business Registry rather than mandatory licensing. Because Copperton adopts the county's Ch. 5.22, §5.22.035 reciprocity and the no-fee reciprocal licence both apply.",
    contact: { phone: "385-910-5561", email: "blujan@msd.utah.gov" },
    links: [
      ["Copperton Ch. 5.11 Special Business Types", "https://copperton.municipalcodeonline.com/book?type=ordinances#name=Chapter_5.11_SPECIAL_BUSINESS_TYPES"],
      ["MSD business licensing", "https://msd.utah.gov/206/Business-Licensing-Inspections"]
    ],
    verify: ["Who issues special event permits for Copperton, since MSD says it doesn't"]
  },

  /* ---------------------------------------------------------------- */
  {
    id: "draper", name: "Draper", type: "City", pop: "~51k",
    trailer: "none", row: "none", conf: "med",
    flag: "A genuine regulatory gap: no mobile food ordinance, no food truck licence type, no zoning rule. Operating under a reciprocal licence you'd face essentially no municipal rules — but silence is not permission. Call first.",
    trailerNote: "The word “trailer” does not appear in any mobile-food context because there is no mobile-food ordinance. Title 6 Chapter 16 “Temporary Uses” enumerates only six temporary uses — auctions, Christmas tree sales, fireworks stands, produce stands, and two retail sales categories. No food truck, mobile food, cart or concession category exists.",
    rowNote: "Not addressed anywhere in the code. Temporary use parking may not be in a public right-of-way or on other public property.",
    zones: "No zoning list for mobile food exists. Siting is governed by state law plus the property owner and, for events, the special event permit.",
    limits: [
      "No hours, no time-at-location cap, no separation distances, no restroom rule anywhere in the code for mobile food",
      "If a temporary use permit applies: written owner authorisation, all parking on site, daily trash removal, site restored within 3 days"
    ],
    fees: "No mobile-food licence type exists. Commercial licence $82/yr, temporary licence (180 days or less) $60, Mobile Food Truck fire inspection $100.",
    lic: "Draper's own guidance: “if you operate a mobile business as defined in state code, a Draper City license is required unless the business already holds a valid license issued by a government entity in Utah.” Reciprocity is also written into the Special Event Permit application, which requires food vendors to display a Utah business licence, health department food truck permit and fire safety approval.",
    contact: { phone: "801-576-6530", email: "businesslicensing@draperutah.gov" },
    links: [
      ["Draper city code (no mobile food chapter)", "https://codelibrary.amlegal.com/codes/draperut/latest/overview"],
      ["Business licensing — reciprocity FAQ", "https://www.draperutah.gov/business-development/business-licensing/"],
      ["Fee schedule", "https://www.draperutah.gov/media/1e5lpwqo/consolidated-fee-schedule-jul-2026-clean-copy-without-short-term-rental.pdf"]
    ],
    verify: ["Any administrative policy or unwritten practice for food trucks in Draper parks or streets — the code is silent, and silence is not permission"]
  },

  /* ---------------------------------------------------------------- */
  {
    id: "ch", name: "Cottonwood Heights", type: "City", pop: "~34k",
    trailer: "none", row: "none", conf: "med",
    flag: "No mobile food ordinance at all. The only mention of a food truck anywhere in the code is one zoning line permitting a temporary food truck in the Mixed-Use zone.",
    trailerNote: "Exhaustive full-text search of the code found exactly one match for “food truck”: CHMC 19.36.020, which lists “Open food stand/market/food truck, temporary” among permitted uses in the MU zone. There is no definition of food truck and no reference to trailers in a food context.",
    rowNote: "Not addressed anywhere in the code — neither authorised nor expressly prohibited. Absent an authorising ordinance, expect to be routed to a temporary use or special event permit.",
    zones: "MU (Mixed-Use) zone only, as a temporary use. Also a discretionary route under CHMC 19.76.040, where the director may issue a temporary use permit and stipulate duration, hours and other regulations.",
    limits: [
      "Nothing food-truck specific exists — no time cap, hours, day cap, distances, spacing, restroom rule or owner-permission clause",
      "Any conditions would be imposed case by case by the Community Development Director"
    ],
    fees: "No mobile vendor or food truck line exists in the fee schedule. New commercial licence $170, renewal $120, temporary licence $80. Special events $168 per event.",
    lic: "No mobile-food-specific licence. General requirement under CHMC 5.06.020. No reciprocity in the code — Utah Code §11-56-103 still binds as state law, the city simply hasn't codified it.",
    contact: { phone: "801-944-7067", email: "businesslicense@ch.utah.gov" },
    links: [
      ["Municipal code", "https://cottonwoodheights.municipalcodeonline.com/book?type=ordinances"],
      ["Business licensing", "https://www.cottonwoodheights.utah.gov/doing-business/business-licensing"],
      ["Fee schedule", "https://www.cottonwoodheights.utah.gov/doing-business/fee-schedule"]
    ],
    verify: ["Everything operational — there is no ordinance, no application form, no fee line and no published policy. Whether they issue a temporary licence, treat it as a food store, require a special event permit, or refuse outright is unknowable from published sources."]
  },

  /* ---------------------------------------------------------------- */
  {
    id: "alta", name: "Alta", type: "Town", pop: "~400",
    trailer: "none", row: "none", conf: "med",
    flag: "No mobile food ordinance. A tiny ski town where canyon access, UDOT right-of-way and watershed rules will matter more than the business code.",
    trailerNote: "Title 3 has exactly one chapter — Business License Provisions — with no vendor, peddler, transient merchant, mobile food or food truck section, and no definition of any of those terms. Alta simply never legislated mobile food.",
    rowNote: "No street-vending provision anywhere. Title 7 covers snow removal, obstructions and sidewalks only.",
    zones: "None specific to mobile food. Discretionary approval and the Land Use Regulations will govern in practice, alongside canyon-wide constraints.",
    limits: [
      "No time limits, hours, day caps, separations, spacing, restroom or owner-permission rules specific to mobile food",
      "A general town business licence is required under §3-1-2; operating without one is a Class B misdemeanour",
      "Licence applications and payments are due by 31 October each year"
    ],
    fees: "No mobile food category. Category 6 Restaurant/bar $102.68, or Category 9 Temporary $50 — the schedule doesn't say which would apply.",
    lic: "§3-1-8 Reciprocal Recognition exists but is a 1970s-vintage delivery-vehicle clause covering vehicles “merely passing through” — it would not by its terms exempt a food trailer set up and vending in Alta. Utah Code §11-56-103 applies as state law regardless.",
    contact: { phone: "385-233-0802", email: "bboone@townofalta.utah.gov" },
    links: [
      ["Title 3 Ch. 1 Business License Provisions", "https://codelibrary.amlegal.com/codes/altaut/latest/alta_ut/0-0-0-572"],
      ["Business licensing", "https://townofalta.utah.gov/business-licensing/"],
      ["Fee schedule (6/17/2026)", "https://storage.googleapis.com/juniper-media-library/130/2026/06/2026-6-17%20Alta%20Fee%20Schedule.pdf"]
    ],
    verify: ["Which licence category applies, and whether Alta would permit a mobile food operation at all as a discretionary matter"]
  }
];

/* Cross-cutting notes worth reading before the table. */
const CITY_NOTES = [
  ["Reciprocity is the whole strategy",
   "Utah Code §11-56-103 requires every Utah city to honour a current business licence in good standing from another Utah political subdivision. Licence once — normally in the city where your commissary sits — and you can work most of the valley. Bluffdale, South Jordan and Riverton go further and require no local licence at all; Herriman issues one free; West Jordan caps the fee at its cost of regulation."],
  ["Only Salt Lake City singles out trailers",
   "Of 20 jurisdictions, exactly one excludes trailers as a category, and only from the public right-of-way. Several others close the right-of-way to every mobile unit equally, which is a different thing and not a trailer problem."],
  ["The right-of-way is closed almost everywhere anyway",
   "Only South Salt Lake, Sandy and West Jordan meaningfully open the street to mobile vending. Everywhere else it's private property with the owner's written permission, or a special event permit. Plan your site strategy around private property."],
  ["Watch the annual day caps",
   "South Jordan caps you at 60 days a year and counts any part of a day. Bluffdale does the same. Riverton allows 90. At two services a week, South Jordan and Bluffdale run out around week 30."],
  ["Three jurisdictions have no ordinance at all",
   "Draper, Cottonwood Heights and Alta simply never legislated mobile food. That is not permission — it means a phone call, and a case-by-case answer from a planner rather than a rule you can point at."]
];
