'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import nftmAbi from '@/contracts/Marketplace.json';
import { uploadFileToIPFS, uploadJSONToIPFS } from './pinata';
import Content from '@/components/Content';
import ImageCard from '@/components/ImageCard';
import { Accordion, AccordionItem } from "@nextui-org/react";

import { FaEye, FaImage, FaImages } from "react-icons/fa";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { showToast } from '@/helper/ToastNotify';
import { type BaseError, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import Building from '@/components/Building';
import Age from '@/components/AgeSelectbox';
import Weather from '@/components/WeatherSelectbox';
import Environment from '@/components/EnvironmentSelectbox';
import Season from '@/components/SeasonSelectbox';
import { ages, weathers, seasons, environments, buildings } from '@/lib/data/PromptData';
import MyCombobox from '@/components/combobox';
import { Spinner } from '@nextui-org/react';



export type DataType = { building_name: string; }
import { parseEther } from 'viem';
import erc20ABI from '@/contracts/ERC20ABI.json';



const Minting = () => {
  const erc20TokenAddress = "0x0406dbBF7B62f79F8d889F30cC1F0E9191c404D4";
  const [inputVal, setInputVal] = useState('')
  const contractAddress = nftmAbi.address;
  const contractAbi = nftmAbi.abi;
  const [genImg, setGenImg] = useState("")
  const [uploadFileName, setUploadFileName] = useState<string>("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [nftName, setNftName] = useState<string>("");
  const [fileURL, setFileURL] = useState<string>("");
  const [isProcess, setIsProcess] = useState<boolean>(false);


  const handleUpload = () => {
    setIsUploading(true);

    // Your upload logic here

    setTimeout(() => {
      setIsUploading(false);
    }, 45000);
  };

  const {
    data: hash,
    isPending,
    error,
    writeContractAsync
  } = useWriteContract();


  // upload metadata of image to the pinata IPFS
  const _uploadMetaData = (nftColName: string, nftFileURL: string) => {
    return new Promise((resolve, reject) => {
      console.log("MetaData:", nftColName, nftFileURL);
      if (!nftColName || !nftFileURL) {
        showToast("error", "Plz input name exactly!");
        reject("error occured")
      }

      const nftJSON = {
        nftName, image: nftFileURL
      }
      console.log('nftJson:', nftJSON);
      //upload the metadata JSON to IPFS
      uploadJSONToIPFS(nftJSON)
        .then(res => {
          if (res.success === true) {
            console.log("Uploaded JSON to Pinata: ", res)
            resolve(res);
            // return res.pinataURL;
          }
        })
        .catch(err => {
          reject(err);
        })
    });
  }

  const _mint = async () => {
    console.log('upload:', uploadFileName);
    setIsProcess(true);
    const tx = await writeContractAsync({
      abi: erc20ABI,
      address: erc20TokenAddress,
      functionName: 'approve',
      args: [contractAddress, parseEther('1')],
    });
    console.log("tx1:", tx);

    // const result = await uploadFileToIPFS(uploadFileName);
    // if (result?.success === true) {
    //   setFileURL(result?.pinataURL);
    // } else {
    //   showToast("error", "Uploading Error");
    // }
    // _uploadMetaData(nftName, result?.pinataURL).then(async(res)=>{

    for (let i = 0; i < genImg.length; i++) {
      await _uploadMetaData(nftName, genImg[i]).then(async (res) => {
        if (res.success === true) {
          showToast("success", "Successfully uploaded");
          console.log("uploaded Metadata url:", res?.pinataURL);
          const tx2 = await writeContractAsync({
            address: contractAddress,
            abi: contractAbi,
            functionName: 'createToken',
            args: [[res?.pinataURL], parseEther('1')],
          });
          console.log("tx2:", tx2);
        }
      });
    } // or we can use useEffect() hook for state update. the state variable will be update after re-rendering.
    setIsProcess(false);
  };

  const [age, setAge] = useState(ages[0]);
  const [season, setSeason] = useState(seasons[0])
  const [weather, setWeather] = useState(weathers[0])
  const [environment, setEnvironment] = useState(environments[0])
  const [building, setBuilding] = useState(buildings[0])
  let prompt = inputVal + " and " + building.name + " of New York City " + age.name + ", in " + season.name + " " + environment.name;
  console.log(prompt);

  const GenerateImage = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "key": "UNi8wvSz4p6CkM1boPSxccM0GErrbVK3aj84nqZkM3p3cMHkumQ3UNtjFP5P",
      prompt: prompt,
      "negative_prompt": "bad quality, ",
      "width": "512",
      "height": "512",
      "safety_checker": false,
      "seed": null,
      "samples": 4,
      "base64": false,
      "webhook": null,
      "track_id": null
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://modelslab.com/api/v6/realtime/text2img", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result)
        const resultImage = JSON.parse(result);
        if (resultImage.status === 'error') {
          alert(resultImage.message);
          return;
        }
        console.log(resultImage.output);
        const imageData = resultImage.output;
        setGenImg(imageData)

      })
      .catch(error => console.log('error', error));
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  return (
    <div className="grid grid-cols-12 w-full h-screen bg-[#090808]">
      <Navbar />
      <Sidebar />
      <Content>
        <>
          <div className="flex flex-col gap-8 px-8 py-4 ">
            <div className="flex justify-center">
              <h1 className="text-center text-3xl">Mint your NFT!</h1>
            </div>
            <Accordion suppressHydrationWarning variant="splitted">
              <AccordionItem
                key="anchor"
                aria-label="Anchor"
                indicator={<FaImage />}
                title="Show samples"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-4">
                  <ImageCard imgSrc="./back.png" />
                  <ImageCard imgSrc="./back2.png" />
                  <ImageCard imgSrc="./back3.png" />
                  <ImageCard imgSrc="./back4.png" />
                </div>
              </AccordionItem>
            </Accordion>
            <div>
              <div className="bg-white-900 flex justify-center items-center">
                <Input
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  type='text'
                  label='Imagine'
                />
              </div>
              <div>
                <Building building={building} setBuilding={setBuilding} />
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pb-3">
                  <Age age={age} setAge={setAge} />
                  <Season season={season} setSeason={setSeason} />
                  <Environment environment={environment} setEnvironment={setEnvironment} />
                  <Weather weather={weather} setWeather={setWeather} />
                </div>
              </div>
              <Button color='primary' variant='bordered' onClick={GenerateImage}>Generate Image</Button>
              <div className='grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-4 py-5'>
                <ImageCard imgSrc={genImg[0]} />
                <ImageCard imgSrc={genImg[1]} />
                <ImageCard imgSrc={genImg[2]} />
                <ImageCard imgSrc={genImg[3]} />
              </div>
              <Button onPress={onOpen} className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">Mint NFT</Button>

            </div>

          </div>
          <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    NFT Minting
                  </ModalHeader>
                  <ModalBody>
                    <p>
                      Please input name
                    </p>
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
                    <Button color="primary" onClick={_mint} isLoading={isProcess || isPending || isConfirming}>
                      {isPending || isConfirming ? 'Confirming...' : 'Mint'}
                    </Button>
                    {isConfirming && showToast("info", "waiting for Transaction comfirming...")}
                    {/* {isConfirmed && showToast("success", "Transaction confirmed. NFT Minted!")} */}
                    {/* {isConfirmed && onClose()} */}
                    {error && showToast("error", error.message)}
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