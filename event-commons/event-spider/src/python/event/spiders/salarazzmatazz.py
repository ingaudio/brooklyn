# -*- coding: utf-8 -*-
import scrapy
import re
import datetime
from scrapy.loader import ItemLoader
from event.items import EventItem
import unidecode
from ..utility import *

class SalarazzmatazzSpider(scrapy.Spider):

    name = 'salarazzmatazz'

    allowed_domains = ['www.salarazzmatazz.com']

    start_urls = ['http://www.salarazzmatazz.com']

    def start_requests(self):
            date = datetime.date.today()
             # Search for SHOWs
            yield scrapy.Request(
                url=self.start_urls[0] + '/op/conciertos/%02d,%04d' % (date.month, date.year),
                callback=self.parseShows
            )

    def parseShows(self, response):
        events = response.selector.css('table.evento')
        for event in events:
            loader = ItemLoader(item=EventItem(), response=response, selector=event)
            loader.add_css('name', 'td.sala a::text')
            loader.add_value('url', self.start_urls[0])
            loader.add_css('url', 'td.sala a::attr(href)')
            loader.add_value('category', 'music')
            loader.add_value('dateStart', self.extract_date(event.css('span.fecha ::text').extract()))
            loader.add_value('place', 'razzmatazz')
            loader.add_css('zone', 'td.sala span:first-child ::text')
            loader.add_value('address', 'C/ Pamplona 88, 1er piso, 08018, Barcelona')
            item = loader.load_item()
            yield scrapy.Request(
                url=item.get('url'),
                callback=self.parseShowDetail,
                meta=dict(item=item)
            )
            

    def parseShowDetail(self, response):
        loader = ItemLoader(item=response.meta['item'], response=response)
        loader.add_value('image', self.start_urls[0])
        loader.add_css('image', 'img.artistagran::attr(src)')
        loader.add_value('dateStart', " ".join([response.meta['item']["dateStart"], extractRegex(response,".info-artista-top ::text", "[0-9]+:[0-9]+")])) 
        loader.add_value('price',extractRegex(response, ".info-artista-top ::text", "[0-9]+EUR"))
        loader.add_css('youtube', 'iframe::attr(src)')
        #loader.add_css('info', 'div.columnas ::text')
        yield loader.load_item()

    def extract_date(self, value):
        return "".join(value) + ' ' + str(datetime.datetime.now().year)

    def extract_time(self, value):
        m = re.search("[0-9]+:[0-9]+",unidecode.unidecode(" ".join(value))) 
        if m : return m.group(0) 

    def extract_price(self, value):
        m = re.search("[0-9]+EUR",unidecode.unidecode(" ".join(value))) 
        if m : return m.group(0) 

