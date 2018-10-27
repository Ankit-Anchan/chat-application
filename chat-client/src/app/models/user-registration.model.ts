export class UserRegistration {
  constructor(
    public mobile_number: string,
    public firstname: string,
    public lastname: string,
    public password: string,
    public created_at?: Date,
    public modified_at?: Date
  ) {};
}
