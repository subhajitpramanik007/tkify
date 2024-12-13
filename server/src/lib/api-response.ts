class ApiResponse<T> {
  status: number;
  message: string;
  data?: T;

  constructor(message: string, status = 200, data?: T) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

export { ApiResponse };
