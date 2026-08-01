/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class FixColumns1785567756575 {
    name = 'FixColumns1785567756575'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "COURSE" DROP CONSTRAINT "FK_8fe2d521a6ac4dc8b14f68e9352"`);
        await queryRunner.query(`ALTER TABLE "COURSE" DROP CONSTRAINT "FK_cf1193ac1d6f777456c359cff5a"`);
        await queryRunner.query(`ALTER TABLE "USER" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "USER" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "COURSE" DROP COLUMN "User_id"`);
        await queryRunner.query(`ALTER TABLE "COURSE" DROP COLUMN "Skill_id"`);
        await queryRunner.query(`ALTER TABLE "USER" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "USER" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "COURSE" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "COURSE" ADD "skill_id" uuid`);
        await queryRunner.query(`ALTER TABLE "COURSE" ADD CONSTRAINT "FK_7c9837d128ab474cb3d409b448d" FOREIGN KEY ("user_id") REFERENCES "USER"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "COURSE" ADD CONSTRAINT "FK_10d952a5e55998cf12f448fcfab" FOREIGN KEY ("skill_id") REFERENCES "SKILL"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "COURSE" DROP CONSTRAINT "FK_10d952a5e55998cf12f448fcfab"`);
        await queryRunner.query(`ALTER TABLE "COURSE" DROP CONSTRAINT "FK_7c9837d128ab474cb3d409b448d"`);
        await queryRunner.query(`ALTER TABLE "COURSE" DROP COLUMN "skill_id"`);
        await queryRunner.query(`ALTER TABLE "COURSE" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "USER" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "USER" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "COURSE" ADD "Skill_id" uuid`);
        await queryRunner.query(`ALTER TABLE "COURSE" ADD "User_id" uuid`);
        await queryRunner.query(`ALTER TABLE "USER" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "USER" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "COURSE" ADD CONSTRAINT "FK_cf1193ac1d6f777456c359cff5a" FOREIGN KEY ("Skill_id") REFERENCES "SKILL"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "COURSE" ADD CONSTRAINT "FK_8fe2d521a6ac4dc8b14f68e9352" FOREIGN KEY ("User_id") REFERENCES "USER"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
