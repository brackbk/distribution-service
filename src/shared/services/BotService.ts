import IBotRequestDTO from '@shared/dtos/IBotRequestDTO';
import axios, { AxiosResponse } from 'axios';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IBotResponseDTO from '@shared/dtos/IBotResponseDTO';
@injectable()
class BotService {

    
  public async msg(data:IBotRequestDTO): Promise<AxiosResponse<IBotResponseDTO, any> | undefined> {


    try {
        const response =  await axios.post<IBotResponseDTO>(process.env.BOT_SERVICE + "dialogflow/intent",data)

        return response;

    } catch (error) {
        console.log(error);
        throw new AppError('Error to request from bot-service');
    }
  }
}

export default BotService;
