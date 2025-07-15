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
import { SubmitButton } from "../forms/SubmitButton";
import { sendContactNotification } from "@/services/email.service";

const sig = `[ ContactRight ] ::: `;

interface FormData {
  name: string;
  email: string;
  phone: string;
  interests: string;
  message: string;
}

interface InfoProps {
  info: FormData;
  updateInfo: (info: Partial<FormData>) => void;
}

export const ContactRight = () => {
  const global = useContext(GlobalContext);
  const profile = global?.profile;
  const [info, setInfo] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    interests: 'hiring',
    message: ''
  });
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current || !profile?.email) return; // so it doesnt reset mid form
    console.log(sig, '🔄 Auto-filling from profile:', profile);
    setInfo(i => ({
      ...i,
      name: profile?.name || '',
      email: profile?.email || '',
      phone: profile?.phone || '',
    }));
    hasRun.current = true;
  }, [profile]);

  const handleInfoUpdates = (newInfo: Partial<FormData>) => {
    setInfo(i => ({ ...i, ...newInfo }));
  };

  return (
    <Wizard wrapper={<AnimatePresence mode='wait' />}>
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
  const handleChanges = (changes: Partial<FormData>) => {
    // console.log(`🚀 => (step2) handleChanges => changes:`, changes);
    updateInfo(changes);
  };
  function handleSaveProfile(): void {
    throw new Error('Function not implemented.');
  }

  const canProceed = info.name.trim() && info.email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email);

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
        <Toolbar next={canProceed ? '' : 'disabled'} prev={''} />
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
  const [error, setError] = useState<string | null>(null);
  const isDev = process.env.NEXT_PUBLIC_DEBUG_MODE === 'true';
  console.log(`🚀 => LastStep => process.env.DEBUG_MODE:`, process.env.DEBUG_MODE)

  const fields: NXInputProps[] = [
    {
      label: 'Message',
      value: info.message,
      onChange: (v) => handleChanges({ message: v }),
      fieldType: 'Textarea',
      fieldClassName: 'w-1/2 shrink-1 p-0',
      rows: 8,
      className: 'bg-darker/90 border-2 border-darkBlue focus:border-blue/60',
    },
  ];

  const handleChanges = (changes: Partial<FormData>) => {
    updateInfo(changes);
  };

  const formatContactMessage = (): string => {
    const parts = [
      `Contact Form Submission`,
      `<strong>Name: </strong> ${info.name}`,
      `<strong>Email: </strong> ${info.email}`,
      `<strong>Interests: </strong> ${info.interests}`,
      `<strong>Phone: </strong> ${info.phone}`,
    ];

    parts.push(`<strong>Message:</strong> \n \n ${info.message}`);

    return parts.join('\n');
  };

  async function handleSubmit() {
    console.log(sig, 'Submit button clicked');
    console.log(sig, 'Form data:', info);
    setSubmitting(true);
    setError(null);
    
    try {
      const response = await sendContactNotification(formatContactMessage());
      console.log(sig, '📨 Email service response:', response);
      
      if (response.success) {
        console.log(sig, '✅ Message sent successfully');
        if (!isDev) {
          setSubmitted(true);
        }
      } else {
        console.error(sig, '❌ Message sending failed:', response.error);
        console.error(sig, '❌ Error details:', response.details);
        
        const errorMsg = response.error || 'Failed to send message';
        setError(errorMsg);
      }
    } catch (err) {
      console.error(sig, '❌ Error sending message:', err);
      const errorMsg = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMsg);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted && !isDev) {
    return (
      <div className="h-full w-full relative">
        <div className={'flex w-full flex-col items-center justify-center h-full px-12'}>
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
    );
  }

  return (
    <div className="h-full w-full">
      <div className={'flex w-full flex-col items-center justify-center h-full px-12'}>
        <p className="f mb-10 text-white">How can I help you?</p>
        
        {error && (
          <div className="mb-4 w-full">
            <div className="p-4 bg-red/10 border border-red/20 rounded-xl backdrop-blur-sm">
              <p className="text-red/90 text-sm text-center">
                <span className="font-medium">Error:</span> {error}
              </p>
            </div>
          </div>
        )}

        {isDev && submitted && (
          <div className="mb-4 w-full">
            <div className="p-4 bg-green/10 border border-green/20 rounded-xl backdrop-blur-sm">
              <p className="text-green/90 text-sm text-center">
                ✅ Message sent successfully! (Dev mode: form remains visible)
              </p>
            </div>
          </div>
        )}
        
        <FieldGroup fields={fields} />
        <Toolbar 
          next={'disable opacity-0'} 
          prev={''} 
          onSubmit={handleSubmit} 
          submitting={submitting} 
        />
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
          <SubmitButton
            onClick={onSubmit}
            isLoading={submitting}
            disabled={!next}
            className="max-w-[200px]"
          />
        )}
      </div>
    </div>
  ); 
};



