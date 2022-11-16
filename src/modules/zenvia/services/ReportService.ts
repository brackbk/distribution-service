import { injectable, inject } from 'tsyringe';
import * as zenvia from '@zenvia/sdk';
import { IReportEntry } from '@zenvia/sdk/dist/lib/reports/abstract';
import { format, lastDayOfMonth } from 'date-fns';

import ZenviaConfig from '@config/zenvia';

interface IReportMessagesEntry extends IReportEntry {
  channel: string;
  type: string;
  directionInTotal: number;
  directionOutTotal: number;
  total: number;
}

@injectable()
class ReportService {
  async getByPeriod(
    startDate: string,
    endDate: string,
  ): Promise<IReportMessagesEntry[]> {
    const zenviaService = new zenvia.Client(ZenviaConfig.ApiToken);
    const reports = zenviaService.getMessagesReportClient();

    return reports.getEntries({
      startDate,
      endDate,
    });
  }

  async getAll() {
    let reportsData: any = [];

    await Promise.all(
      await Array(10)
        .fill(1)
        .map(async (item, monthStart) => {
          const aditionalGetMonthStart = monthStart === 0 ? 1 : 2;
          const aditionalGetMonthEnd = monthStart === 0 ? 2 : 3;
          const monthStartReal = monthStart + aditionalGetMonthStart;
          const initialDate = `${new Date().getFullYear()}-${
            monthStartReal < 10 ? `0${monthStartReal}` : monthStartReal
          }-01`;

          const lastDateWithTwoMonths = format(
            lastDayOfMonth(
              new Date(
                `${new Date().getFullYear()}-${
                  monthStart + aditionalGetMonthEnd
                }-01 00:00`,
              ),
            ),
            'yyyy-MM-dd',
          );

          try {
            const reportDataByPeriod = await this.getByPeriod(
              initialDate,
              lastDateWithTwoMonths,
            );
            reportsData = [...reportDataByPeriod];
          } catch (err) {
            console.log(err);
          }
        }),
    );

    const dataMessages = reportsData
      .filter((report: { channel: string }) => report.channel === 'whatsapp')
      .reduce((previous: any, current: any) => {
        return {
          ...current,
          directionOutTotal: previous.directionOutTotal + (current.directionOutTotal || 0),
          directionInTotal: previous.directionInTotal + (current.directionInTotal || 0),
          total: previous.directionInTotal + (current.total || 0),
        }
      });

    return {
      total_messages_inbox: dataMessages.total,
      requires_interaction: dataMessages.directionOutTotal,
      successful_interaction: dataMessages.directionInTotal,
      ignored: 0,
      total_messages: 0,
      first_contact: 0,
      second_contact: 0,
      third_contact: 0,
      interactions: {
        sends: Array(5).fill(0),
        interaction_successful: Array(5).fill(0),
        open_rate: Array(5).fill(0),
      }
    };
  }
}

export default ReportService;
