/**
 * @description: request 状态码
 */
export enum ResultEnum {
    SUCCESS = 0,
    ERROR = -1,
    TIMEOUT = 401,
    TYPE = 'success',
}

/**
 * @description: request方法
 */
export enum RequestEnum {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

/**
 * @description:  contentType类型
 */
export enum ContentTypeEnum {
    // json
    JSON = 'application/json; charset=utf-8',
    // form-data qs
    FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
    // form-data  upload
    FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
