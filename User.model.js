// User.model.js
// Modelo para armazenar Compradores, Lojistas e o Administrador

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fullName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true, // Validação de formato de email
            }
        },
        password: {
            type: DataTypes.STRING(255), // Armazenará o HASH da senha
            allowNull: false,
        },
        // Role para definir o tipo de usuário
        role: {
            type: DataTypes.ENUM('comprador', 'lojista', 'admin'),
            allowNull: false,
            defaultValue: 'comprador',
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true, // Pode ser usado para banimento/suspensão
        },
        // cityId será a chave estrangeira da cidade de cadastro
    }, {
        tableName: 'Users',
        timestamps: true,
    });

    User.associate = (models) => {
        // Usuário pertence a uma Cidade (a cidade que ele escolheu no cadastro)
        User.belongsTo(models.City, { foreignKey: 'cityId', as: 'cityOfRegistration' });
        
        // Comprador/Lojista terá Endereços
        User.hasMany(models.Address, { foreignKey: 'userId', as: 'addresses' });
        
        // Lojista terá uma Loja
        User.hasOne(models.Store, { foreignKey: 'ownerId', as: 'store' });
        // Lojista terá Produtos (a ser criado na M11)
        // User.hasMany(models.Product, { foreignKey: 'sellerId', as: 'products' });
    };

    return User;
};
