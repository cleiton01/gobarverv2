import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class alterProviderFieldToProviderId1588463525335 {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('appointmentsv2','provider');

      await queryRunner.addColumn('appointmentsv2', new TableColumn({
        name: 'provider_id',
        type: 'varchar',
        isNullable: true,
      }));

      await queryRunner.createForeignKey('appointmentsv2', new TableForeignKey({
        name:'AppointmentProvider',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName:'users_v2',
        onDelete: 'SET NULL',
        onUpdate:'CASCADE',
      }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('appointmentsv2','AppointmentProvider');

      await queryRunner.dropColumn('appointmentsv2','provider_id');

      await queryRunner.addColumn('appointmentsv2', new TableColumn({
        name: 'provider',
        type: 'varchar',
        isNullable: true,
      }));

    }

}
