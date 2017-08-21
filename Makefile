build:
	@docker-compose up --build dev

dev:
	@docker-compose up dev

prod:
	@NODE_ENV=production ./node_modules/.bin/webpack -p --config ./webpack.config.ts

