module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'ucbt',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
