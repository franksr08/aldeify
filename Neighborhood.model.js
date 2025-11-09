// Neighborhood.model.js
// Modelo para armazenar os bairros vinculados a uma cidade

module.exports = (sequelize, DataTypes) => {
    const Neighborhood = sequelize.define('Neighborhood', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        // cityId será criado automaticamente pelo Sequelize na associação
    }, {
        tableName: 'Neighborhoods',
        timestamps: true,
        // Garante que não haja dois bairros com o mesmo nome na mesma cidade
        indexes: [
            {
                unique: true,
                fields: ['name', 'cityId']
            }
        ]
    });

    Neighborhood.associate = (models) => {
        // Um Bairro pertence a uma Cidade
        Neighborhood.belongsTo(models.City, { foreignKey: 'cityId', as: 'city' });
        // Um Bairro tem muitos Endereços (endereço de um usuário)
        Neighborhood.hasMany(models.Address, { foreignKey: 'neighborhoodId', as: 'addresses' });
    };

    return Neighborhood;
};
