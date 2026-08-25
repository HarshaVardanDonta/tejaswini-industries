.PHONY: dev build preview lint sanity-dev seed

dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

lint:
	npm run lint

sanity-dev:
	npm run sanity:dev

seed:
	npm run seed:sanity
