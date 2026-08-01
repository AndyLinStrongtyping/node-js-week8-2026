/**
 * 任務 4：Seeder，種一些資料，證明你建立的資料表真的能使用。
 * 規則：可重複執行（先清空、再種入資料），即使執行多次也不會有資料疊加的狀況。
 * 執行順序：一定要先 npm run migration:run（沒有資料表，就無法種資料）
 */
const { dataSource } = require('./data-source')


/** 清空：被 FK 指著的表最後刪（先刪 COURSE，再 USER / SKILL）。
 *  不用 clear()（TRUNCATE 會被 FK 擋）、不用 delete({})（TypeORM 拒絕空條件）。 */
async function clearAll() {
  for (const name of ['Course', 'User', 'Skill']) {
    if (dataSource.hasMetadata(name)) {
      await dataSource.createQueryBuilder().delete().from(name).execute()
    }
  }
}

async function main() {
  await dataSource.initialize()
  await clearAll()
  const UserRepo = dataSource.getRepository('User');
  const SkillRepo = dataSource.getRepository('Skill');
  const CourseRepo = dataSource.getRepository('Course');
  

  const Skills = await SkillRepo.save([
  { name: '重訓' },
  { name: '瑜珈' },
  { name: '飛輪' },
]);

  const Users = await UserRepo.save([
  { name: '海格教練', email: 'coach1@livefit.tw', role: 'COACH' },
  { name: '小美教練', email: 'coach2@livefit.tw', role: 'COACH' },
]);

const Courses = await CourseRepo.save([
  {
    name: '肌力入門班',
    description: '適合初學者的肌力訓練課程',
    start_at: new Date('2024-07-01T09:00:00'),
    end_at: new Date('2024-07-01T10:00:00'),
    max_participants: 10,
    user: Users[0],
    skill: Skills[0],
  },
  {
    name: '週末飛輪',
    description: '週末放鬆的飛輪課程',
    start_at: new Date('2024-07-01T10:00:00'),
    end_at: new Date('2024-07-01T11:00:00'),
    max_participants: 10,
    user: Users[1],
    skill: Skills[2],
  },
  {
    name: '晨間瑜珈',
    description: '清晨的瑜珈課程',
    start_at: new Date('2024-07-01T08:00:00'),
    end_at: new Date('2024-07-01T09:00:00'),
    max_participants: 10,
    user: Users[0],
    skill: Skills[1],
  },
  {
    name: '核心特訓',
    description: '專注於核心肌群的訓練課程',
    start_at: new Date('2024-07-01T11:00:00'),
    end_at: new Date('2024-07-01T12:00:00'),
    max_participants: 10,
    user: Users[1],
    skill: Skills[0],
  },
]);

 


  console.log('🌱 seed 完成')
  await dataSource.destroy()
}

main().catch((e) => { console.error('seed 失敗：', e.message); process.exit(1) })
