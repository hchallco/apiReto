import { Connection, RowDataPacket } from "mysql2";
import { Lifecycle, scoped } from "tsyringe";
import mysql, { OkPacket } from 'mysql2/promise';

@scoped(Lifecycle.ResolutionScoped)
export default class MysqlConnectionManager {
  private _client: Connection | undefined;
  private _host: string;
  private _userName: string;
  private _password?: string;
  private _database: string;
 
  constructor(){
    this._database = "";// process.env.database;
    this._host = ""; //process.env.host;
    this._userName = ""; //process.env.userName;
    this._password = ""; //process.env.password;

  }
  async dispose(): Promise<void> {
    await this.release();
  }

  public get client() {
    return this._client;
  }

  async executeQuery<R extends RowDataPacket = any>(query: string, params?: any[]) {
    //const password = await this.getPassword();

    const connection = await mysql.createConnection({
      database: this._database,
      host: this._host,
      user: this._userName,
      password: this._password,
    });

    try {
      await connection.connect();
      const result = await connection.query<R[]>(query, params);
      return result;
    } catch (error) {
      throw error;
    } finally {
      await connection
        .end()
        .then(() => connection.destroy())
        .catch(() => {});
    }
  }

  async executeNonQuery(query: string, params?: any[]) {

    const connection = await mysql.createConnection({
      database: this._database,
      host: this._host,
      user: this._userName,
      password: this._userName,
    });

    try {
      await connection.connect();
      const result = await connection.execute<OkPacket>(query, params);
      return result;
    } catch (error) {
      throw error;
    } finally {
      await connection
        .end()
        .then(() => connection.destroy())
        .catch(() => {});
    }
  }

  private async release() {
    try {
      if (this._client) {
        await this._client.end();
        this._client.destroy();
        this._client = undefined;
        return;
      }
    } catch (err) {
      const error = err as Error;
      console.log(err);
      throw err;
    }
  }

}