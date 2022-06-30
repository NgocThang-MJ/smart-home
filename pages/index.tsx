import { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "../components/layout/Header";
import HouseLottie from "../components/lotties/House";

import { LightBulbIcon } from "@heroicons/react/outline";
import { BsThermometerSun } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { GiComputerFan } from "react-icons/gi";
import { MdBedroomParent, MdLiving, MdKitchen } from "react-icons/md";
import { RiDoorClosedFill, RiDoorOpenFill } from "react-icons/ri";
import { BsHouseDoorFill } from "react-icons/bs";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const weatherApi = process.env.NEXT_PUBLIC_WEATHER_API;

export default function Home() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  const [livLamp, setLivLamp] = useState(false);
  const [livFan, setLivFan] = useState(false);
  const [bedLamp, setBedLamp] = useState(false);
  const [bedFan, setBedFan] = useState(false);
  const [kitLamp, setKitLamp] = useState(false);
  const [kitFan, setKitFan] = useState(false);
  const [mainDoor, setMainDoor] = useState(false);

  const [outdoorTemp, setOutdoorTemp] = useState<null | number>(null);
  const [weatherIcon, setWeatherIcon] = useState("02d");
  const [windSpeed, setWindSpeed] = useState(4.63);
  const [weatherDes, setWeatherDes] = useState("");
  const [weatherHum, setWeatherHum] = useState<null | number>(null);
  const [temp, setTemp] = useState<null | number>(null);
  const [hum, setHum] = useState<null | number>(null);

  const toggleLivRoom = async (device: string) => {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    if (!serverUrl) return;
    const data: { lamp?: number; fan?: number } = {};
    let lamp = livLamp;
    let fan = livFan;
    if (device === "lamp") {
      data["lamp"] = !livLamp ? 1 : 0;
      lamp = !livLamp;
    }
    if (device === "fan") {
      data["fan"] = !livFan ? 1 : 0;
      fan = !livFan;
    }
    console.log(data);
    console.log(serverUrl);
    await axios.post(`${serverUrl}/livingroom`, data);
    setLivLamp(lamp);
    setLivFan(fan);
  };

  const toggleBedRoom = async (device: string) => {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    if (!serverUrl) return;
    const data: { lamp?: number; fan?: number } = {};
    let lamp = bedLamp;
    let fan = bedFan;
    if (device === "lamp") {
      data["lamp"] = !bedLamp ? 1 : 0;
      lamp = !bedLamp;
    }
    if (device === "fan") {
      data["fan"] = !bedFan ? 1 : 0;
      fan = !bedFan;
    }
    await axios.post(`${serverUrl}/bedroom`, data);
    setBedLamp(lamp);
    setBedFan(fan);
  };

  const toggleKitchen = async (device: string) => {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    if (!serverUrl) return;
    const data: { lamp?: number; fan?: number } = {};
    let lamp = kitLamp;
    let fan = kitFan;
    if (device === "lamp") {
      data["lamp"] = !kitLamp ? 1 : 0;
      lamp = !kitLamp;
    }
    if (device === "fan") {
      data["fan"] = !kitFan ? 1 : 0;
      fan = !kitFan;
    }
    await axios.post(`${serverUrl}/kitchen`, data);
    setKitLamp(lamp);
    setKitFan(fan);
  };

  const toggleDoor = async () => {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    if (!serverUrl) return;
    const data: { door?: number } = {};
    data["door"] = !mainDoor ? 1 : 0;
    console.log(data);
    setMainDoor(!mainDoor);
    await axios.post(`${serverUrl}/door`, data);
  };

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuth");
    if (!isAuth) {
      router.push("/login");
    }
    setIsAuth(true);
  }, []);

  useEffect(() => {
    if (!serverUrl) return;
    const getDHT11 = async () => {
      const res = await axios.get(serverUrl);
      const temp = res.data.temp;
      const hum = res.data.humidity;
      setTemp(temp);
      setHum(hum);
    };
    getDHT11();
    let intervalId = setInterval(getDHT11, 2500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (!weatherApi) return;
    const getWeather = async () => {
      const res = await axios.get(weatherApi);
      setOutdoorTemp(res.data.main.temp);
      setWeatherIcon(res.data.weather[0].icon);
      setWindSpeed(res.data.wind.speed);
      setWeatherDes(res.data.weather[0].description);
      setWeatherHum(res.data.main.humidity);
    };
    getWeather();
  }, []);

  useEffect(() => {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    if (!serverUrl) return;
    axios.get(serverUrl).then((res) => {
      console.log(res.data);
      const livLamp = res.data.livingroom.lamp;
      const livFan = res.data.livingroom.fan;
      const bedLamp = res.data.bedroom.lamp;
      const bedFan = res.data.bedroom.fan;
      const kitLamp = res.data.kitchen.lamp;
      const kitFan = res.data.kitchen.fan;
      setLivLamp(livLamp);
      setLivFan(livFan);
      setBedLamp(bedLamp);
      setBedFan(bedFan);
      setKitLamp(kitLamp);
      setKitFan(kitFan);
    });
  }, []);
  return (
    <>
      <Head>
        <title>Smart Homee</title>
      </Head>
      <div className="bg-[#191925] min-h-screen">
        {isAuth && (
          <>
            <div className="container">
              <Header />
              <div className="grid grid-cols-4 gap-8 mt-6">
                <div className="col-span-3 grid grid-cols-2 gap-8">
                  <div className="flex items-center justify-between col-span-2 text-slate-200">
                    <div>
                      <h1 className="text-5xl mb-4 font-bold">Hi Thang!</h1>
                      <p className="opacity-70">
                        Welcome home! The air quality is good & Fresh, you can
                        go out today
                      </p>
                      <div className="flex items-center">
                        {outdoorTemp && (
                          <p className="text-2xl mr-2">
                            {Math.round(outdoorTemp)}
                            <span className="text-lg"> &#8451;</span>
                          </p>
                        )}
                        {weatherHum && (
                          <p className="text-2xl mr-2">{weatherHum}%</p>
                        )}
                        <Image
                          src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
                          width={50}
                          height={50}
                        />
                      </div>
                      {weatherDes && (
                        <p className="opacity-80 capitalize">{weatherDes}</p>
                      )}
                      {windSpeed && (
                        <p className="opacity-80">
                          Wind speed: {windSpeed} m &#8725; s
                        </p>
                      )}
                    </div>
                    <HouseLottie />
                  </div>

                  <div className="livingroom border border-gray-700/20 rounded-xl p-5 shadow-lg shadow-gray-700/50">
                    <div className="flex text-slate-200 items-center mb-4">
                      <BsHouseDoorFill className="mr-3 text-2xl" />
                      <p className="text-xl text-slate-200">Main Door</p>
                    </div>

                    <div className="flex">
                      <div className="w-48 h-32 rounded-2xl bg-gradient-to-t from-[#654ea3] to-[#eaafc8]">
                        <div className="p-6 text-slate-200 m-auto flex justify-between h-full">
                          <div className="flex flex-col justify-between">
                            <div className="h-8 w-8 text-slate-200">
                              {mainDoor ? (
                                <RiDoorOpenFill className="h-8 w-8" />
                              ) : (
                                <RiDoorClosedFill className="h-8 w-8" />
                              )}
                            </div>
                            <p className="font-bold">Main Door</p>
                          </div>
                          <div className="relative">
                            <div
                              onClick={() => toggleDoor()}
                              className="hover:cursor-pointer"
                            >
                              <div className="block bg-gray-600 w-12 h-6 rounded-full"></div>
                              <div
                                className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-all ${
                                  mainDoor ? "bg-green-300 translate-x-6" : ""
                                }`}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="livingroom border border-gray-700/20 rounded-xl p-5 shadow-lg shadow-gray-700/50">
                    <div className="flex text-slate-200 items-center mb-4">
                      <MdLiving className="mr-3 text-3xl" />
                      <p className="text-xl text-slate-200">Living Room</p>
                    </div>

                    <div className="flex">
                      <div className="w-48 h-32 rounded-2xl bg-gradient-to-t from-green-600 to-emerald-400 mr-5">
                        <div className="p-6 text-slate-200 m-auto flex justify-between h-full">
                          <div className="flex flex-col justify-between">
                            <LightBulbIcon
                              className={`h-8 w-8 ${
                                livLamp ? "text-yellow-300" : "text-slate-200"
                              }`}
                            />
                            <p className="font-bold">Lamp</p>
                          </div>
                          <div className="relative">
                            <div
                              onClick={() => toggleLivRoom("lamp")}
                              className="hover:cursor-pointer"
                            >
                              <div className="block bg-gray-600 w-12 h-6 rounded-full"></div>
                              <div
                                className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-all ${
                                  livLamp ? "bg-green-300 translate-x-6" : ""
                                }`}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-48 h-32 rounded-2xl bg-gradient-to-t from-cyan-500 to-blue-400">
                        <div className="p-6 text-slate-200 m-auto flex justify-between h-full">
                          <div className="flex flex-col justify-between">
                            <GiComputerFan
                              className={`${
                                livFan && "animate-spin"
                              } h-8 w-8 text-slate-200`}
                            />
                            <p className="font-bold">Fan</p>
                          </div>
                          <div className="relative">
                            <div
                              onClick={() => toggleLivRoom("fan")}
                              className="hover:cursor-pointer"
                            >
                              <div className="block bg-gray-600 w-12 h-6 rounded-full"></div>
                              <div
                                className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-all ${
                                  livFan ? "bg-green-300 translate-x-6" : ""
                                }`}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bedroom border border-gray-700/20 rounded-xl p-5 shadow-lg shadow-gray-700/50">
                    <div className="flex text-slate-200 items-center mb-4">
                      <MdBedroomParent className="mr-3 text-3xl" />
                      <p className="text-xl text-slate-200">Bed Room</p>
                    </div>

                    <div className="flex">
                      <div className="w-48 h-32 rounded-2xl bg-gradient-to-t from-green-600 to-emerald-400 mr-5">
                        <div className="p-6 text-slate-200 m-auto flex justify-between h-full">
                          <div className="flex flex-col justify-between">
                            <LightBulbIcon
                              className={`h-8 w-8 ${
                                bedLamp ? "text-yellow-300" : "text-slate-200"
                              }`}
                            />
                            <p className="font-bold">Lamp</p>
                          </div>
                          <div className="relative">
                            <div
                              onClick={() => toggleBedRoom("lamp")}
                              className="hover:cursor-pointer"
                            >
                              <div className="block bg-gray-600 w-12 h-6 rounded-full"></div>
                              <div
                                className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-all ${
                                  bedLamp ? "bg-green-300 translate-x-6" : ""
                                }`}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-48 h-32 rounded-2xl bg-gradient-to-t from-blue-400 to-teal-400">
                        <div className="p-6 text-slate-200 m-auto flex justify-between h-full">
                          <div className="flex flex-col justify-between">
                            <GiComputerFan
                              className={`${
                                bedFan && "animate-spin"
                              } h-8 w-8 text-slate-200`}
                            />
                            <p className="font-bold">Fan</p>
                          </div>
                          <div className="relative">
                            <div
                              onClick={() => toggleBedRoom("fan")}
                              className="hover:cursor-pointer"
                            >
                              <div className="block bg-gray-600 w-12 h-6 rounded-full"></div>
                              <div
                                className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-all ${
                                  bedFan ? "bg-green-300 translate-x-6" : ""
                                }`}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="kitchen border border-gray-700/20 rounded-xl p-5 shadow-lg shadow-gray-700/50">
                    <div className="flex text-slate-200 items-center mb-4">
                      <MdKitchen className="mr-3 text-3xl" />
                      <p className="text-xl text-slate-200">Kitchen </p>
                    </div>

                    <div className="flex">
                      <div className="w-48 h-32 rounded-2xl bg-gradient-to-t from-green-600 to-emerald-400 mr-5">
                        <div className="p-6 text-slate-200 m-auto flex justify-between h-full">
                          <div className="flex flex-col justify-between">
                            <LightBulbIcon
                              className={`h-8 w-8 ${
                                kitLamp ? "text-yellow-300" : "text-slate-200"
                              }`}
                            />
                            <p className="font-bold">Lamp</p>
                          </div>
                          <div className="relative">
                            <div
                              onClick={() => toggleKitchen("lamp")}
                              className="hover:cursor-pointer"
                            >
                              <div className="block bg-gray-600 w-12 h-6 rounded-full"></div>
                              <div
                                className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-all ${
                                  kitLamp ? "bg-green-300 translate-x-6" : ""
                                }`}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-48 h-32 rounded-2xl bg-gradient-to-t from-blue-500 to-teal-400">
                        <div className="p-6 text-slate-200 m-auto flex justify-between h-full">
                          <div className="flex flex-col justify-between">
                            <GiComputerFan
                              className={`${
                                kitFan && "animate-spin"
                              } h-8 w-8 text-slate-200`}
                            />
                            <p className="font-bold">Fan</p>
                          </div>
                          <div className="relative">
                            <div
                              onClick={() => toggleKitchen("fan")}
                              className="hover:cursor-pointer"
                            >
                              <div className="block bg-gray-600 w-12 h-6 rounded-full"></div>
                              <div
                                className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-all ${
                                  kitFan ? "bg-green-300 translate-x-6" : ""
                                }`}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="border border-gray-700/20 rounded-xl p-5 shadow-lg shadow-gray-700/50 mb-10">
                    <p className="text-slate-200 text-3xl text-center">
                      Living Room
                    </p>
                    <div className="flex items-center mb-4">
                      <BsThermometerSun className="text-white text-6xl ml-4 text-red-400" />
                      <div className="flex text-white">
                        <p className="text-[80px]">{temp && temp}</p>
                        <span className="text-4xl mt-3"> &#8451;</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <WiHumidity className="text-white text-7xl text-cyan-300" />
                      <div className="flex text-white">
                        <p className="text-[80px]">{hum && hum}</p>
                        <span className="text-4xl mt-3">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
