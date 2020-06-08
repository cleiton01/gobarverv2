import {MigrationInterface, QueryRunner, Table} from "typeorm";
import { id } from "date-fns/esm/locale";
import { stringLiteral } from "@babel/types";
import { query } from "express";

export default class createUserTokenTable1591573270930 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.createTable(
        new Table({
          name: 'user_token',
          columns:[
            {
              name: 'id',
              type: 'varchar',
              isPrimary: true,
              generationStrategy: 'uuid'
            },
            {
              name: 'token',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'user_id',
              type: 'varchar',
              isNullable: false,
            }
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropTable('user_token');
    }

}
