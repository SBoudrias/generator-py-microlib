
REBUILD_FLAG =

.PHONY: all
all: venv test

.PHONY: venv
venv: .venv.touch
	tox -e venv $(REBUILD_FLAG)

.PHONY: tests test
tests: test
test: .venv.touch scaffold
	tox $(REBUILD_FLAG)


.PHONY: scaffold
scaffold:
	# We believe we don't need a .scaffold.touch.
	yo py-microlib --force $(ARGS)


.venv.touch: setup.py requirements.txt requirements_dev.txt
	$(eval REBUILD_FLAG := --recreate)
	touch .venv.touch


.PHONY: clean
clean:
	find . -iname '*.pyc' | xargs rm -f
	rm -rf .tox
	rm -rf ./venv-*
	rm -f .venv.touch
