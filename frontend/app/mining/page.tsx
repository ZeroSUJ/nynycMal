'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import nftmAbi from '@/contracts/Marketplace.json';
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
import { Spinner } from '@nextui-org/react';
import { Avatar } from "@nextui-org/react";



export type DataType = { building_name: string; }
import { parseEther } from 'viem';
import erc20ABI from '@/contracts/ERC20ABI.json';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import Miners from '@/components/miner';





const Mining = () => {
  // const erc20TokenAddress = "0x0406dbBF7B62f79F8d889F30cC1F0E9191c404D4";
  // const [inputVal, setInputVal] = useState('')
  // const contractAddress = nftmAbi.address;
  // const contractAbi = nftmAbi.abi;
  // const [genImg, setGenImg] = useState("")
  // const [uploadFileName, setUploadFileName] = useState<string>("");
  // const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // const [nftName, setNftName] = useState<string>("");
  // const [fileURL, setFileURL] = useState<string>("");
  // const [isProcess, setIsProcess] = useState<boolean>(false);


  // const handleUpload = () => {
  //   setIsUploading(true);

  //   // Your upload logic here

  //   setTimeout(() => {
  //     setIsUploading(false);
  //   }, 45000);
  // };

  // const {
  //   data: hash,
  //   isPending,
  //   error,
  //   writeContractAsync
  // } = useWriteContract();


  // // upload metadata of image to the pinata IPFS
  // const _uploadMetaData = (nftColName: string, nftFileURL: string) => {
  //   return new Promise((resolve, reject) => {
  //     console.log("MetaData:", nftColName, nftFileURL);
  //     if (!nftColName || !nftFileURL) {
  //       showToast("error", "Plz input name exactly!");
  //       reject("error occured")
  //     }

  //     const nftJSON = {
  //       nftName, image: nftFileURL
  //     }
  //     console.log('nftJson:', nftJSON);
  //     //upload the metadata JSON to IPFS
  //     uploadJSONToIPFS(nftJSON)
  //       .then(res => {
  //         if (res.success === true) {
  //           console.log("Uploaded JSON to Pinata: ", res)
  //           resolve(res);
  //           // return res.pinataURL;
  //         }
  //       })
  //       .catch(err => {
  //         reject(err);
  //       })
  //   });
  // }

  // const _mint = async () => {
  //   console.log('upload:', uploadFileName);
  //   setIsProcess(true);
  //   const tx = await writeContractAsync({
  //     abi: erc20ABI,
  //     address: erc20TokenAddress,
  //     functionName: 'approve',
  //     args: [contractAddress, parseEther('1')],
  //   });
  //   console.log("tx1:", tx);

  //   // const result = await uploadFileToIPFS(uploadFileName);
  //   // if (result?.success === true) {
  //   //   setFileURL(result?.pinataURL);
  //   // } else {
  //   //   showToast("error", "Uploading Error");
  //   // }
  //   // _uploadMetaData(nftName, result?.pinataURL).then(async(res)=>{

  //   for (let i = 0; i < genImg.length; i++) {
  //     await _uploadMetaData(nftName, genImg[i]).then(async (res) => {
  //       if (res.success === true) {
  //         showToast("success", "Successfully uploaded");
  //         console.log("uploaded Metadata url:", res?.pinataURL);
  //         const tx2 = await writeContractAsync({
  //           address: contractAddress,
  //           abi: contractAbi,
  //           functionName: 'createToken',
  //           args: [[res?.pinataURL], parseEther('1')],
  //         });
  //         console.log("tx2:", tx2);
  //       }
  //     });
  //   } // or we can use useEffect() hook for state update. the state variable will be update after re-rendering.
  //   setIsProcess(false);
  // };

  // const [age, setAge] = useState(ages[0]);
  // const [season, setSeason] = useState(seasons[0])
  // const [weather, setWeather] = useState(weathers[0])
  // const [environment, setEnvironment] = useState(environments[0])
  // const [building, setBuilding] = useState(buildings[0])
  // let prompt = inputVal + " and " + building.name + " of New York City " + age.name + ", in " + season.name + " " + environment.name;
  // console.log(prompt);

  // const GenerateImage = () => {
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   var raw = JSON.stringify({
  //     "key": "UNi8wvSz4p6CkM1boPSxccM0GErrbVK3aj84nqZkM3p3cMHkumQ3UNtjFP5P",
  //     prompt: prompt,
  //     "negative_prompt": "bad quality, ",
  //     "width": "512",
  //     "height": "512",
  //     "safety_checker": false,
  //     "seed": null,
  //     "samples": 4,
  //     "base64": false,
  //     "webhook": null,
  //     "track_id": null
  //   });

  //   var requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: 'follow'
  //   };

  //   fetch("https://modelslab.com/api/v6/realtime/text2img", requestOptions)
  //     .then(response => response.text())
  //     .then(result => {
  //       console.log(result)
  //       const resultImage = JSON.parse(result);
  //       if (resultImage.status === 'error') {
  //         alert(resultImage.message);
  //         return;
  //       }
  //       console.log(resultImage.output);
  //       const imageData = resultImage.output;
  //       setGenImg(imageData)

  //     })
  //     .catch(error => console.log('error', error));
  // }

  // const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
  //   hash,
  // });

  const [value, setValue] = useState(0.01);

  const handleMinusClick = () => {
    setValue((prevValue) => prevValue - 0.01);
  };
  const handlePlusClick = () => {
    setValue((prevValue) => prevValue + 0.01);
  };
  const handleChange = (e: any) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      setValue(newValue);
    }
  };

  return (
    <div className="grid grid-cols-12 w-full h-screen bg-[#090808]">
      <Navbar />
      <Sidebar />
      <Content>
        <div className="flex justify-center">
          <h1 className="text-center text-3xl pt-6 pb-2">Mining BNB</h1>
        </div>
        <div className='flex flex-col gap-12  p-4  lg:flex-row'>
          <div className='flex w-full flex-col gap-4 lg:w-1/2 rounded-md p-4'>
            <Miners className='flex items-center py-1' name="Miners" url="https://www.minucoin.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fminer.233b0144.png&w=48&q=75" number={0} />
            <Miners className='flex items-center py-1' name="Mining Speed" url="https://www.minucoin.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmining_speed.2ea3c80d.png&w=96&q=75" number="0" unit="BNB/48h" />
            <Miners className='flex items-center py-1' name="My rewards" url="https://www.minucoin.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Frewards.90435076.png&w=96&q=75" number="0.0000" unit="BNB" />
            <form className='flex flex-col lg:px-4'>
              <div className='mt-8 flex items-center justify-between'>
                <p className='text-lg lg:text-xl'>MIN:
                  <span>0.01 BNB</span>
                </p>
                <hr className='hidden w-1/3 opacity-40 lg:inline-block' />
                <p className='text-lg lg:text-xl'>MAX:
                  <span>20 BNB</span>
                </p>
              </div>
              <div className='mt-3 flex items-center justify-between rounded-lg border-neutral-400 bg-[#27272a] px-4 py-3'>
                <input
                  className='w-full bg-transparent text-xl focus:outline-none'
                  type='number'
                  step='0.01'
                  min='0.01'
                  max='200'
                  pattern='\d+(\.\d{0,2})?'
                  value={value}
                  onChange={handleChange}
                ></input>
                <div className='flex gap-4'>
                  {/* <img
                    alt="minus icon"
                    loading="lazy"
                    width="24"
                    height="24"
                    decoding="async"
                    data-nimg="1"
                    className="h-7 w-7 transform cursor-pointer opacity-60 transition-transform duration-300 hover:scale-110"
                    src="https://www.minucoin.com/_next/static/media/minus.35c39da3.svg"
                    onClick={handleMinusClick}
                  ></img>
                  <img
                    alt="plus icon"
                    loading="lazy"
                    width="24"
                    height="24"
                    decoding="async"
                    data-nimg="1"
                    className="h-7 w-7 transform cursor-pointer opacity-60 transition-transform duration-300 hover:scale-110"
                    src="https://www.minucoin.com/_next/static/media/plus.64cfad37.svg"
                    onClick={handlePlusClick}
                  ></img> */}
                </div>
              </div>
              <p className="mt-3">ENTER BNB AMOUNT &amp; CLICK BUY BELOW</p>
              <div className="mt-3 flex flex-col gap-4 lg:flex-row pt-5">
                <Button className="w-full rounded-md px-4 py-5" color="primary" variant="bordered" type="button">Hire Miners</Button>
                <Button className="w-full rounded-md px-4 py-5" color="primary" variant="bordered" type="button">Collect Rewards</Button>
              </div>
            </form>

          </div>
          <div className="flex flex-col gap-6 py-4">
            <div className="flex items-center gap-3 rounded-md bg-neutral-700 p-4">
              <img alt="balances" loading="lazy" width="85" height="68" decoding="async" data-nimg="1" className="h-[68px] w-auto object-contain" style={{ color: 'transparent' }} src="https://www.minucoin.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcontract_balance_desktop.dd6f8c11.png&w=96&q=75"
              ></img>
              <div className="flex flex-col divide-y-2">
                <p className="text-xl">Contract Balance: ? BNB</p>
                <p className="text-xl">Wallet Balance: ? BNB</p>
              </div>
            </div>
            <hr className="mx-auto w-4/5 opacity-60"></hr>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 py-2">
                <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-4 border-neutral-500 bg-neutral-700 ">1</span>
                <p className="text-xl">Hold $NYNYC in your wallet.</p>
              </div>
              <div className="flex items-center gap-4 py-2">
                <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-4 border-neutral-500 bg-neutral-700">2</span>
                <p className="text-xl">Hire Miners using BNB.</p>
              </div>
              <div className="flex items-center gap-4 py-2">
                <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-4 border-neutral-500 bg-neutral-700">3</span>
                <p className="text-xl">Click Collect Rewards to withdraw collected BNB.</p>
              </div>
              </div>
          </div>
        </div>
        <div className="px-6 pt-8 pb-12">
          <div className="mt-3 rounded-xl border-2 border-neutral-400 bg-black px-3 py-6">
            <p className="text-center text-3xl uppercase">Profit: UP TO 5%</p>
            <p className="text-center mt-2 text-3xl uppercase">TAX: 2%</p>
          </div>
        </div>
      </Content>
    </div>
  );
};

export default Mining;  