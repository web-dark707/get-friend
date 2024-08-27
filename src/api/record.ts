import { RecordDisputeLogResult, RecordResult } from '@/types/api/record';
import { deffHttp } from '@/utils/axios';
enum Api {
    RECORD_LIST = 'https://api.sakuraclubjp.com/api/dating-record/search',
    RECORD_DETAIL = 'https://api.sakuraclubjp.com/api/dating-record/detail',
    DATING_RECORD_DISPUTE = 'https://api.sakuraclubjp.com/api/dating-record/dispute',
    DATING_RECORD_DISPUTE_LOG = 'https://api.sakuraclubjp.com/api/dating-record/dispute-log',
}

export const getRecord = (params: { status?: string }) =>
    deffHttp.get<RecordResult[]>(
        { url: Api.RECORD_LIST, params },
        { withToken: true },
    );

export const getRecordDetail = (params: { datingId: string }) =>
    deffHttp.get<RecordResult>(
        { url: Api.RECORD_DETAIL, params },
        { withToken: true },
    );
// 提交投诉
export const recordDispute = (params: {
    datingRecordId: string;
    content: string;
}) =>
    deffHttp.post<any>(
        { url: Api.DATING_RECORD_DISPUTE, data: params },
        { withToken: true },
    );

export const recordDisputeLog = (params: { datingRecordId: string }) =>
    deffHttp.get<RecordDisputeLogResult[]>(
        { url: Api.DATING_RECORD_DISPUTE_LOG, params },
        { withToken: true },
    );
