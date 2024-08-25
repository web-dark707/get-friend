import { RecordResult } from '@/types/api/record';
import { deffHttp } from '@/utils/axios';
enum Api {
    RECORD_LIST = '/api/dating-record/search',
    RECORD_DETAIL = '/api/dating-record/detail',
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
