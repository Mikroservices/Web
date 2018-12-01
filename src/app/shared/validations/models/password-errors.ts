export class PasswordErrors {
    public length: boolean = true;
    public lowercase: boolean = true;
    public uppercase: boolean = true;
    public symbol: boolean = true;

    public isValid() {
        return !this.length && !this.lowercase && !this.uppercase && !this.symbol;
    }
}