declare module 'cosmiconfig' {
  export = Cosmiconfig;
}

declare function Cosmiconfig(
  moduleName: string,
  options?: Cosmiconfig.Options,
):Cosmiconfig.Explorer;

declare namespace Cosmiconfig {  
  export interface Options {
    rcExtensions?: boolean,
    sync?: boolean,
  }

  export interface Explorer {
    load(searchPath?: string): Cosmiconfig.Result;
  }
  
  export interface Result {
    config: any;
  }
}
