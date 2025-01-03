import { ReactNode } from "react";
import "./settings.scss";
import { twMerge } from "tailwind-merge";

type BaseProps = {
  children: ReactNode;
  className?: string;
}


/*
 
        /$$ /$$                                               /$$
       /$$//$$/                                              | $$
      /$$//$$/         /$$$$$$   /$$$$$$  /$$$$$$$   /$$$$$$ | $$
     /$$//$$/         /$$__  $$ |____  $$| $$__  $$ /$$__  $$| $$
    /$$//$$/         | $$  \ $$  /$$$$$$$| $$  \ $$| $$$$$$$$| $$
   /$$//$$/          | $$  | $$ /$$__  $$| $$  | $$| $$_____/| $$
  /$$//$$/           | $$$$$$$/|  $$$$$$$| $$  | $$|  $$$$$$$| $$
 |__/|__/            | $$____/  \_______/|__/  |__/ \_______/|__/
                     | $$                                        
                     | $$                                        
                     |__/                                        
 
*/
export const SettingsPanel = ({children}: BaseProps) => {
  return (
    <div className="settings-panel">
      {children}
    </div>
  )
}


/*
 
        /$$ /$$        /$$$$$$                                         
       /$$//$$/       /$$__  $$                                        
      /$$//$$/       | $$  \__/  /$$$$$$   /$$$$$$  /$$   /$$  /$$$$$$ 
     /$$//$$/        | $$ /$$$$ /$$__  $$ /$$__  $$| $$  | $$ /$$__  $$
    /$$//$$/         | $$|_  $$| $$  \__/| $$  \ $$| $$  | $$| $$  \ $$
   /$$//$$/          | $$  \ $$| $$      | $$  | $$| $$  | $$| $$  | $$
  /$$//$$/           |  $$$$$$/| $$      |  $$$$$$/|  $$$$$$/| $$$$$$$/
 |__/|__/             \______/ |__/       \______/  \______/ | $$____/ 
                                                             | $$      
                                                             | $$      
                                                             |__/      
 
*/
export const SettingsRow= ({children, className}: BaseProps) => {
  return <div className={twMerge('item-row', className)}>{children}</div>;
}


/*
 
        /$$ /$$       /$$$$$$ /$$                            
       /$$//$$/      |_  $$_/| $$                            
      /$$//$$/         | $$ /$$$$$$    /$$$$$$  /$$$$$$/$$$$ 
     /$$//$$/          | $$|_  $$_/   /$$__  $$| $$_  $$_  $$
    /$$//$$/           | $$  | $$    | $$$$$$$$| $$ \ $$ \ $$
   /$$//$$/            | $$  | $$ /$$| $$_____/| $$ | $$ | $$
  /$$//$$/            /$$$$$$|  $$$$/|  $$$$$$$| $$ | $$ | $$
 |__/|__/            |______/ \___/   \_______/|__/ |__/ |__/
                                                             
                                                             
                                                             
 
*/
type SettingsItemProps = BaseProps & {
  icon?: ReactNode;
  title?: string;
}
export const SettingsItem = ({ children, icon, title, className }: SettingsItemProps) => {
  return (
    <div className={twMerge("item", className)}>
      {title && <div className="settings-header">
        {icon && <div className="icon text-accent1 text-lg">{icon}</div>}
        <h4>{title}</h4>
      </div>}
      <div className="settings-body">{children}</div>
    </div>
  );
};



