import { useRecoilState } from "recoil";
import { bgColorState } from "../store/bgColor";

export const useBgColor = () => {
  const [bgColor, setBgColor] = useRecoilState(bgColorState);

  return bgColor;
};
