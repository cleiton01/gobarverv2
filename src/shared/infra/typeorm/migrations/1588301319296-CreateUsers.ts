import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateUsers1588301319296 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users_v2",
        columns:[
          {
            name:'id',
            type: 'varchar',
            isPrimary:true,
            generationStrategy:'uuid',
          },
          {
            name:'name',
            type: 'varchar',
          },
          {
            name:'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name:'password',
            type: 'varchar',
            isUnique: true,
          },
          {
            name:'created_at',
            type: 'timestamp',
            default:'now()',
          },
          {
            name:'updated_at',
            type: 'timestamp',
            default:'now()',
          },
        ]
      })
    )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("users_v2");
    }

}
