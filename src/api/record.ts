import { RecordResult } from '@/types/api/record';
import { deffHttp } from '@/utils/axios';
enum Api {
    RECORD_LIST = '/api/dating-record/search',
}

export const getRecord = (params: { status?: string }) =>
    deffHttp.get<RecordResult[]>(
        { url: Api.RECORD_LIST, params },
        { withToken: true },
    );
