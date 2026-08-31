import bush1 from "../../assets/scene/bush1.png";
import bush2 from "../../assets/scene/bush2.png";
import cloud1 from "../../assets/scene/cloud1.png";
import cloud3 from "../../assets/scene/cloud3.png";
import fgGrassRock from "../../assets/scene/fg-grass-rock.png";
import fgLeafTuft from "../../assets/scene/fg-leaf-tuft.png";
import farmerPointing from "../../assets/scene/farmer-pointing.png";
import plainGround from "../../assets/scene/plain-ground.png";

/**
 * Layered scene for the "Tell us about your crop" step. Same ground/bush/cloud treatment as
 * AboutYourselfScene.
 *
 * PLACEHOLDER: Canva shows the farmer crouching, examining a plant leaf — we don't have that
 * pose yet, so this temporarily reuses farmer-pointing.png. Swap `farmerPointing` for the real
 * crouching-with-plant asset once it's available; nothing else needs to change.
 */
export default function CropDetailsScene() {
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

      <img
        src={plainGround}
        alt=""
        className="absolute bottom-[-3.25%] left-1/2 w-[140%] max-w-none -translate-x-1/2"
      />

      <img src={bush1} alt="" className="absolute bottom-0 left-[50%] h-[28%]" />
      <img src={bush2} alt="" className="absolute right-[50%] bottom-0 h-[28%]" />

      <img
        src={farmerPointing}
        alt="Farmer examining a crop"
        className="absolute bottom-[2%] left-1/2 h-[72%] -translate-x-1/2"
      />

      <img
        src={fgLeafTuft}
        alt=""
        className="absolute bottom-0 left-[28%] h-[15%] -translate-x-1/2"
      />
      <img src={fgGrassRock} alt="" className="absolute right-[28%] bottom-0 h-[9%]" />
    </div>
  );
}
