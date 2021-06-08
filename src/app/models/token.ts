export class token{
    Id : number;
    Token : string;
    Region: string;
    Rolle: number;

    constructor(id : number, token : string, rolle : number, region : string){
        this.Id = id;
        this.Token = token;
        this.Rolle = rolle;
        this.Region = region;
    }
}