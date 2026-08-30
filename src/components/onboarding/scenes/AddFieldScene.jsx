import bush3 from "../../../assets/scene/bush3.png";
import bush4 from "../../../assets/scene/bush4.png";
import cloud1 from "../../../assets/scene/cloud1.png";
import cloud3 from "../../../assets/scene/cloud3.png";
import fgGrassRock from "../../../assets/scene/fg-grass-rock.png";
import fgLeafTuft from "../../../assets/scene/fg-leaf-tuft.png";
import farmerIllustration from "../../../assets/scene/farmer-illustration.png";
import plainGround from "../../../assets/scene/plain-ground.png";

/**
 * Layered scene for the "Add your field" step: same ground + clouds as the "About yourself"
 * step (AboutYourselfScene.jsx). Bushes here are bush3/bush4 (different from the bush1/bush2
 * used on the "About yourself" screen) and sit at the outer edges rather than centered, since
 * the farmer-illustration layer already carries its own foliage around the character/phone.
 */
export default function AddFieldScene() {
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
      <div className="absolute inset-0 bottom-0 h-[26%]" />
      <img
        src={plainGround}
        alt=""
        className="absolute bottom-[-3.25%] left-1/2 w-[140%] max-w-none -translate-x-1/2"
      />

      <img src={bush3} alt="" className="absolute bottom-0 left-[1%] h-[24%]" />
      <img
        src={bush4}
        alt=""
        className="absolute right-[1%] bottom-0 h-[24%]"
      />

      <img
        src={farmerIllustration}
        alt="Farmer pointing at a map of their field"
        className="absolute bottom-[-2%] left-1/2 h-[76%] -translate-x-1/2"
      />

      {/* small foreground accents, in front of the illustration's base */}
      <img
        src={fgLeafTuft}
        alt=""
        className="absolute bottom-0 left-[18%] h-[13%]"
      />
      <img
        src={fgGrassRock}
        alt=""
        className="absolute right-[16%] bottom-0 h-[9%]"
      />
    </div>
  );
}
