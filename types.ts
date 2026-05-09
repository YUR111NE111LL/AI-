export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  image?: string; // Base64 string
  timestamp: number;
  isError?: boolean;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
}
