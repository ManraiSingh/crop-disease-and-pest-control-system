import { createContext, useContext } from 'react'

/**
 * The app frame element — the `data-theme` div in AppShell that every screen sits inside.
 *
 * Bottom sheets and other full-screen overlays have to cover the whole phone, but the
 * cards they open from are glass panes (`relative overflow-hidden backdrop-blur-xl`),
 * and a backdrop filter makes an element the containing block for absolutely positioned
 * descendants. A sheet rendered in place is therefore pinned to — and clipped by — the
 * card it came from. Portalling into the frame is what lets it cover the screen while
 * its state stays with the component that owns it.
 *
 * `document.body` would not do: in the phone-mockup preview the frame is only part of
 * the page, so a body-level sheet would spill outside the device.
 */
export const FrameContext = createContext(null)

export function useFrame() {
  return useContext(FrameContext)
}
