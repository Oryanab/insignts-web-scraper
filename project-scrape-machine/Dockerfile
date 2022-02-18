FROM python:latest

# Add crontab file in the cron directory
ADD crontab /etc/cron.d/crontab
COPY . .
RUN pip install -r requirements.txt
# Give execution rights on the cron job

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

#Install Cron
RUN apt-get update
RUN apt-get -y install cron

# Run the command on container startup
CMD service cron start ; tail -f /var/log/cron.log

# FROM python:latest
# RUN apt update && apt install -y cron vim
# COPY crontab /etc/cron.d/crontab2
# COPY main.py /main.py
# #RUN chmod 0644 /etc/cron.d/crontab
# #RUN /usr/bin/crontab /etc/cron.d/crontab
# RUN touch /crontest.txt
# # run crond as main process of container
# CMD service cron start ; tail -f /crontest.txt
