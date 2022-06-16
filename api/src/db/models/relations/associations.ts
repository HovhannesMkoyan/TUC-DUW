export default (sequelize: any) => {
  const {
    File,
    Download,
    Request,
  } = sequelize.models;

  // File <---> Request
  File.hasMany(Request, {
    foreignKey: {
      allowNull: false,
    },
  });
  Request.belongsTo(File);

  // File <---> Download
  File.hasMany(Download, {
    foreignKey: {
      allowNull: false,
    },
  });
  Download.belongsTo(File);
};
