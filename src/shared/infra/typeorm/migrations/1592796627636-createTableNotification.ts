import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class createTableNotification1592796627636 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'notification',
          columns: [
            {
              name: 'id',
              type: 'varchar',
              length: '1000',
              generationStrategy: 'uuid',
              default:'uuid_generate_v4()',
            },
            {
              name: 'content',
              type: 'varchar',
              length: '2000',
            },
            {
              name: 'recipient_type',
              type: 'varchar',
            },
            {
              name: 'recipient_id',
              type: 'varchar',
              length: '1000',
            },
            {
              name: 'sent',
              type: 'varchar',
              length: '50',
            },
            {
              name: 'read',
              type: 'varchar',
              length: '50',
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
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('notification');
    }

}
