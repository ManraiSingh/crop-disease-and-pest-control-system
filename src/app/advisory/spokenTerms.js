/* =========================================================
   SPOKEN TERMS

   The crop knowledge base is written in English. The interface
   is translated, so a Hindi or Marathi listener would otherwise
   hear Hindi labels wrapped around English values — or worse, a
   Devanagari voice trying to pronounce Latin text.

   This translates the parts of that data that are *terms* —
   seasons, soil types, plant names, months, units. Deliberately
   not the advisory prose: symptom descriptions and treatment
   advice are what a farmer acts on, and those should be written
   by someone who knows the crop, not pattern-matched here.
   The script builders leave that prose out for hi and mr.
========================================================= */

const HI = {
  // Seasons
  'Adsali': 'आडसाली', 'Pre-seasonal': 'पूर्व-हंगामी', 'Suru': 'सुरू',
  'Late Kharif': 'पछेती खरीफ', 'Kharif': 'खरीफ', 'Rabi': 'रबी', 'Summer': 'गर्मी',

  // Soil types
  'Well-drained loam to clay loam': 'अच्छी जल निकासी वाली दोमट से चिकनी दोमट मिट्टी',
  'Clay or clay loam that holds water': 'पानी रोकने वाली चिकनी या चिकनी दोमट मिट्टी',
  'Deep black cotton soil (vertisol)': 'गहरी काली कपास वाली मिट्टी',
  'Deep, well-drained medium loam': 'गहरी, अच्छी जल निकासी वाली मध्यम दोमट मिट्टी',
  'Well-drained sandy loam rich in organic matter': 'जैविक पदार्थ से भरपूर, अच्छी जल निकासी वाली बलुई दोमट मिट्टी',
  'Friable, well-drained loam': 'भुरभुरी, अच्छी जल निकासी वाली दोमट मिट्टी',
  'Well-drained loam; will not tolerate standing water': 'अच्छी जल निकासी वाली दोमट मिट्टी, जलभराव सहन नहीं करती',
  'Well-drained loam with good organic matter': 'अच्छे जैविक पदार्थ वाली दोमट मिट्टी',
  'Well-drained sandy loam to loam': 'अच्छी जल निकासी वाली बलुई दोमट से दोमट मिट्टी',
  'Loose, well-drained sandy loam': 'ढीली, अच्छी जल निकासी वाली बलुई दोमट मिट्टी',

  // Plants named in companion and rotation lists
  'Ratoon on diseased fields': 'रोगग्रस्त खेतों में खूंटी फसल',
  'Green manure': 'हरी खाद', 'Green gram': 'मूंग', 'Dryland crops': 'सूखी ज़मीन की फसलें',
  'Other cereals': 'अन्य अनाज', 'Other legumes': 'अन्य दलहन', 'Beans and peas': 'सेम और मटर',
  'Chickpea': 'चना', 'Mustard': 'सरसों', 'Coriander': 'धनिया', 'Marigold': 'गेंदा',
  'Cowpea': 'लोबिया', 'Pigeonpea': 'अरहर', 'Sorghum': 'ज्वार', 'Azolla': 'अजोला',
  'Sesbania': 'ढैंचा', 'Carrot': 'गाजर', 'Beetroot': 'चुकंदर', 'Beans': 'सेम',
  'Garlic': 'लहसुन', 'Pumpkin': 'कद्दू', 'Okra': 'भिंडी',

  // Value phrases
  'months after planting': 'महीने रोपण के बाद',
  'days after transplanting': 'दिन रोपाई के बाद',
  'days after sowing': 'दिन बुवाई के बाद',
  'months': 'महीने', 'days': 'दिन',

  // Months
  'Jan': 'जनवरी', 'Feb': 'फ़रवरी', 'Mar': 'मार्च', 'Apr': 'अप्रैल', 'May': 'मई',
  'Jun': 'जून', 'Jul': 'जुलाई', 'Aug': 'अगस्त', 'Sep': 'सितंबर', 'Oct': 'अक्टूबर',
  'Nov': 'नवंबर', 'Dec': 'दिसंबर',
}

