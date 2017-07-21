# -*- coding: utf-8 -*-
import scrapy
import logging

from scrapy.http import HtmlResponse
from scrapy.loader import ItemLoader

from event.items import EventItem

#import re

#from scrapy.spiders import CrawlSpider
#from scrapy.linkextractors import LinkExtractor


#from numpy import place


class GuiaBcnSpider(scrapy.Spider):
    
    name = 'guia-bcn'
    
    allowed_domains = ['guia.barcelona.cat']
    
    start_urls = ['http://guia.barcelona.cat/en']

    def start_requests(self):
        yield scrapy.Request(
            url='http://guia.barcelona.cat/en/agenda-recomenada/la-meva-barcelona?ctg=musica&response_type=embed&nr=100&from=0',
            callback=self.parse_category_page,
            meta=dict(cat='music')
        )
        yield scrapy.Request(
            url='http://guia.barcelona.cat/en/agenda-recomenada/la-meva-barcelona?ctg=espectacles&response_type=embed&nr=100&from=0',
            callback=self.parse_category_page,
            meta=dict(cat='show')
        )
        yield scrapy.Request(
            url='http://guia.barcelona.cat/en/agenda-recomenada/la-meva-barcelona?ctg=festes&response_type=embed&nr=100&from=0',
            callback=self.parse_category_page,
            meta=dict(cat='festival')
        )   

    def parse_category_page(self, response):
        events = response.selector.css('div.item')
        for event in events:
            loader = ItemLoader(item=EventItem(), response=response, selector=event)
            loader.add_css('name', '.content-ag .properes a::text')
            loader.add_css('description', '.resum::text')
            loader.add_css('url', '.content-ag .properes a::attr(href)')
            loader.add_value('category', response.meta['cat'])
            loader.add_css('tags', '.resum strong::text')
            loader.add_value('dateStart', self.extract_date_start(event.css('.dades dd')[1].css('::text').extract()[0]))
            loader.add_value('dateEnd', self.extract_date_end(event.css('.dades dd')[1].css('::text').extract()[0]))
            item = loader.load_item()
            yield scrapy.Request(
                url=item.get('url'),
                callback=self.parse_page_detail,
                meta=dict(item=item)
            ) 

    def parse_page_detail(self, response):
        loader = ItemLoader(item=response.meta['item'], response=response)
        loader.add_css('place', 'div.info-lloc a::text')
        loader.add_css('place', 'div.info-lloc h3::text')
        loader.add_css('address', 'dl.adreca dd::text')
        loader.add_css('image', '.img-destacada img::attr(src)')
        yield loader.load_item()
    
    def extract_date_start(self, value):
        try: #From 10/06/2017 to 11/06/2017. 
            return value.split(' ')[1]
        except Exception as e:
            return value
            
    def extract_date_end(self, value):
        try: #From 10/06/2017 to 11/06/2017. 
            return value.split(' ')[3]
        except Exception as e:
            return None
    