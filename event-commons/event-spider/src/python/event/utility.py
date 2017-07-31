# -*- coding: utf-8 -*-

import unidecode
import logging
import datetime
import re
import time

# ENCODING STUFF

def encodeStr(value):
    return encodeText(value).lower()
    
def encodeText(value):
    if type(value) is str: value = unicode(value,'utf-8')
    elif type(value) is list: return [ encodeText(x) for x in value ]
    return unidecode.unidecode(value)

def encodeDate(value):
    if value == '': return ''
    #for format in ['%A %d %B %Y %H:%M', '%A %d %B %Y', '%d/%m/%Y', '%Y-%m-%d%t%H:%M:%S', '%y-%m-%d %H:%M:%S.%f']:
    for format in ['%Y-%m-%d %H:%M:%S', '%A %d %B %Y %H:%M', '%A %d %B %Y', '%d/%m/%Y']:
        try: return datetime.datetime.strptime(value, format)
        except Exception as e: 
            logging.debug("fail to decode date [%s] with format [%s] and exception: %s" % (value,format,e))
            pass
    
    
    logging.warn("fail to decode date: [%s]" % value)
    return None

def encodeDateNow():
    return time.strftime("%Y-%m-%d %H:%M:%S")

# Selector

def extractRegex(selector, css, regex):
    m = re.search(regex,unidecode.unidecode(" ".join(selector.css(css).extract()))) 
    if m : return m.group(0)
    else: return "" 

# SOLR

escapeRules = {'+': r'\+',
               '-': r'\-',
               '&': r'\&',
               '|': r'\|',
               '!': r'\!',
               '(': r'\(',
               ')': r'\)',
               '{': r'\{',
               '}': r'\}',
               '[': r'\[',
               ']': r'\]',
               '^': r'\^',
               '~': r'\~',
               '*': r'\*',
               '?': r'\?',
               ':': r'\:',
               '"': r'\"',
               ';': r'\;'
               }

def escapedSeq(term):
    """ Yield the next string based on the
        next character (either this char
        or escaped version """
    for char in term:
        if char in escapeRules.keys():
            yield escapeRules[char]
        else:
            yield char

def escapeSolrArg(term):
    """ Apply escaping to the passed in query terms
        escaping special characters like : , etc"""
    term = term.replace('\\', r'\\')   # escape \ first
    return "".join([nextStr for nextStr in escapedSeq(term)])
