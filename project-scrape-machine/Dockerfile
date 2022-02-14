FROM python:3.7
# COPY crontab /etc/cron.d/crontab
# COPY . .
# RUN pip install -r requirements.txt
# RUN chmod 0644 /etc/cron.d/crontab
# RUN /usr/bin/crontab /etc/cron.d/crontab
# CMD ["cron", "-f"]



# Add crontab file in the cron directory
ADD crontab /etc/cron.d/hello-cron
COPY . .
RUN pip install -r requirements.txt
# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/hello-cron

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

#Install Cron
RUN apt-get update
RUN apt-get -y install cron


# Run the command on container startup
CMD cron && tail -f /var/log/cron.log
