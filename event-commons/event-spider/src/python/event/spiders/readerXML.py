# -*- coding: utf-8 -*-
import unidecode
import scrapy
from event.items import EventItem
from scrapy.spiders import XMLFeedSpider
from scrapy.loader import ItemLoader

class ReaderXMLSpider(XMLFeedSpider):
    name = 'readerXML'
    iterator = 'iternodes'  # This is actually unnecessary, since it's the default value
    itertag = 'item'

    def parse_node(self, response, node):
        loader = ItemLoader(item=EventItem(), response=response, selector=node)
        
        
        for key in EventItem.fields:
            loader.add_xpath(key, key + '/text()')
        
        return loader.load_item()