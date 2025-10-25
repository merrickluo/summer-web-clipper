.PHONY: all build build-chrome build-firefox dev dev-chrome dev-firefox release clean

all: build

build-chrome:
	npm run build:chrome

build-firefox:
	npm run build:firefox

dev-chrome:
	npm run build:chrome -- --watch

dev-firefox:
	npm run build:firefox -- --watch

package:
	npm run package

release:
ifeq ($(version),)
	$(error version is not set)
endif
	npm version $(version) -m "ci: release $(version)"
	git push --atomic $(version) main

clean:
	npm run clean
