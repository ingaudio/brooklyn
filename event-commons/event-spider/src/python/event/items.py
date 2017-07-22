# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html
import scrapy
import unidecode
import logging
import datetime
from scrapy.loader.processors import Join, MapCompose, TakeFirst
from utility import *


class EventItem(scrapy.Item):  
        
    def decodeText(value):
        return encodeText(value)
    
    def beautifyText(value):
        value = value.lower()
        value = value.strip();
        value = value.lstrip('.');
        value = value.rstrip('.');
        value = value.rstrip('€');
        value = value.rstrip('eur');
        return value;
    
    # Structure
    id = scrapy.Field(
        output_processor=TakeFirst()
    )
    # Event
    name = scrapy.Field(
        input_processor=MapCompose(decodeText, beautifyText),
        output_processor=TakeFirst()
    )
    description = scrapy.Field(
        input_processor=MapCompose(decodeText, beautifyText),
        output_processor=TakeFirst()
    )
    url = scrapy.Field(
        input_processor=MapCompose(decodeText),
        output_processor=Join('')
    )
    image = scrapy.Field(
        input_processor=MapCompose(decodeText),
        output_processor=Join('')
    )
    youtube = scrapy.Field(
        input_processor=MapCompose(decodeText),
        output_processor=TakeFirst()
    ) 
    # What
    category = scrapy.Field(
        input_processor=MapCompose(decodeText, beautifyText),
        output_processor=TakeFirst()
    )
    tags = scrapy.Field(
        input_processor=MapCompose(decodeText, beautifyText)
    )
    price = scrapy.Field(
        input_processor=MapCompose(decodeText, beautifyText),
        output_processor=TakeFirst()
    )
    # When
    dateStart = scrapy.Field(
        input_processor=MapCompose(decodeText, beautifyText),
        output_processor=Join(' ')
    )
    dateEnd = scrapy.Field(
        input_processor=MapCompose(decodeText, beautifyText),
        output_processor=Join(' ')
    )
    # Where
    country = scrapy.Field(
        input_processor=MapCompose(decodeText, beautifyText),
        output_processor=TakeFirst()
    )
    city = scrapy.Field(
        input_processor=MapCompose(decodeText, beautifyText),
        output_processor=TakeFirst()
    )
    locality = scrapy.Field(
        input_processor=MapCompose(decodeText, beautifyText),
        output_processor=TakeFirst()
    )
    address = scrapy.Field(
        input_processor=MapCompose(decodeText, beautifyText),
        output_processor=Join(" ")
    )
    coordinate = scrapy.Field(
        input_processor=MapCompose(decodeText, beautifyText),
        output_processor=TakeFirst()
    )
    place = scrapy.Field(
        input_processor=MapCompose(decodeText, beautifyText),
        output_processor=TakeFirst()
    )
    zone = scrapy.Field(
        input_processor=MapCompose(decodeText, beautifyText),
        output_processor=TakeFirst()
    )
    # Spider
    spiderName = scrapy.Field(
        input_processor=MapCompose(decodeText, beautifyText),
        output_processor=TakeFirst()
    )
    spiderSource = scrapy.Field(
        input_processor=MapCompose(decodeText, beautifyText),
        output_processor=TakeFirst()
    )

