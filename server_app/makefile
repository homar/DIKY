test:
ifeq ($(OS),Windows_NT)
	.\node_modules\.bin\mocha.cmd --reporter spec
else
	./node_modules/.bin/mocha --reporter spec
endif

	
.PHONY: test
