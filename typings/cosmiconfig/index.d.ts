declare module 'cosmiconfig' {
  export = Cosmiconfig;
}

declare function Cosmiconfig(
  moduleName: string
):Cosmiconfig.Explorer;

declare namespace Cosmiconfig {  
  export interface Explorer {
    searchSync(searchFrom?: string): Cosmiconfig.Result | null;
  }
  
  export interface Result {
    config: any;
  }
}
