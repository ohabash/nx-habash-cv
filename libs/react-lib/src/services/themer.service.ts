import { hexToFilter, VarKeys } from "./themer.helpers";

export class ThemerService {
  theme!: ITheme;

  bindThemeToTemplate(element: HTMLElement, theme: ITheme = this.theme): ITheme  {
    // type check element
    if (!(element instanceof HTMLElement)){
      const er = 'Cant bindThemeToTemplate. Invalid element provided to bindThemeToTemplate. Please pass a parent element of type "HTMLElement".'
      alert(er);
      throw new Error(er);
    }

    // this.theme or a param theme must be provided
    if (!theme) {
      const er = 'Set theme on ThemerService class before calling bindThemeToTemplate.'
      alert(er);
      throw new Error(er);
    }

    // make sure theme is on class 
    this.theme = theme;

    // make equivilant filter for each hex provided in this.colors
    theme.vars = {
      ...this.filterColors,
      ...theme.vars,
    };

    // make vars parsable -- {} to []
    const all = { ...theme.vars, ...theme.colors };
    const vars: VarKeys[] = Object.keys(all).map((key: any) => {
      if (!all[key]?.startsWith('#')) return {
        key,
        value: '#ffffff',
      };
      return {
        key,
        value: all[key].replace(';', '').replace('filter: ', ''),
      };
    });

    // bind vars to body
    vars.forEach((item: any) => {
      element.style.setProperty( `--${item.key}`, item.value );
    });

    // return theme
    return this.theme;
  }

  /**
   * make equivilant filter for each hex provided in this.colors
   */
  get filterColors(): { [k: string]: string } {
    const filters: any = {};
    Object.keys(this.theme.colors).forEach((key) => {
      const value = (this.theme.colors as any)[key];
      if (!value.startsWith('#')) return;
      filters[`filter-${key}`] = hexToFilter(value);
    });
    return filters;
  }
}


export interface ITheme {
  colors: {
    [key: string]: string; // Add other color properties if needed
  };
  vars: {
    [key: string]: string; // Add other variable properties if needed
  };
  bg(key: string): string;
  text(key: string): string;
  sec: {
    [key: string]: {
      [key: string]: string;
    };
  };
}