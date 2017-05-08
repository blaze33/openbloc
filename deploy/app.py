"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/

This file creates your application.
"""

import os
from flask import Flask, request, render_template, send_from_directory
from whitenoise import WhiteNoise


def create_app(debug=False):
    app = Flask(__name__)
    app.debug = debug
    app.template_folder = 'static/'
    # add whitenoise
    app.wsgi_app = WhiteNoise(app.wsgi_app, root='static/')

    return app


app = create_app(os.environ.get("DEBUG", False))


###
# Routing for your application.
###
@app.route('/google009a062b2cd3a7e6.html')
def google_webmaster_view():
    return "google-site-verification: google009a062b2cd3a7e6.html"


@app.route('/')
def home():
    """Render website's home page."""
    return render_template('index.html')


@app.route('/robots.txt')
@app.route('/favicon.ico')
def static_from_root():
    return send_from_directory(app.static_folder, request.path[1:])


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
