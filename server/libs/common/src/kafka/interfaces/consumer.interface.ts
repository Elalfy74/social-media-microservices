export interface IConsumer {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  consume(onMessage: OnMessage): Promise<void>;
}

export type OnMessage = (message: any) => Promise<void>;
