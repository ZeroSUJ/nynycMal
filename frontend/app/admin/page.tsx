'use client'

import React from "react";
import { Input, Button } from "@nextui-org/react";

const Admin = () => {
  const WBNBAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";

  return (
      <main className="min-h-screen">
        <div className="realtive px-20 py-48 min-w-unit-sm">
          <div className="frosted-glass-lightsmoke border-0.5 border-slate-200 bg-slate-500/[.06] backdrop-brightness-40 shadow-2xl rounded-3xl md:rounded-xl py-12 px-24 mx-auto max-w-3xl">
            <div className="text-center md:text-5xl text-3xl mb-8">
              Admin Page
            </div>
            <div className="flex w-full flex-wrap items-center md:flex-nowrap gap-4">
              <Input type="number" label="Seed Amount in forms of BNB" />
              <Button
                className="px-10"
                color="primary"
                variant="bordered"
              >
                Seed BNB
              </Button>
            </div>
          </div>
        </div>
      </main>
  )
}

export default Admin;