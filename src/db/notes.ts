import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import Note from '../models/note'

// db.json file path
const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, './db.json')

type Data = {
  Notes: Note[]
}

const defaultData: Data = { Notes: [{
  name: "Shopping List",
  created: "August 2, 2023",
  category: 'Task',
  content: "Eggs, Milk 15/8/2023 21/8/2023",
  dates: ["15/8/2023", "21/8/2023"],
  id: "0000",
  isArchived: false
},
{
  name: "Personal Notes",
  created: "August 2, 2023",
  category: 'Random Thought',
  content: "Meeting at 3 PM 22/8/2023",
  dates: ["22/8/2023"],
  id: "1111",
  isArchived: false
},
{
  name: "Shopping List",
  created: "August 2, 2023",
  category: 'Random Thought',
  content: "Submit report, Prepare presentation for 28/8/2023",
  dates: ["28/8/2023"],
  id: "2222",
  isArchived: false
},
{
  name: "Shopping List",
  created: "August 2, 2023",
  category: 'Task',
  content: "Bananas, Apples 3/9/2023 5/9/2023",
  dates: ["3/9/2023", "5/9/2023"],
  id: "3333",
  isArchived: false
},
{
  name: "Personal Notes",
  created: "August 2, 2023",
  category: 'Idea',
  content: "Meeting at 3 PM 10/9/2023",
  dates: ["10/9/2023"],
  id: "4444",
  isArchived: false
},
{
  name: "Shopping List",
  created: "August 2, 2023",
  category: 'Idea',
  content: "Submit report, Prepare presentation for 15/9/2023",
  dates: ["15/9/2023"],
  id: "5555",
  isArchived: true
},
{
  name: "Personal Notes",
  created: "August 2, 2023",
  category: 'Random Thought',
  content: "Meeting at 3 PM 18/9/2023",
  dates: ["18/9/2023"],
  id: "6666",
  isArchived: true
},
{
  name: "Shopping List",
  created: "August 2, 2023",
  category: 'Idea',
  content: "Submit report, Prepare presentation for 22/9/2023",
  dates: ["22/9/2023"],
  id: "7777",
  isArchived: true
}]}
const adapter = new JSONFile<Data>('db.json')
const db = new Low<Data>(adapter, defaultData)

db.write();

export {db};