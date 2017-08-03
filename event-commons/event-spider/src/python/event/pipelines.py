# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html
import pysolr
import googlemaps
import hashlib
import os
from utility import *
from scrapy.exceptions import DropItem
from event.items import EventItem
import logging

SOLR_ENDPOINT = os.environ['SOLR_ENDPOINT']
GOOGLE_KEY = os.environ['GOOGLE_KEY']

class EventCreate(object):
    def process_item(self, item, spider):
        item['id'] = hashlib.sha256("".join([ str(x) for x in item.items()])).hexdigest()
        item['spiderName'] = spider.name
        item['spiderSource'] = spider.start_urls[0]        
        item['status'] = False
        item['creationDate'] = encodeDateNow()
        logging.debug("EventCreate: event [%s] created" % item.get('id'))
        return item

class EventUpdate(object):
    def process_item(self, item, spider):
        item['status'] = False
        item['modificationDate'] = encodeDateNow()
        logging.debug("EventUpdate: event [%s] modified" % item.get('id'))
        return item

class EventCollision(object):
    def open_spider(self, spider):
        self.client = pysolr.Solr(SOLR_ENDPOINT, timeout=10)
        
    def process_item(self, item, spider):
        results = self.client.search('*:*', **{
                'fq': 'id:%s' % (escapeSolrArg(item.get('id')))
            })
        if results.hits > 0:
            raise DropItem("event [%s] in collision with [%s] events" % (item['id'], results.hits))
        
        logging.debug("EventCollision: event [%s] not in collision" % item.get('id'))
        return item

class EventSolrWriter(object):

    def open_spider(self, spider):
        self.client = pysolr.Solr(SOLR_ENDPOINT, timeout=10)

    def process_item(self, item, spider):
        logging.debug("EventSolrWriter: indexing event [%s]" % item.get('id'))
        try:
            self.client.add([item])
            return item
        except Exception as e:
            raise DropItem("EventSolrWriter: indexing of event [%s] error: %s" % (item['id'], e))


class EventEnrichment(object):
    def process_item(self, item, spider):
        logging.debug("EventEnrichment: enrichment event [%s]" % item.get('id'))
        item['dateStart'] = encodeDate(item.get('dateStart', ''))
        item['dateEnd'] = encodeDate(item.get('dateEnd', ''))
        item['creationDate'] = encodeDate(item.get('creationDate', ''))
        item['modificationDate'] = encodeDate(item.get('modificationDate', ''))
        item['price'] = float(item.get('price',-1))
        return item


class EventGeocodeSolr(object):
    def open_spider(self, spider):
        self.client = pysolr.Solr(SOLR_ENDPOINT, timeout=10)

    def process_item(self, item, spider):
        if not item.get('coordinate') and item.get('place'):
            logging.debug("EventGeocodeSolr: geocode event [%s] with place [%s]" % (item.get('id'), item.get("place")))
            results = self.client.search('*:*', **{
                'fq': 'place:"%s"' % (escapeSolrArg(item.get('place'))),
                'fq': 'coordinate:[* TO *]'
            })
            if results != None and results.hits > 0:
                logging.debug("EventGeocodeSolr: geocode event [%s] with place [%s] found [%s] results" % (item.get('id'), item.get("place"), results.hits))
                item['country']=encodeStr(results.docs[0]['country'])
                item['city']=encodeStr(results.docs[0]['city'])
                item['locality']=encodeStr(results.docs[0]['locality'])
                item['place']=encodeStr(results.docs[0]['place'])
                item['address']=encodeStr(results.docs[0]['address'])
                item['coordinate']=encodeStr(results.docs[0]['coordinate'])
        return item
        

class EventGeocodeGoogle(object):
    def open_spider(self, spider):
        self.gmaps = googlemaps.Client(key=GOOGLE_KEY)

    def process_item(self, item, spider):
        if not item.get('coordinate') and item.get('address') and item.get('place'):
            logging.debug("EventGeocodeGoogle: geocode event [%s] with place [%s] and address [%s]" % (item.get('id'), item.get("place"), item.get("address")))
            results = self.gmaps.geocode(item['address'])
            if len(results) > 0:
                logging.debug("EventGeocodeGoogle: geocode event [%s] with place [%s] and address [%s] found [%s] results" % (item.get('id'), item.get("place"), item.get("address"),len(results)))
                item['address'] = encodeStr(results[0]['formatted_address'])
                item['coordinate'] = ",".join([str(results[0]['geometry']['location']['lat']),str(results[0]['geometry']['location']['lng'])])
                for address in results[0]['address_components']:
                    if 'country' in address['types']:
                        item['country'] = encodeStr(address['long_name'])
                    if 'administrative_area_level_2' in address['types']:
                        item['city'] = encodeStr(address['long_name'])
                    if 'locality' in  address['types']:
                        item['locality'] = encodeStr(address['long_name'])
        
        if not item.get('coordinate'):
            raise DropItem("EventGeocodeGoogle: fail to geocode event [%s] with place [%s] and address [%s]" % (item['id'], item.get("place"), item.get("address")))
        
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




