// import { EntitySubscriberInterface, EventSubscriber, UpdateEvent, Connection, InsertEvent } from 'typeorm';
// import { Task } from '../entity/task.entity';
// import { Logger } from '@nestjs/common';

// @EventSubscriber()
//  export class TaskSubscriber implements EntitySubscriberInterface<Task> {
//     constructor( connection: Connection, ) {
//         connection.subscribers.push(this); 
//     }
//   listenTo() {
//     return Task;
//   }

//   afterUpdate(event: UpdateEvent<Task>): Promise<any> | void {
//     // const logger = new Logger("Subscriber")
//     const statusGotUpdated = event.updatedColumns.find(value => value.propertyName, Task.prototype.status);
  
      

 
//         // logger.log(`status changed from ${ event.databaseEntity.status } to ${ event.entity.status }`, 'Status Updated',);
//         console.log(`Status was: ,${ event.databaseEntity.status}  after updating it became ${event.entity.status}` );
//     }
  

//   beforeInsert(event:InsertEvent<Task>) {
//     console.log(`BEFORE Task INSERTED: `, event.entity);
//   }
// }
 