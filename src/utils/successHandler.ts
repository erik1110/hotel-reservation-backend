export class getHttpResponse {
  static successResponse({ data, message }: { data?: any; message?: string }) {
    const result = { status: true };
    if (data) result['data'] = data;
    if (message) result['message'] = message;
    return result;
  }
}
