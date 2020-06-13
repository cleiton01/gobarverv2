import {MigrationInterface, QueryRunner, Table} from "typeorm";
import { id } from "date-fns/esm/locale";
import { stringLiteral } from "@babel/types";
import { query } from "express";

export default class createUserTokenTable1591573270930 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
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
              generationStrategy: 'uuid'
            },
            {
              name: 'user_id',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default:'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default:'now()',
            }
          ],
          foreignKeys:[
            {
              name: 'TokenUser',
              referencedTableName: 'users_v2',
              referencedColumnNames: ['id'],
              columnNames: ['user_id'],
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE'
            }
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('user_token');
    }

}
