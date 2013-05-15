"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/

This file creates your application.
"""

import os
from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__, template_folder='dist', static_folder='dist')

app.config.update(
    DEBUG=bool(os.environ.get('DEBUG', False)),
    SECRET_KEY=os.environ.get('SECRET_KEY', 'this_should_be_configured')
)
print "DEBUG: ", app.debug
if app.debug:
    app.template_folder = 'app'
    app.static_folder = 'app'

###
# Routing for your application.
###


@app.route('/')
def home():
    """Render website's home page."""
    return app.send_static_file('index.html')


@app.route('/about/')
def about():
    """Render the website's about page."""
    return render_template('about.html')


###
# Routing static files. TODO: clean this non-DRY mess
###
if app.debug:
    dev_server = 'http://localhost:9000/'
    import requests

    @app.route('/styles/<path:filename>')
    def send_style(filename):
        return redirect(dev_server + 'styles/' + filename)

    @app.route('/components/<path:filename>')
    def send_component(filename):
        return requests.get(dev_server + 'components/' + filename).content

    @app.route('/scripts/<path:filename>')
    def send_script(filename):
        return requests.get(dev_server + 'scripts/' + filename).content

    @app.route('/views/<path:filename>')
    def send_view(filename):
        return requests.get(dev_server + 'views/' + filename).content

    @app.route('/images/<path:filename>')
    def send_image(filename):
        return requests.get(dev_server + 'images/' + filename).content
else:
    @app.route('/styles/<path:filename>')
    def send_style(filename):
        return app.send_static_file('styles/' + filename)

    @app.route('/components/<path:filename>')
    def send_component(filename):
        return app.send_static_file('components/' + filename)

    @app.route('/scripts/<path:filename>')
    def send_script(filename):
        return app.send_static_file('scripts/' + filename)

    @app.route('/views/<path:filename>')
    def send_view(filename):
        return app.send_static_file('views/' + filename)

    @app.route('/images/<path:filename>')
    def send_image(filename):
        return app.send_static_file('images/' + filename)
    pass

###
# The functions below should be applicable to all Flask apps.
###


@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=600'
    return response


@app.errorhandler(404)
def page_not_found(error):
    """Custom 404 page."""
    return render_template('404.html'), 404

###
# Loading custom backend modules
###

# from flask.ext.restful import Api
# from modules.api.resources import PlaylistResource, TrackResource

# api = Api(app)
# api.add_resource(PlaylistResource, '/api' + PlaylistResource.url)
# api.add_resource(TrackResource, '/api' + TrackResource.url)


if __name__ == '__main__':
    app.run(debug=True)
