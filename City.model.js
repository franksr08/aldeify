// City.model.js
// Modelo para armazenar as cidades cadastradas pelo Administrador

module.exports = (sequelize, DataTypes) => {
    const City = sequelize.define('City', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true, // Nome da cidade deve ser único globalmente
        },
        // O campo 'UF' ou 'state' seria útil, mas vamos manter simples por enquanto.
    }, {
        tableName: 'Cities', // Nome da tabela
        timestamps: true, // Adiciona createdAt e updatedAt
    });

    // Associações (a serem definidas posteriormente)
    City.associate = (models) => {
        // Uma Cidade tem muitos Bairros
        City.hasMany(models.Neighborhood, { foreignKey: 'cityId', as: 'neighborhoods' });
        // Uma Cidade tem muitos Usuários (para saber a cidade de cadastro)
        City.hasMany(models.User, { foreignKey: 'cityId', as: 'users' });
    };

    return City;
};
