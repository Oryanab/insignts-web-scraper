from datetime import datetime

def fix_sting_format(str):
    import re
    return "".join(re.split('\xa0|\n|\.|\t|', str))



def scrape_entire_front_page():
    from bs4 import BeautifulSoup
    import requests
    proxy_urls = {
        "http": "http://localhost:8118"
    }
    response = requests.get(url="http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all",
                            proxies=proxy_urls)
    web_text = response.text
    website = BeautifulSoup(web_text, "lxml")
    return website



def scrape_new_pastes_data(website):
    data = []
    for paste in website.find_all(name="div", class_="col-sm-12"):
        try:
            title = fix_sting_format(paste.findNext('h4').text.strip().split('\n')[0])
            content = fix_sting_format(paste.findNext(name="div", class_="well well-sm well-white pre").text.strip())
            footer = paste.findNext(name="div", class_="col-sm-6").text.split('at')
            author = fix_sting_format("".join(footer[0].split(' ')[2:]))
            date = "".join(fix_sting_format(footer[1]).split(',')).strip()
            data.append({"title":title,"content":content,"author":author, "date":date })
        except:
            print('passed due to failure')
            pass
    return data



def save_new_database(new_pastes):
    import pymongo
    counter = 0
    my_client = pymongo.MongoClient("mongodb://root:example@localhost:27017/pastes-database?authSource=admin")
    database = my_client["pastes-database"]
    collection = database["pastes"]
    for paste in new_pastes:
        try:
            if not collection.find_one({"title":paste["title"]}):
                collection.insert_one(paste)
                counter+=1
            else:
                pass
        except:
            print('passed due to failure 2')
            pass
    print(f"Running script at {datetime.now()} added {counter} items")

  
if __name__ == "__main__":
    save_new_database(scrape_new_pastes_data(scrape_entire_front_page()))


# docker build -t scraper .
# docker run -d scraper










