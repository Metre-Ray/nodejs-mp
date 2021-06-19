import './test.config';
import { initDBData } from '../database/dbDataInit';

export default async () => {
    await initDBData();
}
