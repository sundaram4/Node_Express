//anything that is sort of helper 
// does not come under middleware 
// included in utill

class ErrorResponse extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = ErrorResponse;