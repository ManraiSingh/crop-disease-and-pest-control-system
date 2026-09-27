/* =========================================================
   CROP KNOWLEDGE

   General growing guidance for the ten crops the app supports,
   written for Indian (largely Maharashtra) conditions.

   Figures are typical ranges, not a prescription: sowing windows
   shift with the monsoon, and water needs move with soil and
   season. Treat this as orientation and confirm locally — the UI
   says as much at the bottom of the crop detail.

   months are 1–12. `trigger` is the weather that turns a disease
   window into an active risk, and is matched against the live
   forecast in diseaseRisk() below.
========================================================= */

export const CROP_KEYS = [
  'tomato', 'rice', 'wheat', 'cotton', 'sugarcane',
  'onion', 'soybean', 'maize', 'chilli', 'potato',
  'grapes', 'carrot',
]

export const CROPS = {
  wheat: {
    /* Plotted by the meters; mirrors the display strings below. */
    tempRange: [20, 25],
    waterRange: [450, 650],
    phRange: [6.0, 7.5],
    sowMonths: [11, 12],
    harvestMonths: [3, 4],
    season: 'Rabi',
    temp: '20 – 25 °C',
    tempNote: 'Cool growth, warm ripening',
    sow: 'Nov – Dec',
    harvest: 'Mar – Apr',
    duration: '110 – 140 days',
    soil: 'Well-drained loam to clay loam',
    soilPh: 'pH 6.0 – 7.5',
    water: '450 – 650 mm',
    waterNote: '4 – 6 irrigations; crown-root stage is critical',
    companions: [
      { name: 'Chickpea', why: 'Fixes nitrogen and shares the same Rabi window' },
      { name: 'Mustard', why: 'Border rows pull aphids away from the wheat' },
      { name: 'Coriander', why: 'Short, shallow-rooted — no competition for water' },
    ],
    avoid: [
      { name: 'Other cereals', why: 'Same rusts and same feeders build up together' },
    ],
    next: [
      { key: 'soybean', name: 'Soybean', why: 'Legume restores the nitrogen wheat took out' },
      { key: 'maize', name: 'Maize', why: 'Different root depth breaks the disease cycle' },
      { name: 'Green gram', why: 'Short summer legume before the next Rabi wheat' },
    ],
    diseases: [
      { name: 'Yellow rust', months: [12, 1, 2], trigger: 'cool', signs: 'Yellow powdery stripes along the leaf veins', action: 'Scout weekly in cool damp spells; treat early patches before they spread' },
      { name: 'Powdery mildew', months: [1, 2], trigger: 'humid', signs: 'White powder on lower leaves and stem', action: 'Improve airflow, avoid excess nitrogen' },
      { name: 'Loose smut', months: [2, 3], trigger: 'humid', signs: 'Ear heads turn to black powder', action: 'Seed-borne — use treated seed next sowing' },
    ],
  },

  rice: {
    /* Plotted by the meters; mirrors the display strings below. */
    tempRange: [25, 35],
    waterRange: [1200, 1500],
    phRange: [5.5, 6.5],
    sowMonths: [6, 7],
    harvestMonths: [10, 11],
    season: 'Kharif',
    temp: '25 – 35 °C',
    tempNote: 'Warm and humid throughout',
    sow: 'Jun – Jul',
    harvest: 'Oct – Nov',
    duration: '120 – 150 days',
    soil: 'Clay or clay loam that holds water',
    soilPh: 'pH 5.5 – 6.5',
    water: '1200 – 1500 mm',
    waterNote: 'Standing water 2 – 5 cm through tillering',
    companions: [
      { name: 'Azolla', why: 'Grows on the water surface and adds nitrogen' },
      { name: 'Sesbania', why: 'Green manure ploughed in before transplanting' },
    ],
    avoid: [
      { name: 'Dryland crops', why: 'Cannot share a puddled, flooded field' },
    ],
    next: [
      { key: 'wheat', name: 'Wheat', why: 'The classic rice–wheat rotation; uses residual moisture' },
      { name: 'Chickpea', why: 'Legume on residual moisture, no extra irrigation' },
      { name: 'Mustard', why: 'Short Rabi crop that breaks the rice pest cycle' },
    ],
    diseases: [
      { name: 'Rice blast', months: [7, 8, 9], trigger: 'humid', signs: 'Spindle-shaped grey spots with brown edges', action: 'Avoid heavy nitrogen; keep water steady, not fluctuating' },
      { name: 'Bacterial leaf blight', months: [7, 8, 9], trigger: 'rain', signs: 'Leaf tips yellow and dry from the margin inward', action: 'Drain the field after heavy rain; avoid injury while weeding' },
      { name: 'Sheath blight', months: [8, 9], trigger: 'humid', signs: 'Oval grey-green lesions on the sheath near water level', action: 'Widen spacing; do not over-fertilise' },
    ],
  },

  cotton: {
    /* Plotted by the meters; mirrors the display strings below. */
    tempRange: [21, 30],
    waterRange: [700, 1200],
    phRange: [6.0, 8.0],
    sowMonths: [5, 6],
    harvestMonths: [11, 12, 1],
    season: 'Kharif',
    temp: '21 – 30 °C',
    tempNote: 'Warm days, dry ripening',
    sow: 'May – Jun',
    harvest: 'Nov – Jan',
    duration: '160 – 200 days',
    soil: 'Deep black cotton soil (vertisol)',
    soilPh: 'pH 6.0 – 8.0',
    water: '700 – 1200 mm',
    waterNote: 'Flowering and boll formation are the thirsty stages',
    companions: [
      { name: 'Green gram', why: 'Short legume between rows before cotton closes canopy' },
      { name: 'Cowpea', why: 'Covers soil, holds moisture, adds nitrogen' },
      { key: 'maize', name: 'Maize', why: 'Border rows shelter the crop and host natural enemies' },
    ],
    avoid: [
      { name: 'Okra', why: 'Shares bollworm and whitefly — pests multiply across both' },
    ],
    next: [
      { key: 'wheat', name: 'Wheat', why: 'Cereal after a long-duration crop rests the soil' },
      { name: 'Chickpea', why: 'Restores nitrogen after a heavy feeder' },
      { name: 'Sorghum', why: 'Tolerates the drier residual soil left behind' },
    ],
    diseases: [
      { name: 'Pink bollworm', months: [9, 10, 11], trigger: 'warm', signs: 'Rosetted flowers; holes and stained lint inside bolls', action: 'Use pheromone traps; destroy stubble after picking' },
      { name: 'Whitefly / leaf curl', months: [8, 9, 10], trigger: 'dry', signs: 'Leaves curl upward, sticky honeydew, sooty mould', action: 'Yellow sticky traps; avoid repeat sprays that kill predators' },
      { name: 'Bacterial blight', months: [7, 8], trigger: 'rain', signs: 'Angular water-soaked spots, black stem lesions', action: 'Use treated seed; avoid working the field when wet' },
    ],
  },

  sugarcane: {
    /* Plotted by the meters; mirrors the display strings below. */
    tempRange: [25, 30],
    waterRange: [1500, 2500],
    phRange: [6.5, 7.5],
    sowMonths: [7, 8, 10, 11, 1, 2],
    harvestMonths: [12, 1, 2, 3],
    season: 'Adsali / Pre-seasonal / Suru',
    temp: '25 – 30 °C',
    tempNote: 'Long warm season, cooler ripening',
    sow: 'Jul – Aug, Oct – Nov, Jan – Feb',
    harvest: '12 – 18 months after planting',
    duration: '12 – 18 months',
    soil: 'Deep, well-drained medium loam',
    soilPh: 'pH 6.5 – 7.5',
    water: '1500 – 2500 mm',
    waterNote: 'Heaviest need during grand growth; never waterlog',
    companions: [
      { key: 'onion', name: 'Onion', why: 'Fits the wide early rows before cane closes in' },
      { key: 'potato', name: 'Potato', why: 'Harvested well before cane needs the space' },
      { name: 'Green gram', why: 'Adds nitrogen and covers bare soil early on' },
    ],
    avoid: [
      { name: 'Ratoon on diseased fields', why: 'Red rot and wilt carry straight into the next crop' },
    ],
    next: [
      { name: 'Green manure', why: 'Rebuilds organic matter after a long, heavy crop' },
      { key: 'wheat', name: 'Wheat', why: 'Uses what the deep cane roots left behind' },
      { name: 'Chickpea', why: 'Legume break before replanting cane' },
    ],
    diseases: [
      { name: 'Red rot', months: [7, 8, 9], trigger: 'rain', signs: 'Split cane shows red inside with white patches; sour smell', action: 'Drain waterlogged patches; never take setts from affected fields' },
      { name: 'Wilt', months: [9, 10, 11], trigger: 'dry', signs: 'Cane dries from the top, pith turns brown and hollow', action: 'Improve drainage and rotate before replanting' },
      { name: 'Smut', months: [3, 4, 5], trigger: 'warm', signs: 'Black whip-like shoot from the growing point', action: 'Rogue out whips immediately and burn them' },
    ],
  },

  tomato: {
    /* Plotted by the meters; mirrors the display strings below. */
    tempRange: [20, 27],
    waterRange: [400, 600],
    phRange: [6.0, 7.0],
    sowMonths: [6, 7, 10, 11, 1, 2],
    harvestMonths: [9, 10, 1, 2, 4, 5],
    season: 'Kharif / Rabi / Summer',
    temp: '20 – 27 °C',
    tempNote: 'Fruit set drops above 35 °C',
    sow: 'Jun – Jul, Oct – Nov, Jan – Feb',
    harvest: '70 – 90 days after transplanting',
    duration: '110 – 140 days',
    soil: 'Well-drained sandy loam rich in organic matter',
    soilPh: 'pH 6.0 – 7.0',
    water: '400 – 600 mm',
    waterNote: 'Steady moisture; swings cause fruit cracking and blossom-end rot',
    companions: [
      { key: 'onion', name: 'Onion', why: 'Its smell confuses pests looking for tomato' },
      { name: 'Marigold', why: 'Traps fruit borer and suppresses root nematodes' },
      { name: 'Coriander', why: 'Flowers bring in the predators that eat aphids' },
    ],
    avoid: [
      { key: 'potato', name: 'Potato', why: 'Same family — late blight moves straight between them' },
      { key: 'chilli', name: 'Chilli', why: 'Shares leaf curl virus and its whitefly carrier' },
    ],
    next: [
      { name: 'Green gram', why: 'Legume break that resets soil-borne disease' },
      { key: 'maize', name: 'Maize', why: 'Unrelated family; deep roots use a different layer' },
      { key: 'onion', name: 'Onion', why: 'Light feeder after a heavy one' },
    ],
    diseases: [
      { name: 'Early blight', months: [7, 8, 9], trigger: 'humid', signs: 'Brown spots with concentric rings on older leaves', action: 'Remove lower leaves touching soil; mulch to stop splash' },
      { name: 'Late blight', months: [11, 12, 1], trigger: 'cool', signs: 'Water-soaked patches turning black, white mould underneath', action: 'Act fast in cool damp weather — it spreads in days' },
      { name: 'Leaf curl virus', months: [3, 4, 5], trigger: 'dry', signs: 'Leaves curl, thicken and shrink; plant stops growing', action: 'Control whitefly early; pull out infected plants' },
    ],
  },

  onion: {
    /* Plotted by the meters; mirrors the display strings below. */
    tempRange: [13, 24],
    waterRange: [350, 550],
    phRange: [6.0, 7.0],
    sowMonths: [6, 7, 9, 10, 11, 12],
    harvestMonths: [10, 11, 1, 2, 3, 4],
    season: 'Kharif / Late Kharif / Rabi',
    temp: '13 – 24 °C',
    tempNote: 'Cool for bulbs, warm and dry to cure',
    sow: 'Jun – Jul, Sep – Oct, Nov – Dec',
    harvest: '100 – 130 days after transplanting',
    duration: '100 – 140 days',
    soil: 'Friable, well-drained loam',
    soilPh: 'pH 6.0 – 7.0',
    water: '350 – 550 mm',
    waterNote: 'Stop irrigating 2 – 3 weeks before harvest so bulbs cure',
    companions: [
      { key: 'tomato', name: 'Tomato', why: 'Onion masks the scent tomato pests hunt by' },
      { name: 'Carrot', why: 'Each repels the other’s root fly' },
      { name: 'Beetroot', why: 'Different rooting depth, no competition' },
    ],
    avoid: [
      { name: 'Beans and peas', why: 'Onion suppresses the bacteria legumes rely on' },
    ],
    next: [
      { name: 'Green gram', why: 'Rebuilds nitrogen after a shallow-rooted crop' },
      { key: 'maize', name: 'Maize', why: 'Deep roots reach what onion never touched' },
      { key: 'tomato', name: 'Tomato', why: 'Unrelated family, breaks onion soil disease' },
    ],
    diseases: [
      { name: 'Purple blotch', months: [7, 8, 9], trigger: 'humid', signs: 'Small white centres growing into purple-brown patches', action: 'Wider spacing and morning irrigation so leaves dry fast' },
      { name: 'Thrips', months: [2, 3, 4], trigger: 'dry', signs: 'Silvery streaks and twisted leaf tips', action: 'Scout the leaf base; blue sticky traps help early' },
      { name: 'Basal rot', months: [10, 11], trigger: 'humid', signs: 'Bulb base softens and rots, roots turn pink', action: 'Improve drainage; do not replant onion in the same plot' },
    ],
  },

  soybean: {
    /* Plotted by the meters; mirrors the display strings below. */
    tempRange: [25, 30],
    waterRange: [450, 700],
    phRange: [6.0, 7.5],
    sowMonths: [6, 7],
    harvestMonths: [9, 10],
    season: 'Kharif',
    temp: '25 – 30 °C',
    tempNote: 'Warm with well-spread rain',
    sow: 'Jun – Jul',
    harvest: 'Sep – Oct',
    duration: '90 – 110 days',
    soil: 'Well-drained loam; will not tolerate standing water',
    soilPh: 'pH 6.0 – 7.5',
    water: '450 – 700 mm',
    waterNote: 'Pod filling is the stage that must not go dry',
    companions: [
      { key: 'maize', name: 'Maize', why: 'Tall rows shelter soybean; classic intercrop pair' },
      { name: 'Pigeonpea', why: 'Different heights and maturities share the field well' },
      { name: 'Sorghum', why: 'Border rows cut wind damage' },
    ],
    avoid: [
      { name: 'Other legumes', why: 'Shares root rot and pod borer' },
    ],
    next: [
      { key: 'wheat', name: 'Wheat', why: 'Cereal gains directly from the nitrogen soybean fixed' },
      { name: 'Chickpea', why: 'Fits the Rabi window on residual moisture' },
      { key: 'potato', name: 'Potato', why: 'Benefits from the loosened, richer soil' },
    ],
    diseases: [
      { name: 'Yellow mosaic virus', months: [7, 8, 9], trigger: 'warm', signs: 'Bright yellow mottling; pods stay small', action: 'Whitefly carries it — manage the vector, remove infected plants' },
      { name: 'Rust', months: [8, 9], trigger: 'humid', signs: 'Reddish-brown pustules on the leaf underside', action: 'Scout after long humid spells; treat at first pustules' },
      { name: 'Girdle beetle', months: [7, 8], trigger: 'humid', signs: 'Two neat rings girdled round the stem; shoot wilts', action: 'Clip and destroy affected shoots below the ring' },
    ],
  },

  maize: {
    /* Plotted by the meters; mirrors the display strings below. */
    tempRange: [21, 30],
    waterRange: [500, 800],
    phRange: [5.5, 7.5],
    sowMonths: [6, 7, 10, 11, 1, 2],
    harvestMonths: [9, 10, 1, 2, 4, 5],
    season: 'Kharif / Rabi / Summer',
    temp: '21 – 30 °C',
    tempNote: 'Warm days; cool nights help grain fill',
    sow: 'Jun – Jul, Oct – Nov, Jan – Feb',
    harvest: '90 – 110 days after sowing',
    duration: '90 – 120 days',
    soil: 'Well-drained loam with good organic matter',
    soilPh: 'pH 5.5 – 7.5',
    water: '500 – 800 mm',
    waterNote: 'Tasselling and silking must not go dry',
    companions: [
      { key: 'soybean', name: 'Soybean', why: 'Fixes nitrogen right where maize needs it' },
      { name: 'Cowpea', why: 'Covers the ground and holds moisture between rows' },
      { name: 'Pumpkin', why: 'Broad leaves shade out weeds under the maize' },
    ],
    avoid: [
      { name: 'Sorghum', why: 'Same stem borers and shoot fly build up together' },
    ],
    next: [
      { name: 'Chickpea', why: 'Legume replaces the nitrogen maize drew down' },
      { key: 'potato', name: 'Potato', why: 'Different family and root zone' },
      { key: 'wheat', name: 'Wheat', why: 'Straightforward Rabi follow-on' },
    ],
    diseases: [
      { name: 'Fall armyworm', months: [6, 7, 8, 9], trigger: 'warm', signs: 'Ragged holes and moist sawdust-like frass in the whorl', action: 'Scout whorls twice a week; hand-pick early, act at first damage' },
      { name: 'Turcicum leaf blight', months: [7, 8, 9], trigger: 'humid', signs: 'Long grey-green cigar-shaped lesions', action: 'Rotate away from maize; remove crop residue' },
      { name: 'Downy mildew', months: [7, 8], trigger: 'rain', signs: 'White downy growth under pale yellow streaks', action: 'Drain quickly after heavy rain; use treated seed' },
    ],
  },

  chilli: {
    /* Plotted by the meters; mirrors the display strings below. */
    tempRange: [20, 30],
    waterRange: [500, 700],
    phRange: [6.0, 7.0],
    sowMonths: [6, 7, 9, 10],
    harvestMonths: [10, 11, 1, 2],
    season: 'Kharif / Rabi',
    temp: '20 – 30 °C',
    tempNote: 'Flowers drop above 35 °C or below 15 °C',
    sow: 'Jun – Jul, Sep – Oct',
    harvest: '90 – 120 days after transplanting',
    duration: '150 – 180 days',
    soil: 'Well-drained sandy loam to loam',
    soilPh: 'pH 6.0 – 7.0',
    water: '500 – 700 mm',
    waterNote: 'Even moisture at flowering; waterlogging kills the plant fast',
    companions: [
      { key: 'onion', name: 'Onion', why: 'Deters thrips and aphids looking for chilli' },
      { name: 'Garlic', why: 'Same repellent effect, fits the same beds' },
      { name: 'Marigold', why: 'Draws borers away and suppresses nematodes' },
    ],
    avoid: [
      { key: 'tomato', name: 'Tomato', why: 'Same family — leaf curl and wilt pass between them' },
      { key: 'potato', name: 'Potato', why: 'Shares soil-borne wilt' },
    ],
    next: [
      { name: 'Green gram', why: 'Short legume that rests the soil' },
      { key: 'maize', name: 'Maize', why: 'Unrelated family breaks the wilt cycle' },
      { key: 'onion', name: 'Onion', why: 'Light feeder after a long-duration crop' },
    ],
    diseases: [
      { name: 'Thrips / leaf curl', months: [2, 3, 4, 5], trigger: 'dry', signs: 'Leaves curl upward in a boat shape; buds drop', action: 'Worst in dry heat — keep the crop watered, use blue traps' },
      { name: 'Anthracnose (fruit rot)', months: [8, 9, 10], trigger: 'rain', signs: 'Sunken dark circular spots on ripening fruit', action: 'Pick affected fruit out; avoid overhead watering' },
      { name: 'Damping off', months: [6, 7], trigger: 'humid', signs: 'Seedlings collapse at soil level in the nursery', action: 'Raised nursery beds and treated seed' },
    ],
  },

  potato: {
    /* Plotted by the meters; mirrors the display strings below. */
    tempRange: [15, 25],
    waterRange: [500, 700],
    phRange: [5.5, 6.5],
    sowMonths: [10, 11],
    harvestMonths: [1, 2],
    season: 'Rabi',
    temp: '15 – 25 °C',
    tempNote: 'Tubers form best at 15 – 20 °C',
    sow: 'Oct – Nov',
    harvest: 'Jan – Feb',
    duration: '90 – 120 days',
    soil: 'Loose, well-drained sandy loam',
    soilPh: 'pH 5.5 – 6.5',
    water: '500 – 700 mm',
    waterNote: 'Light frequent irrigation; stop 10 days before harvest',
    companions: [
      { key: 'maize', name: 'Maize', why: 'Tall border rows shelter the crop from wind' },
      { name: 'Beans', why: 'Adds nitrogen without competing for the tuber zone' },
      { name: 'Coriander', why: 'Brings in predators of potato aphids' },
    ],
    avoid: [
      { key: 'tomato', name: 'Tomato', why: 'Same family — late blight spreads between them' },
      { key: 'chilli', name: 'Chilli', why: 'Shares soil-borne wilt' },
    ],
    next: [
      { name: 'Green gram', why: 'Quick summer legume that restores nitrogen' },
      { key: 'maize', name: 'Maize', why: 'Different family and rooting depth' },
      { key: 'wheat', name: 'Wheat', why: 'Uses the fine, well-worked soil potato leaves' },
    ],
    diseases: [
      { name: 'Late blight', months: [12, 1], trigger: 'cool', signs: 'Dark water-soaked patches, white mould rim underneath', action: 'Cool damp nights are the trigger — scout daily and act at once' },
      { name: 'Early blight', months: [11, 12], trigger: 'humid', signs: 'Brown target-like rings on older leaves', action: 'Keep the crop well fed; remove affected lower leaves' },
      { name: 'Aphids (virus carriers)', months: [12, 1, 2], trigger: 'dry', signs: 'Curled young leaves, sticky honeydew', action: 'Matters most in seed crops — control early' },
    ],
  },

  grapes: {
    /* Plotted by the meters; mirrors the display strings below. */
    tempRange: [20, 32],
    waterRange: [500, 750],
    phRange: [6.5, 7.5],
    /* A vine is not sown — this is the forward pruning that starts the season. */
    sowMonths: [10],
    harvestMonths: [2, 3, 4],
    season: 'Perennial',
    temp: '20 – 32 °C',
    tempNote: 'Dry ripening; rain near harvest splits the berries',
    sow: 'Oct pruning',
    harvest: 'Feb – Apr',
    duration: '110 – 130 days from pruning',
    soil: 'Deep, well-drained medium black soil or loam',
    soilPh: 'pH 6.5 – 7.5',
    water: '500 – 750 mm',
    waterNote: 'Drip through berry growth; hold back as the bunches ripen',
    companions: [
      { name: 'Marigold', why: 'Suppresses root nematodes along the vine rows' },
      { name: 'Cowpea', why: 'Grown between rows as a cover, then turned in as green manure' },
      { name: 'Garlic', why: 'Border rows keep mites and thrips off the young shoots' },
    ],
    avoid: [
      { name: 'Cucurbits', why: 'Carry the same downy mildew into the vineyard' },
      { key: 'potato', name: 'Potato', why: 'Shares late blight weather and keeps the canopy wet' },
    ],
    next: [
      { name: 'Sunhemp', why: 'Green manure between rows rebuilds the soil a vineyard drains' },
      { name: 'Cowpea', why: 'Short legume cover in the gap after pruning' },
    ],
    diseases: [
      { name: 'Downy mildew', months: [6, 7, 8, 9], trigger: 'rain', signs: 'Oily yellow patches on top of the leaf, white felt underneath', action: 'Spray before the rain, not after; keep the canopy open so leaves dry' },
      { name: 'Powdery mildew', months: [11, 12, 1, 2], trigger: 'humid', signs: 'Grey-white dust on leaves and berries; berries crack as they swell', action: 'Sulphur early; thin the canopy so light and air reach the bunches' },
      { name: 'Anthracnose', months: [6, 7, 8], trigger: 'rain', signs: 'Dark sunken spots with pale centres on shoots and berries', action: 'Cut out infected shoots and burn them; do not carry the wood into the next season' },
    ],
  },

  carrot: {
    /* Plotted by the meters; mirrors the display strings below. */
    tempRange: [15, 22],
    waterRange: [350, 500],
    phRange: [6.0, 7.0],
    sowMonths: [8, 9, 10],
    harvestMonths: [11, 12, 1],
    season: 'Rabi',
    temp: '15 – 22 °C',
    tempNote: 'Cool weather is what puts the colour in the root',
    sow: 'Aug – Oct',
    harvest: 'Nov – Jan',
    duration: '90 – 110 days',
    soil: 'Deep, loose sandy loam cleared of stones and clods',
    soilPh: 'pH 6.0 – 7.0',
    water: '350 – 500 mm',
    waterNote: 'Keep evenly moist — a dry spell then a heavy watering splits the roots',
    companions: [
      { key: 'onion', name: 'Onion', why: 'The smell keeps carrot fly off the rows' },
      { name: 'Radish', why: 'Comes up fast and breaks the crust for the slow carrot seed' },
      { name: 'Coriander', why: 'Shallow-rooted, so it never competes for the root zone' },
    ],
    avoid: [
      { name: 'Dill', why: 'Crosses with carrot and stunts the roots' },
      { name: 'Fennel', why: 'Same family, same pests, and it suppresses the seedlings' },
    ],
    next: [
      { name: 'Green gram', why: 'Legume puts back the nitrogen a root crop stripped' },
      { key: 'onion', name: 'Onion', why: 'Shallow feeder after a deep one, on the same beds' },
      { key: 'maize', name: 'Maize', why: 'Different root depth breaks the nematode cycle' },
    ],
    diseases: [
      { name: 'Alternaria leaf blight', months: [10, 11, 12], trigger: 'humid', signs: 'Dark brown spots with yellow edges, starting on the oldest leaves', action: 'Do not water overhead; remove the lower leaves as they go' },
      { name: 'Powdery mildew', months: [11, 12, 1], trigger: 'humid', signs: 'White powder over the leaf tops in cool dry spells', action: 'Space the rows for airflow; treat the first patches before they join up' },
      { name: 'Root-knot nematode', months: [9, 10, 11], trigger: 'warm', signs: 'Forked and knobbly roots; plants wilt in the afternoon heat', action: 'Rotate with a cereal and work marigold into the bed before sowing' },
    ],
  },
}

