#!/software/.admin/bins/bin/python
# -*- coding: UTF-8 -*-

#enable debugging
import cgitb
import json
import urlparse
import os

cgitb.enable()


url = os.environ['HTTP_HOST']
uri = os.environ['REQUEST_URI']

parsed = urlparse.urlparse(url+uri)
params = urlparse.parse_qs(parsed.query)


try:
  f = open("data/location.json", 'w')

  locationJSON = {'lat':params["Lat"][0], 'long':params["Long"][0], 'message': params["Message"][0]}#, 'params': params, 'url': url, 'uri': uri}

  json.dump(locationJSON, f)

  f.close()

  print HttpRes
except:
  print 'failed!'