const MR = {
  'Adsali': 'आडसाली', 'Pre-seasonal': 'पूर्वहंगामी', 'Suru': 'सुरू',
  'Late Kharif': 'उशिरा खरीप', 'Kharif': 'खरीप', 'Rabi': 'रब्बी', 'Summer': 'उन्हाळी',

  'Well-drained loam to clay loam': 'चांगला निचरा होणारी पोयटा ते चिकण पोयटा माती',
  'Clay or clay loam that holds water': 'पाणी धरून ठेवणारी चिकण किंवा चिकण पोयटा माती',
  'Deep black cotton soil (vertisol)': 'खोल काळी कापूस माती',
  'Deep, well-drained medium loam': 'खोल, चांगला निचरा होणारी मध्यम पोयटा माती',
  'Well-drained sandy loam rich in organic matter': 'सेंद्रिय पदार्थांनी समृद्ध, चांगला निचरा होणारी वाळुसर पोयटा माती',
  'Friable, well-drained loam': 'भुसभुशीत, चांगला निचरा होणारी पोयटा माती',
  'Well-drained loam; will not tolerate standing water': 'चांगला निचरा होणारी पोयटा माती, पाणी साचणे सहन होत नाही',
  'Well-drained loam with good organic matter': 'चांगल्या सेंद्रिय पदार्थांची पोयटा माती',
  'Well-drained sandy loam to loam': 'चांगला निचरा होणारी वाळुसर पोयटा ते पोयटा माती',
  'Loose, well-drained sandy loam': 'भुसभुशीत, चांगला निचरा होणारी वाळुसर पोयटा माती',

  'Ratoon on diseased fields': 'रोगट शेतातील खोडवा',
  'Green manure': 'हिरवळीचे खत', 'Green gram': 'मूग', 'Dryland crops': 'कोरडवाहू पिके',
  'Other cereals': 'इतर तृणधान्ये', 'Other legumes': 'इतर कडधान्ये', 'Beans and peas': 'घेवडा आणि वाटाणा',
  'Chickpea': 'हरभरा', 'Mustard': 'मोहरी', 'Coriander': 'कोथिंबीर', 'Marigold': 'झेंडू',
  'Cowpea': 'चवळी', 'Pigeonpea': 'तूर', 'Sorghum': 'ज्वारी', 'Azolla': 'अझोला',
  'Sesbania': 'शेवरी', 'Carrot': 'गाजर', 'Beetroot': 'बीट', 'Beans': 'घेवडा',
  'Garlic': 'लसूण', 'Pumpkin': 'भोपळा', 'Okra': 'भेंडी',

  'months after planting': 'महिन्यांनी लागवडीनंतर',
  'days after transplanting': 'दिवसांनी पुनर्लागवडीनंतर',
  'days after sowing': 'दिवसांनी पेरणीनंतर',
  'months': 'महिने', 'days': 'दिवस',

  'Jan': 'जानेवारी', 'Feb': 'फेब्रुवारी', 'Mar': 'मार्च', 'Apr': 'एप्रिल', 'May': 'मे',
  'Jun': 'जून', 'Jul': 'जुलै', 'Aug': 'ऑगस्ट', 'Sep': 'सप्टेंबर', 'Oct': 'ऑक्टोबर',
  'Nov': 'नोव्हेंबर', 'Dec': 'डिसेंबर',
}

const DICTS = { hi: HI, mr: MR }

/* Longest first, so "Late Kharif" is matched before "Kharif" and
   "days after sowing" before "days". */
const ORDERED = Object.fromEntries(
  Object.entries(DICTS).map(([lang, dict]) => [
    lang,
    Object.keys(dict).sort((a, b) => b.length - a.length),
  ]),
)

/** Translate the terms inside a value string. English passes straight through. */
export function term(text, language) {
  const dict = DICTS[language]
  if (!dict || !text) return text ?? ''

  let out = String(text)
  for (const key of ORDERED[language]) {
    if (out.includes(key)) out = out.split(key).join(dict[key])
  }
  return out
}
