import { client, db } from '.';
import { goals, goalsCompletions } from './schema';

async function seed() {
  await db.delete(goalsCompletions);
  await db.delete(goals);

  const result = await db
    .insert(goals)
    .values([
      { title: 'Acordar cedo', desiredWeeklyFrequency: 5 },
      { title: 'Me exercitar', desiredWeeklyFrequency: 3 },
    ])
    .returning();

  await db.insert(goalsCompletions).values([{ goalId: result[0].id }]);
}

seed().finally(() => client.end());
