class ApiResponse {
  status: any;
  message: string;
  data: any;
  success: boolean;
  constructor(status:number, message = "Success come under ur foot", data:any) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.success = status < 400; // if status code is less than 400 then success is "true" a boolean return
  }
}

export {ApiResponse}
