import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
 import { CreateTaskDto } from './dto/create-task.dto';
import {  NotFoundException } from '@nestjs/common';
 
const mockUser = {id:1, username:'test'}
const mockTaskRepo = () =>({ // will return a repo mock object 
getTasks: jest.fn(),
findOne: jest.fn(),
createTask: jest.fn(),
delete: jest.fn()
})

describe('Tasks Service',()=>{
    let tasksService ;
    let taskRepo;
    beforeEach(async ()=>{
        const module = await Test.createTestingModule({
            providers:[
                TasksService,
                {provide: TaskRepository , useFactory:mockTaskRepo},// this will allow us to create a copy of the repo each time we need to use it ruther than using the original one because we want use all it funcinality
            ]
        }).compile(); // using await because it take time to generate new module 
    
        tasksService = await module.get<TasksService>(TasksService)
        taskRepo =await module.get<TaskRepository>(TaskRepository)
    })

    describe('get Tasks', ()=>{
        it('return some tasks',async ()=>{
            taskRepo.getTasks.mockResolvedValue('value') // check the if any value is returned
            expect(taskRepo.getTasks).not.toHaveBeenCalled()
            const testFilter:GetTaskFilterDto = {status: TaskStatus.Done ,search:'test'}
           const result = await tasksService.getTasks(testFilter,mockUser);
            expect(taskRepo.getTasks).toHaveBeenCalled()//checking the repo
            expect(result).toEqual('value')
        });
   })
    // describe('get task by ID',  ()=>{
    //     it('return one task',async ()=>{
    //         const mockTask = {title:"test",description:'test'}
    //         taskRepo.findTask.mockResolvedValue(mockTask)
    //         const result = await tasksService.getTaskById(1,mockUser)
    //          expect(result).toEqual(mockTask)
    //     })
  
    // })
    describe('create Task', ()=>{
        it('should create one task', async()=>{
            taskRepo.createTask.mockResolvedValue('value')
            const createTask:CreateTaskDto = {title:'test',description:'test'}
            const result  = await tasksService.createTask(createTask,mockUser,"ee")
            expect(taskRepo.createTask).toHaveBeenCalledWith(createTask,mockUser,"ee")
            expect(result).toEqual('value')
                }) 
    })

    describe('delete task',()=>{
        it('test taskRepo.deleteTask  to deleta',async()=>{
            taskRepo.delete.mockResolvedValue({affected:1})
            expect(taskRepo.delete).not.toHaveBeenCalled()
            await taskRepo.delete(1,mockUser)
            expect(taskRepo.delete).toHaveBeenCalled()
        })
        it('test taskRepo.deleteTask when there is no task',async()=>{
            taskRepo.delete.mockResolvedValue({affected:0})
            expect(tasksService.deleteTask(1,mockUser)).rejects.toThrow(NotFoundException)
        })
    })
    // describe('update task',()=>{
    //     it('update the task info', async()=>{
    //         const mockTask = { title: 'Test task', description: 'Test desc' };
    //         taskRepo.findOne.mockResolvedValue(mockTask);
    //         const save = jest.fn().mockResolvedValue(true)//because it is promise
    //         tasksService.getTaskByID = jest.fn().mockResolvedValue({//because it is promise
    //             status: TaskStatus.Done,
    //             save
    //         })
    //          expect(tasksService.getTaskByID).not.toHaveBeenCalled()
    //         const result = await tasksService.updateTask(1 ,TaskStatus.Done,mockUser)
    //         // expect(taskRepo.findOne).toHaveBeenCalledWith({
    //         //     where: {
    //         //         id: 1,
    //         //         userId: mockUser.id,
    //         //       },
    //         // })
    //         expect(save).toHaveBeenCalled()


    //      })
    // })
    describe('getTaskById', () => {
        it('calls taskRepository.findOne() and succesffuly retrieve and return the task', async () => {
          const mockTask = { title: 'Test task', description: 'Test desc' };
          taskRepo.findOne.mockResolvedValue(mockTask);
    
          const result = await tasksService.getTaskById(1, mockUser);
          expect(result).toEqual(mockTask);
    
          expect(taskRepo.findOne).toHaveBeenCalledWith({
            where: {
              id: 1,
              userId: mockUser.id,
            },
          });
        });
})

})