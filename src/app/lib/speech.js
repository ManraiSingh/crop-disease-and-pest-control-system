import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Read-aloud for the advisory screens.
 *
 * Plenty of the farmers this is built for would rather listen than read a screen of
 * figures, so every advisory view can speak itself. Uses the browser's own speech
 * synthesis — nothing to install, and it works without a network round trip.
 */

/** BCP-47 tags for the app's languages, best-effort per platform. */
const VOICE_LANGS = { en: 'en-IN', hi: 'hi-IN', mr: 'mr-IN' }

export function speechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

/* Units and connectors, per language — "20 – 27 °C" has to be read, not spelled. */
const UNITS = {
  en: { to: 'to', c: ' degrees celsius', mm: ' millimetres', cm: ' centimetres', ph: ' P H ' },
  hi: { to: 'से', c: ' डिग्री सेल्सियस', mm: ' मिलीमीटर', cm: ' सेंटीमीटर', ph: ' पी एच ' },
  mr: { to: 'ते', c: ' डिग्री सेल्सिअस', mm: ' मिलिमीटर', cm: ' सेंटिमीटर', ph: ' पी एच ' },
}

/**
 * Expand the shorthand the UI uses into something worth hearing: "20 – 27 °C" read
 * literally comes out as "twenty dash twenty seven degree C".
 */
export function speakable(text, language = 'en') {
  const unit = UNITS[language] ?? UNITS.en

  return String(text ?? '')
    .replace(/(\d)\s*[–—-]\s*(\d)/g, `$1 ${unit.to} $2`)
    .replace(/°\s*C/g, unit.c)
    .replace(/\bmm\b/g, unit.mm)
    .replace(/\bpH\b/g, unit.ph)
    .replace(/\bcm\b/g, unit.cm)
    .replace(/\s*·\s*/g, ', ')
    .replace(/\s*\/\s*/g, ', ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Pick a voice for the language, falling back to whatever the device has. */
function pickVoice(language) {
  const wanted = VOICE_LANGS[language] ?? 'en-IN'
  const voices = window.speechSynthesis.getVoices()
  if (!voices.length) return null

  const base = wanted.split('-')[0]
  return (
    voices.find((voice) => voice.lang === wanted) ||
    voices.find((voice) => voice.lang.replace('_', '-').startsWith(base)) ||
    null
  )
}

export default function useSpeech(language = 'en') {
  const [speaking, setSpeaking] = useState(false)
  const supported = speechSupported()

  // Chrome cuts long utterances off after ~15s, so the script is queued sentence by
  // sentence; each one is short enough to finish.
  const queue = useRef([])

  const stop = useCallback(() => {
    if (!supported) return
    queue.current = []
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }, [supported])

  const speak = useCallback(
    (script) => {
      if (!supported) return

      const text = speakable(script, language)
      if (!text) return

      window.speechSynthesis.cancel()

      const voice = pickVoice(language)

      // Guard decimal points before splitting — "pH 6.0 to 7.0" is one sentence, not
      // three, and the extra breaks were audible as stumbles mid-figure.
      const GUARD = '\u0000'
      const guarded = text.replace(/(\d)\.(\d)/g, `$1${GUARD}$2`)
      const sentences = (guarded.match(/[^.!?]+[.!?]*/g) ?? [guarded]).map((part) =>
        part.split(GUARD).join('.'),
      )
      queue.current = sentences

      setSpeaking(true)

      sentences.forEach((sentence, index) => {
        const utterance = new SpeechSynthesisUtterance(sentence.trim())
        if (voice) utterance.voice = voice
        utterance.lang = voice?.lang ?? VOICE_LANGS[language] ?? 'en-IN'
        // A shade slower than default — this is reference material, not prose.
        utterance.rate = 0.94
        utterance.pitch = 1

        if (index === sentences.length - 1) {
          utterance.onend = () => setSpeaking(false)
          utterance.onerror = () => setSpeaking(false)
        }

        window.speechSynthesis.speak(utterance)
      })
    },
    [language, supported],
  )

  /* Leaving the screen should stop the voice, not let it read on. */
  useEffect(() => stop, [stop])

  useEffect(() => {
    if (!supported) return undefined
    // Voices load asynchronously on most platforms; touching the list warms it up.
    window.speechSynthesis.getVoices()
    const onVoices = () => window.speechSynthesis.getVoices()
    window.speechSynthesis.addEventListener?.('voiceschanged', onVoices)
    return () => window.speechSynthesis.removeEventListener?.('voiceschanged', onVoices)
  }, [supported])

  return { speak, stop, speaking, supported }
}
