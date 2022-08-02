import User from "../models/user.model";
import database from "../database";

class UserRepository {
    
   async findAllUsers(): Promise<User[]> {
        const query = `
           SELECT uuid, username 
           FROM application_user; 
        `;
        
        const { rows } = await database.query<User>(query);
        return rows || [];
    }

    async findById(uuid: string): Promise<User> {
        const query = `
           SELECT uuid, username 
           FROM application_user
           WHERE uuid = $1; 
        `;

        const values = [uuid];
        
        const { rows } = await database.query<User>(query, values);
        
        const [ user ] = rows;
        
        return user;
    }

    async addByUser(user: User): Promise<string> {
        const query = `
           INSERT INTO application_user (username, password)
           VALUES ($1, crypt($2, 'el_salty'))
           RETURNING uuid; 
        `;

        const values = [user.username, user.password];

        const { rows } = await database.query<{uuid: string}>(query, values);
        const [ newUser ] = rows;

        return newUser.uuid;
    }

    async updateById(user: User): Promise<void> {
        const query = `
           UPDATE application_user
           SET username = $1, password = crypt($2, 'el_salty')
           WHERE uuid = $3; 
        `;

        const values = [user.username, user.password, user.uuid];

        await database.query(query, values);
    }

    async removeUser (uuid: string): Promise<void> {
        const query = `
           DELETE FROM application_user 
           WHERE uuid = $1; 
        `;

        const values = [uuid];
        await database.query(query, values);
    }

    async FindByUsernameAndPassword(username: string, password: string) {
      const query = `
         SELECT uuid, username 
         FROM application_user
         WHERE username = $1
         AND password = crypto($2, 'el_salty');
      `;

      const values = [username, password];
      const { rows } = await database.query<User>(query, values);
      const [user] = rows;
      return !user ? null : user;
    }
}

export default new UserRepository();
