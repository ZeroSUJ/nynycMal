"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import nftmAbi from "@/contracts/Marketplace.json";
import { uploadJSONToIPFS } from "./pinata";
import Content from "@/components/Content";
import ImageCard from "@/components/ImageCard";
import { FaImages } from "react-icons/fa";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Spinner
} from "@nextui-org/react";
import { showToast } from "@/helper/ToastNotify";
import {
  useWaitForTransactionReceipt,
  useWriteContract,
  useAccount
} from "wagmi";
import Building from "@/components/Building";
import Age from "@/components/AgeSelectbox";
import Weather from "@/components/WeatherSelectbox";
import Environment from "@/components/EnvironmentSelectbox";
import Season from "@/components/SeasonSelectbox";
import {
  ages,
  weathers,
  seasons,
  environments,
  buildings,
} from "@/lib/data/PromptData";
export type DataType = { building_name: string };
import { parseEther } from "viem";
import erc20ABI from "@/contracts/ERC20ABI.json";
import Web3 from 'web3';



const Minting = () => {
  const erc20TokenAddress = "0x8A99D529d60f854ff323d4fFE284cc647CbDA5C3";
  const userAccount = useAccount();
  const { address, isConnected } = userAccount;
  const [inputVal, setInputVal] = useState("");
  const contractAddress = nftmAbi.address;
  const contractAbi = nftmAbi.abi;
  const [genImg, setGenImg] = useState<any[]>([]);
  const [uploadFileName, setUploadFileName] = useState<string>("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [nftName, setNftName] = useState<string>("");
  const [fileURL, setFileURL] = useState<string>("");
  const [isProcess, setIsProcess] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [selectedList, setSelectedList] = useState([]);
  const [isActive, setActive] = useState(false);

  const {
    data: hash,
    isPending,
    error,
    writeContractAsync,
  } = useWriteContract();

  // upload metadata of image to the pinata IPFS
  const _uploadMetaData = (nftColName: string, nftFileURL: string) => {
    return new Promise((resolve, reject) => {
      console.log("MetaData:", nftColName, nftFileURL);
      if (!nftColName || !nftFileURL) {
        showToast("error", "Plz input name exactly!");
        reject("error occured");
      }

      const nftJSON = {
        nftName,
        image: nftFileURL,
      };
      console.log("nftJson:", nftJSON);
      //upload the metadata JSON to IPFS
      uploadJSONToIPFS(nftJSON)
        .then((res: any) => {
          if (res.success === true) {
            console.log("Uploaded JSON to Pinata: ", res);
            resolve(res);
          }
        })
        .catch((err) => {
          console.log("Uploaded JSON to Pinata: ", err);
          reject(err);
          showToast("error", "Uploading Error");
        });
    });
  };

  const _mint = async () => {
    console.log("upload:", uploadFileName);
    const metadataUrl: string[] = [];
    setIsProcess(true);
    let imageAmount = selectedList.length;
    let tokenAmount = 0;
    switch (imageAmount) {
      case 0:
        tokenAmount = 0;
        break;
      case 1:
        tokenAmount = 2000000;
        break;
      case 2:
        tokenAmount = 3500000;
        break;
      case 3:
        tokenAmount = 4500000;
        break;
      case 4:
        tokenAmount = 5000000;
        break;
      default:
        tokenAmount = 0;
        break;
    }
    try {
      const tx = await writeContractAsync({
        abi: erc20ABI,
        address: erc20TokenAddress,
        functionName: "approve",
        args: [`0x${contractAddress}`, tokenAmount.toString()],
      });
      console.log("tx1:", tx);
    } catch (err) {
      console.log("err:", err);;
      setIsProcess(false);
      showToast("error", "Transaction reverted");
      return;
    }
    try {
      console.log("genImg:", genImg);
      for (let i = 0; i < selectedList.length; i++) {
        const it = selectedList[i] - 1;
        console.log("img : ", genImg[it]);
        const uploadRes: any = await _uploadMetaData(nftName, genImg[it]);
        if (uploadRes.success === true) {
          showToast("success", "Successfully uploaded");
          console.log("uploaded Metadata url:", uploadRes?.pinataURL);
          metadataUrl.push(uploadRes?.pinataURL);
        } else {
          showToast("error", "Metadata uploading error!");
          console.log(uploadRes?.message);
        }
      } // or we can use useEffect() hook for state update. the state variable will be update after re-rendering.
      console.log("meta:", metadataUrl);
    } catch (error) {
      console.log(error);
      setIsProcess(false);
      showToast("error", "Error occured!");
      return;
    }
    try {
      const tx2 = await writeContractAsync({
        address: `0x${contractAddress}`,
        abi: contractAbi,
        functionName: "createToken",
        args: [metadataUrl, tokenAmount.toString()],
      });
      console.log("tx2:", tx2);
    } catch (error) {
      console.log(error);
      showToast("error", "Error occured!");
      setIsProcess(false);
      return;
    }
    setIsProcess(false);
  };

  const [age, setAge] = useState(ages[0]);
  const [season, setSeason] = useState(seasons[0]);
  const [weather, setWeather] = useState(weathers[0]);
  const [environment, setEnvironment] = useState(environments[0]);
  const [building, setBuilding] = useState("");
  let prompt =
    inputVal +
    " and " +
    building +
    " of New York City " +
    age.name +
    ", in " +
    season.name +
    " " +
    // environment.name +
    // " " +
    weather.name;
  console.log(prompt);

  const GenerateImage = () => {
    setIsGenerating(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      key: "UNi8wvSz4p6CkM1boPSxccM0GErrbVK3aj84nqZkM3p3cMHkumQ3UNtjFP5P",
      prompt: prompt,
      negative_prompt: "bad quality, ",
      width: "1024",
      height: "1024",
      safety_checker: false,
      seed: null,

      samples: 4,
      base64: false,
      webhook: null,
      track_id: null,
    });
    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("https://modelslab.com/api/v6/realtime/text2img", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        const resultImage = JSON.parse(result);
        if (resultImage.status === "error") {
          showToast("error", resultImage.message);
          return;
        }
        console.log(resultImage.output);
        const imageData = resultImage.output;
        setGenImg([imageData[0], imageData[1], imageData[2], imageData[3]]);
        setIsGenerating(false);
      })
      .catch((error) => console.log("error", error));
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <div className="grid grid-cols-12  w-full h-screen bg-[#090808] relative">
      <Navbar />
      <Sidebar />
      <Content >
        <>
          <div className="flex flex-col gap-8 px-8 py-4 ">
            <div className="flex justify-center">
              <h1 className="text-center text-3xl">Mint your NFT!</h1>
            </div>
            <p className="px-5 pt-2 text-xl">Examples</p>
            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-6 gap-4">
              <ImageCard imgSrc="./back1.png" />
              <ImageCard imgSrc="./back2.png" />
              <ImageCard imgSrc="./back3.png" />
              <ImageCard imgSrc="./back4.png" />
              <ImageCard imgSrc="./back5.png" />
              <ImageCard imgSrc="./back6.png" />
            </div>
            <div className="flex flex-col gap-12 p-2 lg:flex-row">
              <div className="flex w-full flex-col">
                <div className="bg-white-900 flex justify-center items-center">
                  <Input
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    type="text"
                    label="ex: a man"
                  />
                </div>
                <Building building={building} setBuilding={setBuilding} />
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pb-3">
                  <Age age={age} setAge={setAge} />
                  <Season season={season} setSeason={setSeason} />
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pb-3">
                  <Environment
                    environment={environment}
                    setEnvironment={setEnvironment}
                  />
                  <Weather weather={weather} setWeather={setWeather} />
                </div>

              </div>
              <div className="flex flex-col w-full">
                <div className=" rounded-xl border-2 border-neutral-400 bg-black px-3 py-2">
                  <p className="text-center text-xl uppercase">Please choose images</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-4 pt-8">
                  {[1, 2, 3, 4].map((id: number) => (
                    <div key={id} className="flex justify-center items-center h-full"> {/* Apply flex styles for centering */}
                      {isGenerating ? (
                        <Spinner className="flex mt-[40%]" />
                      ) : (
                        <ImageCard
                          selectedList={selectedList}
                          setSelectedList={setSelectedList}
                          id={id}
                          imgSrc={genImg[id - 1]}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8 lg:flex-row pb-2">
              <div className="flex w-full justify-center">
                <Button
                  className="px-5"
                  color="primary"
                  variant="bordered"
                  onClick={GenerateImage}
                  isLoading={isGenerating}
                >
                  {isGenerating ? "Generating now..." : "Generate Image"}
                </Button>
              </div>
              <div className="flex w-full justify-center">
                <Button
                  className="px-10"
                  onClick={onOpen}
                  color="primary"
                  variant="bordered"
                  isDisabled={isProcess}
                  isLoading={isProcess}
                >
                  Mint NFT
                </Button>
              </div>
            </div>
          </div>

          <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    NFT Minting
                  </ModalHeader>
                  <ModalBody>
                    {/* <p>Please input name</p> */}
                    <p>This is the number of NYNYC tokens required to mint NFT once.</p>
                    <p>One Image: 2000 NYNYC</p>
                    <p>Two Images: 3500 NYNYC</p>
                    <p>Three Images: 4500 NYNYC</p>
                    <p>Four Images: 5000 NYNYC</p>
                    <div className=" text-red-500">Please input NFT name</div>
                    <div>
                      <Input
                        autoFocus
                        endContent={
                          <FaImages className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Name"
                        placeholder="Enter your NFT name"
                        variant="bordered"
                        onChange={(event) => setNftName(event.target.value)}
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      color="primary"
                      onClick={_mint}
                      isLoading={isProcess}
                    >
                      {isProcess ? "Processing..." : "Mint"}
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      </Content>
    </div>
  );
};

export default Minting;