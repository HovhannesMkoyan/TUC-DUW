export default (sequelize: any) => {
  const { File, Request } = sequelize.models;

  // File <---> Request
  File.hasMany(Request, {
    foreignKey: {
      allowNull: false,
    },
  });
  Request.belongsTo(File);
};
