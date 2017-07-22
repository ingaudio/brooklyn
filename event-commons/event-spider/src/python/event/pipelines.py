# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html
import pysolr
import googlemaps
import hashlib
from utility import *
from scrapy.exceptions import DropItem
from event.items import EventItem
import logging

SOLR_ENDPOINT = "http://192.168.99.100:8983/solr/eventCore"
GOOGLE_KEY = "AIzaSyDG0Y0aWyZdR9_-xjJ0fOShkhma_ePy8LE"

class EventEnrichment(object):
    def process_item(self, item, spider):
    	item['id'] = hashlib.sha256("".join([ str(x) for x in item.items()])).hexdigest()
        item['spiderName'] = spider.name
        item['spiderSource'] = spider.start_urls[0]        
        item['dateStart'] = encodeDate(item['dateStart'])
        item['dateEnd'] = encodeDate(item.get('dateEnd', None))
        item['price'] = float(item.get('price',-1))
        return item

class EventCollision(object):
    def open_spider(self, spider):
        self.client = pysolr.Solr(SOLR_ENDPOINT, timeout=10)
        
    def process_item(self, item, spider):
        results = self.client.search('*:*', **{
                'fq': 'id:%s' % (escapeSolrArg(item.get('id')))
            })
        if results.hits > 0:
            raise DropItem("item [%s] in collision with [%s] items" % (item['id'], results.hits))
        return item

class EventGeocode(object):
    def open_spider(self, spider):
        self.client = pysolr.Solr(SOLR_ENDPOINT, timeout=10)
        self.gmaps = googlemaps.Client(key=GOOGLE_KEY)

    def process_item(self, item, spider):
        if not item.get('coordinate') and item.get('place'):
            logging.info("geocode with solr for place: %s" % item.get('place'))
            results = self.client.search('*:*', **{
                'fq': 'place:"%s"' % (escapeSolrArg(item.get('place')))
            })
            if results != None and results.hits > 0:
                item['country']=encodeStr(results.docs[0]['country'])
                item['city']=encodeStr(results.docs[0]['city'])
                item['locality']=encodeStr(results.docs[0]['locality'])
                item['place']=encodeStr(results.docs[0]['place'])
                item['address']=encodeStr(results.docs[0]['address'])
                item['coordinate']=encodeStr(results.docs[0]['coordinate'])
        
        if not item.get('coordinate') and item.get('address') and item.get('place'):
            logging.info("geocode with maps for address: %s" % item.get('address'))
            results = self.gmaps.geocode(item['address'])
            if len(results) > 0:
                item['address'] = encodeStr(results[0]['formatted_address'])
                item['coordinate'] = ",".join([str(results[0]['geometry']['location']['lat']),str(results[0]['geometry']['location']['lng'])])
                for address in results[0]['address_components']:
                    if 'country' in address['types']:
                        item['country'] = encodeStr(address['long_name'])
                    if 'administrative_area_level_2' in address['types']:
                        item['city'] = encodeStr(address['long_name'])
                    if 'locality' in  address['types']:
                        item['locality'] = encodeStr(address['long_name'])
        
        return item

class EventValidator(object):
    def process_item(self, item, spider):
        if not item: raise DropItem("item is empty")
        elif not item.get('id'): raise DropItem("item id is empty")
        elif not item.get('name'): raise DropItem("item name is empty")
        elif not item.get('url'): raise DropItem("item url is empty")
        elif not item.get('image'): raise DropItem("item image is empty")
        elif not item.get('category'): raise DropItem("item category is empty")
        elif not item.get('dateStart'): raise DropItem("item dateStart is empty")
        elif not item.get('place'): raise DropItem("item place is empty")
        elif not item.get('address'): raise DropItem("item address is empty")
        elif not item.get('coordinate'): raise DropItem("item coordinate is empty")
        else: return item


class EventSolrWriter(object):

    def open_spider(self, spider):
        self.client = pysolr.Solr(SOLR_ENDPOINT, timeout=10)

    def process_item(self, item, spider):
        self.client.add([item])
        return item



