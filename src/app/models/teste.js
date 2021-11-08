const valor = 10



const salt = bcrypt.genSaltSync(saltRounds)
const hash = bcrypt.hashSync('123', 10)
