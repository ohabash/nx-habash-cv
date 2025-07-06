'use client';
import { FaPaperPlane } from "react-icons/fa"; 
import { AnimatePresence } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { Wizard, useWizard } from 'react-use-wizard';
import { twMerge } from "tailwind-merge";
import { BoxGroup, BoxItem } from "../ui/box/Box";
import { GlobalContext } from "@/global.context";
import { FieldGroup } from "../forms/FieldGroup";
import { NXInputProps } from "../forms/Input";
import { Button } from "../button/Button";
import { rtdb } from "@/firebase/firebase.config";
import { timeout } from "@nx-habash/utils";

interface InfoProps {
  info: {
    name: string;
    email: string;
    phone: string;
    interests: string;
    msg: string;
  };
  updateInfo: (info: any) => void;
}

export const ContactRight = () => {
  const global = useContext(GlobalContext);
  const profile = global?.profile;
  const [info, setInfo] = useState({} as InfoProps['info']);
   const hasRun = useRef(false);
  useEffect(() => {
    if (hasRun.current || !profile?.email) return; // so it doesnt reset mid form
    // console.log(`🚀 => useEffect => profile:`, profile);
    setInfo({
      name: profile?.name || '',
      email: profile?.email || '',
      phone: profile?.phone || '',
      interests: 'hiring',
      msg: ''
    });
    hasRun.current = true;
  }, [profile]);
  const handleInfoUpdates = (newInfo: Partial<InfoProps['info']>) => {
    setInfo(i => { 
      const final = { ...i, ...newInfo };
      return final;
     });
  };
  return (
    <Wizard 
      wrapper={<AnimatePresence mode='wait' />}
    >
      <Step1 info={info} updateInfo={handleInfoUpdates} />
      <Step2 info={info} updateInfo={handleInfoUpdates} />
      <LastStep info={info} updateInfo={handleInfoUpdates} />
    </Wizard>
  );
};






/*
 
              /$$                          /$$  
             | $$                        /$$$$  
   /$$$$$$$ /$$$$$$    /$$$$$$   /$$$$$$|_  $$  
  /$$_____/|_  $$_/   /$$__  $$ /$$__  $$ | $$  
 |  $$$$$$   | $$    | $$$$$$$$| $$  \ $$ | $$  
  \____  $$  | $$ /$$| $$_____/| $$  | $$ | $$  
  /$$$$$$$/  |  $$$$/|  $$$$$$$| $$$$$$$//$$$$$$
 |_______/    \___/   \_______/| $$____/|______/
                               | $$             
                               | $$             
                               |__/             
 
*/
const Step1 = ({info, updateInfo}: InfoProps) => {
  const [items, setItems] = useState<Array<BoxItem>>([
    {
      id: 'hiring',
      content: 'Hiring',
      selected: false,
    },
    {
      id: 'collab',
      content: 'Looking to Collab',
      selected: false,
    },
    {
      id: 'other',
      content: 'Something else',
      selected: false,
    },
  ]);
  useEffect(() => {
    if (!info.interests) return;
    const interests = info.interests.split(', ');
    const newItems = items.map((i) => {
      if (interests.includes(i.id)) {
        return { ...i, selected: true };
      }
      return i;
    });
    setItems(newItems);
  }, [info]);
  const handleUpdates = (items: Array<BoxItem>) => {
    setItems(items);
    const interests = (items.filter((i) => i.selected).map((i) => i.id)).join(', ');
    updateInfo({ interests });
  };
  return (
    <div className="h-full">
      <div className={'flex flex-col items-center justify-center h-full px-12'}>
        <p className="f mb-10 text-white max-md:text-left max-md:text-xl">
          Select the items that best reflect your intersts.
        </p>
        <BoxGroup setItems={handleUpdates} items={items} />
        <Toolbar
          next={twMerge(items.some((i) => i.selected) ? '' : 'disabled')}
          prev="hidden"
        />
      </div>
    </div>
  );
};





/*
 
              /$$                          /$$$$$$ 
             | $$                         /$$__  $$
   /$$$$$$$ /$$$$$$    /$$$$$$   /$$$$$$ |__/  \ $$
  /$$_____/|_  $$_/   /$$__  $$ /$$__  $$  /$$$$$$/
 |  $$$$$$   | $$    | $$$$$$$$| $$  \ $$ /$$____/ 
  \____  $$  | $$ /$$| $$_____/| $$  | $$| $$      
  /$$$$$$$/  |  $$$$/|  $$$$$$$| $$$$$$$/| $$$$$$$$
 |_______/    \___/   \_______/| $$____/ |________/
                               | $$                
                               | $$                
                               |__/                
 
*/
const Step2 = ({ info, updateInfo }: InfoProps) => {
  const fields: NXInputProps[] = [
    {
      label: 'Full Name',
      value: info.name,
      onChange: (v) => handleChanges({ name: v }),
      fieldType: 'Input',
      fieldClassName: 'w-full shrink-1',
      className: 'bg-darker/90 border-2 border-darkBlue focus:border-blue/60',
    },
    {
      label: 'Email',
      value: info.email,
      onChange: (v) => handleChanges({ email: v }),
      fieldType: 'Input',
      pattern: '.+@example.com',
      fieldClassName: 'w-1/2 shrink-1',
      className: 'bg-darker/90 border-2 border-darkBlue focus:border-blue/60',
    },
    {
      label: 'Phone',
      value: info.phone,
      onChange: (v) => handleChanges({ phone: v }),
      fieldType: 'Input',
      fieldClassName: 'w-1/2 shrink-1',
      className: 'bg-darker/90 border-2 border-darkBlue focus:border-blue/60',
    },
  ];
  const handleChanges = (changes: Partial<InfoProps['info']>) => {
    // console.log(`🚀 => (step2) handleChanges => changes:`, changes);
    updateInfo(changes);
  };
  function handleSaveProfile(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="h-full w-full">
      <div
        className={
          'flex w-full flex-col items-center justify-center h-full px-12'
        }
      >
        <p className="f mb-10 text-white">A little more about you...</p>
        {/* fields loop */}
        <FieldGroup className="-mx-8_" fields={fields} handleSubmit={(e) => handleSaveProfile()} />
        <Toolbar next={''} prev={''} />
      </div>
    </div>
  );
};



