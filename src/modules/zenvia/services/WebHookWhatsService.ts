import { injectable, inject } from 'tsyringe';
import IMsgRequestDTO from '../dtos/IMsgRequestDTO';
import IMsgStatusRequestDTO from '../dtos/IMsgStatusRequestDTO';
// import AppError from '@shared/errors/AppError';
@injectable()
class WebHookService {

  public async msg(data:IMsgRequestDTO): Promise<IMsgRequestDTO | undefined> {
    return data;
  }


  public async msgStatus(data:IMsgStatusRequestDTO): Promise<IMsgStatusRequestDTO | undefined> {
    return data;
  }
}

export default WebHookService;
