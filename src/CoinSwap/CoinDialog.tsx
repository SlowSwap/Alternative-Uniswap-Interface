import React, { Fragment } from "react";
import { TextField } from "@material-ui/core";
import { doesTokenExist } from "../ethereumFunctions";
import { CoinDef } from "constants/coins";
import { Dialog, Transition } from '@headlessui/react'
import { QuestionMarkCircleIcon } from '@heroicons/react/solid'


export default function CoinDialog(props: {
  onClose: (val: string) => any,
  open: boolean,
  coins: CoinDef[],
  signer: any
}) {
  // The CoinDialog component will display a dialog window on top of the page, allowing a user to select a coin
  // from a list (list can be found in 'src/constants/coins.js') or enter an address into a search field. Any entered
  // addresses will first be validated to make sure they exist.
  // When the dialog closes, it will call the `onClose` prop with 1 argument which will either be undefined (if the
  // user closes the dialog without selecting anything), or will be a string containing the address of a coin.

  const { onClose, open, coins, signer } = props;

  const [address, setAddress] = React.useState("");
  const [error, setError] = React.useState("");

  // Called when the user tries to input a custom address, this function will validate the address and will either
  // then close the dialog and return the validated address, or will display an error.
  const submit = () => {
    if (doesTokenExist(address, signer)) {
      exit(address);
    } else {
      setError("This address is not valid");
    }
  };

  // Resets any fields in the dialog (in case it's opened in the future) and calls the `onClose` prop
  const exit = (value: string) => {
    setError("");
    setAddress("");
    onClose(value);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => exit("")}>
        <div className="flex items-end justify-center min-h-screen px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-4 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Select asset
                  </Dialog.Title>


                  <div className="mt-2">
                    <ul role="list" className="divide-y divide-gray-200">
                      {coins.map((coin) => (
                        <li
                          key={coin.address}
                          className="py-2 flex odd:bg-white even:bg-slate-50 cursor-pointer"
                          onClick={() => exit(coin.address)}
                        >
                          {coin.iconUrl ?

                            <img className="h-10 w-10 rounded-full" src={coin.iconUrl || ""} alt="" />
                            : <QuestionMarkCircleIcon className="h-10 w-10 text-gray-400" aria-hidden="true" />
                          }
                          <div className="ml-3 text-left">
                            <p className="text-sm font-medium text-gray-900">{coin.name}</p>
                            <p className="text-sm text-gray-500">{coin.abbr}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>


              <div className="flex justify-center mt-4 mb-2">
                <div>or, enter a token address:</div>
              </div>
              <div className="mt-2 sm:mt-3">

                <TextField
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  variant="outlined"
                  placeholder="Paste Address"
                  error={error !== ""}
                  helperText={error}
                  fullWidth
                />
              </div>
              <div className="mt-2 sm:mt-3">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:text-sm"
                  onClick={submit}
                >
                  Use Address
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