/*
 
  /$$                             /$$    
 | $$                            | $$    
 | $$        /$$$$$$   /$$$$$$$ /$$$$$$  
 | $$       |____  $$ /$$_____/|_  $$_/  
 | $$        /$$$$$$$|  $$$$$$   | $$    
 | $$       /$$__  $$ \____  $$  | $$ /$$
 | $$$$$$$$|  $$$$$$$ /$$$$$$$/  |  $$$$/
 |________/ \_______/|_______/    \___/                        
 
*/
const LastStep = ({ info, updateInfo }: InfoProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fields: NXInputProps[] = [
    {
      label: 'Message',
      value: info.msg,
      onChange: (v) => handleChanges({ msg: v }),
      fieldType: 'Textarea',
      fieldClassName: 'w-1/2 shrink-1 p-0',
      rows: 8,
      className: 'bg-darker/90 border-2 border-darkBlue focus:border-blue/60',
    },
  ];
  const handleChanges = (changes: Partial<InfoProps['info']>) => {
    // console.log(`🚀 => (step2) handleChanges => changes:`, changes);
    updateInfo(changes);
  };
  function handleSaveProfile(): void {
    throw new Error('Function not implemented.');
  }

  async function handleSubmit() {
    setSubmitting(true);
    // console.log(`🚀 => handleSubmit => info:`, info);
    const resp = await rtdb.push('/contact-requests', info);
    await timeout(2000);
    // console.log(`🚀 => handleSubmit => resp:`, resp)
    setSubmitting(false);
    setSubmitted(true);
    return resp;
  }

  if (submitted) {
    return (
      <div className="h-full w-full relative">
        <div
          className={
            'flex w-full flex-col items-center justify-center h-full px-12'
          }
        >
          <p className="mb-5 curly text-2xl text-blue">Thank you for reaching out!</p>

        </div>
        <div className="absolute bottom-0 w-full py-4 px-8 rounded-md mt-2 bg-darker/90_ text-center pb-10">
          <p className="text-white text-[1.1rem] leading-8 mb-2 text-center block">
            Call or text if you prefer.
          </p>
          <a href="tel:214-470-5176" className="font-bold tracking-wide">
            214-470-5176
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full">
      <div
        className={
          'flex w-full flex-col items-center justify-center h-full px-12'
        }
      >
        <p className="f mb-10 text-white">How can I help you?</p>
        {/* fields loop */}
        <FieldGroup fields={fields} handleSubmit={(e) => handleSaveProfile()} />
        <Toolbar next={'disable opacity-0'} prev={''} onSubmit={handleSubmit} submitting={submitting} />
      </div>
    </div>
  );
};




/*
 
    /$$                         /$$ /$$                          
   | $$                        | $$| $$                          
  /$$$$$$    /$$$$$$   /$$$$$$ | $$| $$$$$$$   /$$$$$$   /$$$$$$ 
 |_  $$_/   /$$__  $$ /$$__  $$| $$| $$__  $$ |____  $$ /$$__  $$
   | $$    | $$  \ $$| $$  \ $$| $$| $$  \ $$  /$$$$$$$| $$  \__/
   | $$ /$$| $$  | $$| $$  | $$| $$| $$  | $$ /$$__  $$| $$      
   |  $$$$/|  $$$$$$/|  $$$$$$/| $$| $$$$$$$/|  $$$$$$$| $$      
    \___/   \______/  \______/ |__/|_______/  \_______/|__/      
                                                                 
*/
interface ToolbarProps {
  next?: string;
  prev?: string;
  onSubmit?: () => void;
  submitting?: boolean;
}
const Toolbar = ({next = 'false', prev = 'false', onSubmit, submitting}: ToolbarProps) => { 
  const context = useWizard();
  const css = "f text-white hover:text-yellow cursor-pointer text-sm";
  return (
    <div className={'mt-4 level w-full ' + (submitting ? 'disabled' : '')}>
      <div className="level-left 2">
        <a
          className={twMerge(css, prev)}
          onClick={() => context.previousStep()}
        >
          Previous
        </a>
      </div>
      <div className="level-right">
        {!onSubmit && (
          <a
            className={twMerge(css, '', next)}
            onClick={() => context.nextStep()}
          >
            Next
          </a>
        )}
        {onSubmit && (
          <Button onClick={onSubmit}>
            <FaPaperPlane className="mr-3" />{' '}
            {submitting ? 'Sending...' : 'Send'}
          </Button>
        )}
      </div>
    </div>
  ); 
};



