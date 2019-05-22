import csv
import time
from urllib.parse import urlparse

from bs4 import BeautifulSoup
import requests


#base_url = 'https://beyblade.fandom.com/wiki/List_of_Burst_System_parts'
base_url = 'https://beyblade.fandom.com/wiki/List_of_God_Layer_System_parts'

def get_soup_from_url(url):
    user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 ' \
                 '(KHTML, like Gecko) Chrome/50.0.2661.75 Safari/537.36'

    headers = {'User-Agent' : user_agent,}
    
    r = requests.get(url, headers=headers)
    
    return BeautifulSoup(r.content, 'html.parser')


soup = get_soup_from_url(base_url)

table_rows = [row for row in soup.select('table.wikitable > tr') if row.select('td')]
table_rows


def parse_table_row(row):
    """Function for table row parsing"""
    
    def _get_value_by_data_source(tag, dsource):
        """Function for item page parsing"""
        try:
            el = item_soup.find(tag, {'data-source': dsource})
            if tag == 'div':
                return el.select_one('div').text
            else:
                return int(el.text)
                             
        except:
            return None
        
    abbr = row.select_one('th').text.strip()
    cells = row.select('td')

    img_url = cells[0].a.get('href')
    parsed_img_url = urlparse(img_url)
    if not parsed_img_url.netloc:
        img_url = None 


    page_url = 'https://beyblade.fandom.com' + cells[1].a.get('href')
    
    item_soup = get_soup_from_url(page_url)
    
    if 'Energy_Layer' in page_url:
        name_hasbro = cells[1].text.strip()
        name_takara = cells[2].text.strip()
        product_code = _get_value_by_data_source('div', 'ProductCode')
    else:
        name_hasbro = cells[1].text.strip()
        name_takara = cells[1].text.strip()
        try:
            product_code = cells[2].text.strip()
        except:
            product_code = None
    
    part_type = _get_value_by_data_source('div', 'Classification')
    
    try:
        weight = _get_value_by_data_source('div', 'Weight')
        weight = float(weight.split()[0])
    except:
        weight = None
        
    system = _get_value_by_data_source('div', 'System')
    series = _get_value_by_data_source('div', 'Series')
    attack = _get_value_by_data_source('td', 'AttackStat')
    defense = _get_value_by_data_source('td', 'DefenseStat')
    stamina = _get_value_by_data_source('td', 'StaminaStat')
    weight_stat = _get_value_by_data_source('td', 'WeightStat')
    speed = _get_value_by_data_source('td', 'SpeedStat')
    burst = _get_value_by_data_source('td', 'BurstStat')
    
    return {
        'abbr': abbr,
        'img_url': img_url,
        'name_hasbro': name_hasbro,
        'name_takara': name_takara,
        'page_url': page_url,
        'product_code': product_code,
        'part_type': part_type,
        'weight': weight,
        'system': system,
        'series': series,
        'attack': attack,
        'defense': defense,
        'stamina': stamina,
        'weight_stat': weight_stat,
        'speed': speed,
        'burst': burst,
        
    }


if __name__ == '__main__':

    with open('output.csv', 'w', newline='', encoding='utf-8') as f:
        fieldnames = ['part_type', 'abbr', 'img_url', 'name_hasbro', 
                      'name_takara', 'page_url', 'product_code', 
                      'weight', 'system', 'series', 'attack', 
                      'defense', 'stamina', 'weight_stat', 'speed', 'burst']
        
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        
        for row in table_rows:
            result = parse_table_row(row)
            writer.writerow(result)
            print(result)
            time.sleep(2)
