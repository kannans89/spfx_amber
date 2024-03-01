declare interface IMycommandCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'MycommandCommandSetStrings' {
  const strings: IMycommandCommandSetStrings;
  export = strings;
}
