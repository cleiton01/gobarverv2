import {MigrationInterface, QueryRunner, TableColumn,} from "typeorm";
import { query } from "express";

export class addColumnsTimeControl1588467100917 {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.addColumn('appointmentsv2', new TableColumn({
        name: 'created_at',
        type: 'timestamp',
        default:'now()',
      }));

      await queryRunner.addColumn('appointmentsv2', new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        default:'now()',
      }));

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropColumn('appointmentsv2', 'updated_at');

      await queryRunner.dropColumn('appointmentsv2','created_at');

    }

}
