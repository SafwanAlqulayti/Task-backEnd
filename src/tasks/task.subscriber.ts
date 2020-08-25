import { EntitySubscriberInterface, EventSubscriber, UpdateEvent, Connection } from 'typeorm';
import { Task } from './task.entity';
import { Logger } from '@nestjs/common';

@EventSubscriber()
export class TaskSubscriber implements EntitySubscriberInterface<Task> {
    constructor(private readonly connection: Connection, ) {
        connection.subscribers.push(this); // <---- THIS 
    }
  listenTo(): any {
    return Task;
  }

  afterUpdate(event: UpdateEvent<Task>): Promise<any> | void {
    const logger = new Logger("Subscriber")
    const statusGotUpdated = event.updatedColumns.find(value => value.propertyName, Task.prototype.status);
    if (statusGotUpdated) {
      
        logger.log(`Price changed from ${ event.databaseEntity.status } to ${ event.entity.status }`, 'Status Updated',);
      
    
  }}
}