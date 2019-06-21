const mongoose = require('../../DataBase/index');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        unique: true,
        require: true,
        lowercase: true,
    },
    password:{
        type: String,
        require: true,
        // unique: true,
        select: false,
    },
    passwordResetToken:{
        type: String,
        select: false,
    },
    passwordResetExpires:{
        type: Date,
        select: false,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
});

/**
 * Função que para ecriptar o password antes de salvar ele no banco de dados
 * UserSchema.pre = vai rodar antes de salva no BD
 */
UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})


const User = mongoose.model('User', UserSchema);

module.exports = User;