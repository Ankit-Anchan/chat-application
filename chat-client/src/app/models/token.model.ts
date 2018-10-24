export class Token {
  token: string;
  auth: boolean;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
