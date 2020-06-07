
import {MigrationInterface, QueryRunner, Table } from "typeorm";


export default class CreateAppointment1588043147119 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: "appointmentsv2",
          columns:[
            {
              name:'id',
              type:'varchar',
              isPrimary: true,
              generationStrategy: 'uuid',
            },
            {
              name:'provider',
              type:'varchar',
              isNullable: false,
            },
            {
              name:'date',
              type:'timestamp',
              isNullable: false,
            },
          ]
        })
      );

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropTable("appointmentsv2");
    }

}
