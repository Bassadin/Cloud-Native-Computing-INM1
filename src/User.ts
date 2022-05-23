export default class User {
    public id: String;
    public firstName: String;
    public lastName: String;

    constructor(id: String, firstName: String, lastName: String) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public toString(): String {
        return `User (${this.id}) - ${this.lastName}, ${this.firstName}`;
    }
}