/* Fixed axes for the meters — the same scale for every crop, so the bars compare. */
export const SCALES = {
  temp: [10, 45],
  water: [300, 2600],
  ph: [4.5, 8.5],
}

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

export function monthName(month) {
  return MONTHS[(month - 1 + 12) % 12]
}

/** Percent string from the forecast ("62%") to a number, or null. */
function humidityValue(humidity) {
  const digits = String(humidity ?? '').replace(/[^\d]/g, '')
  return digits ? Number(digits) : null
}

/**
 * How live the risk is right now: 'high' when the disease's season and the
 * current weather both line up, 'watch' when one does, 'low' otherwise.
 */
export function diseaseRisk(disease, { month, temperature, humidity, condition }) {
  const inSeason = disease.months.includes(month)

  const damp = humidityValue(humidity)
  const sky = String(condition ?? '').toLowerCase()
  const wet = /rain|drizzle|shower|thunder/.test(sky)

  let weatherMatches = false

  switch (disease.trigger) {
    case 'humid':
      weatherMatches = wet || /mist|fog|overcast/.test(sky) || (damp !== null && damp >= 70)
      break
    case 'rain':
      weatherMatches = wet
      break
    case 'cool':
      weatherMatches = temperature !== null && temperature <= 22
      break
    case 'warm':
      weatherMatches = temperature !== null && temperature >= 28
      break
    case 'dry':
      weatherMatches = !wet && damp !== null && damp < 50
      break
    default:
      weatherMatches = false
  }

  if (inSeason && weatherMatches) return 'high'
  if (inSeason || weatherMatches) return 'watch'
  return 'low'
}

const RISK_ORDER = { high: 0, watch: 1, low: 2 }

export function rankDiseases(cropKey, context) {
  const crop = CROPS[cropKey]
  if (!crop) return []

  return crop.diseases
    .map((disease) => ({ ...disease, risk: diseaseRisk(disease, context) }))
    .sort((a, b) => RISK_ORDER[a.risk] - RISK_ORDER[b.risk])
}
