import {Comments} from "./comments";

declare global {
  interface Window{
    OneSDK:{
      ready(): Promise<void>;
      setup(options?:Partial<options>): void;
      subscribe(subscribeOption:subscribeOption): number;
      connect(): void
    }
  }
}
type options = {
  protocol: string,
  port: number,
  host: string,
  pathname: string,
  mode: string,
  disabledDelay: boolean,
  jsonPath: string,
  intervalTime: number,
  maxQueueInterval: number,
  reconnectInterval: number,
  commentLimit: number,
  requestInterval: number,
  includes: null,
  excludes: null
}
type subscribeOption = onMessage | onMeta;
type onMessage = {
  action: "comments";
  callback: (comments: Comments) => void
}
type onMeta = {
  action: "meta";
  callback: (args:unknown) => void
}