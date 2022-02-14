FROM python:3.7
COPY crontab /etc/cron.d/crontab
COPY . .
RUN pip install -r requirements.txt
RUN chmod 0644 /etc/cron.d/crontab
RUN /usr/bin/crontab /etc/cron.d/crontab
CMD ["cron", "-f"]


