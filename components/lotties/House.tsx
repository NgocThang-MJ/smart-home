import Lottie from "react-lottie";
import HouseData from "../../public/house.json";

function House() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: HouseData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Lottie
      options={defaultOptions}
      width={350}
      height={200}
      style={{ margin: 0 }}
    />
  );
}

export default House;
