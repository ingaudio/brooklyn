# -*- coding: utf-8 -*-
import unidecode
import scrapy
import logging

from event.items import EventItem
from scrapy.spiders import XMLFeedSpider
from scrapy.loader import ItemLoader

class ReaderSolrSpider(XMLFeedSpider):
    name = 'readerSolr'
    iterator = 'iternodes'  # This is actually unnecessary, since it's the default value
    itertag = 'doc'

    def parse_node(self, response, node):
        self.logger.debug('Hi, this is a <%s> node!: %s', self.itertag, ''.join(node.extract()))
        loader = ItemLoader(item=EventItem(), response=response, selector=node)
        
        for key in EventItem.fields:
            loader.add_xpath(key, "//*[@name='" + key + "']/text()")
        
        return loader.load_item()