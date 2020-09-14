import {Test} from '@nestjs/testing'
import { UserRepository } from './user.repository';
  
const mockCredintial = {username:'test123',password:'test123'}
describe('user Repo testin',()=>{

    let userRepository ;
    beforeEach(async () =>{
        const module = await Test.createTestingModule({
            providers:[UserRepository]
        }).compile()
        userRepository = module.get<UserRepository>(UserRepository)
    })

    describe('SignUp ',()=>{
        let insert ;
        beforeEach(()=>{
            insert = jest.fn()
            userRepository.create = jest.fn().mockReturnValue({insert}) //Return because it is not promise 
        })
        it('sign up successfully ',()=>{
            insert.mockResolvedValue(undefined)
            expect(userRepository.signUp(mockCredintial)).resolves.toThrow()

        })
    })
})