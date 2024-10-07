
npm install sequelize pg pg-hstore
npx sequelize-cli migration:generate --name create-menus
npx sequelize-cli db:migrate
