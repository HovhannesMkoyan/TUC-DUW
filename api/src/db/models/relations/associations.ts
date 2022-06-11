export default (sequelize: any) => {
  const {
    Book,
    Tag,
    User,
    Subscription,
    Invoice,
    SubscriptionCancellation,
    UserBookActivity,
    Download,
    Comment,
    Goal,
  } = sequelize.models;

  // User <---> UserBookActivity
  User.hasMany(UserBookActivity, {
    foreignKey: {
      allowNull: false,
    },
  });
  UserBookActivity.belongsTo(User);

  // User <---> Download
  User.hasMany(Download, {
    foreignKey: {
      allowNull: false,
    },
  });
  Download.belongsTo(User);

  // User <---> Comment
  User.hasMany(Comment, {
    foreignKey: {
      allowNull: false,
    },
  });
  Comment.belongsTo(User);

  // User <---> Goal
  User.hasMany(Goal, {
    foreignKey: {
      allowNull: false,
    },
  });
  Goal.belongsTo(User);

  // User <---> Subscription
  User.hasMany(Subscription, {
    foreignKey: {
      allowNull: false,
    },
  });
  Subscription.belongsTo(User);

  // User <---> Invoice
  User.hasMany(Invoice, {
    foreignKey: {
      allowNull: false,
    },
  });
  Invoice.belongsTo(User);

  // User <---> SubscriptionCancellation
  User.hasMany(SubscriptionCancellation, {
    foreignKey: {
      allowNull: false,
    },
  });
  SubscriptionCancellation.belongsTo(User);

  // Book <---> Bookmark
  Book.hasMany(UserBookActivity, {
    foreignKey: {
      allowNull: false,
    },
  });
  UserBookActivity.belongsTo(Book);

  // Book <---> Download
  Book.hasMany(Download, {
    foreignKey: {
      allowNull: false,
    },
  });
  Download.belongsTo(Book);

  // Book <---> Comment
  Book.hasMany(Comment, {
    foreignKey: {
      allowNull: false,
    },
  });
  Comment.belongsTo(Book);

  // Book <---> Tag
  Book.hasMany(Tag, {
    foreignKey: {
      allowNull: false,
    },
  });
  Tag.belongsTo(Book);

  // Subscription <---> Invoice
  Subscription.hasMany(Invoice, {
    foreignKey: {
      allowNull: false,
    },
  });
  Invoice.belongsTo(Subscription);

  // Subscription <---> SubscriptionCancellation
  Subscription.hasOne(SubscriptionCancellation, {
    foreignKey: {
      allowNull: false,
    },
  });
  SubscriptionCancellation.belongsTo(Subscription);

  // Goal <---> UserBookActivity
  Goal.hasMany(UserBookActivity, {
    foreignKey: {
      allowNull: true,
    },
  });
  UserBookActivity.belongsTo(Goal);
};
