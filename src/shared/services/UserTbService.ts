import IBotRequestDTO from '@shared/dtos/IBotRequestDTO';
import axios, { AxiosResponse } from 'axios';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUserTbRequestDTO from '@shared/dtos/IUserTbRequestDTO';
@injectable()
class UserTbService {

    
  public async create(data:IUserTbRequestDTO): Promise<AxiosResponse<unknown, any>> {

    try {
        const response =  await axios.post<IUserTbRequestDTO>(process.env.TABLETALKS_SERVICE + "users",data)
        return response;

    } catch (error) {
        console.log(error);
        throw new AppError('Error to request from bot-service');
    }
  }
}

export default UserTbService;
