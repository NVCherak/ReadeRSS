import { Notification } from './notification.model'

export class Feed {
    title: string;
    description: string;
    image: string;
    notifications: Notification[];
  
    constructor(public id: string, public url: string) { }
  }
  