import { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import Header from "../components/layout/Header";
import { LightBulbIcon } from "@heroicons/react/outline";

export default function Home() {
  const [lamp, setLamp] = useState(false);
  const toggleLamp = async () => {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    console.log(serverUrl);
    if (!serverUrl) return;
    const res = await axios.post(`${serverUrl}/livingroom`, {
      lamp1: !lamp ? 1 : 0,
    });
    console.log(res.data);
    setLamp(!lamp);
  };

  useEffect(() => {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    if (!serverUrl) return;
    axios.get(serverUrl).then((res) => {
      console.log(res.data);
      const lamp = res.data.livingroom.lamp1;
      setLamp(lamp);
    });
  }, []);
  return (
    <>
      <Head>
        <title>Smart Homee</title>
      </Head>
      <div className="bg-[#191925] min-h-screen">
        <div className="container">
          <Header />
          <div className="w-48 h-32 rounded-2xl bg-gradient-to-t from-green-600 to-emerald-400">
            <div className="p-6 text-slate-200 m-auto flex justify-between h-full">
              <div className="flex flex-col justify-between">
                <LightBulbIcon className="h-8 w-8 text-slate-200" />
                <p className="font-bold">Lamp</p>
              </div>
              <div className="relative">
                <div onClick={toggleLamp} className="hover:cursor-pointer">
                  <div className="block bg-gray-600 w-12 h-6 rounded-full"></div>
                  <div
                    className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-all ${
                      lamp ? "bg-green-300 translate-x-6" : ""
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
