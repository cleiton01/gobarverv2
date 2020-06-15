import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class addAvatarFieldToUser1588526857065 {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('users_v2',new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true,
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('users_v2','avatar');
    }

}
