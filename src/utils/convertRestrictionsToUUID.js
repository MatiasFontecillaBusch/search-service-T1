/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import { connect, disconnect } from 'mongoose';
import dotenv from 'dotenv';
import Restrictions from '#models/restrictionsModel.js';
import Students from '#models/studentsModel.js';

dotenv.config({ path: './.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
).replace('<USER>', process.env.DATABASE_USER);

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

async function convertRestrictionsToUUID() {
  try {
    await connect(DB);

    console.log('Connected to MongoDB');

    // Fetch all students
    const students = await Students.find();

    for (const student of students) {
      let updated = false;

      // Check each restriction
      for (let i = 0; i < student.restrictions.length; i++) {
        const restrictionId = student.restrictions[i];

        if (typeof restrictionId === 'string') {
          const restriction = await Restrictions.findOne({
            uuid: restrictionId,
          });

          if (restriction) {
            student.restrictions[i] = restriction._id;
            updated = true;
          } else {
            console.log(`Restriction with UUID ${restrictionId} not found.`);
          }
        }
      }

      // Save the student with updated restrictions
      if (updated) {
        await student.save();
        console.log(`Updated student ${student.name} (${student._id})`);
      }
    }

    console.log('Finished updating students.');
  } catch (error) {
    console.error('Error converting restrictions to UUID:', error);
  } finally {
    // Disconnect from MongoDB
    await disconnect();
    console.log('Disconnected from MongoDB');
  }
}

convertRestrictionsToUUID();
