#!/software/.admin/bins/bin/python
# -*- coding: UTF-8 -*-

#enable debugging
import cgitb
import json
cgitb.enable()

print "Content-Type: text/plain;charset=utf-8"
print

print "Hello World!"



try:
  f = open("data/location.json", 'w')

  locationJSON = {'lat':66, 'long':67, 'message': 'I am Kris!'}

  json.dump(locationJSON, f)

  f.close()
except:
  print 'failed!'
