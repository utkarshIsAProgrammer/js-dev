import path from "node:path"

// show current working directory
const projectRoot = process.cwd()
console.log(projectRoot)

// join path
const userId = "42"
const userFile = "profile_pic.jpeg"
const filePath = path.join(
  projectRoot, "uploads", "users", userId, userFile
)
console.log(filePath)

// show file name
const fileName = path.basename(filePath)
console.log(fileName)

// show file extension
const fileExt = path.extname(filePath)
console.log(fileExt)

// show parent folder (directory name)
const dirName = path.dirname(filePath)
console.log(dirName)
