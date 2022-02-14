from bs4 import BeautifulSoup
import requests
import yaml
class scrape_from_yaml():
    def __init__(self):
        self.read_yaml = open(r'scraper.yaml', 'r')
        self.yaml_content = yaml.load(self.read_yaml, Loader=yaml.FullLoader)
        self.website_link = self.yaml_content['Link']
        self.tor_proxy = "http://localhost:8118"
        self.tor_required = self.yaml_content['Tor']
        self.scrape_element = self.yaml_content['Element']
        self.scrape_class = self.yaml_content['Class']
        self.return_results = 'find' if self.yaml_content['Return'] == 'one' else 'find_all'
        self.content_type = self.yaml_content['Content-Type']

    def scrape_website_html(self):
        if self.tor_required:
            try:
                response = requests.get(url=self.website_link,proxies={"http": self.tor_proxy})
                web_text = response.text
                website = BeautifulSoup(web_text, "lxml")
                return website
            except:
                return "website not exist"
        else:
            try:
                response = requests.get(
                    url=self.website_link)
                web_text = response.text
                website = BeautifulSoup(web_text, "lxml")
                return website
            except:
                return "website not exist"

    def scrape_html_by_class_or_element(self, web_html):
        if self.scrape_element == "none" and self.scrape_class=="none":
            return web_html
        elif len(self.scrape_element)>0 and self.scrape_class=="none":
            try:
                if self.return_results == 'one':
                    return web_html.find(name=self.scrape_element)
                else:
                    return web_html.findAll(name=self.scrape_element)
            except:
                return f"could not find element type {self.scrape_element}"
        elif self.scrape_element == "none" and len(self.scrape_class)>0 :
            try:
                if self.return_results == 'one':
                    return web_html.find(class_=self.scrape_class)
                else:
                    return web_html.findAll(class_=self.scrape_class)
            except:
                return f"could not find element with class name {self.scrape_class}"
        else:
            try:
                if self.return_results == 'one':
                    return web_html.find(name=self.scrape_element, class_=self.scrape_class)
                else:
                    return web_html.findAll(name=self.scrape_element, class_=self.scrape_class)
            except:
                return f"could not find element type {self.scrape_element} with class name {self.scrape_class}"


    def extract_from_result(self, html_elements):
        if self.content_type == "elements" or self.content_type == "":
            return html_elements
        elif self.content_type == "hrefs":
            if self.return_results != "one":
                results = []
                for item in html_elements:
                    try:
                        return item.get('href')
                    except:
                        return f"could not find content type {self.content_type} in html elements"
                return results
            else:
                try:
                    return html_elements.get('href')
                except:
                    return f"could not find content type {self.content_type} in html elements"
        else:
            if self.return_results != "one":
                results = []
                for item in html_elements:
                    try:
                        results.append(item.text)
                    except:
                        return f"could not find content type {self.content_type} in html elements"
                return results
            else:
                try:
                    return html_elements.text
                except:
                    return f"could not find content type {self.content_type} in html elements"

    def run_auto_scraper(self):
        return self.extract_from_result(self.scrape_html_by_class_or_element(self.scrape_website_html()))

if __name__ == "__main__":
    auto_scraper = scrape_from_yaml()
    print(auto_scraper.run_auto_scraper())

