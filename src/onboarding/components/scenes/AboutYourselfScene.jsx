import bush1 from "../../assets/scene/bush1.png";
import bush2 from "../../assets/scene/bush2.png";
import cloud1 from "../../assets/scene/cloud1.png";
import cloud3 from "../../assets/scene/cloud3.png";
import fgGrassRock from "../../assets/scene/fg-grass-rock.png";
import fgLeafTuft from "../../assets/scene/fg-leaf-tuft.png";
import farmerWaving from "../../assets/scene/farmer-waving.png";
import plainGround from "../../assets/scene/plain-ground.png";

/**
 * Layered scene for the "About yourself" step: sky (from the panel's own bg-sky) → clouds →
 * ground → bushes → farmer → small foreground leaves/grass (in front of the farmer, for depth).
 * Every piece is absolutely positioned as a percentage of the panel, so it reflows with the
 * panel instead of needing per-breakpoint values.
 *
 * Tweak positions/sizes here — each image is independent, move freely:
 * - top/left/right/bottom % = where it sits in the panel (negative = deliberately bled off-edge)
 * - w-[X%] = size relative to panel width (clouds, ground)
 * - h-[X%] = size relative to panel height (bushes, farmer, foreground leaves) — height scales
 *   relative to the farmer's own height rather than the panel's width
 */
export default function AboutYourselfScene() {
  return (
    <div className="absolute inset-0">
      <img
        src={cloud1}
        alt=""
        className="absolute top-[4%] left-[-10%] w-[48%] opacity-90 scale-150"
      />
      <img
        src={cloud3}
        alt=""
        className="absolute top-[12%] right-[-6%] w-[32%] opacity-85"
      />

      {/* solid backing so any transparent gap in the ground artwork shows ground color, not sky */}
      <div className="absolute inset-x-0 bottom-0 h-[26%]" />
      <img
        src={plainGround}
        alt=""
        className="absolute bottom-[-3.25%] left-1/2 w-[140%] max-w-none -translate-x-1/2"
      />

      <img
        src={bush1}
        alt=""
        className="absolute bottom-0 left-[50%] h-[28%]"
      />
      <img
        src={bush2}
        alt=""
        className="absolute right-[50%] bottom-0 h-[28%]"
      />

      <img
        src={farmerWaving}
        alt="Farmer waving hello"
        className="absolute bottom-[2%] left-1/2 h-[72%] -translate-x-1/2"
      />

      {/* small foreground accents, in front of the farmer's feet */}
      <img
        src={fgLeafTuft}
        alt=""
        className="absolute bottom-0 left-[28%] h-[15%] -translate-x-1/2"
      />
      <img
        src={fgGrassRock}
        alt=""
        className="absolute right-[28%] bottom-0 h-[9%]"
      />
    </div>
  );
}
