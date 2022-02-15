# FROM python:latest

# #Install Cron
# RUN apt-get update && apt-get install -y cron

# # Add crontab file in the cron directory
# ADD crontab /etc/cron.d/crontab
# COPY . .
# RUN pip install -r requirements.txt
# # Give execution rights on the cron job
# # RUN chmod 0644 /etc/cron.d/crontab

# # Create the log file to be able to run tail
# RUN touch /var/log/cron.log

# RUN service cron start
# # Run the command on container startup
# CMD tail -f /var/log/cron.log

FROM python:latest

#Install Cron
RUN apt-get update
RUN apt-get -y install cron

# Add crontab file in the cron directory
ADD crontab /etc/cron.d/crontab
COPY . .
RUN pip install -r requirements.txt
# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/crontab

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

# Run the command on container startup
CMD /usr/sbin/cron -f && tail -f /var/log/cron.log

