export interface WebSocketMessage {
  type: string;
  collection?: string;
  data?: any;
  error?: string;
}

export class WebSocketService {
  private ws: WebSocket | null = null;
  private subscribers = new Map<string, Set<Function>>(); // collection -> callbacks
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private isConnecting = false;

  constructor() {
    // WebSocket temporariamente desabilitado
    console.log('🚫 WebSocket desabilitado temporariamente');
    // this.connect();
  }

  private connect() {
    if (this.isConnecting) return;
    
    this.isConnecting = true;
    
    try {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const host = window.location.hostname;
      const port = import.meta.env.DEV ? '8080' : window.location.port;
      const wsUrl = `${protocol}//${host}:${port}/ws`;
      
      console.log('🔌 Conectando ao WebSocket:', wsUrl);
      
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('✅ Conectado ao WebSocket');
        this.isConnecting = false;
        this.reconnectAttempts = 0;
        
        // Re-inscrever em todas as collections após reconexão
        for (const [collection, callbacks] of this.subscribers.entries()) {
          if (callbacks.size > 0) {
            this.subscribeToCollection(collection, () => {});
          }
        }
      };

      this.ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          this.handleMessage(message);
        } catch (error) {
          console.error('❌ Erro ao processar mensagem WebSocket:', error);
        }
      };

      this.ws.onclose = () => {
        console.log('🔌 Conexão WebSocket fechada');
        this.isConnecting = false;
        this.scheduleReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('❌ Erro na conexão WebSocket:', error);
        this.isConnecting = false;
        this.scheduleReconnect();
      };

    } catch (error) {
      console.error('❌ Erro ao conectar com WebSocket:', error);
      this.isConnecting = false;
      this.scheduleReconnect();
    }
  }

  private scheduleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
      
      console.log(`🔄 Tentativa de reconexão ${this.reconnectAttempts}/${this.maxReconnectAttempts} em ${delay}ms`);
      
      setTimeout(() => {
        this.connect();
      }, delay);
    } else {
      console.error('❌ Máximo de tentativas de reconexão atingido');
    }
  }

  private handleMessage(message: WebSocketMessage) {
    console.log('📨 Mensagem recebida:', message);

    switch (message.type) {
      case 'collection_update':
        if (message.collection) {
          this.notifySubscribers(message.collection, message.data);
        }
        break;

      case 'subscription_confirmed':
        console.log(`✅ Inscrição confirmada para collection: ${message.collection}`);
        break;

      case 'unsubscription_confirmed':
        console.log(`✅ Desinscrição confirmada para collection: ${message.collection}`);
        break;

      case 'error':
        console.error('❌ Erro do servidor:', message.error);
        break;

      case 'pong':
        console.log('🏓 Pong recebido');
        break;

      default:
        console.warn('⚠️ Tipo de mensagem desconhecido:', message.type);
    }
  }

  private notifySubscribers(collection: string, data: any) {
    const callbacks = this.subscribers.get(collection);
    if (callbacks) {
      console.log(`📡 Notificando ${callbacks.size} callbacks para collection: ${collection}`);
      callbacks.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('❌ Erro ao executar callback:', error);
        }
      });
    }
  }

  public subscribeToCollection(collection: string, callback: Function) {
    console.log(`📡 Inscrevendo callback na collection: ${collection}`);
    
    // Adicionar callback à collection
    if (!this.subscribers.has(collection)) {
      this.subscribers.set(collection, new Set());
    }
    this.subscribers.get(collection)!.add(callback);

    // Enviar mensagem de inscrição se conectado
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.sendMessage({
        type: 'subscribe_collection',
        collection
      });
    }
  }

  public unsubscribeFromCollection(collection: string, callback?: Function) {
    if (callback) {
      // Remover callback específico
      const callbacks = this.subscribers.get(collection);
      if (callbacks) {
        callbacks.delete(callback);
        
        // Se não há mais callbacks, remover collection
        if (callbacks.size === 0) {
          this.subscribers.delete(collection);
          this.sendMessage({
            type: 'unsubscribe_collection',
            collection
          });
        }
      }
    } else {
      // Remover todos os callbacks da collection
      this.subscribers.delete(collection);
      this.sendMessage({
        type: 'unsubscribe_collection',
        collection
      });
    }
  }

  private sendMessage(message: WebSocketMessage) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn('⚠️ WebSocket não está conectado, mensagem não enviada:', message);
    }
  }

  public ping() {
    this.sendMessage({ type: 'ping' });
  }

  public getStats() {
    return {
      isConnected: this.ws?.readyState === WebSocket.OPEN,
      totalSubscriptions: this.subscribers.size,
      collections: Array.from(this.subscribers.keys()),
      reconnectAttempts: this.reconnectAttempts
    };
  }

  public disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

// Instância singleton
export const websocketService = new WebSocketService();
