import User from "../models/user.model";
import database from "../database";

class UserRepository {
    
   async findAllUsers(): Promise<User[]> {
        const query = `
           SELECT uuid, username 
           FROM application_user; 
        `;
        
        const result = await database.query<User>(query);
        const rows = result.rows;
        return rows || [];
    }
}

export default new UserRepository();
