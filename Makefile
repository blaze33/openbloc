SHELL := /bin/bash

# ----------------------
#  Compress & Deploy static files to S3
# ----------------------
STATIC  := deploy/static
STATICGZ := .static-gz
INPUTS  := $(shell find $(STATIC) -path $(STATIC)/images -prune -o -type f -print)
OUTPUTS := $(patsubst $(STATIC)/%, $(STATICGZ)/%, $(INPUTS))
echo-test:
	@echo $(INPUTS)
	@echo $(OUTPUTS)
	@echo $(STATIC)
	@echo $(STATICGZ)

push: build-assets commit-assets push-s3 heroku

heroku:
	git subtree push --prefix deploy heroku master

gh-pages:
	git subtree push --prefix gh-pages gh-pages master

build-assets:
	npm run build
	npm run github

commit-assets:
	git add -u deploy/static/
	git commit -m "Builded static assets."

push-s3: compress-static
	# js/css does need gzipping
	s3cmd sync --acl-public --guess-mime-type --no-mime-magic --progress \
	--add-header "Cache-Control:public, max-age=31536000" \
	--add-header "Content-Encoding:gzip" \
	-r $(STATICGZ)/ s3://openbloc/

	# imgs don't need to be gzipped
	s3cmd sync --acl-public --guess-mime-type \
	--add-header "Cache-Control:public, max-age=31536000" \
	-r $(STATIC)/images s3://openbloc/

compress-static: $(OUTPUTS)
	@echo ' All assets compressed.'

$(OUTPUTS): $(STATICGZ)/% : $(STATIC)/%
	@mkdir -p $(dir $@)
	@gzip -n -9 -c $< > $@
	@echo -n '.'

clean:
	rm -rf .static-gz


# ----------------------
#  CodeIntel config according to virtualenv path
# ----------------------
setup-ide:
	source /usr/local/bin/virtualenvwrapper.sh && \
	workon openbloc && \
	source .codeintel/setup